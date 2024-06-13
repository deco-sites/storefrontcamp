import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  campaigns: string[];
}

export default function matcher(props: Props, ctx: MatchContext) {
  const query = new URL(ctx.request.url).searchParams.get("utm_campaign");
  if (!query) return false;

  return props.campaigns.some((campaign) => {
    if (campaign.endsWith("*")) {
      return query.startsWith(campaign.slice(0, -1));
    }

    return query === campaign;
  });
}
