import { PageProps } from "$fresh/server.ts";

export default function DashboardReport(props: PageProps) {
  const { id } = props.params;
  return (
    <main>
      <p>Greetings to you, {id}!</p>
    </main>
  );
}
