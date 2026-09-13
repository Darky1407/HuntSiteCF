export async function onRequestPost(context) {
  const { name, time } = await context.request.json();

  const WEBHOOK_URL = context.env.DISCORD_WEBHOOK_URL;

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `🎉 ${name} reached the landing page at ${time}`,
    }),
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}