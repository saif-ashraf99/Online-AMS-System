import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import AuctionDetails from "./pages/AuctionDetails/AuctionDetails";
import ManageAuctions from "./pages/manage-auctions/ManageAuctions";
import AddAuction from "./pages/manage-auctions/AddAuction";
import UpdateAuction from "./pages/manage-auctions/UpdateAuction";
import Bidder from "./middleware/Bidder";
import Seller from "./middleware/Seller";
import Admin from "./middleware/Admin";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":id",
        element: <AuctionDetails />,
      },

      // BIDDER MIDDLEWARE
      {
        element: <Bidder />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      
      {
        path: "/manage-auctions",
        element: <Seller />,
        children: [
          {
            path: "",
            element: <ManageAuctions />,
          },
          {
            path: "add",
            element: <AddAuction />,
          },
          {
            path: ":id",
            element: <UpdateAuction />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
