import { SectionProps } from "deco/mod.ts";

export async function loader(): Promise<{ total: number }> {
  return await fetch("https://camp-api.deco.cx/events", {
    headers: {
      "x-api-key": "storefrontcamp",
    },
  }).then((res) => res.json());
}

export default function Section(props: SectionProps<typeof loader>) {
  return (
    <div class="p-10 text-center">
      Site saves: {props.total}
    </div>
  );
}
