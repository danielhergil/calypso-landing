# Calypso Landing: Payments Frontend Status and Backlog (2026-05-15)

## Resumen ejecutivo

- El backend de pagos ya existe en repo separado (`../calypso-backend`) y está desplegado en Cloud Run.
- La landing actual muestra pricing comercial, pero no integra checkout real ni estado de suscripción.
- El envío de invoices por email no se implementa en frontend: lo gestiona Stripe Billing automáticamente cuando está configurado en Dashboard.

## Estado actual en este repo (`calypso-landing`)

### Implementado

- Sección de precios comercial con Basic/Pro/Max y límites:
  - [Pricing.tsx](/C:/Github/calypso-landing/src/components/Pricing.tsx)
- Configuración base de Firebase para Firestore:
  - [firebase.ts](/C:/Github/calypso-landing/src/firebase.ts)
- Documentación comercial y técnica de planes:
  - [PAID_PLANS_COMMERCIAL_AND_BILLING.md](/C:/Github/calypso-landing/docs/PAID_PLANS_COMMERCIAL_AND_BILLING.md)
  - [STRIPE_CLOUD_RUN_BACKEND_IMPLEMENTATION.md](/C:/Github/calypso-landing/docs/STRIPE_CLOUD_RUN_BACKEND_IMPLEMENTATION.md)

### No implementado (bloqueante para cobro real desde web)

- No hay login Firebase Auth en la web para obtener ID token.
- No hay cliente HTTP para llamar al backend de billing.
- Los botones `Choose Pro` y `Choose Max` no hacen checkout (solo UI).
- No existe sección "Mi cuenta" para:
  - plan actual;
  - estado de suscripción;
  - renovación;
  - botón de portal Stripe.
- No hay pantallas `success/cancel` para retorno de checkout.

## Backend objetivo a consumir desde esta web

- Base URL actual (Cloud Run): `https://calypso-api-994004855188.europe-west1.run.app`
- Endpoints para frontend:
  - `POST /v1/billing/checkout-session`
  - `POST /v1/billing/portal-session`
  - `GET /v1/billing/me`
  - `GET /v1/account/me`
- Requisito: `Authorization: Bearer <Firebase ID token>`

## Sobre invoices por email

- No hay que desarrollarlo en frontend.
- Debe estar activado en Stripe Dashboard (Billing emails).
- Backend ya guarda eventos `invoice.paid` y `invoice.payment_failed`.

## Backlog recomendado en frontend (ordenado)

## Fase A - Integración mínima de checkout

1. Crear `VITE_API_BASE_URL` y cliente API.
2. Integrar Firebase Auth (signin simple Google/email).
3. Conectar botones de Pro/Max a `checkout-session`.
4. Redirigir al `url` que devuelve backend.

## Fase B - Área de cuenta

1. Crear pantalla/componente "Mi cuenta".
2. Leer `GET /v1/account/me` y `GET /v1/billing/me`.
3. Mostrar plan/estado/renovación.
4. Botón "Gestionar suscripción" -> `portal-session`.

## Fase C - UX y operación

1. Rutas `/billing/success` y `/billing/cancel`.
2. Manejo de errores (token expirado, 401, 429, 500).
3. Telemetría de conversiones (click checkout, checkout started, return success).

## Variables frontend pendientes

- `VITE_API_BASE_URL` (Cloud Run URL)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Criterio de "listo para producción web"

- Desde la landing, usuario autenticado puede iniciar checkout Pro/Max.
- Tras pago, backend sincroniza estado y la web refleja plan actualizado.
- Usuario puede abrir portal de Stripe para cancelación/cambios.
- Eventos `invoice.*` se registran y Stripe envía emails automáticamente.
