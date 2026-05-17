# Calypso Paid Plans: Commercial + Billing Base

## Objetivo

Definir una estructura clara de planes para:

1. comunicar valor en la web comercial;
2. alinear límites funcionales en app;
3. preparar integración de pasarela de pago y gestión de suscripciones.

Este documento sirve como referencia de producto y de implementación.

## Planes propuestos

### Basic (Gratis)

Perfil objetivo:
- usuarios que prueban la app;
- uso ocasional o puntual.

Incluye:
- creación de streams de YouTube con límite estricto;
- gestión básica de RTMP keys;
- flujo completo de publicación, con capacidades limitadas.

Límites actuales:
- streams totales: **2**;
- streams por mes: **2**;
- operaciones API/mes: **12** (objetivo de negocio; enforcement robusto pendiente de backend);
- sync de broadcasts externos: **no**.

Valor comercial:
- entrada sin fricción;
- suficiente para validar producto;
- incentivo natural a upgrade.

### Pro

Perfil objetivo:
- creadores y equipos pequeños con actividad regular;
- emisiones recurrentes semanales.

Incluye:
- todo lo de Basic;
- sync de broadcasts externos;
- mayor capacidad operativa mensual.

Límites actuales:
- streams totales: **sin límite**;
- streams por mes: **20**;
- operaciones API/mes: **240**;
- sync de broadcasts externos: **sí**.

Valor comercial:
- plan de trabajo “real” para producción continua;
- reduce fricción operativa frente a Basic.

### Max

Perfil objetivo:
- operaciones intensivas;
- equipos con varios eventos, pruebas y flujos simultáneos.

Incluye:
- todo lo de Pro;
- límites ampliados para volumen alto.

Límites actuales:
- streams totales: **sin límite**;
- streams por mes: **50**;
- operaciones API/mes: **1000**;
- sync de broadcasts externos: **sí**.

Valor comercial:
- capacidad alta;
- preparado para uso intensivo sin cuellos frecuentes.

## Tabla comercial para web

| Feature | Basic | Pro | Max |
|---|---:|---:|---:|
| Streams totales | 2 | Ilimitado | Ilimitado |
| Streams por mes | 2 | 20 | 50 |
| Operaciones API/mes | 12 | 240 | 1000 |
| Sync de broadcasts externos | No | Sí | Sí |
| Soporte prioritario | No | Opcional | Opcional+ |

Nota:
- “Soporte prioritario” es placeholder comercial; definir SLA real antes de publicar.

## Mensajería comercial sugerida (copy base)

Basic:
- “Empieza gratis y publica tus primeros eventos en minutos.”

Pro:
- “Para creadores activos que necesitan publicar de forma constante.”

Max:
- “Máxima capacidad para equipos y operaciones de alto volumen.”

CTA sugeridos:
- Basic: `Empezar gratis`
- Pro: `Elegir Pro`
- Max: `Elegir Max`

## Reglas de upgrade/downgrade recomendadas

Upgrade:
- efecto inmediato tras confirmación de pago.

Downgrade:
- aplicar al final del ciclo de facturación;
- si el usuario excede límites del nuevo plan, bloquear solo nuevas acciones que aumenten consumo (no romper histórico existente).

Cancelación:
- mantener acceso al plan actual hasta fin de ciclo;
- luego pasar a Basic.

## Modelo de datos para suscripciones (web + app)

En `users/{userId}`:
- `accountType`: `basic | pro | max`
- `billingProvider`: `stripe | paddle | ...`
- `billingCustomerId`
- `subscriptionId`
- `subscriptionStatus`: `active | past_due | canceled | trialing | incomplete`
- `subscriptionCurrentPeriodEnd`
- `updatedAt`

Colección recomendada:
- `users/{userId}/billing_events/{eventId}` (auditoría de webhooks e historial)

## Eventos de pasarela a mapear

Mínimos:
- `checkout.completed`
- `invoice.paid`
- `invoice.payment_failed`
- `subscription.updated`
- `subscription.canceled`

Acción:
- actualizar `accountType` y estado de suscripción en backend de forma idempotente.

## Estado actual de seguridad y límites

Situación actual:
- `accountType` está protegido por reglas y no se puede autoelevar desde cliente;
- límites de creación por plan se aplican en cliente;
- cuotas duras de operaciones API mensuales requieren enforcement backend para ser totalmente robustas.

Conclusión:
- comercialmente se puede comunicar la segmentación de planes;
- técnicamente, para facturación a escala y anti-bypass completo, conviene mover enforcement de cuotas a servidor.

## Roadmap recomendado para lanzamiento comercial

Fase 1 (rápida):
1. publicar landing con Basic/Pro/Max y comparativa;
2. habilitar checkout para Pro/Max;
3. sincronizar `accountType` con webhooks;
4. aplicar upgrade/downgrade automático por ciclo.

Fase 2 (robusta):
1. mover enforcement de cuotas API a backend;
2. contadores transaccionales + idempotencia;
3. panel admin de planes y soporte.

## Decisiones pendientes antes de publicar precios

1. precio mensual/anual de Pro y Max;
2. si habrá trial en Pro;
3. política de soporte por plan (SLA);
4. límites definitivos (si ajustar 20/50 y 240/1000 tras métricas reales);
5. impuesto/IVA y país de facturación.
