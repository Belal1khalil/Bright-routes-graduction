import imageSuccess from "../../assets/img/6459980.png";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  let navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const token = queryParams.get("token");
  async function ConfirmEmail() {
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Account/confirm-email",
        method: "POST",
        data: {
          email,
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message == "Email confirmed successfully") {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    ConfirmEmail();
  }, []);
  return (
    <>
      <div className="max-w-sm md:max-w-md lg:max-w-lg h-auto m-auto rounded-lg space-y-6 border border-green-500 border-opacity-30 shadow-lg py-8 px-6 my-20 flex flex-col items-center bg-white">
        <img
          src={imageSuccess}
          className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full"
          alt="Success Icon"
        />
        <h1 className="text-center font-semibold text-2xl md:text-3xl text-gray-700">
          Congratulations!
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-600">
          Your email has already been confirmed.
        </p>
        <p className="text-center text-lg md:text-xl font-medium text-green-600">
          You can now log in to the application.
        </p>
      </div>
    </>
  );
}
