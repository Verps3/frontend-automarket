# Guía de sustentación – AutoMarket

## 1. Requisitos y dónde se cumplen

| Requisito | Evidencia en el proyecto |
| --- | --- |
| Repositorio (commits, 2 ramas) | `git log --oneline --graph --all`; ramas `main`, `develop`, `feature/fotos-vehiculos` |
| Mínimo 6 componentes (1 de detalle) | `Navbar`, `Footer`, `Home`, `Catalogo`, `VehiculoCard`, `Contacto`, `Cotizar`, `Financiamiento` y **`DetalleVehiculo`** (detalle) |
| Rutas dinámicas | `catalogo/:id` en `app.routes.ts`; el `id` llega al componente con `input.required<string>()` gracias a `withComponentInputBinding()` en `app.config.ts`. Además `?vehiculo=<id>` (query param) en contacto, cotizar y financiamiento |
| Inglés (hablar, mín. 20 s) | Puntos para hablar en la sección 3 |
| Interfaces y servicios | Sección 2 |
| Responsive | Bootstrap 5 (`container-xl`, `row-cols-*`, `col-lg-*`); probar en el navegador con F12 → modo móvil |

## 2. Interfaces y servicios (qué explicar)

**Interfaz (`Vehiculo`, en `services/vehiculos.ts`)**
- Es un contrato de TypeScript: describe la forma de los datos (`id`, `nombre`, `precio`, `imagenes`…).
- Solo existe al compilar, no genera código en el navegador. Sirve para que el editor y el compilador detecten errores
  (por ejemplo, escribir `v.presio` no compila).
- Los tipos `Carroceria`, `Transmision` y `Combustible` son uniones de literales: solo permiten valores válidos.
- Se usa en todas partes: el servicio devuelve `Vehiculo`, `VehiculoCard` recibe `input.required<Vehiculo>()`.

**Servicio (`Vehiculos`)**
- Clase con `@Injectable({ providedIn: 'root' })`: Angular crea **una sola instancia** para toda la app.
- Los componentes lo piden con `inject(Vehiculos)`; así `Home`, `Catalogo` y `DetalleVehiculo` comparten los mismos datos
  y la lógica (`porId`, `destacados`, `relacionados`, `marcas`, `anios`) no se repite en cada componente.
- Es un **servicio mock**: los datos están en memoria (`FILAS`). Como los componentes solo conocen los métodos del
  servicio, para pasar a una API real solo se cambia el servicio (`HttpClient` + `Observable`), no los componentes.

**Idea para el bonus (API externa):** cambiar `lista` por una llamada `http.get<Vehiculo[]>(url)` y consumirla con `toSignal`.

## 3. Inglés: puntos para hablar (no leer)

Practica decir cada idea con tus palabras; con 4 ideas pasas fácilmente los 20 segundos.

1. *"Hi, I'm … and this is AutoMarket, a web app to buy used cars."*
2. *"I built it with Angular and Bootstrap, and it has nine components, like the navbar, the catalog and the vehicle detail."*
3. *"The detail page uses a dynamic route: the id in the URL tells the app which car to show."*
4. *"I used an interface to describe a vehicle and a service with mock data to share it between components."*
5. *"The layout is responsive, so it works on phones and on desktop."*

Vocabulario útil: component, route, service, interface, mock data, responsive, catalog, detail page, branch, commit.

## 4. Presentación responsive

Antes de entregar, abrir `npm start` y revisar con F12 → modo dispositivo: iPhone SE (375 px), iPad (768 px) y escritorio (1280 px)
en `/`, `/catalogo`, `/catalogo/1`, `/contacto`, `/cotizar` y `/financiamiento`.
