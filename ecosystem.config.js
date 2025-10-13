// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'math-toys',
    script: 'src/app.js',
    node_args: ['-r', './tracing.cjs'],
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      OTEL_SERVICE_NAME: 'math-toys',
      // For now, point to a local collector (we’ll add one next)
      OTEL_EXPORTER_OTLP_ENDPOINT: 'http://localhost:4318/v1/traces'
    },
    watch: false
  }]
}

