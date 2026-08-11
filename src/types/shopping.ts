export type Shopping = {
  id: string;
  image: {
    url: string;
    height: number;
    width: number;
    alt: string;
  };
  productName: string;
  price: number;
  description: string;
  updatedAt: string;
};
