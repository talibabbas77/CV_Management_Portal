import dbConnect from "@/lib/dbConnect";
import Resume from "@/models/Resume";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const resume = await Resume.findById(id);
    if (!resume) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(resume, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/resumes/[id]:", error);
    return NextResponse.json(
      { message: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const data = await request.json();
  try {
    const updated = await Resume.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/resumes/[id]:", error);
    return NextResponse.json(
      { message: "Failed to update resume" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;
  try {
    const deleted = await Resume.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Resume deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/resumes/[id]:", error);
    return NextResponse.json(
      { message: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
