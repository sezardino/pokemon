import { RouteObject, createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../components/layout/BaseLayout";
import { ProjectUrl } from "../const/project-url";

const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      {
        path: ProjectUrl.Home,
        element: <div>home</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
