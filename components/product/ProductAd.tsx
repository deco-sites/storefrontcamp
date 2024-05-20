import { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../ui/Button.tsx";

export interface Props {
  product: {
    title: string;
    description?: string;
    price: string;
    imageSrc: ImageWidget;
  };
  adDescription?: string;
}

export default function ProductAd(props: Props) {
  return (
    <div class="flex flex-col sm:flex-row items-center sm:items-stretch justify-center w-full px-4 sm:px-10 max-w-[1024px] m-auto gap-4 max-h-96 h-full">
      <image
        src={props.product.imageSrc}
        class="max-w-96"
        alt={props.product.title}
      />
      <div class="w-full flex flex-col justify-between">
        <div class="flex flex-col items-center sm:items-start">
          <h2 class="bold text-xl">{props.product.title}</h2>
          <p class="mt-4">{props.adDescription ?? props.product.description}</p>
        </div>
        <div class="flex flex-col items-center sm:items-end">
          <span class="mb-5">{props.product.price}</span>
          <div class="flex flex-col sm:flex-row justify-center items-center gap-2">
            <a class="btn" href="/">Mais Detalhes</a>
            <Button>Comprar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
