import { Component, computed, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  // El menú colapsable se maneja con un signal: no depende del JS de Bootstrap.
  protected readonly abierto = signal(false);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** En /catalogo/:id aparece el botón "Volver" (mockup de detalle). */
  protected readonly enDetalle = computed(() => /^\/catalogo\/[^/?#]+/.test(this.url()));

  protected volver(): void {
    // navigationId > 1 => hay una página anterior dentro de la app
    if ((history.state?.navigationId ?? 0) > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/catalogo');
    }
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }
}
