// Normalises fingerprints to upper-case hex without separators so that
// "ab:cd:..." (portal/Node format) and "ABCD..." / base64 (LB header) compare reliably.
function norm(v) {
  if (!v) return null;
  v = String(v).trim();
  if (/^[A-Za-z0-9+/=]+$/.test(v) && v.length === 44) {
    // base64 encoded SHA-256 (GCLB {client_cert_sha256_fingerprint} may be base64)
    var bin = Packages.java.util.Base64.getDecoder().decode(v);
    var hex = '';
    for (var i = 0; i < bin.length; i++) hex += ('0' + (bin[i] & 0xff).toString(16)).slice(-2);
    return hex.toUpperCase();
  }
  return v.replace(/:/g, '').toUpperCase();
}
context.setVariable('mtls.expected.fingerprint', norm(context.getVariable('mtls.expected.raw')));
context.setVariable('mtls.presented.fingerprint', norm(context.getVariable('request.header.X-Client-Cert-Hash')));
