# Página de tutoriales en vídeo (/tutorials) — 21-oct-2026

Página para aprender a usar Calypso con los shorts grabados en la app. Los shorts se hacen en
`calypso-rootencoder` (método y lista en `docs/SHORTS_TUTORIALES.md` de ese repo).

**Estado:** hecha en la rama `tutoriales`, **PR #14 sin fusionar**. Al fusionar se publica en calypso-app.es.
Antes, pedir permiso a Alcorcón y Alcobendas: sus escudos salen en casi todos los vídeos.

## Qué hay

| Pieza | Dónde |
|---|---|
| Página | `src/components/Tutorials.tsx` (ruta en `src/App.tsx`) |
| Vídeos y portadas | `public/tutorials/NN-nombre.mp4` y `NN-nombre.webp` (19 de cada) |
| Enlaces | «Tutorials» en `Header.tsx` (escritorio y menú del móvil) y tarjeta destacada arriba de `Guides.tsx` |
| SEO | prerender en `scripts/prerender-legal.mjs` (`tutorials.html`) y entrada en `public/sitemap.xml` |

El pie no se toca: Dani no quiere más enlaces ahí.

- **Cinco capítulos:** Get started (1, 3, 24), Your teams (4, 5), A scoreboard for your sport (6, 7, 8, 9, 10, 13, 14),
  Match graphics (15, 16, 17), During the match (20, 25, 26, 29). Los números son los de `SHORTS_TUTORIALES.md`.
- **Tarjeta:** portada vertical, botón de play, duración, distintivo «Pro» (15, 20 y 29) y una línea de qué enseña,
  escrita a partir de los rótulos de cada short.
- **Reproductor:** a pantalla completa, autoplay en bucle y sin sonido (los shorts no llevan audio), anterior y
  siguiente (también con ← →), Esc o clic fuera para cerrar. Cada vídeo tiene su enlace: `/tutorials#football`
  abre directamente ese vídeo. Los capítulos también: `/tutorials#scoreboard`.
- **Cabecera:** titular, «19 videos · about 17 minutes in total» (se calcula solo) y tres portadas en abanico
  (repeticiones, baloncesto y portada del partido; solo en pantallas anchas).
- **Al final:** el botón de Play con campaña `tutorials` y un enlace a /guides.

## Cómo se prepararon los vídeos

```bash
ffmpeg -i NN-nombre.mp4 -an -vf "scale=720:1280:flags=lanczos,fps=30" -c:v libx264 -preset slow -crf 30 \
  -pix_fmt yuv420p -movflags +faststart public/tutorials/NN-nombre.mp4
ffmpeg -ss <segundo> -i NN-nombre.mp4 -frames:v 1 -vf scale=540:960 -c:v libwebp -quality 72 public/tutorials/NN-nombre.webp
```

De 3-16 MB a 0,3-1,2 MB cada uno (14 MB en total); las portadas, unos 17 KB. Solo se descarga el vídeo que se abre.
**La portada tiene que enseñar el resultado** (el marcador, la alineación, la portada en pantalla), no los ajustes: se
eligieron a mano mirando una hoja de fotogramas.

## Para añadir un short

1. Comprimirlo y sacar la portada como arriba.
2. Añadirlo a `CHAPTERS` en `Tutorials.tsx` con `id` (el del enlace), `file`, `title`, `text`, `secs` y `pro` si es
   de pago.
3. `npm run build` y mirar `/tutorials` con `npx vite preview`.

**Pendiente de añadir:** pádel (11) y tenis (12) cuando la 48 esté en producción (enseñan los interruptores nuevos);
los shorts que faltan por grabar en un móvil real (2, 21, 22, 23, 27, 28, 30) y uno del QR del directo.

## Revisado

En local con `vite preview`: escritorio, móvil a 390 px (iframe), el reproductor (autoplay, enlace por vídeo,
anterior/siguiente) y la tarjeta de /guides. `npm run build` compila y prerenderiza `tutorials.html`.
