import { useEffect, useState } from "react";
import { clearCookies } from "../../helper/auth";
import { httpDefault } from "../../services/http";
import useAuth from "./useAuth";

const useForgotPassword = () => {
  const [information, setInformation] = useState({});
  const { setAuth } = useAuth();
  const { userName } = information;

  useEffect(() => {
    httpDefault
      .post("/Account/ForgetPassword", {
        userName,
      })
      .then((res) => {
        if (res.status === 200) {
          // sending verification code to user and redirect him/her to verification-code page

          setAuth((prev) => ({
            ...prev,
            isLogin: false,
            accessToken: null,
            tokenExpiration: null,
            refreshToken: null,
            refreshTokenExpiration: null,
            error: null,
          }));
          clearCookies();

          console.log("ForgetPassword", res);
        }
      })
      .catch((err) => {
        // show error message
        console.log("ForgetPassword", err);
      });
  }, [information]);

  return { setInformation };
};

export default useForgotPassword;
