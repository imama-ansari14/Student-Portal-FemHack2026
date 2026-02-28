import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from ".././lib/supabase";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  Users,
  ClipboardText,
  Archive,
  HandsClapping,
  SignOut,
  House,
} from "@phosphor-icons/react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Professional Confirmation Dialog
    const result = await Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to end your session?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#1f2937",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Stay Logged In",
      background: "#111827", // gray-900
      color: "#ffffff",
      iconColor: "#3b82f6", // blue-500
      customClass: {
        popup: "rounded-2xl border border-gray-700 shadow-2xl",
        confirmButton: "px-6 py-2 rounded-lg font-semibold",
        cancelButton:
          "px-6 py-2 rounded-lg font-semibold border border-gray-600",
      },
    });

    if (result.isConfirmed) {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        // Success Toast
        Swal.fire({
          title: "Logged Out!",
          text: "Ending secure session...",
          icon: "success",
          background: "#111827",
          color: "#ffffff",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/login"), 1500);
      } else {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          background: "#111827",
          color: "#ffffff",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white font-['Poppins']">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between border-r border-gray-700">
        <div>
          <div className="flex items-center gap-2 mb-8 text-blue-400">
            <House size={32} weight="fill" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Admin Panel
            </h2>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition-all duration-200 group"
              to="/admin-dashboard/complaints"
            >
              <ClipboardText size={22} className="group-hover:text-blue-400" />
              <span className="font-medium">Complaints</span>
            </Link>
            <Link
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition-all duration-200 group"
              to="/admin-dashboard/lost-found"
            >
              <Archive size={22} className="group-hover:text-blue-400" />
              <span className="font-medium">Lost & Found</span>
            </Link>
            <Link
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition-all duration-200 group"
              to="/admin-dashboard/volunteers"
            >
              <HandsClapping size={22} className="group-hover:text-blue-400" />
              <span className="font-medium">Volunteering</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 shadow-lg shadow-red-500/5"
        >
          <SignOut size={20} weight="bold" />
          <span className="font-semibold">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black">
        {/* Welcome Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Welcome Back, Admin 👋
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System online •{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="glassmorphism p-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
