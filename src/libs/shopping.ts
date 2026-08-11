import { client } from "./microcms";

export async function getShopping() {
  return client.getAllContents({
    endpoint: "shopping",
    queries: {
      orders: "-createdAt",
    },
  });
}
