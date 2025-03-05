import { NextResponse } from "next/server";

export function setStringHdp(number: number): string {
  if (number == Math.floor(number)) {
    return number === 0 ? "0" : `${number}.0`;
  }

  const base = Math.floor(number);
  const decimal = number - base;

  if (decimal === 0.25) return `${base}/${base + 0.5}`;
  if (decimal === 0.75) return `${base + 0.5}/${base + 1}`;
  
  return `${number}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const numberParam = searchParams.get("number");

  if (!numberParam || isNaN(Number(numberParam))) {
    return NextResponse.json({ error: "Invalid number" }, { status: 400 });
  }

  const number = parseFloat(numberParam);
  const result = setStringHdp(number);

  return NextResponse.json({ input: number, output: result });
}
