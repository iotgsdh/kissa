import { client } from "./microcms";

export async function getConfig() {
  return client.get({
    endpoint: "config",
  });
}
