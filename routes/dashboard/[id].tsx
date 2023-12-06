import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import Selector from "../../islands/Select.tsx";

const kv = await Deno.openKv();

interface Report {
  id: string;
  title: string;
  details: string;
  status: string;
  creationDate: string;
}

export const handler: Handlers<Report> = {
  async GET(_req, ctx) {
    const report = (await kv.get<Report>(["reports", ctx.params.id])).value;

    if (!report) {
      return new Response("Report not found", { status: 404 });
    }
    return ctx.render(report);
  },
};

export default function DashboardReport(props: PageProps<Report>) {
  const changeStatusLoading = useSignal(false);

  return (
    <main>
      <div class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <div>
            <h1 class="text-4xl font-bold">{props.data.title}</h1>
          </div>
          <div class="flex">
            <b class="mr-1">Report details:</b>
            <p>{props.data.details}</p>
          </div>
          <div>
            <b class="mr-1">Status:</b>
            <Selector sig={changeStatusLoading} />
          </div>
        </div>
      </div>
    </main>
  );
}
