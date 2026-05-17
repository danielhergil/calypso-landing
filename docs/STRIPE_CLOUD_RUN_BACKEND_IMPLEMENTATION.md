# Stripe Backend Serverless on Google Cloud Run

## Objetivo

Implementar un backend serverless para facturacion SaaS (Stripe) con Firebase Auth + Firestore como fuente de verdad de planes, y dejar una base reutilizable para futuras operaciones sensibles (por ejemplo, YouTube API) desde backend.

Este backend cubre:
- suscripciones mensuales (`basic`, `pro`, `max`),
- upgrades/downgrades/cancelaciones con comportamiento SaaS estandar,
- sincronizacion robusta via webhooks,
- auditoria de eventos,
- base de arquitectura para endpoints futuros de YouTube API.

## Por que backend (y no solo frontend)

No debe hacerse solo en frontend porque:
- claves secretas de Stripe no pueden exponerse en cliente,
- validacion de firma de webhooks requiere servidor,
- cambios de plan/estado deben ser autoridad de backend para evitar manipulacion.

## Arquitectura propuesta

- Frontend (Vercel): landing + login Firebase + area Cuenta.
- Firebase Auth: identidad de usuario.
- Firestore: estado de suscripcion y metadatos de billing en `users/{uid}`.
- Backend Cloud Run (Node/TypeScript): endpoints privados/publicos de billing.
- Stripe: checkout, portal y eventos webhook.
- Secret Manager: secretos de Stripe y claves internas.

Flujo:
1. Usuario autenticado pulsa "Choose Pro/Max".
2. Frontend llama `POST /v1/billing/checkout-session` con Firebase ID token.
3. Backend verifica token, crea/reutiliza `stripeCustomer`, crea checkout session y devuelve URL.
4. Stripe procesa pago y envia webhooks a backend.
5. Backend valida firma webhook y actualiza Firestore de forma idempotente.
6. Frontend lee `users/{uid}` y muestra plan/estado actual.

## Modelo de datos recomendado en Firestore

Documento: `users/{uid}`

Campos de cuenta:
- `accountType`: `basic | pro | max`
- `role`: `admin | user` (si ya existe)

Campos de billing:
- `billingProvider`: `stripe`
- `billingCustomerId`: string
- `subscriptionId`: string
- `subscriptionItemId`: string
- `subscriptionStatus`: `active | trialing | past_due | canceled | incomplete | incomplete_expired | unpaid`
- `subscriptionCurrentPeriodStart`: timestamp
- `subscriptionCurrentPeriodEnd`: timestamp
- `cancelAtPeriodEnd`: boolean
- `canceledAt`: timestamp|null
- `priceId`: string
- `priceLookupKey`: string (`pro_monthly`, `max_monthly`)
- `updatedAt`: timestamp

Subcoleccion de auditoria:
- `users/{uid}/billing_events/{eventId}`
  - `eventType`
  - `created`
  - `livemode`
  - `processedAt`
  - `snapshot` (resumen util, no payload gigante)

Coleccion global opcional para idempotencia:
- `billing_webhook_events/{eventId}`
  - `processedAt`
  - `type`
  - `uid`

## Mapeo de planes

Mapeo por `priceId` Stripe:
- `PRICE_ID_PRO_MONTHLY` -> `accountType = pro`
- `PRICE_ID_MAX_MONTHLY` -> `accountType = max`

Regla:
- si no hay suscripcion activa/trialing => `accountType = basic`.

## Comportamiento SaaS esperado

Upgrade:
- efecto inmediato (`proration_behavior=create_prorations`).

Downgrade:
- aplicar al final del periodo (`cancel_at_period_end=false` + schedule/cambio diferido) o actualizar para siguiente ciclo.

Cancelacion:
- `cancel_at_period_end=true`.
- mantiene beneficios hasta `subscriptionCurrentPeriodEnd`.
- al finalizar ciclo, webhook deja `accountType=basic`.

Pago fallido:
- mantener estado `past_due`/`incomplete` segun Stripe.
- la app decide si degrada acceso inmediatamente o tras grace period.

## Endpoints Cloud Run (v1)

Publico (solo Stripe):
- `POST /v1/billing/webhook/stripe`

Privados (requieren Firebase ID token):
- `POST /v1/billing/checkout-session`
  - body: `{ plan: "pro" | "max" }`
  - devuelve: `{ url }`
- `POST /v1/billing/portal-session`
  - devuelve: `{ url }`
- `GET /v1/billing/me`
  - devuelve snapshot del estado de billing del usuario.

