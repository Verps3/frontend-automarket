import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  it('muestra el hero, 3 destacados y 3 beneficios', async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('Encuentra tu carro ideal');
    expect(el.querySelectorAll('app-vehiculo-card').length).toBe(3);
    expect(el.textContent).toContain('$ 85.000.000');
    expect(el.textContent).toContain('Vehículos peritados');
  });
});
