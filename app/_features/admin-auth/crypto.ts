const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToArrayBuffer(value: string): ArrayBuffer {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return buffer;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signValue(value: string, secret: string): Promise<string> {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function encodeSignedJson<T extends object>(
  payload: T,
  secret: string,
): Promise<string> {
  const encodedPayload = bytesToBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await signValue(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function decodeSignedJson<T extends object>(
  value: string,
  secret: string,
): Promise<T | null> {
  const [encodedPayload, encodedSignature] = value.split(".");

  if (!encodedPayload || !encodedSignature) {
    return null;
  }

  const key = await importHmacKey(secret);
  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToArrayBuffer(encodedSignature),
    encoder.encode(encodedPayload),
  );

  if (!isValid) {
    return null;
  }

  try {
    return JSON.parse(decoder.decode(base64UrlToArrayBuffer(encodedPayload))) as T;
  } catch {
    return null;
  }
}
