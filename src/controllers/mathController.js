const mathUtils = require('../utils/mathUtils');
const decimalLogic = require('../utils/decimalLogic');
const phiLogic = require('../utils/phiLogic');
const calendarLogic = require('../utils/calendarLogic');
const primes = require('../utils/primes');

const { context, trace, SpanStatusCode } = require('@opentelemetry/api');

// assuming: app.get('/api/dc/:denominator', handleDc)

const tracer = trace.getTracer('math-toys');

const handleDc = async (req, res) => {
  // Start a child span for the useful work (under the auto-created HTTP span)
  await tracer.startActiveSpan('compute-decimal-expansions', async (span) => {
    try {
      // --- input parsing ---
      const denominator = parseFloat(req.params.denominator); // or req.params.denom if that’s your route
      span.setAttribute('dc.denominator.raw', String(req.params.denominator ?? req.params.denom));
      span.setAttribute('dc.denominator.num', isNaN(denominator) ? 'NaN' : denominator);

      if (isNaN(denominator) || denominator === 0) {
        span.setAttribute('dc.validation.error', 'invalid_denominator');
        span.setStatus({ code: SpanStatusCode.ERROR, message: 'Invalid non-zero denominator' });
        // also tag the parent HTTP span with 400 details (optional; the auto http span will capture status anyway)
        res.status(400).json({ error: 'Valid non-zero denominator required' });
        return;
      }

      // --- core work ---
      span.addEvent('compute.start', { denominator });
      const result = mathUtils.getExpansions(denominator);
      span.addEvent('compute.end', { terms: Array.isArray(result) ? result.length : 0 });

      // --- enrich span with outputs ---
      span.setAttribute('dc.result.count', Array.isArray(result) ? result.length : 0);
      // avoid dumping the whole result; if it’s small you can log a preview:
      if (Array.isArray(result)) {
        span.setAttribute('dc.result.preview', JSON.stringify(result.slice(0, 5)));
      }

      // surface the trace id to the client for easy correlation
      const traceId = span.spanContext().traceId;
      res.setHeader('trace-id', traceId);

      res.json({
        description: `Get the decimal expansions for denominator ${denominator}.`,
        data: result
      });

      // success
      span.setStatus({ code: SpanStatusCode.UNSET }); // or OK in older SDKs
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR, message: String(err?.message || err) });
      res.status(500).json({ error: 'Internal error' });
    } finally {
      span.end();
    }
  });
};

const mathController = {
    handleRecip: (req, res) => {
        const denominator = parseFloat(req.params.denominator);
        if (isNaN(denominator) || denominator === 0) {
            return res.status(400).json({ error: 'Valid non-zero denominator required' });
        }

        const result = decimalLogic.getSingleExpansion(1, denominator);

        res.json({ description: `Get the reciprocal of ${denominator}.`, data: result });
    },

    handleDc,
/*
    handleDc: (req, res) => {
        const denominator = parseFloat(req.params.denominator);
        if (isNaN(denominator) || denominator === 0) {
            return res.status(200).json({ error: 'Valid non-zero denominator required' });
        }
        const result = mathUtils.getExpansions(denominator);
        res.json({ description: `Get the decimal expansions for denominator ${denominator}.`, data: result });
    },
*/

    pythagorean: (req, res) => {
        const corner = parseFloat(req.params.corner);
        if (isNaN(corner) || corner <= 0) {
            return res.status(200).json({ error: 'Valid positive corner length required' });
        }
        const result = mathUtils.pythagorean(corner); // Assume other side = 1
        res.json({ description: `Get pythagorean triples where c minus b is ${corner}.`, data: result });
    },

    phiPowers: (req, res) => {
        const powers = parseInt(req.params.powers, 10);
        if (isNaN(powers) || powers < 0) {
            return res.status(400).json({ error: 'Valid non-negative powers required' });
        }
        const result = phiLogic.getPhi(powers);
        res.json({ description: `Get phi powers from 1 to ${powers}.`, data: result });
    },

    fibonacci: (req, res) => {
        const howMany = parseInt(req.params.howmany, 10) || 100;
        let [a, b] = [1n, 1n];
        const result = { '1': a.toString(), '2': b.toString() };
        for (let i = 3; i <= howMany; i++) {
            [a, b] = [b, a + b];
            result[i.toString()] = b.toString();
        }
        res.json({ description: `First ${howMany} Fibonacci numbers.`, data: result });
    },

    // Controller method: return the nth Fibonacci number as a decimal string.
    // Uses fast-doubling with BigInt for exact results, O(log n) time.
    // Identities used:
    //   F_{2k}   = F_k * (2*F_{k+1} - F_k)
    //   F_{2k+1} = F_{k+1}^2 + F_k^2
    nthFibonacci: (req, res) => {
        const nth = parseInt(req.params.nth, 10);
        function dbl(k) {
            if (k === 0n) return [0n, 1n];
            const [a, b] = dbl(k >> 1n); // a=F(k), b=F(k+1) 
            const c = a * (2n * b - a); // F(2k) 
            const d = a * a + b * b; // F(2k+1)
            return (k & 1n) ? [d, c + d] : [c, d];
        }
        const result = dbl(BigInt(nth))[0];
        res.json({ description: `Fibonacci number ${nth}`, data: result.toString() })
    },

    calendar: (req, res) => {
        const year = parseInt(req.params.year, 10);
        const year12Digit = calendarLogic.calc12DigitYear(year).join('');
        res.json({ description: `Calendar for ${year}`, data: year12Digit });
    },

    century: (req, res) => {
        const cent = parseInt(req.params.cent, 10);
        const century = calendarLogic.century(cent);
        res.json({ description: `Calendars for century ${cent}`, data: century });
    },

    triangular: (req, res) => {
        const limit = parseInt(req.params.limit, 10) || 100;
        const result = [];
        for (let i = 1; i <= limit; i++) {
            const tri = i * (i + 1) / 2;
            const sqrt = Math.sqrt(tri);
            const isSquare = sqrt == parseInt(sqrt, 10);
            result.push({ n: i, tri, isSquare });
        }
        res.json({ description: `First ${limit} triangular numbers`, data: result });
    },

    triSquare: (req, res) => {
        const limit = parseInt(req.params.limit, 10) || 100;
        const result = [];
        for (let i = 1; i <= limit; i++) {
            const tri = i * (i + 1) / 2;
            const sqrt = Math.sqrt(tri);
            const isSquare = sqrt == parseInt(sqrt, 10);
            if (isSquare) {
                result.push({ n: i, tri, sqrt });
            }
        }
        res.json({ description: `Triangular squares`, data: result });
    },

    hexagons: (req, res) => {
        const limit = parseInt(req.params.limit, 10) || 100;
        const result = [];
        for (let i = 1; i <= limit; i++) {
            const hexagon = i * (i + 1) * 3 + 1;
            const factors = mathUtils.factors(hexagon);
            result.push({ n: i, hexagon, factors });
        }
        res.json({ description: `Hexagon numbers`, data: result });
    }

};

module.exports = mathController;
