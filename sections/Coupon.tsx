import { useSignal } from "@preact/signals";
import Icon from "../components/ui/Icon.tsx";

export interface Props {
  code: string;
  description?: string;
}

export default function Coupon(props: Props) {
  props.code = props.code.toUpperCase();

  const showTooltip = useSignal(false);

  const handleClick = () => {
    navigator.clipboard.writeText(props.code);

    showTooltip.value = true;
    setTimeout(() => {
      showTooltip.value = false;
    }, 2000);
  };

  return (
    <div class="flex items-center justify-center my-8">
      {props.description && (
        <div class="mr-4">
          {props.description}
        </div>
      )}
      <button
        class="relative flex items-center justify-between rounded border border-dotted"
        onClick={handleClick}
      >
        <span class="px-4 w-max">
          {props.code}
        </span>
        <div class="btn">
          <Icon id="Copy" size={24} />
        </div>
      </button>
      {showTooltip.value && (
        <div class="absolute bg-white border border-gray-200 rounded p-1">
          Copied!
        </div>
      )}
    </div>
  );
}

export function Preview() {
  return <Coupon code="promo10" />;
}
