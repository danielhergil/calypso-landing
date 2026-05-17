# Calypso Cloud Run Backend: Secure Implementation Plan (Web + Android)

## Objetivo

Implementar un backend en Google Cloud Run que:

1. soporte facturacion/suscripciones (Stripe) para la web;
2. sea autoridad de planes (`basic | pro | max`) y limites;
3. quede preparado para recibir peticiones extra desde la app Android de forma segura.

Este plan es ejecutable por fases para minimizar riesgo en produccion.

## Alcance inicial (v1)

- Backend Node.js + TypeScript en `backend/`.
- API versionada: `/v1/...`.
- Integracion Stripe (checkout, portal, webhooks).
- Integracion Firebase Auth (ID token) para endpoints privados.
- Firestore como fuente de verdad de cuenta + billing.
- Endpoints base para validaciones/operaciones futuras desde Android.

## Principios de seguridad

- Secretos solo en Secret Manager (nunca en cliente ni en repo).
- Autenticacion obligatoria en endpoints privados con Firebase ID token.
- Autorizacion por rol/ownership en backend (no confiar en payload cliente).
- Webhooks con validacion de firma e idempotencia por `event.id`.
- Rate limiting por IP + UID para evitar abuso.
- CORS restringido a dominios conocidos (web), sin wildcard.
- Logging estructurado sin datos sensibles (no tokens, no secrets).

## Arquitectura objetivo

- `Vercel Web` y `Android App` llaman al backend Cloud Run.
- `Cloud Run API` valida auth, aplica reglas de negocio y escribe en Firestore.
- `Stripe` solo habla con endpoint webhook publico.
- `Firestore` guarda estado de cuenta/suscripcion/uso.
- `Secret Manager` almacena secretos Stripe y claves internas.

## Estructura propuesta del backend

```txt
backend/
  src/
    main.ts
    config/
      env.ts
    middleware/
      auth.ts
      appCheck.ts
      rateLimit.ts
      requestId.ts
    routes/
      health.ts
      billing.ts
      account.ts
      android.ts
    services/
      stripe.ts
      billingSync.ts
      firestoreUsers.ts
      usageGuard.ts
    utils/
      idempotency.ts
      logger.ts
      errors.ts
    types/
      billing.ts
      auth.ts
  package.json
  tsconfig.json
  Dockerfile
```

## Modelo de autenticacion por cliente

### Web

- `Authorization: Bearer <Firebase ID token>`.
- Validacion en middleware `auth.ts`.
- CORS permitido solo para dominio(s) de landing/app web.

### Android

- Igual que web: `Authorization: Bearer <Firebase ID token>`.
- Recomendado adicional:
  - Firebase App Check (Play Integrity) obligatorio en endpoints `android/*`;
  - cabecera `X-Client-Platform: android` para trazabilidad.
- Opcional futuro: bloqueo por version minima de app para endpoints sensibles.

## Endpoints v1 (billing + base app)

### Publico

- `POST /v1/billing/webhook/stripe`
  - valida firma Stripe;
  - procesa eventos idempotentes;
  - sincroniza `users/{uid}` y auditoria.

### Privados (web + android)

- `GET /v1/account/me`
  - devuelve snapshot de cuenta, plan y estado.

- `POST /v1/billing/checkout-session`
  - body: `{ "plan": "pro" | "max" }`
  - respuesta: `{ "url": "..." }`

- `POST /v1/billing/portal-session`
  - respuesta: `{ "url": "..." }`

- `GET /v1/billing/me`
  - snapshot de suscripcion/billing del usuario.

### Privados (android-first, preparados para checks extra)

- `POST /v1/android/preflight`
  - valida auth + App Check + estado de cuenta.
  - respuesta: capacidades permitidas por plan (`canSyncExternalBroadcast`, cuotas, etc).
  - uso: comprobaciones previas antes de operaciones costosas/sensibles.

- `POST /v1/android/ops/validate`
  - endpoint generico para validaciones puntuales de negocio (feature gates, cuotas).
  - respuesta tipada con `allowed`, `reason`, `limits`.

Nota: estos endpoints permiten agregar logica sin tocar reglas de Firestore cliente en cada caso.

## Datos y reglas en Firestore

En `users/{uid}` mantener:

- `accountType`: `basic | pro | max`
- `billingProvider`
- `billingCustomerId`
- `subscriptionId`
- `subscriptionStatus`
- `subscriptionCurrentPeriodStart`
- `subscriptionCurrentPeriodEnd`
- `cancelAtPeriodEnd`
- `priceId`
- `priceLookupKey`
- `updatedAt`

