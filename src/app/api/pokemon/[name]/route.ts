import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const name = url.pathname.split("/").pop();

    if (!name) {
      return NextResponse.json({ error: "Pokemon name is required" }, { status: 400 });
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
    }

    const data = await response.json();

    const pokemonData = {
      name: data.name,
      id: data.id,
      sprite: data.sprites.front_default,
      types: data.types.map((t: any) => t.type.name),
      weight: data.weight,
      height: data.height,
    };

    return NextResponse.json(pokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
