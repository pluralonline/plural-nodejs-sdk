import {createHmac} from "crypto";

/**
 * generateCreateOrderHash:
 * Method for creating hash for x-verify header
 * @param request Data using which the hash will be generated
 * @param secret Secret using which the hash will be signed
 * @returns string
 */
export function generateCreateOrderHash(request: string, secret: string): string {
  return createHmac("sha256", Buffer.from(secret, 'hex')).update(request).digest("hex").toUpperCase()
}

/**
 * generateFetchOrderHash:
 * Method for creating hash for pcc_DIA_SECRET
 * @param request Data using which the hash will be generated
 * @param secret Secret using which the hash will be signed
 * @returns string
 */
export function generateFetchOrderHash(request: unknown, secret: string): string {
  const sortedKeys = Object.keys(request).sort();

  const dataString = sortedKeys
    .map((key) => `${key}=${request[key]}`)
    .join('&');

  return createHmac('sha256', Buffer.from(secret, 'hex'))
    .update(dataString)
    .digest('hex')
    .toUpperCase();
}

/**
 * verifyHash:
 * Method for verifying hash received in the request
 * @param hash Received hash in the response which will be checked
 * @param request Data using which the hash will be generated
 * @returns boolean
 */
export function verifyHash(hash: string, request: unknown): boolean {
  try {
    const sortedKeys = Object.keys(request).sort();

    const dataString = sortedKeys
      .map((key) => `${key}=${request[key]}`)
      .join('&');

    const newHash = createHmac('sha256', Buffer.from(this.merchant_secret, 'hex'))
      .update(dataString)
      .digest('hex')
      .toUpperCase();

    return newHash === hash;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to verify hash');
  }
}
