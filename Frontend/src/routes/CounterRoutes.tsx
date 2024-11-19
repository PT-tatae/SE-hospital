import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/Loadable/Loadable";
import FullLayout from "../layouts/FullLayout";

const ManageRoom = Loadable(lazy(() => import("../pages/counter/Counter1")));
const Counter2 = Loadable(lazy(() => import("../pages/counter/Counter2")));

const CounterRoutes = (): RouteObject[] => {
  return [
    {
      path: "/", // ใช้ /* เพื่อรองรับเส้นทางย่อย
      element: <FullLayout />,
      children: [
        {
          path: "/ManageRoom",
          element: <ManageRoom />,
        },
        {
          path: "/counter2",
          element: <Counter2 />,
        },
      ],
    },
  ];
};

export default CounterRoutes;
