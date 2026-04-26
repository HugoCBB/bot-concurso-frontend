import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "9";

  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/api/contests/?page=${page}&size=${size}`,
      {
        next: { revalidate: 21600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from backend API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("API proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
