import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { sendForgetPasswordEmail } from "../../../Utils/API/Auth/auth_API";
import Loader from "../../common/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState({
    status: false,
    error: "",
  });
  const navigate = useNavigate();
  const validateEmail = (email) => {
    let errors = {};
    let success = true;
    if (email === "") {
      errors = {
        status: true,
        error: "Email id can not be empty",
      };
      success = false;
    }

    if (
      !email.includes("@") ||
      !email.includes(".") ||
      !email.includes("com")
    ) {
      errors = {
        status: true,
        error: "Invalid Email id",
      };
      success = false;
    }
    return { success, errors };
  };

  const forgetUserPassword = async () => {
    const { success, errors } = validateEmail(email);
    console.log(success, errors);
    if (success) {
      setLoading(true);
      try {
        const response = await sendForgetPasswordEmail(email);
        setLoading(false);
        toast.success(response.data.message);
        setSuccess(true);
      } catch (error) {
        toast.error(error.response.data);
        setLoading(false);
      }
    } else {
      setEmailError({ ...errors });
    }
  };
  return (
    <div className={`flex  justify-center my-5 mx-3`}>
      <ToastContainer />

      <div className={`flex flex-col gap-5 p-8 rounded-lg border-2`}>
        {!success ? (
          <>
            <h1 className={`text-center`}> Forget Password</h1>

            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 
						placeholder:text-sm
                        
						focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1`}
                placeholder="What is your email ?"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError({
                    status: false,
                    error: "",
                  });
                }}
              />
              {emailError.status ? (
                <p className={`text-red-500 text-xs  mx-1`}>
                  {emailError.error} *
                </p>
              ) : (
                ""
              )}
            </label>
          </>
        ) : (
          "Please Check your Registered Email "
        )}

        {/* Password input section */}

        {loading ? (
          <div className=" flex justify-center">
            <Loader message={"Sending mail"} />
          </div>
        ) : (
          <div className={`flex justify-center`}>
            {success ? (
              <button
                className={`  mt-3   bg-sky-500 hover:bg-sky-700 hover:text-white block w-28 h-10 rounded-full  `}
                onClick={() => {
                  navigate("/");
                }}
              >
                Go Back
              </button>
            ) : (
              <button
                className={`  mt-3   bg-sky-500 hover:bg-sky-700 hover:text-white block w-32 h-10 rounded-full `}
                onClick={forgetUserPassword}
              >
                Send Email
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
