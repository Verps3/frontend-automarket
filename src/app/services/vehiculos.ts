import { Injectable } from '@angular/core';

export type Carroceria = 'Sedán' | 'SUV' | 'Hatchback' | 'Pickup' | 'Coupé';
export type Transmision = 'Automática' | 'Manual';
export type Combustible = 'Gasolina' | 'Diésel' | 'Híbrido' | 'Eléctrico';

export interface Vehiculo {
  id: number;
  nombre: string; // "Sedán Modelo X"
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
  /** URLs de fotos. Vacío = se muestra el recuadro gris del mockup. */
  imagenes: string[];
}

type Fila = [
  Carroceria, string, string, number, number, number,
  Transmision, Combustible, string, string, number,
];

// carrocería, modelo, marca, año, km, precio, transmisión, combustible, color, motor, puertas
// Datos de ejemplo: reemplazar por la respuesta de la API cuando exista el backend.
const FILAS: Fila[] = [
  ['Sedán', 'X', 'Genérica', 2024, 15000, 85_000_000, 'Automática', 'Gasolina', 'Gris Titanio', '2.0L Turbo', 4],
  ['SUV', 'Y', 'Aurora', 2023, 28000, 120_000_000, 'Automática', 'Gasolina', 'Negro Obsidiana', '2.5L Turbo', 5],
  ['Hatchback', 'Z', 'Vektra', 2022, 41000, 62_000_000, 'Manual', 'Gasolina', 'Rojo Rubí', '1.6L', 5],
  ['Pickup', 'A', 'Solana', 2023, 33000, 150_000_000, 'Automática', 'Diésel', 'Blanco Glaciar', '2.8L Turbodiésel', 4],
  ['Coupé', 'B', 'Aurora', 2024, 9000, 98_000_000, 'Automática', 'Gasolina', 'Azul Medianoche', '2.0L Turbo', 2],
  ['Sedán', 'C', 'Vektra', 2021, 52000, 73_000_000, 'Automática', 'Gasolina', 'Plata Lunar', '1.8L', 4],
  ['SUV', 'D', 'Solana', 2022, 47000, 105_000_000, 'Automática', 'Híbrido', 'Verde Pino', '2.0L Híbrido', 5],
  ['Hatchback', 'E', 'Genérica', 2023, 22000, 58_000_000, 'Manual', 'Gasolina', 'Blanco', '1.4L', 5],
  ['Sedán', 'F', 'Aurora', 2020, 78000, 55_000_000, 'Manual', 'Gasolina', 'Gris Grafito', '1.6L', 4],
  ['Pickup', 'G', 'Vektra', 2022, 60000, 138_000_000, 'Automática', 'Diésel', 'Gris Acero', '2.4L Turbodiésel', 4],
  ['SUV', 'H', 'Genérica', 2024, 12000, 132_000_000, 'Automática', 'Híbrido', 'Blanco Perla', '2.0L Híbrido', 5],
  ['Coupé', 'I', 'Solana', 2021, 36000, 112_000_000, 'Automática', 'Gasolina', 'Naranja Solar', '3.0L Turbo', 2],
  ['Hatchback', 'J', 'Aurora', 2024, 5000, 68_000_000, 'Automática', 'Gasolina', 'Azul Cobalto', '1.5L Turbo', 5],
  ['Sedán', 'K', 'Solana', 2023, 19000, 89_000_000, 'Automática', 'Gasolina', 'Negro', '2.0L', 4],
  ['SUV', 'L', 'Vektra', 2021, 66000, 92_000_000, 'Automática', 'Gasolina', 'Beige Arena', '2.4L', 5],
  ['Pickup', 'M', 'Genérica', 2020, 91000, 118_000_000, 'Manual', 'Diésel', 'Blanco', '2.5L Turbodiésel', 4],
  ['Sedán', 'N', 'Genérica', 2022, 38000, 76_000_000, 'Automática', 'Gasolina', 'Azul Acero', '1.8L', 4],
  ['Coupé', 'O', 'Vektra', 2023, 14000, 125_000_000, 'Automática', 'Gasolina', 'Rojo Carmesí', '2.5L Turbo', 2],
  ['Hatchback', 'P', 'Solana', 2021, 57000, 52_000_000, 'Manual', 'Gasolina', 'Amarillo', '1.2L', 5],
  ['SUV', 'Q', 'Aurora', 2024, 7000, 145_000_000, 'Automática', 'Eléctrico', 'Gris Titanio', 'Eléctrico 150 kW', 5],
  ['Sedán', 'R', 'Aurora', 2022, 44000, 81_000_000, 'Automática', 'Híbrido', 'Plata', '1.8L Híbrido', 4],
  ['Pickup', 'S', 'Solana', 2021, 72000, 129_000_000, 'Automática', 'Diésel', 'Negro', '2.8L Turbodiésel', 4],
  ['Hatchback', 'T', 'Genérica', 2022, 31000, 64_000_000, 'Automática', 'Gasolina', 'Gris Claro', '1.6L', 5],
  ['SUV', 'U', 'Vektra', 2023, 25000, 99_000_000, 'Automática', 'Gasolina', 'Verde Oliva', '2.0L', 5],
];

const DESCRIPCION_X =
  'Vehículo en excelente estado, único dueño, mantenimientos al día, revisión técnico-mecánica vigente. Ideal para ciudad y carretera.';

const VEHICULOS: Vehiculo[] = FILAS.map(
  ([carroceria, modelo, marca, anio, kilometraje, precio, transmision, combustible, color, motor, puertas], i) => ({
    id: i + 1,
    nombre: `${carroceria} Modelo ${modelo}`,
    carroceria, modelo, marca, anio, kilometraje, precio, transmision, combustible, color, motor, puertas,
    descripcion:
      i === 0
        ? DESCRIPCION_X
        : `${carroceria} ${anio} en muy buen estado, mantenimientos al día y revisión técnico-mecánica vigente. Peritado por AutoMarket y con garantía incluida.`,
    imagenes: [],
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
