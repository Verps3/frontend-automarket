#!/usr/bin/env python3
"""Genera public/images/vehiculos/<id>/<n>.svg (3 fotos por vehículo).

Cada ilustración respeta la carrocería y el color del vehículo definidos en
src/app/services/vehiculos.ts. Para usar fotos reales basta con reemplazar los
archivos (ver README, sección "Fotos de los vehículos").

Uso:  python3 scripts/generar-imagenes.py
"""
from pathlib import Path

SALIDA = Path(__file__).resolve().parent.parent / "public" / "images" / "vehiculos"

# (id, carrocería, color) en el mismo orden que FILAS de vehiculos.ts
VEHICULOS = [
    ("Sedán", "Gris Titanio"), ("SUV", "Negro Obsidiana"), ("Hatchback", "Rojo Rubí"),
    ("Pickup", "Blanco Glaciar"), ("Coupé", "Azul Medianoche"), ("Sedán", "Plata Lunar"),
    ("SUV", "Verde Pino"), ("Hatchback", "Blanco"), ("Sedán", "Gris Grafito"),
    ("Pickup", "Gris Acero"), ("SUV", "Blanco Perla"), ("Coupé", "Naranja Solar"),
    ("Hatchback", "Azul Cobalto"), ("Sedán", "Negro"), ("SUV", "Beige Arena"),
    ("Pickup", "Blanco"), ("Sedán", "Azul Acero"), ("Coupé", "Rojo Carmesí"),
    ("Hatchback", "Amarillo"), ("SUV", "Gris Titanio"), ("Sedán", "Plata"),
    ("Pickup", "Negro"), ("Hatchback", "Gris Claro"), ("SUV", "Verde Oliva"),
]

COLORES = {
    "Gris Titanio": "#8a8f98", "Negro Obsidiana": "#15171c", "Rojo Rubí": "#b3122b",
    "Blanco Glaciar": "#f1f4f7", "Azul Medianoche": "#14213d", "Plata Lunar": "#b9bec6",
    "Verde Pino": "#1f4d3a", "Blanco": "#f3f3f1", "Gris Grafito": "#4a4d54",
    "Gris Acero": "#6b7280", "Blanco Perla": "#eceae4", "Naranja Solar": "#e8691c",
    "Azul Cobalto": "#1f56c4", "Negro": "#1a1a1a", "Beige Arena": "#cdb891",
    "Azul Acero": "#4a6b8a", "Rojo Carmesí": "#a3112a", "Amarillo": "#f2c200",
    "Plata": "#c4c8cf", "Gris Claro": "#c9cdd3", "Verde Oliva": "#6b7a3a",
}

# Siluetas (vista lateral, frente a la derecha). Lienzo 800x500, suelo en y=412.
# body: carrocería; glass: ventanas; ruedas: (x1, x2, radio); luces: (x faro, x piloto)
FORMAS = {
    "Sedán": dict(
        body="M80 370 L80 305 Q80 292 100 290 L215 286 L290 208 Q300 203 320 203 L490 203 Q512 203 528 220 L592 286 L690 298 Q722 303 722 335 L722 370 Z",
        glass=["M226 284 L292 222 L403 222 L403 284 Z", "M418 284 L418 222 L486 222 L552 284 Z"],
        ruedas=(225, 575, 50), puertas=[410], 
    ),
    "SUV": dict(
        body="M85 370 L85 250 Q85 214 118 200 L152 191 L510 191 Q532 191 546 207 L612 282 L690 296 Q724 301 724 335 L724 370 Z",
        glass=["M138 282 L150 208 L300 208 L300 282 Z", "M315 282 L315 208 L503 208 L568 282 Z"],
        ruedas=(225, 580, 54), puertas=[308],
    ),
    "Hatchback": dict(
        body="M85 370 L85 285 Q85 268 102 262 L172 206 Q184 198 205 198 L478 198 Q503 198 519 216 L590 284 L686 297 Q720 302 720 335 L720 370 Z",
        glass=["M188 262 L222 218 L335 218 L335 262 Z", "M350 262 L350 218 L474 218 L540 262 Z"],
        ruedas=(220, 570, 48), puertas=[342],
    ),
    "Pickup": dict(
        body="M70 370 L70 268 L282 268 L282 252 L330 204 Q342 194 362 194 L470 194 Q496 194 511 210 L562 262 L602 275 L692 290 Q726 295 726 335 L726 370 Z M80 268 L80 282 L272 282 L272 268 Z",
        glass=["M338 260 L374 212 L440 212 L440 260 Z", "M454 260 L454 212 L480 212 L530 260 Z"],
        ruedas=(190, 585, 58), puertas=[447],
    ),
    "Coupé": dict(
        body="M80 370 L80 322 Q80 304 110 300 L232 290 L328 232 Q344 222 370 222 L470 222 Q496 222 516 238 L592 292 L696 305 Q724 310 724 340 L724 370 Z",
        glass=["M258 288 L336 240 L468 240 L536 288 Z"],
        ruedas=(235, 585, 50), puertas=[400],
    ),
}


def sombrear(hexa: str, factor: float) -> str:
    """Oscurece (<1) o aclara (>1) un color #rrggbb."""
    r, g, b = (int(hexa[i:i + 2], 16) for i in (1, 3, 5))
    if factor < 1:
        r, g, b = (int(c * factor) for c in (r, g, b))
    else:
        r, g, b = (int(c + (255 - c) * (factor - 1)) for c in (r, g, b))
    return f"#{r:02x}{g:02x}{b:02x}"


