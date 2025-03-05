import { NextResponse } from "next/server";

export function setStringHdp(number: number): string {
    const isNegative = number < 0;
    const positiveNumber = Math.abs(number);

    if(positiveNumber === 0){
        return `0`;
    }

    if (positiveNumber === Math.floor(positiveNumber)) {
        return isNegative ? `${-positiveNumber}.0` : `${positiveNumber}.0`;
    }

    const base = Math.floor(positiveNumber);
    const decimal = positiveNumber - base;

    if (decimal === 0.25 || decimal === -0.25) {
        return isNegative ? `${-base}/${base}.5` : `${base}/${base}.5`;
    }

    if (decimal === 0.75 || decimal === -0.75) {
        return isNegative ? `${-(base + 0.5)}/${(base + 1)}` : `${base + 0.5}/${base + 1}`;
    }

    if (decimal === 0.5 || decimal === -0.5) {
        return isNegative ? `${-(base + 0.5)}` : `${base + 0.5}`;
    }
    return isNegative ? `${-positiveNumber}` : `${positiveNumber}`;
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
