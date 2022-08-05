import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authProvider";
import { clearCookies, setTokenCookies } from "../helper/auth";
import { httpDefault } from "../services/http";

const useLogin = () => {
  const [information, setInformation] = useState({});
  const { setAuth } = useContext(AuthContext);
  const { userName, password } = information;

  useEffect(() => {
    httpDefault
      .post("/Account/SignIn", {
        userName,
        password,
      })
      .then((response) => {
        if (response?.status === 200) {
          const tokenData = response?.data?.data;
          const tokenInfo = {
            accessToken: tokenData?.accessToken,
            tokenExpiration: tokenData?.accessTokenExpirationTime,
            refreshToken: tokenData?.refreshToken,
            refreshTokenExpiration: tokenData?.refreshTokenExpirationTime,
          };
          setAuth((prev) => ({
            ...prev,
            isLogin: true,
            error: null,
            ...tokenInfo,
          }));
          setTokenCookies(tokenInfo);
        }
      })
      .catch((error) => {
        setAuth((prev) => ({
          ...prev,
          isLogin: false,
          accessToken: null,
          tokenExpiration: null,
          refreshToken: null,
          refreshTokenExpiration: null,
          error: error?.response,
        }));
        clearCookies();
      });
  }, [information]);

  return { setInformation };
};

export default useLogin;