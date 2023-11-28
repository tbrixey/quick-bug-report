import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();

    const title = form.get("title")?.toString();
    const details = form.get("details")?.toString();
    const report = { title, details, id: crypto.randomUUID() };
    const reportKey = ["reports", report.id];
    const ok = await kv.atomic().set(reportKey, report).commit();
    if (!ok) throw new Error("Something went wrong.");

    const headers = new Headers();
    // headers.set("location", "/mobile-report/thanks");
    headers.set("location", "/dashboard");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#cbcbcb]">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Report a bug
        </h2>
        <form
          method="post"
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        >
          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="details"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Details
            </label>
            <div className="mt-2">
              <textarea
                rows={6}
                name="details"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
