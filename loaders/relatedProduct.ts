import { Props as RelatedProps } from "apps/vtex/loaders/legacy/relatedProductsLoader.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

type Props = Omit<RelatedProps, "count" | "hideUnavailableItems">;

export default async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<ProductDetailsPage | null> {
  const res = await ctx.invoke.vtex.loaders.legacy.relatedProductsLoader({
    ...props,
    count: 1,
  });

  if (!res?.length) return null;

  const product = res[0];

  return {
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      numberOfItems: 0,
      itemListElement: [],
    },
    product,
  };
}
