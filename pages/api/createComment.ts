import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

export const config = {
   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "h9bmux7t",
   useCdn: process.env.NODE_ENV === "production",
   token:
      process.env.SANITY_API_TOKEN ||
      "skY7atogredvIbZyiOprqa9KPSg3nEG9WQAGlpn2oICmDBbOq8tQ00BjfjTDJN190Q2EtH0UhUMow4zEh7KaXz4ZGCrFYnpFlWaEDptCpDojySzmWJoljdgGexhq0xRA3oHBgQQasH5lAJBMCeESP4BssfyyhUp2bACon5pzLpvhr3XP9WXe",
};
const client = sanityClient(config);

export default async function createComment(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { _id, name, email, comment } = JSON.parse(req.body);

   try {
      await client.create({
         _type: "comment",
         post: {
            _type: "reference",
            _ref: _id,
         },
         name,
         email,
         comment,
      });
   } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Could not submit comment", err });
   }
   console.log("Comment submitted");
   res.status(200).json({ name: "John Doe" });
}
