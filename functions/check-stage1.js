export async function onRequestPost(context) {
  const { answer } = await context.request.json();
  const CORRECT_ANSWER = context.env.STAGE1_ANSWER;
  const normalized = answer.trim().toLowerCase().replace(/\s+/g, ' ');
  const isCorrect = normalized === CORRECT_ANSWER;

  return new Response(JSON.stringify({ correct: isCorrect }), {
    headers: { "Content-Type": "application/json" },
  });
}