Admin/ops (opcional):
- `POST /v1/billing/sync/:uid` (resync manual desde Stripe)

## Webhooks Stripe a soportar

Minimos:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

Recomendados:
- `customer.subscription.trial_will_end`
- `invoice.finalized`

Reglas de procesamiento:
- validar firma con `STRIPE_WEBHOOK_SECRET`,
- idempotencia por `event.id`,
- escritura transaccional en Firestore,
- logs estructurados por `event.id`, `uid`, `subscriptionId`.

## Seguridad

1. Firestore rules
- mantener `accountType` protegido contra escritura cliente.
- bloquear escritura cliente de todos los campos de billing (`billing*`, `subscription*`, `price*`, `cancelAtPeriodEnd`, etc).
- solo backend/admin puede modificarlos.

2. Cloud Run
- endpoints privados verifican Firebase ID token (`Authorization: Bearer <token>`).
- CORS restringido a dominios de frontend.
- rate limiting basico por IP/uid.

3. Secretos
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` en Secret Manager.
- no usar secretos en `.env` del frontend.

## Estructura de proyecto sugerida (backend)

`/backend`
- `src/main.ts` (Express/Fastify bootstrap)
- `src/config/env.ts`
- `src/middleware/auth.ts` (Firebase token verify)
- `src/routes/billing.ts`
- `src/services/stripe.ts`
- `src/services/billing-sync.ts`
- `src/services/firestore-users.ts`
- `src/utils/idempotency.ts`
- `src/types/billing.ts`
- `Dockerfile`

## Despliegue Cloud Run

1. Crear servicio `calypso-api`.
2. Runtime Node 20.
3. Conectar cuenta de servicio con permisos:
- Firestore User,
- Secret Manager Secret Accessor,
- Cloud Logging Writer.
4. Configurar secrets como variables de entorno.
5. Exponer endpoint HTTPS.
6. Configurar webhook Stripe con URL publica:
- `https://<cloud-run-url>/v1/billing/webhook/stripe`.

## Integracion frontend (cuenta usuario)

En esta web:
- login Firebase,
- seccion "Mi cuenta":
  - plan actual,
  - estado (`active`, `past_due`, etc),
  - renovacion (`subscriptionCurrentPeriodEnd`),
  - botones:
    - "Cambiar a Pro/Max" -> checkout endpoint,
    - "Gestionar suscripcion" -> portal endpoint,
    - "Cancelar" -> via portal (recomendado).

## Observabilidad y soporte

- Logging estructurado en Cloud Run.
- Alertas en errores webhook > umbral.
- Reintentos de Stripe habilitados por defecto.
- Script de reconciliacion diario opcional:
  - revisa suscripciones activas en Stripe y corrige desalineaciones en Firestore.

## Preparado para futuras peticiones YouTube API

Este backend puede ampliarse con un modulo `youtube` para operaciones sensibles o con cuotas compartidas:
- `POST /v1/youtube/...` autenticado,
- uso de OAuth tokens cifrados/gestionados server-side,
- enforcement robusto de cuotas por plan en servidor,
- contadores transaccionales en Firestore (`youtube_usage/{YYYY-MM}`).

Ventaja:
- evita bypass de limites desde cliente,
- centraliza compliance, auditoria y control operativo.

## Checklist de implementacion

1. Crear backend `backend/` con endpoints de billing.
2. Configurar Firebase Admin SDK en backend.
3. Configurar Stripe products/prices (`pro_monthly`, `max_monthly`).
4. Implementar webhooks idempotentes.
5. Actualizar `firestore.rules` para proteger campos de billing.
6. Integrar botones de pricing y area "Mi cuenta" en frontend.
7. Desplegar en Cloud Run + Secrets.
8. Probar en sandbox Stripe con casos:
- alta,
- upgrade,
- downgrade,
- cancel at period end,
- payment failed,
- reactivacion.

## Variables de entorno backend

- `NODE_ENV`
- `PORT`
- `FIREBASE_PROJECT_ID`
- `GOOGLE_APPLICATION_CREDENTIALS` (si aplica)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_PRO_MONTHLY`
- `STRIPE_PRICE_ID_MAX_MONTHLY`
- `STRIPE_BILLING_PORTAL_CONFIGURATION_ID` (opcional)
- `APP_BASE_URL` (frontend)

## Notas de negocio

- `basic` siempre existe sin pago.
- proponer anual mas adelante sin romper modelo (`pro_yearly`, `max_yearly`).
- mantener `accountType` como campo denormalizado para decisiones rapidas en app.

