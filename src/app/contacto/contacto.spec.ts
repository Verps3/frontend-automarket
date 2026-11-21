import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Contacto } from './contacto';

describe('Contacto', () => {
  it('precarga el mensaje del mockup y valida antes de enviar', async () => {
    await TestBed.configureTestingModule({
      imports: [Contacto],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Contacto);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const mensaje = el.querySelector('textarea') as HTMLTextAreaElement;
    expect(mensaje.value).toBe('Hola, estoy interesado en el Sedán Modelo X. ¿Sigue disponible?');

    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    expect(el.querySelectorAll('.is-invalid').length).toBeGreaterThan(0);
    expect(el.querySelector('.alert-success')).toBeNull();
  });
});
