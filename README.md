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

## Pendiente para conectar con backend

- `src/app/services/vehiculos.ts`: reemplazar `VEHICULOS` por llamadas HTTP (y llenar `imagenes`).
- `Contacto.enviar()` y `Cotizar.enviar()`: hoy solo validan y muestran confirmación
  (hay un `TODO` con el endpoint).
