export function ComponenLoader() {
  return (
    <div>
      <DummyContainer></DummyContainer>
      <DummyContainer></DummyContainer>
      <DummyContainer></DummyContainer>
    </div>
  );
}


function DummyContainer(){


    return <div className="w-[600px] mt-10 my-10  border border-gray-300 shadow-md h-[150px] bg-gray-100">
        
    </div>

}

