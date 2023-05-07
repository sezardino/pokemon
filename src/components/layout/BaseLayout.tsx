import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export const BaseLayout: FC = () => {
  return (
    <>
      <Navigation />

      <main>
        <Outlet />
      </main>
    </>
  );
};
