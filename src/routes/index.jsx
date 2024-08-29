import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/Auth/Auth";
import DashboardHome from "../pages/Main/DashboardHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <DashboardHome />
            }
        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "/auth",
                element: <Login />,
            },
            {
                path: "login",
                element: <Login />,
            }
        ]
    }
  /* {
    path: "*",
    element: <NotFound />,
  }, */
]);

export default router;
