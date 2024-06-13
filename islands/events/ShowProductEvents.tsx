import { useId } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import { debounce } from "std/async/debounce.ts";

export default function ShowProductEvents() {
  const comments = useSignal<string[]>([]);
  const id = useId();

  const handleChange = debounce(
    async (e: Event) => {
      const r = await invoke.site.loaders.events.productComments({
        productId: (e.target as HTMLInputElement)?.value,
      });

      comments.value = r.filter((c) => c.length >= 5);
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
      {comments.value.length > 0 && (
        <div class="mt-4">
          {comments.value.map((c) => <div class="border p-2">- {c}</div>)}
        </div>
      )}
      <div class="mt-4">Total: {comments.value.length} votes</div>
    </div>
  );
}
