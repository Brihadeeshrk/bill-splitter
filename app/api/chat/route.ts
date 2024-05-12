import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I've parsed a bill using Tesseract and this is the content of the bill: ${content}. read through the content, if it sounds like random characters it is probably gibberish. If it's not gibberish, return a JSON containing an array of objects in the following format for every item purchased [{itemName, quantity, rate, total}, ...], along with these items, if there's any mention of service charge, or CGST or SGST or any other tax, mention that in the JSON in the same format as well, and also include the total amount of the bill and also a success=True. if the text is gibberish, dont return any text, simply return "success = false", and return an empty items[]`,
        },
      ],
    });

    const data = response.choices[0].message.content;
    const items = JSON.parse(data!);

    if (!items.success) {
      return NextResponse.json({ success: false });
    } else {
      return NextResponse.json({ success: true, items });
    }
  } catch (error: any) {
    console.error("Error processing image:", error);
    return NextResponse.error();
  }
}
