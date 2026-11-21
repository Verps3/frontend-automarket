import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vehiculo } from '../services/vehiculos';
import { Cop } from '../shared/formato';

@Component({
  imports: [RouterLink, Cop],
  selector: 'app-vehiculo-card',
  styleUrl: './vehiculo-card.css',
  templateUrl: './vehiculo-card.html',
})
export class VehiculoCard {
  readonly vehiculo = input.required<Vehiculo>();
  /** "comprar" lleva a contacto (Home); "ver" lleva al detalle (Catálogo, relacionados). */
  readonly accion = input<'comprar' | 'ver'>('ver');
}
