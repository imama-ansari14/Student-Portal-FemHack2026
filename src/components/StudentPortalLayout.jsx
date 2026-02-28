import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "./Navbar";

const StudentPortalLayout = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar receives user prop */}
      <StudentNavbar user={user} />

      {/* Page content */}
      <main className="pt-4 px-4 md:px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentPortalLayout;
