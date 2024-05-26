import { useId } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import { JSX } from "preact";
import { debounce } from "std/async/debounce.ts";

export default function ShowProductEvents() {
  const votes = useSignal(0);
  const id = useId();

  const handleChange = debounce(
    async (e: JSX.TargetedEvent<HTMLInputElement>) => {
      const comments = await invoke.site.loaders.events.productComments({
        productId: e.currentTarget.value,
      });

      votes.value = comments?.length ?? 0;
    },
    300,
  );

  return (
    <div>
      <label htmlFor={id} class="mr-4">Product:</label>
      <input
        id={id}
        type="text"
        onInput={handleChange}
        class="input input-bordered"
      />
      <div class="mt-4">Total: {votes} votes</div>
    </div>
  );
}
