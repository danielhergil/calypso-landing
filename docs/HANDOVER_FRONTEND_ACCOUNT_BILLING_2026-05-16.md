# Calypso Landing - Handover (2026-05-16)

## Objetivo cubierto
- Integrar en la landing:
  - login de usuario con Firebase Auth,
  - vista de cuenta/dashboard,
  - visualización de plan actual basado en `accountType`,
  - upgrade a `Pro`/`Max` con Stripe Checkout,
  - gestión/cancelación con Stripe Billing Portal.

## Cambios implementados

### 1) Integración de pagos frontend
- Nuevo cliente API de billing:
  - `src/lib/billingApi.ts`
  - Endpoints usados:
    - `POST /v1/billing/checkout-session`
    - `POST /v1/billing/portal-session`
    - `GET /v1/billing/me`

### 2) Contexto de autenticación cliente
- Soporte de sesión para llamadas al backend:
  - `src/lib/authContext.ts`
  - Lee/guarda `uid` y `idToken` en `localStorage`.
  - Soporta refresco de token desde Firebase Auth (`getFreshClientAuthContext`).

### 3) Firebase inicialización
- Exporta `auth` además de `db`:
  - `src/firebase.ts`

### 4) Dashboard de cuenta en ruta dedicada
- Nueva pantalla `/account`:
  - `src/components/AccountPage.tsx`
- Incluye:
  - Login con Google (`signInWithPopup`).
  - Login con email/password.
  - Checkbox "Remember me" (`local` vs `session` persistence).
  - Sidebar izquierda (Cuenta + Sign Out).
  - Cards de planes (Basic/Pro/Max), selección por click.
  - Botón `Choose` solo para `Pro/Max`.
  - Spinner al lanzar Stripe.
  - Botón `Cancel / Manage` para portal de Stripe.
  - Datos de cuenta (email, accountType, status y role cuando existe en user doc).

### 5) Navegación SPA interna
- Evita hard reload al ir a `/account`:
  - `src/lib/navigation.ts`
  - `src/App.tsx`, `src/components/Header.tsx`, `src/components/BillingResult.tsx`, `src/components/AccountPage.tsx`
- Esto mitigó el problema de pantalla blanca reportado al navegar.

### 6) Resultado de checkout/cancel
- `src/components/BillingResult.tsx`
  - En `success`: polling de `/v1/billing/me` para esperar sync webhook.
  - En `cancel`: redirige a `/account` si hay sesión, o `/` si no.

### 7) Integración UI en landing
- Header actualizado:
  - Botón destacado `Account`.
  - `Download` como enlace normal de navegación.
  - `src/components/Header.tsx`
- Routing por path en app:
  - `src/App.tsx`

### 8) Logs cliente en Firestore (tolerantes a reglas)
- `src/lib/subscriptionLedger.ts`
  - Escrituras de tracking en:
    - `users/{uid}.billingClient`
    - `users/{uid}/subscription_events_client/*`
  - Si Firestore devuelve `Missing or insufficient permissions`, no rompe el flujo de checkout/portal.

## Variables de entorno frontend
- `.env.example` actualizado:
  - `VITE_BILLING_API_BASE_URL`
  - `VITE_CALYPSO_UID` (opcional dev)
  - `VITE_CALYPSO_ID_TOKEN` (opcional dev)
- `.env` local actual:
  - `VITE_BILLING_API_BASE_URL=https://calypso-api-994004855188.europe-west1.run.app`

## Incidencias encontradas y resolución
- `Google login failed` mostrado pese a sesión activa:
  - corregido limpiando mensaje al confirmar usuario autenticado.
- Errores Firestore de permisos en acciones de plan:
  - ahora tolerados en frontend (sin bloquear UX).
- CORS local bloqueando `/portal-session`:
  - resuelto en backend (ver doc de backend).

## Estado actual funcional
- Login Google/email: OK.
- Visualización de `accountType` y estado: OK.
- Selección de plan por card + `Choose`: OK.
- Redirección a Stripe Checkout/Portal: OK (dependiente de backend/CORS/env).
- Retorno cancel -> dashboard si logueado: OK.

## Pendientes recomendados
- Revisar y ajustar reglas Firestore si se desea conservar tracking cliente persistente.
- Eventual refactor para usar router formal (`react-router`) en lugar de routing por `window.location.pathname`.
- Limpiar archivo legacy no usado:
  - `src/components/AccountPanel.tsx` (quedó obsoleto tras migrar a `/account`).

