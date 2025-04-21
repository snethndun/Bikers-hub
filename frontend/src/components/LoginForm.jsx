import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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

    try {
      const { email, password } = formData;

      await setPersistence(auth, browserSessionPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      const userRole = userData?.role || "Biker";

      localStorage.setItem("userId", user.uid);
      localStorage.setItem("authToken", await user.getIdToken());
      localStorage.setItem("userRole", userRole);

      setMessage("Login successful!");
      setIsSuccess(true);

      const role = userRole.toLowerCase();
      let redirectPath = "/";
      if (role === "garage owner") redirectPath = "/garage-dashboard";
      else if (role === "admin") redirectPath = "/admin-dashboard";

      setTimeout(() => {
        navigate(redirectPath);
      }, 1500);
    } catch (error) {
      setMessage(error.message || "Login failed!");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await setPersistence(auth, browserSessionPersistence);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      let userRole = "Biker";

      if (userDoc.exists()) {
        userRole = userDoc.data().role || "Biker";
      } else {
        const inputRole = prompt(
          "Select your role: 'Biker', 'Garage Owner', or 'Admin'"
        );
        const allowedRoles = ["Biker", "Garage Owner", "Admin"];
        userRole = allowedRoles.includes(inputRole) ? inputRole : "Biker";

        await setDoc(doc(db, "users", user.uid), {
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email,
          role: userRole,
        });
      }

      localStorage.setItem("userId", user.uid);
      localStorage.setItem("authToken", await user.getIdToken());
      localStorage.setItem("userRole", userRole);

      setMessage("Google login successful!");
      setIsSuccess(true);

      const role = userRole.toLowerCase();
      let redirectPath = "/";
      if (role === "garage owner") redirectPath = "/garage-dashboard";
      else if (role === "admin") redirectPath = "/admin-dashboard";

      setTimeout(() => {
        navigate(redirectPath);
      }, 1500);
    } catch (error) {
      setMessage(error.message || "Google login failed!");
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
          Login
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

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            className="text-sm text-yellow-500 hover:text-yellow-600"
          >
            Register here
          </Link>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-800 py-3 rounded hover:bg-gray-100 flex items-center justify-center"
            disabled={loading}
          >
            <FcGoogle className="mr-3 text-2xl" />
            {loading ? "Logging in with Google..." : "Login with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
