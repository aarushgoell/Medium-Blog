import axios from "axios";

import type { signInParam, signUpParam } from "@rushh/medium";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toggleAtom, userAtom } from "../../../store/atoms";
import { useState } from "react";

export function ButtonComp({ name, email, password }: any) {
  const navigate = useNavigate();
  const toggle = useRecoilValue(toggleAtom);
  const [dospinner, setDospinnrer] = useState(false);

  const setUser = useSetRecoilState(userAtom);

  const signUpBody: signUpParam = {
    name,
    email,
    password,
  };

  const signInBody: signInParam = {
    email,
    password,
  };

  return (
    <>
      <div
        onClick={async () => {
          try {
            const resp = await axios.post(
              // `http://localhost:8787/api/v1/user/${
              `${import.meta.env.VITE_Backend_URL}/api/v1/user/${
                !toggle ? "signup" : "signin"
              }`,
              !toggle ? signUpBody : signInBody,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            setDospinnrer(true);
            localStorage.setItem("token", resp.data.token);
            setUser(email);
            navigate("/blogs");
          } catch (e: any) {
            console.log(e.response.data);
            const { message } = e.response.data;
            alert(message);
          }
        }}
        className="w-full bg-black/87 text-white font-bold flex justify-center py-2 rounded-xl cursor-pointer"
      >
        {!toggle ? "Sign Up" : "Sign In"}
      </div>
      {dospinner ? (
        <div className="flex items-center justify-center mt-2 ">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : null}
    </>
  );
}
