import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, X, SignOut } from "@phosphor-icons/react";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.webp";

const StudentNavbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/student-portal" className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-11 h-11 object-contain" />
            <span className="text-white text-lg font-bold hidden sm:block">
              Saylani Mass IT Hub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
            <Link to="/student-portal" className="hover:text-indigo-400">
              Home
            </Link>
            <Link
              to="/student-portal/lost-found"
              className="hover:text-indigo-400"
            >
              Lost & Found
            </Link>
            <Link
              to="/student-portal/complaints"
              className="hover:text-indigo-400"
            >
              Complaints
            </Link>
            <Link
              to="/student-portal/volunteering"
              className="hover:text-indigo-400"
            >
              Volunteering
            </Link>
          </div>

          {/* User Info */}
          {user && (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="w-10 h-10 rounded-full border border-white/20"
                />
                <span className="text-slate-300 text-sm max-w-[120px] truncate">
                  {user.user_metadata?.full_name || "Student"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-white font-semibold transition shadow-lg shadow-indigo-600/20"
              >
                <SignOut size={18} />
                Logout
              </button>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-300"
          >
            {open ? <X size={26} /> : <List size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900/95 border-t border-white/10 px-6 py-6 space-y-4 text-slate-300">
          <Link onClick={() => setOpen(false)} to="/student-portal">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} to="/student-portal/lost-found">
            Lost & Found
          </Link>
          <Link onClick={() => setOpen(false)} to="/student-portal/complaints">
            Complaints
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="/student-portal/volunteering"
          >
            Volunteering
          </Link>

          {user && (
            <button
              onClick={handleLogout}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-white font-bold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
