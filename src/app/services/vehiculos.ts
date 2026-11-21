import { Injectable } from '@angular/core';

export type Carroceria = 'Sedán' | 'SUV' | 'Hatchback' | 'Pickup' | 'Coupé';
export type Transmision = 'Automática' | 'Manual';
export type Combustible = 'Gasolina' | 'Diésel' | 'Híbrido' | 'Eléctrico';

export interface Vehiculo {
  id: number;
  nombre: string; // "Mazda 3 Sedan" (marca + modelo)
  carroceria: Carroceria;
  modelo: string;
  marca: string;
  anio: number;
  kilometraje: number;
  precio: number;
  transmision: Transmision;
  combustible: Combustible;
  color: string;
  motor: string;
  puertas: number;
  descripcion: string;
  /** Rutas de las fotos (la primera es la portada). Vacío = recuadro gris del mockup. */
  imagenes: string[];
}

type Fila = [
  Carroceria, string, string, number, number, number,
  Transmision, Combustible, string, string, number,
];

// carrocería, marca, modelo, año, km, precio, transmisión, combustible, color, motor, puertas
// Datos de ejemplo (servicio mock): reemplazar por la respuesta de la API cuando exista el backend.
const FILAS: Fila[] = [
  ['Sedán', 'Mazda', '3 Sedan', 2024, 15000, 85_000_000, 'Automática', 'Gasolina', 'Gris', '2.0L', 4],
  ['SUV', 'Mazda', 'CX-5', 2023, 28000, 120_000_000, 'Automática', 'Gasolina', 'Negro', '2.5L', 5],
  ['Hatchback', 'Mazda', '2', 2022, 41000, 62_000_000, 'Manual', 'Gasolina', 'Rojo', '1.5L', 5],
  ['Pickup', 'Toyota', 'Hilux', 2023, 33000, 150_000_000, 'Automática', 'Diésel', 'Blanco', '2.8L Turbodiésel', 4],
  ['Coupé', 'Hyundai', 'Veloster', 2020, 38000, 98_000_000, 'Automática', 'Gasolina', 'Azul', '1.6L Turbo', 3],
  ['Sedán', 'Toyota', 'Corolla', 2021, 52000, 73_000_000, 'Automática', 'Gasolina', 'Plata', '1.8L', 4],
  ['SUV', 'Toyota', 'RAV4', 2022, 47000, 105_000_000, 'Automática', 'Gasolina', 'Verde', '2.5L', 5],
  ['Hatchback', 'Volkswagen', 'Polo', 2023, 22000, 58_000_000, 'Manual', 'Gasolina', 'Blanco', '1.6L', 5],
  ['Sedán', 'Nissan', 'Versa', 2020, 78000, 55_000_000, 'Manual', 'Gasolina', 'Gris oscuro', '1.6L', 4],
  ['Pickup', 'Nissan', 'Frontier', 2022, 60000, 138_000_000, 'Automática', 'Diésel', 'Gris', '2.3L Turbodiésel', 4],
  ['SUV', 'Toyota', 'RAV4 Hybrid', 2024, 12000, 132_000_000, 'Automática', 'Híbrido', 'Blanco', '2.5L Híbrido', 5],
  ['Coupé', 'Chevrolet', 'Camaro', 2021, 36000, 112_000_000, 'Automática', 'Gasolina', 'Naranja', '3.6L V6', 2],
  ['Hatchback', 'Suzuki', 'Swift', 2024, 5000, 68_000_000, 'Automática', 'Gasolina', 'Azul', '1.2L', 5],
  ['Sedán', 'Kia', 'Cerato', 2023, 19000, 89_000_000, 'Automática', 'Gasolina', 'Negro', '2.0L', 4],
  ['SUV', 'Kia', 'Sportage', 2021, 66000, 92_000_000, 'Automática', 'Gasolina', 'Beige', '2.0L', 5],
  ['Pickup', 'Chevrolet', 'D-Max', 2020, 91000, 118_000_000, 'Manual', 'Diésel', 'Blanco', '3.0L Turbodiésel', 4],
  ['Sedán', 'Honda', 'Civic', 2022, 38000, 76_000_000, 'Automática', 'Gasolina', 'Azul', '1.5L Turbo', 4],
  ['Coupé', 'Ford', 'Mustang', 2023, 14000, 125_000_000, 'Automática', 'Gasolina', 'Rojo', '2.3L EcoBoost', 2],
  ['Hatchback', 'Renault', 'Kwid', 2021, 57000, 52_000_000, 'Manual', 'Gasolina', 'Amarillo', '1.0L', 5],
  ['SUV', 'BYD', 'Yuan Plus', 2024, 7000, 145_000_000, 'Automática', 'Eléctrico', 'Gris', 'Eléctrico 150 kW', 5],
  ['Sedán', 'Toyota', 'Corolla Hybrid', 2022, 44000, 81_000_000, 'Automática', 'Híbrido', 'Plata', '1.8L Híbrido', 4],
  ['Pickup', 'Ford', 'Ranger', 2021, 72000, 129_000_000, 'Automática', 'Diésel', 'Negro', '2.0L Biturbo', 4],
  ['Hatchback', 'Volkswagen', 'Polo', 2022, 31000, 64_000_000, 'Automática', 'Gasolina', 'Gris claro', '1.6L', 5],
  ['SUV', 'Jeep', 'Compass', 2023, 25000, 99_000_000, 'Automática', 'Gasolina', 'Verde oliva', '2.0L', 5],
];

