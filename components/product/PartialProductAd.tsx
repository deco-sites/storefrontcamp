import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Button from "../ui/Button.tsx";
import { Section } from "deco/blocks/section.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  message: string;
  image: ImageWidget;
  buttonTitle: string;
  productAds: Section[];

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
    <div class="flex sm:flex-row flex-col justify-center">
      <div class="w-full max-w-[800px]">
        <productAd.Component {...productAd.props} />
      </div>
      <div class="flex flex-col justify-center">
        <div class="flex sm:flex-col w-full justify-center">
          <h2>{message}</h2>
          <img src={image} />
        </div>
        <Button
          class="h-14 w-full max-w-40 mx-auto"
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
