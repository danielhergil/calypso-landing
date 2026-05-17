# Android - Reglas Firebase/Billing para acceso YouTube API

## Objetivo
Definir reglas claras para la app Android sobre cómo validar si un usuario tiene acceso a funcionalidades ligadas a plan (por ejemplo `external_broadcast_sync`) usando el estado de billing sincronizado en Firebase.

## Fuente de verdad
La fuente de verdad de permisos es el documento:

- `users/{uid}` (campos top-level escritos por backend/webhooks de Stripe)

No usar como fuente de verdad para permisos:

- `users/{uid}.billingClient.*` (snapshot cliente, puede estar desfasado)

## Campo principal para autorización
Campo clave:

- `users/{uid}.accountType`

Mapeo actual de acceso:

- `basic` -> sin acceso a `external_broadcast_sync`
- `pro` -> con acceso
- `max` -> con acceso

## Qué revisar para YouTube API (orden recomendado)
1. Leer `accountType` en top-level de `users/{uid}`.
2. Resolver capacidades según plan:
   - `basic`: `canSyncExternalBroadcast=false`
   - `pro|max`: `canSyncExternalBroadcast=true`
3. Aplicar el gate de operación usando esa capacidad.

## Campos complementarios (UI/estado, no gate principal)
Estos campos son útiles para mostrar estado al usuario, pero no deben sustituir `accountType` para permisos:

- `subscriptionStatus`
- `cancelAtPeriodEnd`
- `subscriptionCurrentPeriodEnd`

Interpretación típica:

- `subscriptionStatus="active"` + `cancelAtPeriodEnd=true`:
  - El usuario mantiene acceso hasta `subscriptionCurrentPeriodEnd`.
  - No habrá renovación al terminar el período.
- Al finalizar período, Stripe emite webhooks (`customer.subscription.updated/deleted`) y backend debe pasar cuenta a `basic`.

## Regla de arquitectura recomendada para Android
No tomar decisiones finales de permisos solo en cliente.

Usar backend como autoridad:

- `POST /v1/android/preflight`
- `POST /v1/android/ops/validate`

La app debe respetar:

- `allowed`
- `capabilities`
- `reason` (si existe)

## Caso real validado
Caso de cancelación al fin de período:

- `accountType: "pro"`
- `subscriptionStatus: "active"`
- `cancelAtPeriodEnd: true`
- `subscriptionCurrentPeriodEnd: <fecha fin>`

Este estado es correcto: el usuario sigue con acceso hasta fin de ciclo, luego debe migrar a `basic` por webhook.

## Checklist rápido de implementación Android
1. Antes de operación YouTube API sensible, llamar `ops/validate`.
2. Si `allowed=false`, bloquear acción y mostrar `reason`.
3. Si `allowed=true`, permitir ejecución.
4. Usar Firestore top-level (`users/{uid}`) solo como apoyo visual/estado local.
5. Ignorar `billingClient` para lógica de permisos.
