import { useState } from "react";
import { ButtonComp } from "./ButtonComp";
import { Heading } from "./Heading";
import { InputComp } from "./InputComp";
import { Subheading } from "./Subheading";

export function SignInBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-[320px] h-[330px] p-3">
      <div className="w-[300px] h-[400px] px-2">
        <div className="flex justify-center">
          <Heading text={"Login"}></Heading>
        </div>
        <div className="flex justify-center ">
          <Subheading></Subheading>
        </div>
        <InputComp
          setvalue={setEmail}
          content={"Email"}
          valu={"text"}
          place={"Enter your email"}
        ></InputComp>
        <InputComp
          setvalue={setPassword}
          content={"Password"}
          valu={"password"}
          place={"Enter your password"}
        ></InputComp>
        <ButtonComp email={email} password={password}></ButtonComp>
      </div>
    </div>
  );
}
