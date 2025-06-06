export function RightSpecBlog({ name }: any) {
  return (
    <div className="ml-4">
      <div className="font-medium">Author</div>
      <div className="flex w-[300px]  h-[400px] mt-5">
        <div className="mt-7">
          <div className="w-[25px] bg-gray-300 rounded-xl flex justify-center items-center">
            <div>{name[0].toUpperCase()}</div>
          </div>
        </div>
        <div className="ml-3">
          <div className="font-bold text-[25px]">{name}</div>
          <div className="w-[260px] text-gray-500">
            Master of mirth, purveyor of puns and the funnies person in the
            kindom
          </div>
        </div>
      </div>
    </div>
  );
}
