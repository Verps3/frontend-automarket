import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Vehiculos } from '../services/vehiculos';
import { Cop, miles } from '../shared/formato';

export interface Resultado {
  cuota: number;
  monto: number;
  plazo: number;
  tasa: number;
  total: number;
}

/**
 * Cuota fija (sistema francés). La tasa anual se divide entre 12 para obtener la tasa mensual,
 * que es lo que reproduce las cifras del mockup (85.000.000, inicial 17.000.000, 36 meses, 18%
 * => $ 2.458.363/mes y total $ 88.501.064).
 */
export function calcularCuota(precio: number, inicial: number, plazo: number, tasaAnual: number): Resultado {
  const monto = precio - inicial;
  const i = tasaAnual / 100 / 12;
  const cuota = i === 0 ? monto / plazo : (monto * i) / (1 - Math.pow(1 + i, -plazo));
  return { cuota: Math.round(cuota), monto, plazo, tasa: tasaAnual, total: Math.round(cuota * plazo) };
}

const inicialMenorQuePrecio = (g: AbstractControl): ValidationErrors | null => {
  const precio = g.get('precio')?.value ?? 0;
  const inicial = g.get('inicial')?.value ?? 0;
  return inicial >= precio ? { inicialMayor: true } : null;
};

@Component({
  imports: [ReactiveFormsModule, RouterLink, Cop],
  selector: 'app-financiamiento',
  styleUrl: './financiamiento.css',
  templateUrl: './financiamiento.html',
})
export class Financiamiento implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly vehiculos = inject(Vehiculos).lista;
  protected readonly plazos = [12, 24, 36, 48, 60, 72];
  protected readonly miles = miles;

  /** ?vehiculo=3 precarga precio e inicial del vehículo. */
  readonly vehiculo = input<string>();

  protected readonly form = this.fb.group(
    {
      vehiculo: [this.vehiculos[0].id],
      precio: [this.vehiculos[0].precio, [Validators.required, Validators.min(1)]],
      inicial: [Math.round(this.vehiculos[0].precio * 0.2), [Validators.required, Validators.min(0)]],
      plazo: [36],
      tasa: [18, [Validators.required, Validators.min(0), Validators.max(100)]],
    },
    { validators: inicialMenorQuePrecio },
  );

  protected readonly resultado = signal<Resultado>(this.calcular());

  ngOnInit(): void {
    const id = Number(this.vehiculo());
    if (this.vehiculos.some((v) => v.id === id)) {
      this.form.controls.vehiculo.setValue(id);
      this.alElegirVehiculo();
    }
  }

  /** Al elegir un vehículo se propone el 20 % de cuota inicial (como en el mockup). */
  protected alElegirVehiculo(): void {
    const v = this.vehiculos.find((x) => x.id === Number(this.form.controls.vehiculo.value));
    if (!v) return;
    this.form.patchValue({ precio: v.precio, inicial: Math.round(v.precio * 0.2) });
    this.resultado.set(this.calcular());
  }

  protected malo(ctrl: AbstractControl): boolean {
    return ctrl.invalid && ctrl.touched;
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.resultado.set(this.calcular());
  }

  private calcular(): Resultado {
    const { precio, inicial, plazo, tasa } = this.form.getRawValue();
    return calcularCuota(precio, inicial, Number(plazo), tasa);
  }
}
