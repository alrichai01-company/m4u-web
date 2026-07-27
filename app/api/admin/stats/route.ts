import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getStats, getAllInquiries } from "@/lib/db";

/**
 * GET /api/admin/stats — dashboard data
 * GET /api/admin/stats?export=csv — CSV download of all inquiries
 */
export async function GET(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = new URL(request.url);
  const exportCsv = url.searchParams.get("export");

  if (exportCsv === "csv") {
    const inquiries = getAllInquiries();
    const headers = [
      "Date",
      "Name",
      "Email",
      "Mobile",
      "Company",
      "Business Type",
      "City",
      "State",
      "Country",
      "Message",
    ];

    const csvField = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = inquiries.map((inq) => [
      inq.createdAt,
      inq.name,
      inq.email,
      inq.mobile,
      inq.company ?? "",
      inq.businessType,
      inq.city ?? "",
      inq.state ?? "",
      inq.country ?? "",
      inq.message ?? "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) => r.map(csvField).join(",")),
    ].join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="m4u-inquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  const stats = getStats();
  return NextResponse.json(stats);
}
