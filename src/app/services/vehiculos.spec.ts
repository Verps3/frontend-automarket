import { TestBed } from '@angular/core/testing';
import { Vehiculos } from './vehiculos';

describe('Vehiculos', () => {
  const servicio = () => TestBed.inject(Vehiculos);

  it('trae los 3 destacados del mockup', () => {
    expect(servicio().destacados().map((v) => v.nombre)).toEqual([
      'Mazda 3 Sedan', 'Mazda CX-5', 'Mazda 2',
    ]);
  });

  it('tiene 24 vehículos (4 páginas de 6)', () => {
    expect(servicio().lista.length).toBe(24);
  });

  it('relacionados no incluye el vehículo base y prioriza la misma carrocería', () => {
    const base = servicio().porId(1)!;
    const rel = servicio().relacionados(base);
    expect(rel.length).toBe(3);
    expect(rel.some((v) => v.id === base.id)).toBe(false);
    expect(rel.every((v) => v.carroceria === base.carroceria)).toBe(true);
  });
});
