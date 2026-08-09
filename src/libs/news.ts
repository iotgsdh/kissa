import { client } from "./microcms";

export async function getNews() {
  return client.getAllContents({
    endpoint: "news",
    queries: {
      orders: "-createdAt",
    },
  });
}
