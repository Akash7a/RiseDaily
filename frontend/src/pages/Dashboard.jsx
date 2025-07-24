import React from 'react'
import TaskForm from '../components/Taskform.jsx';
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#962c98] to-[#061f79] text-white">
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white text-black">
        <h1 className="text-2xl font-bold tracking-wide">📋 TaskMaster Pro</h1>
      </header>

      {/* Welcome Section */}
      <section className="px-11 py-4">
        <h2 className="text-xl font-semibold">
          Welcome back, <span className="text-yellow-300">{user?.username || 'User'} 👋</span>
        </h2>
        <p className="text-sm text-gray-200 mt-1">
          Plan your day, track tasks, and stay productive!
        </p>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-6">
        <section>
          <TaskForm />
        </section>

        <section className="bg-white rounded-3xl shadow-xl p-6 text-black min-h-[300px]">
          <h3 className="text-xl font-bold mb-4">📅 Your Tasks</h3>
          <p className="text-gray-500">You don't have any tasks yet. Start by adding one!</p>
        </section>
      </main>
    </div>
  )
}

export default Dashboard