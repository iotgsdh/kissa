import { client } from "./microcms";

export async function getStories() {
  return client.getAllContents({
    endpoint: "story",
    queries: {
      orders: "createdAt",
    },
  });
}
