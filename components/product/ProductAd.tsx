import { JSX } from "preact";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import Button from "../ui/Button.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Spinner from "../ui/Spinner.tsx";
import Image from "apps/website/components/Image.tsx";
import SaveButton from "../../islands/SaveProductAd.tsx";
import type { SectionProps } from "deco/mod.ts";
import { AppContext } from "../../apps/site.ts";

export interface Props {
  productPage: ProductDetailsPage | null;
  adDescription?: string;
  animateImage?: boolean;
  vertical?: boolean;
  highlight?: boolean;

  /** @hide */
  loading?: boolean;
}

export type ProductAd = JSX.Element;

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const productId = props.productPage?.product?.productID ?? "-1";
  console.log({ productId });

  if (props.highlight && productId !== "-1") {
    const comments = await ctx.invoke.site.loaders.events.productComments({
      productId,
    });

    props.highlight = comments?.length > 3;
  }

  return props;
};

export default function Section(
  props: SectionProps<typeof loader>,
): ProductAd {
  const { productPage } = props;
  if (!productPage?.product) {
    return <></>;
  }

  const [image] = productPage.product.image ?? [];

  const offer = useOffer(productPage.product.offers);

  return (
    <div
      class={`relative flex flex-col items-center ${
        !props.vertical && "sm:flex-row sm:items-stretch"
      } justify-center w-full px-4 sm:px-10 max-w-[1024px] m-auto gap-4 py-4`}
    >
      <SaveButton
        image={image.url!}
        title={productPage.product.name!}
        productId={productPage.product.productID}
      />
      {props.loading
        ? <div class="skeleton w-80 sm:w-96 aspect-square" />
        : (
          <div class="relative max-w-96 overflow-hidden">
            {props.highlight && (
              <span class="absolute bg-primary top-8 right-0 z-10 py-2 px-3">
                Destaque
              </span>
            )}
            <Image
              src={image.url ?? ""}
              width={384}
              height={384}
              class={`w-full ${
                props.animateImage
                  ? "hover:scale-125 transition-all ease-in-out"
                  : ""
              }`}
              alt={image.alternateName}
            />
          </div>
        )}
      <div class="w-full flex flex-col justify-between">
        <div
          class={`flex flex-col items-center ${
            !props.vertical && "sm:items-start"
          } min-h-32`}
        >
          <h2 class="bold text-xl">{productPage.product.name}</h2>
          <p class="mt-4">
            {props.loading
              ? <Spinner />
              : props.adDescription ?? productPage.product.description}
          </p>
        </div>
        <div
          class={`flex flex-col items-center ${
            !props.vertical && "sm:items-end"
          }`}
        >
          <span class="mb-5">
            {formatPrice(offer.price, offer.priceCurrency)}
          </span>
          <div
            class={`flex flex-col justify-center items-center gap-2 ${
              !props.vertical && "sm:flex-row"
            }`}
          >
            {productPage.product.url && (
              <a class="btn" href={productPage.product.url}>Mais Detalhes</a>
            )}
            {productPage.product.productID !== "-1" && <Button>Comprar</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
