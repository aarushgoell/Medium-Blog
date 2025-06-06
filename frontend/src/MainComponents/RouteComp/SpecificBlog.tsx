import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LeftSpecBlog } from "./MiniComp/LeftSpecBlog";
import { RightSpecBlog } from "./MiniComp/RightSpecBlog";
import { TopBar } from "./MiniComp/TopBar";
import { SpinnerLoader } from "./MiniComp/SpinnerLoader";

function useGetBlog(id: any) {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_Backend_URL}/api/v1/blog/specific/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((d) => {
          setBlog(d.data.blog);
        });
    } catch (e: any) {
      const { message } = e.response.data;
      alert(message);
    }
  }, []);

  return blog;
}

export default function SpecificBlog() {
  const { id } = useParams();
  const blog = useGetBlog(id);
  // const { date } = useLocation().state;
  if (!blog) return <SpinnerLoader></SpinnerLoader>;
  const { title, content, name, createdAt } = blog;
  const readableDate = new Date(createdAt).toLocaleDateString();

  return (
    <div>
      <TopBar></TopBar>
      <div className="grid grid-cols-10 h-screen w-screen pt-22 pl-12">
        <div className="cols col-span-7">
          <LeftSpecBlog
            title={title}
            content={content}
            date={readableDate}
          ></LeftSpecBlog>
        </div>
        <div className="cols col-span-3 mt-4">
          <RightSpecBlog name={name}></RightSpecBlog>
        </div>
      </div>
    </div>
  );
}
