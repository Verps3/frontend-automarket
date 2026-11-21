import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vehiculos } from '../services/vehiculos';
import { VehiculoCard } from '../vehiculo-card/vehiculo-card';
import { Cop, Km, miles } from '../shared/formato';

@Component({
  imports: [RouterLink, VehiculoCard, Cop, Km],
  selector: 'app-detalle-vehiculo',
  styleUrl: './detalle-vehiculo.css',
  templateUrl: './detalle-vehiculo.html',
})
export class DetalleVehiculo {
  private readonly servicio = inject(Vehiculos);

  /** Viene de la ruta /catalogo/:id */
  readonly id = input.required<string>();

  protected readonly vehiculo = computed(() => this.servicio.porId(Number(this.id())));

  protected readonly relacionados = computed(() => {
    const v = this.vehiculo();
    return v ? this.servicio.relacionados(v) : [];
  });

  /** Tres espacios de galería; si el vehículo trae fotos, se usan. */
  protected readonly galeria = computed(() => {
    const fotos = this.vehiculo()?.imagenes ?? [];
    return fotos.length ? fotos : ['', '', ''];
  });

  // Vuelve a la primera miniatura cada vez que cambia de vehículo (p. ej. al ir a un relacionado)
  protected readonly seleccionada = linkedSignal({ source: this.id, computation: () => 0 });

  protected readonly ficha = computed(() => {
    const v = this.vehiculo();
    if (!v) return [];
    return [
      ['Marca', v.marca],
      ['Modelo', v.modelo],
      ['Año', String(v.anio)],
      ['Kilometraje', `${miles(v.kilometraje)} km`],
      ['Transmisión', v.transmision],
      ['Combustible', v.combustible],
      ['Color', v.color],
      ['Puertas', String(v.puertas)],
    ];
  });
}
