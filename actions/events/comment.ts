export interface Props {
  productId: string;
  comment: string;
}

export default function action(props: Props) {
  fetch("https://camp-api.deco.cx/event", {
    headers: {
      "x-api-key": "storefrontcamp",
      "content-type": "application/json",
    },
    body: JSON.stringify(props),
  });
}
