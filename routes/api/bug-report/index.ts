import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();

interface Report {
  id: string;
  title: string;
  details: string;
}

export const handler: Handlers<Report | null> = {
  async POST(req, _ctx) {
    const report = (await req.json()) as Report;
    report.id = crypto.randomUUID();
    const reportKey = ["reports", report.id];
    const ok = await kv.atomic().set(reportKey, report).commit();
    if (!ok) throw new Error("Something went wrong.");
    return new Response(JSON.stringify(report));
  },
  async GET(req, _ctx) {
    const entries = kv.list({ prefix: ["reports"] });
    const listOfReports = [];
    for await (const entry of entries) {
      listOfReports.push(entry.value);
    }
    return new Response(JSON.stringify(listOfReports));
  },
};
