import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Notfound from "./pages/Notfound/Notfound";
import Products from "./pages/Products/Products";
import ShoppingCard from "./pages/ShoppingCard/ShoppingCard";
import Thankyou from "./pages/Thankyou/Thankyou";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/shoppingcard",
    element: <ShoppingCard />,
  },
  {
    path: "/thankyou",
    element: <Thankyou />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
