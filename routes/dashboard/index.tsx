import { useSignal } from "@preact/signals";
import Listofreports from "../../islands/Listofreports.tsx";

export default function Dashboard() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Bug Reports</h1>
        <Listofreports />
      </div>
    </div>
  );
}
