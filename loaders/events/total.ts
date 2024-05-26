import { AppContext } from "../../apps/site.ts";

interface EventTotal {
  total: number;
}

export default async function loader(
  _props: unknown,
  _: Request,
  _ctx: AppContext,
): Promise<EventTotal> {
  return await fetch("https://camp-api.deco.cx/events", {
    headers: {
      "x-api-key": "storefrontcamp",
    },
  }).then((res) => res.json());
}
