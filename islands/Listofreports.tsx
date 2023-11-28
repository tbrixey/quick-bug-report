import { useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect } from "preact/hooks";

export interface Report {
  id: string;
  title: string;
  details: string;
}

export default function Listofreports() {
  const reportSig = useSignal<Report[]>([]);
  const isLoadingSig = useSignal(false);

  async function loadReports() {
    if (isLoadingSig.value) return;
    isLoadingSig.value = true;
    try {
      const resp = await fetch(
        "/api/bug-report",
      );
      const json = await resp.json();
      reportSig.value = [...reportSig.value, ...json];
    } catch (error) {
      console.log(error.message);
    } finally {
      isLoadingSig.value = false;
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div class="flex gap-8 py-6">
      {isLoadingSig.value && "Loading..."}
      {reportSig.value.length > 0 &&
        reportSig.value.map((v) => (
          <a class="p-4 rounded bg-slate-300 drop-shadow-md hover:bg-slate-200 transition-all cursor-pointer active:bg-slate-100">
            <div>
              <p>{v.id}</p>
            </div>
            <div>
              <p class="font-bold">{v.title}</p>
            </div>
            <div>
              <p>{v.details}</p>
            </div>
          </a>
        ))}
    </div>
  );
}
