export type ContactResult = 'sent' | 'activation-required';

export class ContactDeliveryError extends Error {
  uncertain: boolean;
  constructor(uncertain = false) {
    super(uncertain ? 'Delivery could not be confirmed' : 'Submission was rejected');
    this.uncertain = uncertain;
  }
}

export async function sendContact(
  values: FormData,
  recipient: string,
  pageUrl: string,
  fetcher: typeof fetch = fetch,
  timeoutMs = 20000,
): Promise<ContactResult> {
  const field = (key: string) => String(values.get(key) ?? '').trim();
  const company = field('company');
  const name = field('name');
  const email = field('email');
  const message = field('message');
  if (!company || !name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || field('_honey')) {
    throw new ContactDeliveryError();
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit',
      signal: controller.signal,
      body: JSON.stringify({
        company, name, email,
        equipment: field('equipment'), message,
        _subject: `[데이터레이크 홈페이지 문의] ${company} · ${field('equipment')}`,
        _template: 'table',
        _url: pageUrl.split(/[?#]/)[0],
        _honey: '',
      }),
    });
    if (!response.ok) throw new ContactDeliveryError();
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object') throw new ContactDeliveryError(true);
    const { success, message: responseMessage } = result as { success?: unknown; message?: unknown };
    if (typeof responseMessage === 'string' && /activat|confirm.{0,30}email|check.{0,30}email|email.{0,30}confirm/i.test(responseMessage)) {
      return 'activation-required';
    }
    if (success !== true && success !== 'true') throw new ContactDeliveryError();
    return 'sent';
  } catch (error) {
    if (error instanceof ContactDeliveryError) throw error;
    // A dropped response can happen after acceptance; never retry automatically.
    throw new ContactDeliveryError(true);
  } finally {
    clearTimeout(timeout);
  }
}
