import { AppContext } from "../../apps/site.ts";

export interface CampEvent {
  product: number;
  comments: Comment[];
}

export type Comment = string;

export interface Props {
  productId: string | number;
}

export default async function loader(
  props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<Comment[]> {
  const res: CampEvent = await fetch(
    `https://camp-api.deco.cx/event/${props.productId}`,
    {
      headers: {
        "x-api-key": "storefrontcamp",
      },
    },
  ).then((res) => res.json()).catch((e) => console.log("errrrrrr", e));

  return res.comments;
}
