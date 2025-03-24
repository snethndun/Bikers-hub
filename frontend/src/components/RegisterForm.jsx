import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  provider,
} from "../firebase"; // Import necessary methods
import { FiX } from "react-icons/fi"; // Close icon
import { Link } from "react-router-dom"; // Import Link for navigation
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore methods

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Biker", // Default role
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const db = getFirestore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    const { email, password, confirmPassword, firstName, lastName, role } =
      formData;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        role,
      });

      localStorage.setItem("userId", user.uid);

      setMessage("Registration successful!");
      setIsSuccess(true);

      setTimeout(() => {
        navigate(role === "Garage Owner" ? "/garage-dashboard" : "/login");
      }, 1500);
    } catch (error) {
      setMessage(error.message || "Registration failed!");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!formData.role) {
      setMessage("Please select a role before signing up with Google!");
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1] || "",
        email: user.email,
        role: formData.role, // Use selected role
      });

      localStorage.setItem("userId", user.uid);

      setMessage("Google sign-up successful!");
      setIsSuccess(true);

      setTimeout(() => {
        navigate(
          formData.role === "Garage Owner" ? "/garage-dashboard" : "/login"
        );
      }, 1500);
    } catch (error) {
      setMessage(error.message || "Google sign-up failed!");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          <FiX />
        </button>

        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Register
        </h2>

        {message && (
          <p
            className={`text-center ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded mb-4"
          />

          {/* Role Selection Dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded mb-4"
          >
            <option value="Biker">Biker</option>
            <option value="Garage Owner">Garage Owner</option>
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-sm text-yellow-500 hover:text-yellow-600"
          >
            Login here
          </Link>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignup}
            className="w-full bg-white border border-gray-300 text-gray-800 py-3 rounded hover:bg-gray-100 flex items-center justify-center"
            disabled={loading}
          >
            <FcGoogle className="mr-3 text-2xl" />
            {loading ? "Signing up with Google..." : "Sign up with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
