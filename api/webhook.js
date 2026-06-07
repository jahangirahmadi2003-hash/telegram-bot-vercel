export default async function handler(req, res) {
  // فقط درخواست POST از تلگرام قبول می‌کنیم
  if (req.method !== "POST") {
    return res.status(200).send("Bot API is running");
  }

  try {
    const update = req.body;

    const chatId = update?.message?.chat?.id;
    const text = update?.message?.text;

    // اگر پیام نبود
    if (!chatId || !text) {
      return res.status(200).send("no message");
    }

    const TOKEN = process.env.BOT_TOKEN;

    // جواب دادن به تلگرام
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `👋 پیام شما: ${text}`
      })
    });

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
      }
