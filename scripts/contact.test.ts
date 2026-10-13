import assert from 'node:assert/strict';
import test from 'node:test';
import { ContactDeliveryError, sendContact } from '../src/contact.ts';

function inquiry() {
  const values = new FormData();
  for (const [key, value] of Object.entries({ company: '테스트 기관', name: '전송 검증', email: 'qa@example.com', equipment: 'AI 솔루션 개발', message: '자동 검증용 문의입니다.' })) values.set(key, value);
  return values;
}
const reply = (body: unknown, status = 200): typeof fetch => async () => Response.json(body, { status });
const send = (fetcher: typeof fetch, values = inquiry(), timeout = 20000) => sendContact(values, 'japark.work@gmail.com', 'https://datalake.ai.kr/?private=value#contact', fetcher, timeout);

test('sends named fields to the fixed recipient without cookies or URL query data', async () => {
  let calls = 0;
  const fetcher: typeof fetch = async (url, init) => {
    calls++;
    assert.equal(url, 'https://formsubmit.co/ajax/japark.work%40gmail.com');
    assert.equal(init?.method, 'POST');
    assert.equal(init?.credentials, 'omit');
    const payload = JSON.parse(String(init?.body));
    assert.equal(payload.email, 'qa@example.com');
    assert.equal(payload.company, '테스트 기관');
    assert.equal(payload.message, '자동 검증용 문의입니다.');
    assert.equal(payload._url, 'https://datalake.ai.kr/');
    assert.equal(payload._captcha, undefined);
    return Response.json({ success: 'true', message: 'The form was submitted successfully.' });
  };
  assert.equal(await send(fetcher), 'sent');
  assert.equal(calls, 1);
});

test('does not report activation requests as delivery success', async () => {
  assert.equal(await send(reply({ success: 'true', message: 'Check your email to activate this form' })), 'activation-required');
});

test('rejects HTTP failures and false or missing success values', async () => {
  for (const fetcher of [reply({ success: 'true' }, 500), reply({ success: 'false' }), reply({ success: false }), reply({}), reply(null)]) {
    await assert.rejects(send(fetcher), ContactDeliveryError);
  }
});

test('does not retry a timeout or a network error with uncertain delivery', async () => {
  let calls = 0;
  const fetcher: typeof fetch = async (_url, init) => {
    calls++;
    return new Promise((_resolve, reject) => init?.signal?.addEventListener('abort', () => reject(new Error('aborted'))));
  };
  await assert.rejects(send(fetcher, inquiry(), 10), (error: unknown) => error instanceof ContactDeliveryError && error.uncertain);
  assert.equal(calls, 1);
  await assert.rejects(send(async () => { throw new TypeError('Failed to fetch'); }), (error: unknown) => error instanceof ContactDeliveryError && error.uncertain);
});

test('malformed service responses are not treated as delivered', async () => {
  await assert.rejects(send(async () => new Response('<html>unavailable</html>')), (error: unknown) => error instanceof ContactDeliveryError && error.uncertain);
});

test('rejects whitespace-only required fields and honeypot submissions before any request', async () => {
  for (const [key, value] of [['company', '  '], ['message', '\n '], ['email', 'not-email'], ['email', 'CC@DD'], ['_honey', 'spam']]) {
    const values = inquiry(); values.set(key, value);
    let called = false;
    await assert.rejects(send(async () => { called = true; return Response.json({ success: true }); }, values));
    assert.equal(called, false);
  }
});
