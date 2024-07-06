import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const SERVER_URL = process.env.SERVER_URL;
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${SERVER_URL}/api/user/${id}/decrease-balance`,
    {
      method: "PATCH",
      body: JSON.stringify(await req.json()),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const user = await response.json();
  return NextResponse.json({ message: "OK", user });
}
