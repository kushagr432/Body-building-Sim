import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are a fitness expert." },
        { role: "user", content: message },
      ],
      max_tokens: 150,
    });

    return Response.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    return Response.json({ error: "AI response failed." }, { status: 500 });
  }
}
