export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      index: number;
    }
  | { isSuccess: false };
