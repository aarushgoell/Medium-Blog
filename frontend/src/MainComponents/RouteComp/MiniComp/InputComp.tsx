export function InputComp({ setvalue, content, valu, place }: any) {
  return (
    <div className="my-3">
      <div className="font-medium ">{content}</div>
      <div className="mt-3">
        <input
          type={valu}
          placeholder={place}
          className="px-3 w-full py-1 focus:outline-none border-1 rounded-l border-gray-300"
          onChange={(e) => {
            setvalue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
