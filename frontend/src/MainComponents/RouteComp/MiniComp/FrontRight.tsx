import axios from "axios";
import { useEffect, useState } from "react";
import { toggleAtom } from "../../../store/atoms";
import { useRecoilValue } from "recoil";

type qtyp = {
  q: string;
  a: string;
};

function useQuoteGenerator() {
  const [quote, setQuote] = useState<qtyp | null>(null);
  const toggle = useRecoilValue(toggleAtom);

  useEffect(() => {
    // axios.get("https://zenquotes.io/api/random").then((resp) => {
    axios.get(`${import.meta.env.VITE_QUOTE_URL}`).then((resp) => {
      setQuote(resp.data[0]);
    });
  }, [toggle]);

  return quote;
}

export function FrontRight() {
  const quote = useQuoteGenerator();

  return (
    <div className="bg-gray-100 w-full h-full flex justify-center items-center">
      <div className=" w-[500px] h-[200px]">
        <div className="font-bold text-[27px] text-black/87">
          {quote ? '"' + quote["q"] + '"' : null}
        </div>
        <div className="font-medium font- mt-3 text-l">
          {quote ? quote["a"] : null}
        </div>
      </div>
    </div>
  );
}
