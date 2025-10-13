// tracing.cjs — robust for different OTel versions
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),      // print spans to console
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the SDK; handle both sync and async implementations safely
try {
  const maybePromise = sdk.start();
  if (maybePromise && typeof maybePromise.then === 'function') {
    maybePromise
      .then(() => console.log('[OTel] started (console exporter)'))
      .catch(err => console.error('[OTel] start error', err));
  } else {
    console.log('[OTel] started (console exporter)');
  }
} catch (err) {
  console.error('[OTel] start error', err);
}

// Graceful shutdown for Ctrl+C / nodemon restarts
const shutdown = () =>
  Promise.resolve(sdk.shutdown())
    .catch(err => console.error('[OTel] shutdown error', err))
    .finally(() => process.exit(0));

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

