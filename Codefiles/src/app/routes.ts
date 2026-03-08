import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { StockMarketPage } from "./pages/StockMarketPage";
import { StockDetailsPage } from "./pages/StockDetailsPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { WatchlistPage } from "./pages/WatchlistPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { AdminPage } from "./pages/AdminPage";
import { ProfilePage } from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "market",
        Component: StockMarketPage,
      },
      {
        path: "stock/:id",
        Component: StockDetailsPage,
      },
      {
        path: "portfolio",
        Component: PortfolioPage,
      },
      {
        path: "watchlist",
        Component: WatchlistPage,
      },
      {
        path: "transactions",
        Component: TransactionsPage,
      },
      {
        path: "admin",
        Component: AdminPage,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
    ],
  },
]);