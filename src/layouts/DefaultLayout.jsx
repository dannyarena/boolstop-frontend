import { Outlet } from "react-router";
import { NavLink } from "react-router";
import Header from "../components/Header";

import CartModalComponent from "../components/CartModalComponents";

export default function DefaultLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
        <CartModalComponent />
      </main>
    </>
  );
}
