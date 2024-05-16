import data from "../data/faq.json";

export const GET = async ({ params, request }) => {
  return new Response(JSON.stringify([
    data.faq
  ]))
}