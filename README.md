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

Cada vehículo tiene una carpeta `public/images/vehiculos/<id>/` (cada una trae un `LEEME.txt`
con el carro que le corresponde). Solo hay que copiar 3 fotos con estos nombres exactos:

```
public/images/vehiculos/1/1.jpg   <- portada (tarjetas) y primera foto del detalle
public/images/vehiculos/1/2.jpg
public/images/vehiculos/1/3.jpg
```

No hay que tocar código: `services/vehiculos.ts` arma las rutas `images/vehiculos/<id>/<n>.jpg`.
Mientras falte una foto se muestra el recuadro gris del mockup.

## Flujo de ramas

- `main`: versión estable (la que se entrega).
- `develop`: integración.
- `feature/fotos-vehiculos`: primera versión de las fotos (integrada).
- `feature/autos-reales`: catálogo con marcas y modelos reales y fotos `.jpg` (integrada).

## Uso de GitHub Pages 
se uso Github Pages para subir la mustra de la pagina web https://verps3.github.io/frontend-automarket/
