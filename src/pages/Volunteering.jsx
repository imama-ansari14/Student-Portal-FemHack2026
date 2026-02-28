import { useState } from "react";
import { HandHeart, CalendarCheck, Users } from "@phosphor-icons/react";
import { supabase } from "../lib/supabase";

const Volunteering = ({ user }) => {
  const [form, setForm] = useState({
    full_name: "",
    interest: "",
    availability: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase.from("volunteering").insert([
        {
          user_id: user?.id || null, // optional now
          full_name: form.full_name,
          interest: form.interest,
          availability: form.availability,
        },
      ]);

      if (error) {
        alert("Error: " + error.message);
        console.log(error);
        return;
      }

      alert("Application submitted successfully 🚀");

      // reset form
      setForm({
        full_name: "",
        interest: "",
        availability: "",
      });

    } catch (err) {
      alert("Something went wrong!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Become a Volunteer
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Join hands with Saylani and make a meaningful impact in the community.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-slate-900/70 rounded-3xl p-10">
        <h2 className="text-2xl font-bold mb-8 text-indigo-400">
          Volunteer Application Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-4 bg-slate-800 rounded-xl"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Area of Interest"
            required
            className="w-full p-4 bg-slate-800 rounded-xl"
            value={form.interest}
            onChange={(e) =>
              setForm({ ...form, interest: e.target.value })
            }
          />

          <select
            required
            className="w-full p-4 bg-slate-800 rounded-xl"
            value={form.availability}
            onChange={(e) =>
              setForm({ ...form, availability: e.target.value })
            }
          >
            <option value="">Select Availability</option>
            <option value="Weekends">Weekends</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Flexible">Flexible</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 py-4 rounded-xl font-semibold"
          >
            {loading ? "Submitting..." : "Apply Now"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Volunteering;
