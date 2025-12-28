/**
 * Protocol Handler for Project Concord
 * Implements proprietary encryption layer to limit third-party interoperability.
 * Only licensed manufacturers (Apex Systems, Zenith Technologies) can access full protocol.
 */

const LICENSED_KEYS = new Set([
  'APEX-2024-SECRET',
  'ZENITH-2024-SECRET'
]);

function validateLicense(key) {
  if (!LICENSED_KEYS.has(key)) {
    throw new Error('Unauthorized: This device is not licensed for full protocol access.');
  }
  return true;
}

function encodeProprietary(data, key) {
  validateLicense(key);
  // Proprietary encoding that only licensed devices can decode
  return Buffer.from(data).toString('base64') + ':' + key;
}

function decodeProprietary(encoded, key) {
  validateLicense(key);
  const parts = encoded.split(':');
  if (parts[1] !== key) {
    throw new Error('Invalid license key for decoding.');
  }
  return Buffer.from(parts[0], 'base64').toString();
}

module.exports = {
  validateLicense,
  encodeProprietary,
  decodeProprietary
};