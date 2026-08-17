const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../src/middleware/auth');

const createResponse = () => ({
  statusCode: 200,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.payload = payload;
    return this;
  }
});

test('authenticate accepts a valid Bearer token', () => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'test-secret';
  const token = jwt.sign({ id: 'user-id', email: 'jane@example.com' }, process.env.JWT_SECRET);
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = createResponse();
  let nextCalled = false;

  try {
    authenticate(req, res, () => { nextCalled = true; });
    assert.equal(nextCalled, true);
    assert.equal(req.user.email, 'jane@example.com');
  } finally {
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  }
});

test('authenticate rejects requests without a Bearer token', () => {
  const res = createResponse();
  authenticate({ headers: {} }, res, () => {});

  assert.equal(res.statusCode, 401);
  assert.equal(res.payload.success, false);
});
