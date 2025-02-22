"use client";

import { usePathname } from "next/navigation";
import HomeLayout from "./home/HomeLayout";
import Dashboard from "./home/dashboard/page";
import GettingStarted from "./home/getting-started/page";
import RecentUpdates from "./home/recent-updates/page";
import Announcements from "./home/announcements/page";
import Inventory from "./inventory/page";
import Sales from "./sales/page";
import Expenses from "./expenses/page";
import Products from "./products/page";
import Users from "./users/page";
import Integration from "./integrations/page";
import Reports from "./reports/page";
import Settings from "./settings/page";


export default function DashboardPage() {
  const pathname = usePathname();

  // Render the correct component based on the route
  const renderContent = () => {
    if (pathname.startsWith("/dashboard/home")) {
      switch (pathname) {
        case "/dashboard/home/getting-started":
          return (
            <HomeLayout>
              <GettingStarted />
            </HomeLayout>
          );
        case "/dashboard/home/recent-updates":
          return (
            <HomeLayout>
              <RecentUpdates />
            </HomeLayout>
          );
        case "/dashboard/home/announcements":
          return (
            <HomeLayout>
              <Announcements />
            </HomeLayout>
          );
        default:
          return (
            <HomeLayout>
              <Dashboard />
            </HomeLayout>
          );
      }
    } else {
      switch (pathname) {
        case "/dashboard/inventory":
          return <Inventory />;
        case "/dashboard/sales":
          return <Sales />;
        case "/dashboard/expenses":
          return <Expenses />;
        case "/dashboard/products":
          return <Products />;
        case "/dashboard/users":
          return <Users />;
        case "/dashboard/integration":
          return <Integration />;
        case "/dashboard/reports":
          return <Reports />;
        case "/dashboard/settings":
          return <Settings />;
        default:
          return (
            <HomeLayout>
              <Dashboard />
            </HomeLayout>
          );
      }
    }
  };

  return <>{renderContent()}</>;
}