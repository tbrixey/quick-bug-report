import type { Signal } from "@preact/signals";

interface SelectorProps {
  sig: Signal<boolean>;
}

export default function Selector(
  { sig }: SelectorProps,
) {
  const updateReportStatus = (value: string) => {
    console.log("VAL", value);
    sig.value = true;
  };

  return (
    <div class="flex w-full">
      <select onChange={(e) => updateReportStatus(e.currentTarget.value)}>
        <option value="open">Open</option>
        <option value="resolved">Resolved</option>
        <option value="inProgress">In Progress</option>
      </select>
      <span>{sig.value && "..."}</span>
    </div>
  );
}
