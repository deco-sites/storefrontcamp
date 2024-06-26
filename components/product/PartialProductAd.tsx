import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Button from "../ui/Button.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ProductAd, { Props as ProductAdProps } from "./ProductAd.tsx";

export interface Props {
  message: string;
  image: ImageWidget;
  buttonTitle: string;
  productAds: ProductAdProps[]; // Section<ProductAd> did not work at all :(

  /**
   * @title Index
   * @hide
   */
  idx?: number;
}

export default function PartialProductAd(props: Props) {
  const { message, image, buttonTitle, productAds, idx = 0 } = props;

  const productAd = productAds[idx];

  return (
    <div class="flex sm:flex-row flex-col justify-center group">
      <div class="w-full max-w-[800px]">
        <ProductAd {...productAd} />
      </div>
      <div class="flex flex-col justify-center">
        <div class="flex sm:flex-col w-full justify-center">
          <h2>{message}</h2>
          <img
            src={image}
            class="group-hover:scale-110 transition-all delay-150 ease-in-out"
          />
        </div>
        <Button
          class="h-14 w-full max-w-40 mx-auto btn-accent"
          {...usePartialSection<typeof PartialProductAd>({
            props: { idx: (idx + 1) % productAds.length },
          })}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}
