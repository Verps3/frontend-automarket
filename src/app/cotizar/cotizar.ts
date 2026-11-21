import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehiculos } from '../services/vehiculos';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-cotizar',
  styleUrl: './cotizar.css',
  templateUrl: './cotizar.html',
})
export class Cotizar implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly vehiculos = inject(Vehiculos).lista;

  /** ?vehiculo=3 preselecciona el vehículo de interés. */
  readonly vehiculo = input<string>();

  protected readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    documento: ['', [Validators.required, Validators.pattern(/^\d{5,12}(-\d)?$/)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)]],
    vehiculo: [this.vehiculos[0].id, Validators.required],
    entrega: [false],
  });

  protected readonly enviado = signal(false);

  protected readonly incluye = [
    'Precio del vehículo',
    'Opciones de financiamiento',
    'Costos de matrícula',
    'Garantía y seguros',
  ];

  ngOnInit(): void {
    const id = Number(this.vehiculo());
    if (this.vehiculos.some((v) => v.id === id)) {
      this.form.controls.vehiculo.setValue(id);
    }
  }

  protected malo(ctrl: AbstractControl): boolean {
    return ctrl.invalid && ctrl.touched;
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: conectar con la API (POST /cotizaciones) cuando exista el backend.
    this.enviado.set(true);
    this.form.reset({ vehiculo: this.form.controls.vehiculo.value, entrega: false });
  }
}
