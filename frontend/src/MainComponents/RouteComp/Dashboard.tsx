import { useRecoilValue } from "recoil";
import { toggleAtom } from "../../store/atoms";
import { FrontRight } from "./MiniComp/FrontRight";
import { SignUpBox } from "./MiniComp/SignUpBox";
import { SignInBox } from "./MiniComp/SignInBox";

export default function Dashboard() {
  const toggle = useRecoilValue(toggleAtom);
  return (
    <div className="grid grid-cols-10 h-screen w-screen">
      <div className="cols col-span-5  flex justify-center items-center">
        {toggle ? <SignInBox></SignInBox> : <SignUpBox></SignUpBox>}
      </div>
      <div className="cols col-span-5 w-full h-full">
        <FrontRight></FrontRight>
      </div>
    </div>
  );
}
