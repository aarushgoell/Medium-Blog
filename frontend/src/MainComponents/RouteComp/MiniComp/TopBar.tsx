import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../../store/atoms";

export function TopBar() {
  const navigate = useNavigate();
  const check = location.pathname;

  const firstName = useRecoilValue(userAtom);

  return (
    <div className="w-full h-[39px] flex justify-between pt-2 bg-gray-200 cursor-pointer fixed top-0  shadow z-50">
      <div
        onClick={() => {
          navigate("/blogs");
        }}
        className="font-bold ml-1.5"
      >
        Medium
      </div>

      <div className="w-[160px] flex justify-between">
        {check != "/publish" ? (
          <div
            onClick={() => {
              navigate("/publish");
            }}
            className="font-bold bg-black/80 rounded-xl px-3  pb-2 mb-1 ml-3 cursor-pointer text-white"
          >
            Publish
          </div>
        ) : (
          <div></div>
        )}
        <div className="w-7 h-6 flex justify-center items-center rounded-xl text-[20px] mr-2 bg-gray-300">
          <div>{firstName[0].toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
}
