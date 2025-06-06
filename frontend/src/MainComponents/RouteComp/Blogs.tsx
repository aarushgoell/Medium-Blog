import axios from "axios";
import { useEffect, useState } from "react";
import { ComponenLoader } from "./MiniComp/ComponentLoader";
import { TopBar } from "./MiniComp/TopBar";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  return (
    <div>
      <TopBar></TopBar>
      <div className="flex justify-center mt ">
        <div className="h-screen overflow-y-scroll">
          <div className="w-[700px] mt-20">
            <Boxes></Boxes>
          </div>
          <style>
            {`
      div::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
    `}
          </style>
        </div>
      </div>
    </div>
  );
}

function useGetContent() {
  const [resp, setResp] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_Backend_URL}/api/v1/blog/bulk`, {
      // .get("http://localhost:8787/api/v1/blog/bulk", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((d) => {
        setResp(d.data.Allblogs);
      });
  }, []);

  return resp;
}

function Boxes() {
  const resp = useGetContent();
  const navigate = useNavigate();
  if (!resp.length) {
    return (
      <div>
        <ComponenLoader></ComponenLoader>
      </div>
    );
  }

  return (
    <div>
      {resp?.map((blo: any, key) => {
        const readableDate = new Date(blo.createdAt).toLocaleDateString();
        const words = blo.content.split(" ").length;
        const readTime = Math.ceil(words / 200);
        return (
          <div
            onClick={() => {
              navigate(`/blog/specific/${blo.id}`, {
                state: { date: readableDate },
              });
            }}
            key={key}
            className="my-10  border cursor-pointer border-gray-100 shadow-sm px-3 py-2"
          >
            <div>
              <div className="flex">
                <div className="w-7 h-6  flex justify-center items-center rounded-xl bg-gray-300">
                  <div>{blo.name[0].toUpperCase()}</div>
                </div>
                <div className=" flex justify-between w-[160px] ml-3">
                  <div>{blo.name}</div>
                  <div>{readableDate}</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-[33px] font-bold">{blo.title}</div>
                <div className=" text-[16px]">{blo.content}</div>
              </div>
              <div className="">{readTime}min (read)</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
