const test = require('node:test');
const assert = require('node:assert/strict');

const errorHandler = require('../src/middleware/errorhandler');

test('error handler returns a structured api error response', () => {
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    }
  };

  errorHandler(new Error('boom'), {}, res, () => {});

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.payload, {
    success: false,
    message: 'Internal Server Error'
  });
});
