import axios from "axios";
import EmailImage from "../../assets/img/Communication-email-blue-icon.png";
import { useEffect } from "react";

export default function AuthEmail() {
  const baseUrl = `${window.location.protocol}//${window.location.host}/ConfirmEmail`;
  console.log(baseUrl);
  // eslint-disable-next-line no-unused-vars
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const displayName = queryParams.get("displayName");

  async function AuthEmail() {
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Account/authnticate-email",
        method: "POST",
        data: {
          email,
          clientUrl: baseUrl,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AuthEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="max-w-sm md:max-w-md lg:max-w-lg h-auto m-auto space-y-4 border border-primary-500 border-opacity-30 shadow-lg py-6 px-4 my-20 flex flex-col justify-center items-center bg-white rounded-lg">
        <img src={EmailImage} className="w-32 h-24 object-cover" alt="" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Confirm Email
        </h1>
        <h2 className="font-bold text-xl">{`Hi, ${displayName}`}</h2>
        <p className="text-lg md:text-xl font-medium text-gray-700">
          A confirmation email has been sent to you.
        </p>
        <p className="text-lg md:text-xl font-semibold text-primary-500">
          Please check your email inbox.
        </p>
      </div>
    </>
  );
}
