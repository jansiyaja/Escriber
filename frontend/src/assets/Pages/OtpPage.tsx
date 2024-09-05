

const OtpPage = () => {
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-blue-500 via-blue-950 via-50% to-blue-500 ">
      <div>
     
      </div>
      <div className="bg-white p-10 rounded-lg shadow-xl w-100 ">

        <h2 className="text-3xl font-bold text-center mb-4 font-bodoni">Verify OTP</h2>
        <p className="text-xl font-bodoni font-semibold p-3 text-gray-700"> Enter your Otp Number</p>
        <form className="flex flex-col items-center">
          <div className="flex space-x-2">
           
              <input className="w-10 h-10 border border-gray-300 rounded-md text-center text-xl" />
              <input className="w-10 h-10 border border-gray-300 rounded-md text-center text-xl" />
              <input className="w-10 h-10 border border-gray-300 rounded-md text-center text-xl" />
              <input className="w-10 h-10 border border-gray-300 rounded-md text-center text-xl" />
         
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
          <p className="font-bodoni text-sm text-gray-500 pt-5"> Didnt get an Otp <span className=" text-blue-600 hover:underline">Resent It</span> </p>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
