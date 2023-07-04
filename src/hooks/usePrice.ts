import { useMemo } from "react";

function usePrice(price: number) {
  return useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price),
    [price]
  );
}

export default usePrice;