def fondo(variante: int) -> str:
    """Tres escenas: sala de exhibición, atardecer y ciudad de noche."""
    if variante == 1:
        return """
  <rect width="800" height="500" fill="url(#f1)"/>
  <rect y="412" width="800" height="88" fill="#cfd4de"/>
  <rect y="412" width="800" height="3" fill="#b6bccb"/>"""
    if variante == 2:
        return """
  <rect width="800" height="500" fill="url(#f2)"/>
  <circle cx="610" cy="250" r="70" fill="#ffd9a0" opacity=".85"/>
  <path d="M0 360 Q120 290 240 345 T480 330 T800 340 L800 500 L0 500Z" fill="#6b5b7b"/>
  <rect y="412" width="800" height="88" fill="#3b3548"/>
  <rect y="412" width="800" height="3" fill="#554d66"/>"""
    return """
  <rect width="800" height="500" fill="url(#f3)"/>
  <g fill="#1f2a44">
    <rect x="30" y="170" width="70" height="250"/><rect x="110" y="120" width="60" height="300"/>
    <rect x="180" y="210" width="80" height="210"/><rect x="560" y="150" width="70" height="270"/>
    <rect x="640" y="200" width="60" height="220"/><rect x="710" y="110" width="70" height="310"/>
  </g>
  <g fill="#ffd58a" opacity=".7">
    <rect x="45" y="190" width="8" height="10"/><rect x="65" y="230" width="8" height="10"/>
    <rect x="125" y="150" width="8" height="10"/><rect x="145" y="200" width="8" height="10"/>
    <rect x="575" y="180" width="8" height="10"/><rect x="595" y="240" width="8" height="10"/>
    <rect x="725" y="140" width="8" height="10"/><rect x="745" y="210" width="8" height="10"/>
  </g>
  <rect y="412" width="800" height="88" fill="#161b2e"/>
  <rect y="412" width="800" height="3" fill="#2c3552"/>"""


def svg(carroceria: str, color: str, variante: int) -> str:
    forma = FORMAS[carroceria]
    base = COLORES[color]
    oscuro = sombrear(base, 0.62)
    claro = sombrear(base, 1.35)
    x1, x2, r = forma["ruedas"]
    cy = 362
    ruedas = ""
    for cx in (x1, x2):
        ruedas += f"""
  <circle cx="{cx}" cy="{cy}" r="{r + 9}" fill="#12141b"/>
  <circle cx="{cx}" cy="{cy}" r="{r}" fill="#23262f"/>
  <circle cx="{cx}" cy="{cy}" r="{int(r * .62)}" fill="#c9ced8"/>
  <circle cx="{cx}" cy="{cy}" r="{int(r * .62) - 7}" fill="#8e95a3"/>
  <circle cx="{cx}" cy="{cy}" r="9" fill="#3a3f4b"/>"""
    vidrios = "".join(f'<path d="{d}" fill="url(#vidrio)"/>' for d in forma["glass"])
    lineas = "".join(
        f'<path d="M{x} 285 L{x} 365" stroke="{oscuro}" stroke-width="2.5" opacity=".7"/>'
        f'<rect x="{x + 14}" y="298" width="26" height="5" rx="2.5" fill="{oscuro}"/>'
        for x in forma["puertas"]
    )
    espejo = "-1 0 0 1 800 0" if variante == 2 else "1 0 0 1 0 0"
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="{carroceria} {color}">
  <defs>
    <linearGradient id="f1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6fb"/><stop offset="1" stop-color="#d9dde6"/></linearGradient>
    <linearGradient id="f2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d2f66"/><stop offset=".55" stop-color="#e0735a"/><stop offset="1" stop-color="#f6b56b"/></linearGradient>
    <linearGradient id="f3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1020"/><stop offset="1" stop-color="#26335c"/></linearGradient>
    <linearGradient id="brillo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{claro}"/><stop offset=".45" stop-color="{base}"/><stop offset="1" stop-color="{oscuro}"/></linearGradient>
    <linearGradient id="vidrio" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fb4cc"/><stop offset="1" stop-color="#3f5068"/></linearGradient>
  </defs>
  <g transform="matrix({espejo})">{fondo(variante)}
  <ellipse cx="400" cy="414" rx="340" ry="14" fill="#000" opacity=".28"/>
  <path d="{forma["body"]}" fill="url(#brillo)" stroke="{oscuro}" stroke-width="3" stroke-linejoin="round" fill-rule="evenodd"/>
  {vidrios}
  {lineas}
  <circle cx="{x1}" cy="{cy}" r="{r + 12}" fill="#12141b"/>
  <circle cx="{x2}" cy="{cy}" r="{r + 12}" fill="#12141b"/>{ruedas}
  <path d="M700 312 L722 318 L722 336 L700 332 Z" fill="#fff6c8"/>
  <rect x="80" y="318" width="14" height="22" rx="3" fill="#d6283b"/>
  </g>
</svg>
"""


def main() -> None:
    total = 0
    for i, (carroceria, color) in enumerate(VEHICULOS, start=1):
        carpeta = SALIDA / str(i)
        carpeta.mkdir(parents=True, exist_ok=True)
        for n in (1, 2, 3):
            (carpeta / f"{n}.svg").write_text(svg(carroceria, color, n), encoding="utf-8")
            total += 1
    print(f"{total} imágenes generadas en {SALIDA}")


if __name__ == "__main__":
    main()
