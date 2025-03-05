import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "example.txt");
        const fileContent = fs.readFileSync(filePath, "utf-8");

        const lines = fileContent.trim().split("\n");

        const result = lines
        .slice(1)
        .map((line) => {
            const parts = line.split("|").map((p) => p.trim());

            if (
            parts.length >= 9 &&
            parts[2] && 
            parts[3] &&
            parts[7] &&
            parts[8]
            ) {
            return {
                date: parts[7],
                time: parts[8],
                full_name: `${parts[2]} ${parts[3]}`,
            };
            }

            return null;
        })
        .filter((item) => item !== null);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Error reading file" }, { status: 500 });
    }
}
