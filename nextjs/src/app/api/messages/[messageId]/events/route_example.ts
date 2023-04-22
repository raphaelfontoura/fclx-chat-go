import { prisma } from "@/app/prisma/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _request:NextRequest, 
  { params }: { params: { messageId: string }}) 
{
  const message = await prisma.message.findUniqueOrThrow({
    where: {
      id: params.messageId,
    },
  });

  const transformStream = new TransformStream();
  const writer = transformStream.writable.getWriter();
  const encoder = new TextEncoder();

  const randomNumbers = Array.from({ length: 20 }, () => 
    Math.floor(Math.random() * 10)
  );

  setTimeout(() => {
    randomNumbers.forEach((number) => {
      writer.write(encoder.encode(`event: message\n`))
      writer.write(encoder.encode(`id: ${new Date().getTime()}\n`))
      writer.write(encoder.encode(`data: ${number}\n\n`))
    });
    writer.close();
  }, 2000);

  return new Response(transformStream.readable,  {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    },
    status: 200,
  });
}
