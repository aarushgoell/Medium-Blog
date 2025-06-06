export function LeftSpecBlog({ title, content, date }: any) {
  return (
    <div>
      <div className="font-bold  text-[50px] font ">{title}</div>
      <div className="text-gray-500 mt-4 font-medium">Posted on {date}</div>

      <div className="font-serif mt-10 text-justify">{content}</div>
    </div>
  );
}
