import Cookies from "js-cookie";
import axios from "axios";

export const login = async (email: string, password: string) => {
  const responce = await axios.post(`${process.env.API_LOCAL}/auth/signup`, {
    email,
    password,
  });
  const { access_token } = responce.data;

  Cookies.set("accessToken", access_token, { secure: true });
};

export const signin = async (email: string, password: string) => {
  const responce = await axios.post(`${process.env.API_LOCAL}/auth/signin`, {
    email,
    password,
  });
  const { access_token } = responce.data;

  Cookies.set("accessToken", access_token, { secure: true });
};

export const logout = () => {
  Cookies.remove("accessToken");
};
