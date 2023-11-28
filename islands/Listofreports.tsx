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
      console.log("RESPONSE", resp);
      const json = await resp.json();
      console.log("RESPONSE", json);
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
      {isLoadingSig && "Loading..."}
      {reportSig.value.length > 0 && JSON.stringify(reportSig)}
    </div>
  );
}
