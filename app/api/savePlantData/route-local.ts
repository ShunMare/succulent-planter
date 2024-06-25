import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PlantData } from '@/data/plantData';

const plantDataFilePath = path.join(process.cwd(), "data", "plantData.ts");

export async function POST(req: NextRequest) {
  const updatedPlantData: PlantData = await req.json();

  try {
    const fileContent = fs.readFileSync(plantDataFilePath, "utf8");

    const interfacePart = fileContent.match(/export interface[\s\S]*?\n}\n/g);
    if (!interfacePart) {
      throw new Error("Failed to extract interface part from the file.");
    }

    const newDataContent = `export const plantData: PlantData = ${JSON.stringify(updatedPlantData, null, 2)};`;

    const newFileContent = `${interfacePart.join("")}\n${newDataContent}`;

    fs.writeFileSync(plantDataFilePath, newFileContent, "utf8");
    return NextResponse.json({ message: "Plant data saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error writing to file:", error);
    return NextResponse.json({ error: "Failed to save plant data" }, { status: 500 });
  }
}
