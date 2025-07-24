import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import {registerUser} from "../features/userSlice.js";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser(data));

    setData({
      username: "",
      email: "",
      password: "",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f3b35d] to-[#e16464] px-4">
      <form onSubmit={submitHandler} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-[#a14400] mb-6">
          ✍️ Create Your Account
        </h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
            🙋 Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={changeHandler}
            required
            placeholder="Choose a username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f07777]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            📧 Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={changeHandler}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f07777]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            🔐 Password
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={changeHandler}
            name="password"
            required
            placeholder="Create a strong password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f07777]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#a14400] hover:bg-[#813800] text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          🚀 Sign Up
        </button>

        <div className="text-center mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-semibold">
            🔐 Login Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;