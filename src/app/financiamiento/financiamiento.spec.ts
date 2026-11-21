import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { calcularCuota, Financiamiento } from './financiamiento';

describe('calcularCuota', () => {
  it('reproduce las cifras del mockup', () => {
    const r = calcularCuota(85_000_000, 17_000_000, 36, 18);
    expect(r.monto).toBe(68_000_000);
    expect(r.cuota).toBe(2_458_363);
    expect(r.total).toBe(88_501_064);
  });

  it('con tasa 0 divide el monto en partes iguales', () => {
    expect(calcularCuota(12_000_000, 0, 12, 0).cuota).toBe(1_000_000);
  });
});

describe('Financiamiento', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Financiamiento],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('muestra la cuota inicial del mockup al cargar', async () => {
    const fixture = TestBed.createComponent(Financiamiento);
    await fixture.whenStable();
    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texto).toContain('$ 2.458.363');
    expect(texto).toContain('$ 88.501.064');
  });
});
