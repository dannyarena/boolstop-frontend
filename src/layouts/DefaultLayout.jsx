import { Outlet } from "react-router";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
export default function DefaultLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
