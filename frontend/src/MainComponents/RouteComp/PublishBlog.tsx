import { useRef } from "react";
import { TopBar } from "./MiniComp/TopBar";
import axios from "axios";

export default function PublishBlog() {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    async function pub() {
      try {
        const resp = await axios.post(
          `
          ${import.meta.env.VITE_Backend_URL}/api/v1/blog`,
          {
            title: data.title,
            content: data.content,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        alert(resp.data.message);
      } catch (e: any) {
        const { message } = e.response.data;
        alert(message);
      }
    }
    pub();
  };
  return (
    <>
      <TopBar></TopBar>

      <div className="mt-30">
        <form ref={formRef} className="mt-10 ">
          <div className="px-4 py-2 border bg-white rounded-b-lg mx-3 w-215">
            <input
              name="title"
              className="focus:outline-none text-3xl w-full"
              type="text"
              placeholder="Title"
            />
            <textarea
              name="content"
              id="editor"
              className="block h-48 w-208 px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none mt-3 "
              placeholder="Write your blog here..."
              required
            ></textarea>
          </div>

          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ml-3 mt-5"
          >
            Publish blog
          </button>
        </form>
      </div>
    </>
  );
}
