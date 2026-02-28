import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Complaints = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Complaints
  const fetchComplaints = async () => {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();

    // Real-time subscription
    const channel = supabase
      .channel("complaints-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "complaints" },
        () => {
          fetchComplaints();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Submit Complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("complaints").insert([
      {
        user_id: user.id,
        full_name: user.user_metadata.full_name,
        email: user.email,
        category,
        description,
      },
    ]);

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Success", "Complaint Submitted!", "success");
      setCategory("");
      setDescription("");
    }

    setLoading(false);
  };

  const statusColor = (status) => {
    if (status === "Resolved") return "bg-green-500/20 text-green-400";
    if (status === "In Progress") return "bg-yellow-500/20 text-yellow-400";
    return "bg-indigo-500/20 text-indigo-400";
  };

  return (
    <>


      <div className="min-h-screen bg-[#0f172a] px-6 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* Form Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Submit Complaint
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-slate-300 text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full mt-2 bg-slate-800 border border-slate-700 p-3 rounded-xl text-white focus:border-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option>Internet</option>
                  <option>Electricity</option>
                  <option>Water</option>
                  <option>Maintenance</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 text-sm">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="w-full mt-2 bg-slate-800 border border-slate-700 p-3 rounded-xl text-white focus:border-indigo-500"
                  placeholder="Explain your issue..."
                ></textarea>
              </div>

              <button
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold shadow-lg shadow-indigo-600/20 transition"
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>
          </div>

          {/* Complaint List */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              My Complaints
            </h2>

            <div className="space-y-4">
              {complaints.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold">
                      {item.category}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm">
                    {item.description}
                  </p>

                  <p className="text-slate-500 text-xs mt-3">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Complaints;
