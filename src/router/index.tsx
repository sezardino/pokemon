import { RouteObject, createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../components/layout/BaseLayout";
import { ProjectUrl } from "../const/project-url";
import { HomePage } from "../pages/home";

const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      {
        path: ProjectUrl.Home,
        element: <HomePage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
