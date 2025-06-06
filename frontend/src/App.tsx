import { lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SpinnerLoader } from "./MainComponents/RouteComp/MiniComp/SpinnerLoader";

const Blogs = lazy(() => {
  return import("./MainComponents/RouteComp/Blogs");
});
const Dashboard = lazy(() => {
  return import("./MainComponents/RouteComp/Dashboard");
});
const PublishBlog = lazy(() => {
  return import("./MainComponents/RouteComp/PublishBlog");
});
const SpecificBlog = lazy(() => {
  return import("./MainComponents/RouteComp/SpecificBlog");
});

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Suspense fallback={<SpinnerLoader></SpinnerLoader>}>
          <Routes>
            <Route path="/blogs" element={<Blogs></Blogs>} />
            <Route path="/" element={<Dashboard></Dashboard>} />
            <Route path="/publish" element={<PublishBlog></PublishBlog>} />
            <Route
              path="/blog/specific/:id"
              element={<SpecificBlog></SpecificBlog>}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
