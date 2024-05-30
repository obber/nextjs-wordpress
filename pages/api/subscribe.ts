import axios from "axios";
import { isNullOrUndefined } from "../../lib/utils";

const CONVERTKID_FORM_ID = "6251766";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (email === "" || isNullOrUndefined(email)) {
        res.status(400).json({ success: false, message: "Invalid email" });
      }

      const response = await axios.post(
        `https://api.convertkit.com/v3/forms/${CONVERTKID_FORM_ID}/subscribe`,
        {
          api_key: process.env.CONVERTKIT_API_KEY,
          email,
        }
      );

      if (response.status === 200 || response.status === 201) {
        res
          .status(201)
          .json({ success: true, message: "Subscriber added successfully" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Failed to add subscriber" });
      }
    } catch (error) {
      console.error("Error subscribing to ConvertKit:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
