import { Outlet } from "react-router-dom";
import AdminSideBar from "@/components/admin-view/sidebar";
import AdminHeader from "@/components/admin-view/header";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
