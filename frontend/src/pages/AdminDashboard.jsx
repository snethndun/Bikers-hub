import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const db = getFirestore();
  const [users, setUsers] = useState([]);
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Users
      const usersSnapshot = await getDocs(collection(db, "users"));
      const userList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);

      // Fetch Garages
      const garagesSnapshot = await getDocs(collection(db, "garages"));
      const garageList = garagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGarages(garageList);
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
      setUsers(users.filter((user) => user.id !== userId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleDeleteGarage = async (garageId) => {
    try {
      const garageDocRef = doc(db, "garages", garageId);
      await deleteDoc(garageDocRef);
      setGarages(garages.filter((garage) => garage.id !== garageId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting garage: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        {/* Users List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            All Users
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-200 text-gray-600 uppercase text-left">
                <tr>
                  <th className="py-2 px-4">UID</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4">Actions</th>{" "}
                  {/* Added Actions Column */}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{user.id}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4 capitalize">
                      {user.role || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>{" "}
                    {/* Delete Button */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Garages List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            All Garages
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-200 text-gray-600 uppercase text-left">
                <tr>
                  <th className="py-2 px-4">Garage Name</th>
                  <th className="py-2 px-4">Owner</th>
                  <th className="py-2 px-4">Contact</th>
                  <th className="py-2 px-4">Open</th>
                  <th className="py-2 px-4">Close</th>
                  <th className="py-2 px-4">Actions</th>{" "}
                  {/* Added Actions Column */}
                </tr>
              </thead>
              <tbody>
                {garages.map((garage) => (
                  <tr key={garage.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{garage.garageName}</td>
                    <td className="py-2 px-4">{garage.ownerName}</td>
                    <td className="py-2 px-4">{garage.contactNumber}</td>
                    <td className="py-2 px-4">{garage.openTime}</td>
                    <td className="py-2 px-4">{garage.closeTime}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDeleteGarage(garage.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>{" "}
                    {/* Delete Button */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
