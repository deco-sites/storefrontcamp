import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import Button from "../ui/Button.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Spinner from "../ui/Spinner.tsx";

export interface Props {
  productPage: ProductDetailsPage | null;
  adDescription?: string;

  /** @hide */
  loading?: boolean;
}

export default function ProductAd(props: Props) {
  const { productPage } = props;
  if (!productPage?.product) {
    return null;
  }

  const [image] = productPage.product.image ?? [];

  const offer = useOffer(productPage.product.offers);

  return (
    <div class="relative flex flex-col sm:flex-row items-center sm:items-stretch justify-center w-full px-4 sm:px-10 max-w-[1024px] m-auto gap-4 max-h-96 h-full py-4">
      {productPage.product.productID !== "-1" && (
        <Button class="absolute top-4 right-4">Save</Button>
      )}
      <image
        src={image.url}
        class="max-w-96"
        alt={image.alternateName}
      />
      <div class="w-full flex flex-col justify-between">
        <div class="flex flex-col items-center sm:items-start min-h-32">
          <h2 class="bold text-xl">{productPage.product.name}</h2>
          <p class="mt-4">
            {props.loading
              ? <Spinner />
              : props.adDescription ?? productPage.product.description}
          </p>
        </div>
        <div class="flex flex-col items-center sm:items-end">
          <span class="mb-5">
            {formatPrice(offer.price, offer.priceCurrency)}
          </span>
          <div class="flex flex-col sm:flex-row justify-center items-center gap-2">
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
