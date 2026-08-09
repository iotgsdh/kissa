import { client } from "./microcms";

export async function getBlog() {
  return client.getAllContents({
    endpoint: "blog",
    queries: {
      orders: "-createdAt",
    },
  });
}
