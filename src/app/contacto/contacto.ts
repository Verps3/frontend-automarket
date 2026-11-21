import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Vehiculos } from '../services/vehiculos';
import { Cop } from '../shared/formato';

const CANALES: Record<string, string> = {
  whatsapp: 'Whatsapp',
  llamada: 'llamada telefónica',
  correo: 'correo electrónico',
};

@Component({
  imports: [ReactiveFormsModule, RouterLink, Cop],
  selector: 'app-contacto',
  styleUrl: './contacto.css',
  templateUrl: './contacto.html',
})
export class Contacto {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly servicio = inject(Vehiculos);

  /** ?vehiculo=3 en la URL (lo envían "Comprar" y "Contactar vendedor"). */
  readonly vehiculo = input<string>();

  protected readonly auto = computed(
    () => this.servicio.porId(Number(this.vehiculo())) ?? this.servicio.lista[0],
  );

  private readonly mensajeBase = computed(
    () => `Hola, estoy interesado en el ${this.auto().nombre}. ¿Sigue disponible?`,
  );

  protected readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)]],
    correo: ['', [Validators.required, Validators.email]],
    canal: ['whatsapp'],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected readonly enviado = signal<string | null>(null);

  constructor() {
    // Mientras la persona no edite el mensaje, sigue al vehículo elegido.
    effect(() => {
      const base = this.mensajeBase();
      const ctrl = this.form.controls.mensaje;
      if (ctrl.pristine) ctrl.setValue(base);
    });
  }

  protected malo(ctrl: AbstractControl): boolean {
    return ctrl.invalid && ctrl.touched;
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: conectar con la API (POST /contactos) cuando exista el backend.
    this.enviado.set(CANALES[this.form.controls.canal.value]);
    this.form.reset({ canal: 'whatsapp', mensaje: this.mensajeBase() });
  }
}
