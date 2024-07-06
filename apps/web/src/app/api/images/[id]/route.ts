import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const SERVER_URL = process.env.SERVER_URL;
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Image ID is required" },
      { status: 400 },
    );
  }

  const response = await fetch(`${SERVER_URL}/api/images/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const { image } = await response.json();
  return NextResponse.json({ message: "OK", image });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const SERVER_URL = process.env.SERVER_URL;
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Image ID is required" },
      { status: 400 },
    );
  }

  const response = await fetch(`${SERVER_URL}/api/images/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  return NextResponse.json({ message: "OK" });
}
