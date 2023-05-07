import { type FC } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { ProjectUrl } from "../../const/project-url";
import { Navigation } from "./Navigation";

const Links = [
  { label: "Favorites", href: ProjectUrl.Favorites },
  { label: "Arena", href: ProjectUrl.Arena },
  // { label: "Login", href: ProjectUrl.Favorites },
  // { label: "Registration", href: ProjectUrl.Favorites },
  // { label: "Edit", href: ProjectUrl.Favorites },
  // { label: "Logout", href: ProjectUrl.Favorites },
];

export const BaseLayout: FC = () => {
  const { location } = useNavigation();

  return (
    <>
      <Navigation />

      <main>
        <Outlet />
      </main>
    </>
  );
};