Subcolecciones:

- `users/{uid}/billing_events/{eventId}` (auditoria)
- `users/{uid}/usage/{YYYY-MM}` (contadores mensuales por tipo de operacion)

Reglas:

- cliente no puede escribir campos `billing*`, `subscription*`, `price*`, `accountType`.
- backend/admin como unico escritor de esos campos.

## Controles de abuso y robustez

- Rate limit por ruta:
  - `checkout-session`: estricto;
  - `preflight/validate`: medio;
  - webhook: solo confianza en firma, sin auth de usuario.
- Idempotencia:
  - clave por `event.id` en webhooks;
  - para operaciones cliente sensibles, aceptar `Idempotency-Key`.
- Reintentos seguros:
  - respuestas 5xx solo en errores transitorios;
  - evitar duplicar side effects.

## Variables de entorno (backend)

- `NODE_ENV`
- `PORT`
- `APP_BASE_URL`
- `WEB_ALLOWED_ORIGINS`
- `FIREBASE_PROJECT_ID`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_PRO_MONTHLY`
- `STRIPE_PRICE_ID_MAX_MONTHLY`
- `STRIPE_BILLING_PORTAL_CONFIGURATION_ID` (opcional)
- `REQUIRE_APP_CHECK_ANDROID` (`true|false`)
- `MIN_ANDROID_VERSION_CODE` (opcional)

## Plan de implementacion por fases

## Fase 0 - Base segura

1. Crear `backend/` con Express/Fastify + TypeScript.
2. Configurar middlewares: `requestId`, `auth`, `rateLimit`, `errorHandler`.
3. Endpoint `GET /healthz` y `GET /readyz`.
4. Dockerfile y build local.

Criterio de salida:
- API arranca en local y responde health checks.

## Fase 1 - Billing core

1. Implementar `POST /v1/billing/checkout-session`.
2. Implementar `POST /v1/billing/portal-session`.
3. Implementar `GET /v1/billing/me`.
4. Implementar mapeo `priceId -> accountType`.

Criterio de salida:
- usuario autenticado puede iniciar checkout y abrir portal.

## Fase 2 - Webhooks + sincronizacion

1. Implementar `POST /v1/billing/webhook/stripe`.
2. Validar firma Stripe.
3. Idempotencia por `event.id`.
4. Escritura transaccional en Firestore + auditoria.

Criterio de salida:
- cambios de suscripcion se reflejan correctamente en `users/{uid}`.

## Fase 3 - Android readiness

1. Implementar `POST /v1/android/preflight`.
2. Implementar `POST /v1/android/ops/validate`.
3. Integrar verificacion App Check para rutas `android/*`.
4. Añadir control opcional de version minima.

Criterio de salida:
- Android puede consultar permisos/limites y recibir decision de backend confiable.

## Fase 4 - Hardening y operacion

1. Revisar `firestore.rules` para bloquear campos de billing.
2. CORS estricto + limites de rate por endpoint.
3. Logging estructurado + alertas en errores webhook.
4. Runbook operativo (reintentos, resync, incidencias).

Criterio de salida:
- backend listo para produccion con controles operativos minimos.

## Despliegue en Cloud Run (resumen)

1. Crear servicio `calypso-api` (Node 20).
2. Service account con permisos minimos:
  - Firestore User,
  - Secret Manager Secret Accessor,
  - Cloud Logging Writer.
3. Configurar secrets como env vars desde Secret Manager.
4. Configurar URL webhook Stripe publica.
5. Configurar autoscaling inicial:
  - `min instances = 0` (coste bajo) o `1` (latencia menor),
  - `max instances` segun trafico esperado.

## Testing minimo antes de produccion

- Billing:
  - alta Pro/Max;
  - upgrade;
  - downgrade fin de ciclo;
  - cancel at period end;
  - payment failed.
- Android:
  - token valido/invalido;
  - App Check valido/invalido;
  - plan basic/pro/max y validacion de capacidades.
- Seguridad:
  - CORS bloquea origen no permitido;
  - cliente no puede alterar `accountType` en Firestore;
  - webhook sin firma valida es rechazado.

## Entregables en este repo (siguientes pasos)

1. Scaffold de `backend/` con rutas/middleware base.
2. Implementacion endpoints billing v1.
3. Implementacion endpoints android v1 (`preflight`, `ops/validate`).
4. Ajustes de `docs/firestore.rules` para blindar campos de billing.
5. Guia de despliegue Cloud Run con comandos.
