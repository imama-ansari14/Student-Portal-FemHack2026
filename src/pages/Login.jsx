import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Envelope, Lock, SignIn, ArrowRight } from "@phosphor-icons/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hardcoded Admin Credentials
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "123456";
  const Toast = Swal.mixin({
    customClass: {
      popup:
        "rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-xl text-white shadow-2xl",
      title: "text-white font-bold text-xl",
      confirmButton:
        "bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20",
    },
    buttonsStyling: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        await Toast.fire({
          icon: "success",
          title: "Welcome Admin",
          text: "Access granted as Admin",
          timer: 2000,
          showConfirmButton: false,
        });
        setLoading(false); 
        navigate("/admin-dashboard");
        return;
      }

      // Normal Supabase authentication for other users
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const userRole = data.user?.user_metadata?.role;

      Toast.fire({
        icon: "success",
        title: "Welcome Back",
        text: `Access granted as ${userRole}`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/Student-Portal");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Access Denied",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-['Poppins']">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse delay-700"></div>

      <div className="w-full max-w-[1000px] grid lg:grid-cols-2 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Left Side: Visual/Branding */}
        <div className="p-16 hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-600/20 to-transparent border-r border-white/5">
          <div className="mb-12">
            <div className="h-14 w-14 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/40 transform -rotate-6">
              <SignIn className="text-white" size={32} weight="bold" />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
              Secure <span className="text-indigo-400">Gateway</span>
            </h1>
            <div className="h-1 w-12 bg-indigo-500 mt-4 rounded-full"></div>
          </div>
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">
            Enter your credentials to access your personalized learning
            environment and academic records.
          </p>
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span className="flex items-center gap-2 italic">
              ● Multi-factor Ready
            </span>
            <span className="flex items-center gap-2 italic">
              ● End-to-end Encrypted
            </span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Login
              </h2>
              <p className="text-slate-400 font-light">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Envelope
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-all duration-300"
                    size={20}
                  />
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800/40 border border-slate-700/50 p-4 pl-12 rounded-2xl text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                    placeholder="student@university.edu"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-all duration-300"
                    size={20}
                  />
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800/40 border border-slate-700/50 p-4 pl-12 rounded-2xl text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 mt-4 group active:scale-[0.98]"
              >
                {loading ? (
                  "Authenticating..."
                ) : (
                  <>
                    Sign In{" "}
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      weight="bold"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm italic">
                Don't have an account yet?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors not-italic"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
