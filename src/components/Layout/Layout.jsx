import { Suspense } from "react";
// import { ClipLoader } from "react-spinners";

import Header from "../Header/Header.jsx";
import Loader from "../../shared/Loader/Loader.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <main>{children}</main>
      </Suspense>
    </>
  );
};

export default Layout;
