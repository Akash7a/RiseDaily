import React, { useState } from 'react';

const TaskForm = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    tags: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const taskPayload = {
      ...data,
      tags: data.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    console.log("🚀 Sending this task to backend →", taskPayload);

    setData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      tags: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#962c98] to-[#061f79] px-4 py-8">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-[#a14400] mb-6">
          ✍️ Quick Add Task
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">📝 Title</label>
          <input
            name="title"
            value={data.title}
            onChange={changeHandler}
            type="text"
            placeholder="Enter task title"
            className="w-full px-4 py-2 bg-white text-black placeholder-black border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">📄 Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={changeHandler}
            placeholder="What's this task about?"
            rows="3"
            className="w-full px-4 py-2 bg-white text-black placeholder-black border border-gray-500 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">⚡ Priority</label>
          <select
            name="priority"
            value={data.priority}
            onChange={changeHandler}
            className="w-full px-4 py-2 bg-white text-black border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Medium</option>
            <option>Low</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">📅 Due Date</label>
          <input
            name="dueDate"
            value={data.dueDate}
            onChange={changeHandler}
            type="date"
            className="w-full px-4 py-2 bg-white text-black border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">🏷️ Tags (comma separated)</label>
          <input
            name="tags"
            value={data.tags}
            onChange={changeHandler}
            type="text"
            placeholder="e.g. work, personal, frontend"
            className="w-full px-4 py-2 bg-white text-black placeholder-black border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#249904] hover:bg-[#1a7303] text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          🚀 Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;