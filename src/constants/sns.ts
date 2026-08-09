import { getSite } from "./site";

export async function getSns() {
  const site = await getSite();

  return [
    {
      path: "/images/x.svg",
      url: site.twitter,
      name: "x",
    },
    {
      path: "/images/instagram.svg",
      url: site.instagram,
      name: "instagram",
    },
    {
      path: "/images/facebook.svg",
      url: site.facebook,
      name: "facebook",
    },
  ];
}
