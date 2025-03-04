import dbConnect from "@/lib/dbConnect";
import Resume from "@/models/Resume";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const resumes = await Resume.find({ user: decoded.userId });
    return NextResponse.json(resumes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    body.user = decoded.userId;

    const resume = await Resume.create(body);
    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/resumes:", error);
    return NextResponse.json(
      { message: "Failed to create resume" },
      { status: 500 }
    );
  }
}
