import { TestBed } from '@angular/core/testing';
import { Cotizar } from './cotizar';

describe('Cotizar', () => {
  it('lista lo que incluye la cotización y no envía vacío', async () => {
    await TestBed.configureTestingModule({ imports: [Cotizar] }).compileComponents();
    const fixture = TestBed.createComponent(Cotizar);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Garantía y seguros');
    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    expect(el.querySelector('.alert-success')).toBeNull();
    expect(el.querySelectorAll('.is-invalid').length).toBe(4);
  });
});
