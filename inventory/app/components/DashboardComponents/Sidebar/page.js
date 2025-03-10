"use client";

import { Archive, CircleDollarSign, Clipboard, Layout, SlidersHorizontal, User } from "lucide-react";
import { TiArrowForwardOutline } from "react-icons/ti"; // Ensure this import is correct
import { Workflow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { TbReport } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaBox, FaTruck, FaFileInvoice, FaReceipt, FaMoneyBillWave, FaUndo, FaStickyNote } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaBoxes, FaLayerGroup, FaBalanceScale, FaTags, FaWarehouse, FaCubes } from "react-icons/fa";

const SidebarLink = ({ href, icon: Icon, label, isCollapsed, hasSubmenu, submenuItems }) => {
  const pathname = usePathname();

  // Check if the current path exactly matches the href
  const isActive = pathname === href;

  // Check if any submenu item is active
  const isSubmenuActive = submenuItems?.some((item) => pathname.startsWith(item.href));

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleArrowClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the arrow
    setDropdownOpen(!isDropdownOpen);
    console.log("Dropdown toggled. New state:", !isDropdownOpen); // Debugging
  };

  // Debugging logs
  console.log("hasSubmenu:", hasSubmenu);
  console.log("isCollapsed:", isCollapsed);

  return (
    <div>
      {/* Main Link (Navigates Properly) */}
      <Link href={href} passHref>
        <div
          className={`cursor-pointer flex items-center justify-between ${
            isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
          } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
            (isActive && !isSubmenuActive) || (isSubmenuActive && !hasSubmenu)
              ? "bg-blue-200 text-white"
              : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 ml-5 !text-gray-700" />
            {!isCollapsed && <span className="font-medium text-gray-700">{label}</span>}
          </div>

          {/* Arrow Icon - Toggles Submenu Only */}
          {!isCollapsed && hasSubmenu && (
            <div onClick={handleArrowClick} className="cursor-pointer">
              <TiArrowForwardOutline
                className={`w-4 h-4 text-gray-500 transform ${
                  isDropdownOpen ? "rotate-90" : ""
                }`}
              />
            </div>
          )}
        </div>
      </Link>

      {/* Submenu Items */}
      {!isCollapsed && hasSubmenu && isDropdownOpen && (
        <div className="pl-12">
          {submenuItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <div
                className={`cursor-pointer flex items-center justify-start px-8 py-2 hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
                  pathname.startsWith(item.href) ? "bg-blue-200 text-white" : ""
                }`}
              >
                <item.icon className="w-4 h-4 !text-gray-700" />
                <span className="font-medium text-gray-700">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isSidebarCollapsed }) => {
  // Responsive sidebar width based on screen size
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed
      ? "w-0 sm:w-16 md:w-16 lg:w-16" // Collapsed width for all screen sizes
      : "w-72 sm:w-64 md:w-64 lg:w-72" // Expanded width for all screen sizes
  } bg-white transition-all duration-300 overflow-y-auto h-full shadow-md z-40 scrollbar-transparent`;

  // Inventory Submenu Items
  const inventorySubmenuItems = [
    { href: "/dashboard/inventory/items/new", icon: FaBoxes, label: "Articles" },
    { href: "/dashboard/inventory/categories", icon: FaTags, label: "Catégories" },
    { href: "/dashboard/inventory/brands/", icon: FaLayerGroup, label: "Marques" },
    { href: "/dashboard/inventory/warehouse/new", icon: FaWarehouse, label: "Entrepôt" },
    { href: "/dashboard/inventory/adjustments", icon: FaBalanceScale, label: "Ajustement des stocks" },
  ];

  // Sales Submenu Items
  const salesSubmenuItems = [
    { href: "/dashboard/sales/customers", icon: FaUserGroup, label: "Clients" },
    { href: "/dashboard/sales/orders", icon: HiOutlineShoppingCart, label: "Commandes de vente" },
    { href: "/dashboard/sales/invoices", icon: FaFileInvoice, label: "Factures" },
    { href: "/dashboard/sales/payments", icon: FaMoneyBillWave, label: "Paiements reçus" },
    { href: "/dashboard/sales/receipts", icon: FaReceipt, label: "Reçus de vente" },
    { href: "/dashboard/sales/packages", icon: FaBox, label: "Colis" },
    { href: "/dashboard/sales/shipments", icon: FaTruck, label: "Expéditions" },
    { href: "/dashboard/sales/returns", icon: FaUndo, label: "Retours de vente" },
    { href: "/dashboard/sales/credit-notes", icon: FaStickyNote, label: "Avoirs" },
    {
      href: "/dashboard/sales/discounts", // Use "#" for parent items that don't navigate
      icon: FaTags,
      label: "Remise",
      hasSubmenu: true, // Ensure this is set to true
      submenuItems: [
        { href: "/dashboard/sales/discounts/create", icon: FaTags, label: "Créer une Remise" },
        { href: "/dashboard/sales/discounts/list", icon: FaTags, label: "Liste des Remises" },
        { href: "/dashboard/sales/discounts/apply", icon: FaTags, label: "Appliquer une Remise" },
      ],
    },
  ];

  // Expenses Submenu Items
  const expensesSubmenuItems = [
    { href: "/dashboard/expenses/bills", icon: CircleDollarSign, label: "Bills" },
    { href: "/dashboard/expenses/suppliers", icon: CircleDollarSign, label: "Suppliers" },
  ];

  return (
    <div className={sidebarClassNames}>
      {/* Logo */}
      <div
        className={`flex gap-3 justify-center md:justify-start items-center pt-7 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Image src="/mgm1.svg" alt="MGM-logo" width={27} height={27} className="w-11" />
        {!isSidebarCollapsed && <h1 className="font-bold font-serif text-xl">NEGOCE</h1>}
      </div>

      {/* Sidebar Links */}
      <div className="flex-grow mt-8 font-serif text-xs">
        <SidebarLink href="/dashboard" icon={Layout} label="Tableau de bord" isCollapsed={isSidebarCollapsed} />
        <SidebarLink
          href="/dashboard/inventory"
          icon={Archive}
          label="Inventaire"
          isCollapsed={isSidebarCollapsed}
          hasSubmenu={true}
          submenuItems={inventorySubmenuItems}
        />
        <SidebarLink
          href="/dashboard/sales"
          icon={TbShoppingCart}
          label="Ventes"
          isCollapsed={isSidebarCollapsed}
          hasSubmenu={true}
          submenuItems={salesSubmenuItems}
        />
        <SidebarLink
          href="/dashboard/expenses"
          icon={CircleDollarSign}
          label="Dépenses"
          isCollapsed={isSidebarCollapsed}
          hasSubmenu={true}
          submenuItems={expensesSubmenuItems}
        />
        <SidebarLink href="/dashboard/products" icon={Clipboard} label="Produits" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/dashboard/users" icon={User} label="Utilisateurs" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/dashboard/integration" icon={Workflow} label="Intégrations" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/dashboard/reports" icon={TbReport} label="Rapports" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/dashboard/settings" icon={SlidersHorizontal} label="Réglages" isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Footer */}
      {!isSidebarCollapsed && (
        <div className="mb-10">
          <p className="text-center text-xs text-gray-500">&copy; 2025 MGM NEGOCE Sarl</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;