export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    // گرفتن پیام کاربر
    const chat_id = update.message?.chat?.id;
    const text = update.message?.text || "";

    if (!chat_id) {
      return res.status(200).send("no message");
    }

    // جواب دادن به تلگرام
    await fetch(`https://api.telegram.org/botYOUR_TOKEN/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat_id,
        text: "تو گفتی: " + text
      })
    });

    return res.status(200).send("ok");
  }

  res.status(200).send("running");
                }
