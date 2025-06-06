import { useRecoilState } from "recoil";
import { toggleAtom } from "../../../store/atoms";

export function Subheading() {
  const [toggle, setToggle] = useRecoilState(toggleAtom);
  return (
    <div className=" w-[250px] flex justify-center p-1 text-[13px] font-medium text-gray-500 h-[40px]">
      <div className="flex justify-between w-[197px]">
        <div>
          {!toggle ? "Already have an account?" : "Don't have an account"}
        </div>
        <div
          onClick={() => {
            setToggle((d: boolean) => {
              return !d;
            });
          }}
          className="underline underline-offset-4 cursor-pointer text-blue-800"
        >
          {!toggle ? "Login" : "Sign Up"}
        </div>
      </div>
    </div>
  );
}
