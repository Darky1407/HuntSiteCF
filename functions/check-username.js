export async function onRequestPost(context) {
  const { username } = await context.request.json();
  const cleaned = username.trim().toLowerCase().replace(/\s+/g, '_');
  const projectId = context.env.FIREBASE_PROJECT_ID;

  const token = await getFirebaseAccessToken(context.env);

  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/sessions/${cleaned}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // If the document already exists, the name is taken
  const taken = res.ok;

  return new Response(JSON.stringify({ available: !taken, cleaned }), {
    headers: { "Content-Type": "application/json" },
  });
}

async function getFirebaseAccessToken(env) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: env.FIREBASE_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const encoder = new TextEncoder();
  const b64 = (obj) => btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const unsigned = `${b64(header)}.${b64(claim)}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToBuffer(env.FIREBASE_PRIVATE_KEY),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(unsigned));
  const sig = btoa(String.fromCharCode(...new Uint8Array(sigBuffer))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  return (await (await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${unsigned}.${sig}`,
  })).json()).access_token;
}

function pemToBuffer(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const binary = atob(b64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);
  return buffer.buffer;
}