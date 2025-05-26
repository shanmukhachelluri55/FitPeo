import React, { useState } from 'react';
import { activityData } from '../../data/activityData';
import { Activity, Download, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const dayOptions = [2, 5, 7];

const ActivitySection = () => {
  const [daysToShow, setDaysToShow] = useState(activityData.length);
  const [darkMode, setDarkMode] = useState(false);

  const displayedData = activityData.slice(0, daysToShow);
  const maxValue = Math.max(...displayedData.map(item => item.value));
  const totalAppointments = displayedData.reduce((sum, item) => sum + item.value, 0);

  const handleExport = () => {
    const csv = displayedData.map(d => `${d.day},${d.value}`).join('\n');
    const blob = new Blob([`Day,Value\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'activity-data.csv';
    anchor.click();
  };

  return (
    <section
      className={`p-6 rounded-2xl shadow-lg transition-shadow duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
      aria-label="Activity overview"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Activity</h2>
        <div className="flex gap-2 items-center">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition">
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={handleExport} className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Download className="h-4 w-4 mr-1" /> Export
          </button>
        </div>
      </div>

      {/* Dropdown to choose days */}
      <div className="mb-5">
        <label htmlFor="days" className="text-sm font-medium">
          Select days:
        </label>
        <select
          id="days"
          className="ml-3 border border-gray-300 rounded px-2 py-1"
          value={daysToShow}
          onChange={(e) => setDaysToShow(Number(e.target.value))}
        >
          {dayOptions.map(option => (
            <option key={option} value={option}>
              First {option} day{option > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between h-40 gap-3 relative mb-6">
        {displayedData.map((item) => {
          const barHeightPercent = (item.value / maxValue) * 100;
          const barColorClass = getBarColor(item.value, maxValue);

          return (
            <div key={item.day} className="flex flex-col items-center group relative w-8 flex-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${barHeightPercent}%` }}
                transition={{ duration: 0.5 }}
                className={`${barColorClass} w-full rounded-t-lg shadow-md`}
                aria-label={`${item.day} activity: ${item.value}`}
              />
              <span className="mt-2 text-xs group-hover:font-semibold">{item.day}</span>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity pointer-events-none">
                {item.value} appointments
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Summary */}
      <div className="bg-gradient-to-r from-indigo-100 to-blue-50 dark:from-indigo-900 dark:to-blue-800 p-5 rounded-xl flex items-center mb-4 shadow-inner">
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white mr-4 shadow-lg">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-base font-semibold">Your Activity</h3>
          <p className="text-sm">{totalAppointments} appointments shown</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span className="font-semibold">75%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out" style={{ width: '75%' }} />
        </div>
      </div>
    </section>
  );
};

const getBarColor = (value, maxValue) => {
  const percentage = (value / maxValue) * 100;
  if (percentage > 80) return 'bg-gradient-to-t from-blue-700 to-blue-400';
  if (percentage > 50) return 'bg-gradient-to-t from-blue-600 to-blue-300';
  if (percentage > 30) return 'bg-gradient-to-t from-blue-500 to-blue-200';
  return 'bg-gradient-to-t from-blue-400 to-blue-100';
};

export default ActivitySection;
