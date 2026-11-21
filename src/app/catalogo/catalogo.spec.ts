import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Catalogo } from './catalogo';

describe('Catalogo', () => {
  const crear = async () => {
    await TestBed.configureTestingModule({
      imports: [Catalogo],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Catalogo);
    await fixture.whenStable();
    return fixture;
  };

  it('muestra 6 tarjetas y 4 páginas', async () => {
    const fixture = await crear();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-vehiculo-card').length).toBe(6);
    expect(el.querySelectorAll('.am-pager button').length).toBe(6); // < 1 2 3 4 >
  });

  it('filtra por texto (marca) y vuelve a la página 1', async () => {
    const fixture = await crear();
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input[type=search]') as HTMLInputElement;
    input.value = 'toyota';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const nombres = [...el.querySelectorAll('app-vehiculo-card h3')].map((h) => h.textContent);
    expect(nombres.length).toBeGreaterThan(0);
    expect(nombres.every((n) => n!.includes('Toyota'))).toBe(true);
  });

  it('muestra estado vacío si nada coincide', async () => {
    const fixture = await crear();
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input[type=search]') as HTMLInputElement;
    input.value = 'zzzz';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(el.textContent).toContain('No hay vehículos con esos filtros');
  });
});
