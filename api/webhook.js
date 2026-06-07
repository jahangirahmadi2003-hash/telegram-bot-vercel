export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Bot is running");
  }

  try {
    const update = req.body;

    const chat_id = update?.message?.chat?.id;
    const text = update?.message?.text;

    if (!chat_id || !text) {
      return res.status(200).send("no message");
    }

    const TOKEN = process.env.BOT_TOKEN;

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat_id,
        text: "تو گفتی: " + text
      })
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
}
