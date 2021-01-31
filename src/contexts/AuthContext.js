import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import authReducer from "../reducers/authReducer";

import baseConfig from "../configs/BASE";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, dispatch] = useReducer(authReducer, {}, () => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : {};
  });
  const checkPhone = (phone) => {
    const baseUrl = baseConfig.URL;
    const url = `${baseUrl}/api/griddata/OTPVER/${phone}/signup`;
    axios({
      method: "get",
      url: `${url}`,
      // data: {
      //   phone: phone,
      //   type: "signup",
      // },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("otp response", res.data[0].oTP_Code);
          let check = true;
          let otp = res.data[0].oTP_Code;
          if (check) {
            dispatch({
              type: "CHECK_PHONE",
              payload: { check, otp },
            });
          }
        }
      })
      .catch((err) => {
        console.log("otp err", err);
      });

    console.log("phone", phone);
  };
  const checkLogin = (phone) => {
    dispatch({
      type: "LOGIN",
      payload: { isAuth: true, name: phone },
    });
  };

  const logOut = () => {
    dispatch({
      type: "LOGOUT",
      payload: {},
    });
    window.location.replace("/login");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [checkLogin]);
  return (
    <AuthContext.Provider value={{ user, checkLogin, checkPhone, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