const DESCRIPCION_X =
  'Vehículo en excelente estado, único dueño, mantenimientos al día, revisión técnico-mecánica vigente. Ideal para ciudad y carretera.';

/**
 * Fotos de cada vehículo: public/images/vehiculos/<id>/1.jpg, 2.jpg y 3.jpg
 * (la 1 es la portada). Solo hay que copiar los archivos con ese nombre.
 */
const fotosDe = (id: number): string[] => [1, 2, 3].map((n) => `images/vehiculos/${id}/${n}.jpg`);

const VEHICULOS: Vehiculo[] = FILAS.map(
  ([carroceria, marca, modelo, anio, kilometraje, precio, transmision, combustible, color, motor, puertas], i) => ({
    id: i + 1,
    nombre: `${marca} ${modelo}`,
    carroceria, modelo, marca, anio, kilometraje, precio, transmision, combustible, color, motor, puertas,
    descripcion:
      i === 0
        ? DESCRIPCION_X
        : `${marca} ${modelo} ${anio} en muy buen estado, mantenimientos al día y revisión técnico-mecánica vigente. Peritado por AutoMarket y con garantía incluida.`,
    imagenes: fotosDe(i + 1),
  }),
);

@Injectable({ providedIn: 'root' })
export class Vehiculos {
  readonly lista: readonly Vehiculo[] = VEHICULOS;

  porId(id: number): Vehiculo | undefined {
    return this.lista.find((v) => v.id === id);
  }

  destacados(cantidad = 3): Vehiculo[] {
    return this.lista.slice(0, cantidad);
  }

  /** Misma carrocería primero; si faltan, completa con los de precio más cercano. */
  relacionados(base: Vehiculo, cantidad = 3): Vehiculo[] {
    return this.lista
      .filter((v) => v.id !== base.id)
      .sort(
        (a, b) =>
          Number(b.carroceria === base.carroceria) - Number(a.carroceria === base.carroceria) ||
          Math.abs(a.precio - base.precio) - Math.abs(b.precio - base.precio),
      )
      .slice(0, cantidad);
  }

  marcas(): string[] {
    return [...new Set(this.lista.map((v) => v.marca))].sort((a, b) => a.localeCompare(b, 'es'));
  }

  anios(): number[] {
    return [...new Set(this.lista.map((v) => v.anio))].sort((a, b) => b - a);
  }
}
