# AutoMarket (frontend)

Angular 22 + Bootstrap 5.3, con las mismas convenciones que `frontend-mascotas`
(componentes standalone, `@for`, Bootstrap cargado desde `angular.json`).

## Pantallas (según los mockups)

| Ruta              | Componente        | Mockup                   |
| ----------------- | ----------------- | ------------------------ |
| `/`               | `Home`            | Inicio                   |
| `/catalogo`       | `Catalogo`        | Catálogo de vehículos    |
| `/catalogo/:id`   | `DetalleVehiculo` | Detalle del vehículo     |
| `/contacto`       | `Contacto`        | Contactar vendedor       |
| `/cotizar`        | `Cotizar`         | Solicita tu cotización   |
| `/financiamiento` | `Financiamiento`  | Simula tu financiamiento |

Compartidos: `Navbar`, `Footer`, `VehiculoCard`, el servicio `Vehiculos` (datos de ejemplo)
y los pipes `cop` / `km`.

`/contacto`, `/cotizar` y `/financiamiento` aceptan `?vehiculo=<id>` para precargar el vehículo.

## Comandos

```bash
npm install
npm start        # http://localhost:4200
npm test
npm run build
```

## Fotos de los vehículos

Cada vehículo tiene 3 fotos en `public/images/vehiculos/<id>/1..3.svg` (la 1 es la portada
de las tarjetas y las 3 forman la galería del detalle). Son ilustraciones generadas con
`python3 scripts/generar-imagenes.py`, que respetan la carrocería y el color de cada carro.

Para usar fotos reales: copia `1.jpg`, `2.jpg`, `3.jpg` en cada carpeta `<id>` y cambia
`EXTENSION_FOTO` a `'jpg'` en `src/app/services/vehiculos.ts`. No hay que tocar ningún componente.

## Flujo de ramas

- `main`: versión estable (la que se entrega).
- `develop`: integración.
- `feature/fotos-vehiculos`: fotos de los carros (ya integrada en `develop` y `main`).

## Pendiente para conectar con backend

- `src/app/services/vehiculos.ts`: reemplazar `VEHICULOS` por llamadas HTTP (`HttpClient`).
- `Contacto.enviar()` y `Cotizar.enviar()`: hoy solo validan y muestran confirmación
  (hay un `TODO` con el endpoint).
