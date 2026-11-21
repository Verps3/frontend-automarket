import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DetalleVehiculo } from './detalle-vehiculo';

describe('DetalleVehiculo', () => {
  const crear = async (id: string) => {
    await TestBed.configureTestingModule({
      imports: [DetalleVehiculo],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(DetalleVehiculo);
    fixture.componentRef.setInput('id', id);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  };

  it('muestra la ficha del Sedán Modelo X 2024', async () => {
    const el = await crear('1');
    expect(el.querySelector('h1')?.textContent).toContain('Sedán Modelo X 2024');
    expect(el.textContent).toContain('$ 85.000.000');
    expect(el.textContent).toContain('15.000 km');
    expect(el.querySelectorAll('app-vehiculo-card').length).toBe(3);
  });

  it('muestra aviso si el vehículo no existe', async () => {
    const el = await crear('999');
    expect(el.textContent).toContain('No encontramos este vehículo');
  });
});
