import * as React from "react";

import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
import { AccountBox, NotificationsNoneOutlined } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const menu = [
  {
    name: "Dashboard",
    path: "/salon-dashboard",
    icon: <DashboardIcon className="text-primary-color" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },
  {
    name: "Bookings",
    path: "/salon-dashboard/bookings",
    icon: <ShoppingBagIcon className="text-primary-color" />,
    activeIcon: <ShoppingBagIcon className="text-white" />,
  },
  {
    name: "Services",
    path: "/salon-dashboard/services",
    icon: <InventoryIcon className="text-primary-color" />,
    activeIcon: <InventoryIcon className="text-white" />,
  },
  {
    name: "Add Services",
    path: "/salon-dashboard/add-services",
    icon: <AddIcon className="text-primary-color" />,
    activeIcon: <AddIcon className="text-white" />,
  },
  {
    name: "Payment",
    path: "/salon-dashboard/payment",
    icon: <AccountBalanceWalletIcon className="text-primary-color" />,
    activeIcon: <AccountBalanceWalletIcon className="text-white" />,
  },
  {
    name: "Transaction",
    path: "/salon-dashboard/transaction",
    icon: <ReceiptIcon className="text-primary-color" />,
    activeIcon: <ReceiptIcon className="text-white" />,
  },
  {
    name: "Category",
    path: "/salon-dashboard/category",
    icon: <CategoryIcon className="text-primary-color" />,
    activeIcon: <CategoryIcon className="text-white" />,
  },
  {
    name: "Notifications",
    path: "/salon-dashboard/notifications",
    icon: <NotificationsNoneOutlined className="text-primary-color" />,
    activeIcon: <NotificationsNoneOutlined className="text-white" />,
  },

];

const menu2 = [
  
  {
    name: "Account",
    path: "/salon-dashboard/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-primary-color" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];



const SalonDrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SalonDrawerList;
