import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'AutoMarket | Encuentra tu carro ideal',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'catalogo',
    title: 'Catálogo de vehículos | AutoMarket',
    loadComponent: () => import('./catalogo/catalogo').then((m) => m.Catalogo),
  },
  {
    path: 'catalogo/:id',
    title: 'Detalle del vehículo | AutoMarket',
    loadComponent: () =>
      import('./detalle-vehiculo/detalle-vehiculo').then((m) => m.DetalleVehiculo),
  },
  {
    path: 'financiamiento',
    title: 'Simula tu financiamiento | AutoMarket',
    loadComponent: () => import('./financiamiento/financiamiento').then((m) => m.Financiamiento),
  },
  {
    path: 'contacto',
    title: 'Contactar vendedor | AutoMarket',
    loadComponent: () => import('./contacto/contacto').then((m) => m.Contacto),
  },
  {
    path: 'cotizar',
    title: 'Solicita tu cotización | AutoMarket',
    loadComponent: () => import('./cotizar/cotizar').then((m) => m.Cotizar),
  },
  { path: '**', redirectTo: '' },
];
