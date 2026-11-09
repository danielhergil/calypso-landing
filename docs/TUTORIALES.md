# Página de tutoriales en vídeo (/tutorials) — 21-oct-2026

Página para aprender a usar Calypso con los shorts grabados en la app. Los shorts se hacen en
`calypso-rootencoder` (método y lista en `docs/SHORTS_TUTORIALES.md` de ese repo).

**Estado:** publicada (PR #14). El 9-nov-2026 se cambiaron los vídeos por los regrabados con un partido de fondo y
los estilos nuevos (rama `tutoriales-regrabados`; el detalle, en `calypso-rootencoder/docs/TUTORIALES_SESSION_RECAP_2026-11-08.md`).
Sigue pendiente pedir permiso a Alcorcón y Alcobendas: sus escudos salen en casi todos los vídeos.

## Qué hay

| Pieza | Dónde |
|---|---|
| Página | `src/components/Tutorials.tsx` (ruta en `src/App.tsx`) |
| Vídeos y portadas | `public/tutorials/NN-nombre.mp4` y `NN-nombre.webp` (16 de cada) |
| Enlaces | «Tutorials» en `Header.tsx` (escritorio y menú del móvil) y tarjeta destacada arriba de `Guides.tsx` |
| SEO | prerender en `scripts/prerender-legal.mjs` (`tutorials.html`) y entrada en `public/sitemap.xml` |

El pie no se toca: Dani no quiere más enlaces ahí.

- **Cinco capítulos:** Get started (1, 3, 24), Your teams (4, 5), A scoreboard for your sport (6, 8, 10, 13),
  Match graphics (15, 16, 17), During the match (20, 25, 26, 29). Los números son los de `SHORTS_TUTORIALES.md`.
- **Tarjeta:** portada vertical, botón de play, duración, distintivo «Pro» (15, 20 y 29) y una línea de qué enseña,
  escrita a partir de los rótulos de cada short.
- **Reproductor:** a pantalla completa, autoplay en bucle y sin sonido (los shorts no llevan audio), anterior y
  siguiente (también con ← →), Esc o clic fuera para cerrar. Cada vídeo tiene su enlace: `/tutorials#football`
  abre directamente ese vídeo. Los capítulos también: `/tutorials#scoreboard`.
- **Cabecera:** titular, «16 videos · about 14 minutes in total» (se calcula solo) y tres portadas en abanico
  (repeticiones, baloncesto y portada del partido; solo en pantallas anchas).
- **Al final:** el botón de Play con campaña `tutorials` y un enlace a /guides.

## Cómo se prepararon los vídeos

```bash
ffmpeg -i NN-nombre.mp4 -an -vf "scale=720:1280:flags=lanczos,fps=30" -c:v libx264 -preset slow -crf 30 \
  -pix_fmt yuv420p -movflags +faststart public/tutorials/NN-nombre.mp4
ffmpeg -ss <segundo> -i NN-nombre.mp4 -frames:v 1 -vf scale=540:960 -c:v libwebp -quality 72 public/tutorials/NN-nombre.webp
```

De 3-16 MB a 0,3-1,9 MB cada uno. Los tres con el partido de baloncesto de fondo (8, 10 y 13) se comprimen además
con `-maxrate 1M -bufsize 2M` (igual que el 6), porque la pista exterior se mueve mucho: aun así pesan 2,3-4,9 MB; las portadas, unos 17 KB. Solo se descarga el vídeo que se abre.
**La portada tiene que enseñar el resultado** (el marcador, la alineación, la portada en pantalla), no los ajustes: se
eligieron a mano mirando una hoja de fotogramas.

## Para añadir un short

1. Comprimirlo y sacar la portada como arriba.
2. Añadirlo a `CHAPTERS` en `Tutorials.tsx` con `id` (el del enlace), `file`, `title`, `text`, `secs` y `pro` si es
   de pago.
3. `npm run build` y mirar `/tutorials` con `npx vite preview`.

**Quitados el 9-nov:** futsal (7), balonmano (9) y otro deporte (14), porque funcionan igual que fútbol (lo dice la
tarjeta de fútbol). Los vídeos con un estilo Pro de fondo (5, 13, 16, 17) **no** llevan el distintivo «Pro»: la
función es gratis y el propio vídeo pone «(Pro)» en el paso del estilo.

**Pendiente de añadir:** pádel (11) y tenis (12), que siguen grabados con el salón (regrabarlos con un partido); los
shorts que faltan por grabar en un móvil real (por prioridad: 23 reconexión, 27 cámara USB, 28 cámara remota; luego
21, 22) y uno del QR del directo.

## Revisado

En local con `vite preview`: escritorio, móvil a 390 px (iframe), el reproductor (autoplay, enlace por vídeo,
anterior/siguiente) y la tarjeta de /guides. `npm run build` compila y prerenderiza `tutorials.html`.
