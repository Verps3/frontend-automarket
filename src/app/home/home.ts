import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vehiculos } from '../services/vehiculos';
import { VehiculoCard } from '../vehiculo-card/vehiculo-card';

@Component({
  imports: [RouterLink, VehiculoCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly destacados = inject(Vehiculos).destacados();
}
