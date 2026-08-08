import { checkDatabaseConnection } from "@/db/gallery-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const database = await checkDatabaseConnection();
    return Response.json({ ok: true, service: "rosewood-hotel", database });
  } catch (error) {
    console.error("Database health check failed", error);
    return Response.json({ ok: false, service: "rosewood-hotel" }, { status: 500 });
  }
}
