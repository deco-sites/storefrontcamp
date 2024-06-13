import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../components/ui/Button.tsx";
import Modal from "../components/ui/Modal.tsx";
import TextArea from "../components/daisy/TextArea.tsx";
import { invoke } from "../runtime.ts";

export interface Props {
  image: ImageWidget;
  title: string;
  productId: string;
}

export default function SaveProductAd(props: Props) {
  const open = useSignal(false);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const textarea = form[0] as HTMLTextAreaElement;

    await invoke.site.actions.events.comment({
      productId: props.productId,
      comment: textarea.value,
    });

    open.value = false;
  };

  return (
    <>
      <Button
        class="absolute top-4 right-4 z-10"
        onClick={() => open.value = true}
      >
        Save
      </Button>
      <Modal
        loading="lazy"
        open={open.value}
        onClose={() => open.value = false}
      >
        <form
          class="absolute m-auto flex flex-col gap-8 sm:flex-row bg-white p-8"
          onSubmit={handleSubmit}
        >
          <img src={props.image} class="w-64 h-64" />
          <div class="flex flex-col justify-between">
            <div>
              <h2>{props.title}</h2>
              <TextArea topLeftlabel="Observações" />
            </div>
            <div class="flex justify-end items-center gap-4">
              <Button class="btn-error" onClose={() => open.value = false}>
                Cancelar
              </Button>
              <Button class="btn-primary" type="submit">Salvar</Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
