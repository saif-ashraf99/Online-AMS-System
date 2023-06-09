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
import ManageAccounts from "./pages/manage-accounts/AccountsDetails";

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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      // BIDDER MIDDLEWARE
      {
        element: <Bidder />,
        children: [
          {
            path: "",
            element: <AuctionDetails />,
          },
          {
            path: "/bid",
            element: <AuctionDetails />,
          },
        ],
      },
      // SELLER MIDDLEWARE
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
      //ADMIN MIDDLEWARE
      {
        path: "/users",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageAccounts />,
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
