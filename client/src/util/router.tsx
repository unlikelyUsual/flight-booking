import { FlightsHome } from "@pages/FlightsHome";
import { FlightsSearch } from "@pages/FlightsSearch";
import { Layout } from "@shared/layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <FlightsHome />,
      },
      {
        path: "/flights",
        children: [
          { index: true, element: <FlightsHome /> },
          {
            path: "search",
            element: <FlightsSearch />,
          },
        ],
      },
    ],
  },
]);
export { router };
