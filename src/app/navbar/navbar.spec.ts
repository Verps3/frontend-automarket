import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('muestra los cuatro enlaces y el botón Cotizar', async () => {
    const fixture = TestBed.createComponent(Navbar);
    await fixture.whenStable();
    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    for (const t of ['Inicio', 'Catálogo', 'Financiamiento', 'Contacto', 'Cotizar']) {
      expect(texto).toContain(t);
    }
  });

  it('abre y cierra el menú en móvil', async () => {
    const fixture = TestBed.createComponent(Navbar);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const toggler = el.querySelector('.navbar-toggler') as HTMLButtonElement;
    const menu = el.querySelector('#menu-principal') as HTMLElement;

    expect(menu.classList.contains('show')).toBe(false);
    toggler.click();
    await fixture.whenStable();
    expect(menu.classList.contains('show')).toBe(true);
  });
});
