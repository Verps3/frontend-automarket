import { Component, computed, inject, signal } from '@angular/core';
import { Vehiculos } from '../services/vehiculos';
import { VehiculoCard } from '../vehiculo-card/vehiculo-card';

interface Rango {
  id: string;
  etiqueta: string;
  cumple: (valor: number) => boolean;
}

type Campo = 'busqueda' | 'marca' | 'precio' | 'km' | 'anio';

const normalizar = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

@Component({
  imports: [VehiculoCard],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {
  private readonly servicio = inject(Vehiculos);

  protected readonly porPagina = 6;

  protected readonly marcas = this.servicio.marcas();
  protected readonly anios = this.servicio.anios();

  protected readonly rangosPrecio: Rango[] = [
    { id: 'a', etiqueta: 'Hasta $ 70.000.000', cumple: (n) => n <= 70_000_000 },
    { id: 'b', etiqueta: '$ 70.000.000 a $ 100.000.000', cumple: (n) => n > 70_000_000 && n <= 100_000_000 },
    { id: 'c', etiqueta: 'Más de $ 100.000.000', cumple: (n) => n > 100_000_000 },
  ];

  protected readonly rangosKm: Rango[] = [
    { id: 'a', etiqueta: 'Hasta 20.000 km', cumple: (n) => n <= 20_000 },
    { id: 'b', etiqueta: '20.000 a 60.000 km', cumple: (n) => n > 20_000 && n <= 60_000 },
    { id: 'c', etiqueta: 'Más de 60.000 km', cumple: (n) => n > 60_000 },
  ];

  protected readonly busqueda = signal('');
  protected readonly marca = signal('');
  protected readonly precio = signal('');
  protected readonly km = signal('');
  protected readonly anio = signal('');
  protected readonly pagina = signal(1);

  protected readonly filtrados = computed(() => {
    const q = normalizar(this.busqueda());
    const rPrecio = this.rangosPrecio.find((r) => r.id === this.precio());
    const rKm = this.rangosKm.find((r) => r.id === this.km());

    return this.servicio.lista.filter(
      (v) =>
        (!q || normalizar(`${v.nombre} ${v.carroceria}`).includes(q)) &&
        (!this.marca() || v.marca === this.marca()) &&
        (!rPrecio || rPrecio.cumple(v.precio)) &&
        (!rKm || rKm.cumple(v.kilometraje)) &&
        (!this.anio() || v.anio === Number(this.anio())),
    );
  });

  protected readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.filtrados().length / this.porPagina)),
  );

  protected readonly paginas = computed(() =>
    Array.from({ length: this.totalPaginas() }, (_, i) => i + 1),
  );

  protected readonly visibles = computed(() => {
    const inicio = (this.pagina() - 1) * this.porPagina;
    return this.filtrados().slice(inicio, inicio + this.porPagina);
  });

  protected readonly hayFiltros = computed(
    () => !!(this.busqueda() || this.marca() || this.precio() || this.km() || this.anio()),
  );

  protected cambiar(campo: Campo, evento: Event): void {
    this[campo].set((evento.target as HTMLInputElement | HTMLSelectElement).value);
    this.pagina.set(1);
  }

  protected limpiar(): void {
    for (const c of ['busqueda', 'marca', 'precio', 'km', 'anio'] as Campo[]) this[c].set('');
    this.pagina.set(1);
  }

  protected irA(n: number): void {
    if (n < 1 || n > this.totalPaginas()) return;
    this.pagina.set(n);
    document.getElementById('listado')?.scrollIntoView();
  }
}
