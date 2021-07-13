import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const verifyTransaction = async (trans_ref) => {
  //envvironmental variables
  const BaseURL = process.env.PAYSTACK_BASE_URL;
  const SecKEY = process.env.PAYSTACK_SECRET;

  // custom configuration
  const config = {
    method: "get",
    url: `${BaseURL}/transaction/verify/${trans_ref}`,
    headers: {
      Authorization: `Bearer ${SecKEY}`,
    },
  };

  // make api call request
  try {
    const { data } = await axios(config);
    return data;
  } catch (error) {
    console.log("error", error.message);
  }
};
