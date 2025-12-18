import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { TrashIcon, UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // logged-in user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get current logged-in user
        const meRes = await axios.get(`${API_URL}/auth/me`, {
          headers: getAuthHeaders(),
        });
        setCurrentUser(meRes.data.user);

        // 2️⃣ Get all users
        const usersRes = await axios.get(`${API_URL}/users`, {
          headers: getAuthHeaders(),
        });
        setUsers(usersRes.data.users);
      } catch (err) {
        setError(err.response?.data?.msg || err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (userId === currentUser?._id) {
      alert("You can't delete yourself!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_URL}/users/${userId}`, {
        headers: getAuthHeaders(),
      });
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.response?.data?.msg || err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage all registered users</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Registered Users ({users.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u, index) => (
                  <motion.tr
                    key={u._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {u.firstName?.[0]}
                            {u.lastName?.[0]}
                          </span>
                        </div>
                        <span className="text-white font-medium">
                          {u.firstName} {u.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          u.role === "admin"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {u.role === "admin" ? (
                          <ShieldCheckIcon className="w-4 h-4" />
                        ) : (
                          <UserIcon className="w-4 h-4" />
                        )}
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {u._id !== currentUser?._id && (
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AdminDashboard;
