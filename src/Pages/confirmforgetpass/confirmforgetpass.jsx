import EmailImage from "../../assets/img/Communication-email-blue-icon.png";

export default function Confirmforgetpass() {
  return (
    <>
      <div className="max-w-sm md:max-w-md lg:max-w-lg h-auto m-auto space-y-4 border border-primary-500 border-opacity-30 shadow-lg py-6 px-4 my-20 flex flex-col justify-center items-center bg-white rounded-lg">
        <img src={EmailImage} className="w-32 h-24 object-cover" alt="" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Reset Email
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-700">
          A Reset Email has been sent to you.
        </p>
        <p className="text-lg md:text-xl font-semibold text-primary-500">
          Please check your email inbox.
        </p>
      </div>
    </>
  );
}
