export { default, loader } from "../../components/product/ProductAd.tsx";
import { default as Component } from "../../components/product/ProductAd.tsx";

export function LoadingFallback() {
  return (
    <Component
      productPage={{
        "@type": "ProductDetailsPage",
        breadcrumbList: {
          "@type": "BreadcrumbList",
          itemListElement: [],
          numberOfItems: 0,
        },
        product: {
          "@type": "Product",
          productID: "-1",
          sku: "-1",
          name: "Loading...",
          image: [{
            "@type": "ImageObject",
            url: "",
            alternateName: "",
          }],
        },
      }}
    />
  );
}

export function ErrorFallback() {
  return (
    <Component
      productPage={{
        "@type": "ProductDetailsPage",
        breadcrumbList: {
          "@type": "BreadcrumbList",
          itemListElement: [],
          numberOfItems: 0,
        },
        product: {
          "@type": "Product",
          productID: "-1",
          sku: "-1",
          name: "Gruta de Itanhaém",
          url: "/culturas",
          image: [{
            "@type": "ImageObject",
            url:
              "https://live.staticflickr.com/7406/11858016483_611f10cf82_b.jpg",
            alternateName: "",
          }],
        },
      }}
    />
  );
}
