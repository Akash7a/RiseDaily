import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate, } from "react-router-dom";
import { loginUser } from '../features/userSlice';

const Login = () => {
  const { user, token, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [data, setData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(()=>{
    if(user || token){
      navigate("/");
    }
  },[token,user]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(data));

    setData({
      emailOrUsername: "",
      password: "",
    });
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2e2e72] to-[#3f3cbb] px-4">
      <form onSubmit={submitHandler} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-[#2e2e72] mb-6">
          🔐 Login to your Account
        </h2>

        <div className="mb-4">
          <label htmlFor="emailOrUsername" className="block text-gray-700 font-semibold mb-2">
            📧 Email or Username
          </label>
          <input
            type="text"
            id="emailOrUsername"
            name="emailOrUsername"
            placeholder="Enter email or username"
            value={data.emailOrUsername}
            onChange={changeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f3cbb]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            🔒 Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f3cbb]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2e2e72] hover:bg-[#25255a] text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          🚀 Login
        </button>

        <div className="text-center mt-6 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline font-semibold">
            ✍️ Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;