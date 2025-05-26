import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calendarAppointments } from '../../data/appointments';
import dayjs from 'dayjs';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [hoveredDate, setHoveredDate] = useState(null);

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const today = dayjs();

  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const appointmentsForSelectedDay = calendarAppointments.filter(app => {
    const appDateStr = `${currentDate.format('YYYY-MM')}-${app.date.toString().padStart(2, '0')}`;
    return dayjs(appDateStr).isSame(selectedDate, 'day');
  });

  const appointmentsForHoveredDay = hoveredDate
    ? calendarAppointments.filter(app => {
        const appDateStr = `${currentDate.format('YYYY-MM')}-${app.date.toString().padStart(2, '0')}`;
        return dayjs(appDateStr).isSame(hoveredDate, 'day');
      })
    : [];

  const hasAppointmentOnDate = (date) => {
    const dateStr = date.toString().padStart(2, '0');
    return calendarAppointments.some(app => app.date.toString().padStart(2, '0') === dateStr);
  };

  const onDateKeyDown = (e, date) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedDate(date);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevMonth}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {currentDate.format('MMMM YYYY')}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next month"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-500 mb-2">
        {days.map((day, i) => (
          <div key={i} className="text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm relative">
        {[...Array(startDay)].map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const date = i + 1;
          const fullDate = dayjs(`${currentDate.format('YYYY-MM')}-${date.toString().padStart(2, '0')}`);
          const isToday = fullDate.isSame(today, 'day');
          const isSelected = fullDate.isSame(selectedDate, 'day');
          const hasAppointment = hasAppointmentOnDate(date);

          return (
            <div
              key={date}
              onClick={() => setSelectedDate(fullDate)}
              onKeyDown={(e) => onDateKeyDown(e, fullDate)}
              onMouseEnter={() => setHoveredDate(fullDate)}
              onMouseLeave={() => setHoveredDate(null)}
              role="button"
              tabIndex={0}
              aria-label={`${isToday ? 'Today, ' : ''}${fullDate.format('dddd, MMMM D, YYYY')}${hasAppointment ? ', has appointments' : ''}`}
              className={`
                h-8 w-8 mx-auto rounded-full flex items-center justify-center cursor-pointer select-none
                transition-colors duration-200 ease-in-out
                ${isSelected ? 'bg-blue-600 text-white' : ''}
                ${!isSelected && isToday ? 'border border-blue-500 text-blue-600' : ''}
                ${!isSelected && !isToday ? 'text-gray-700 hover:bg-gray-100' : ''}
                ${hasAppointment && !isSelected ? 'ring-2 ring-blue-300' : ''}
              `}
            >
              {date}
            </div>
          );
        })}

        {hoveredDate && appointmentsForHoveredDay.length > 0 && (
          <div
            className="absolute z-30 p-3 w-56 bg-white border border-gray-300 rounded-lg shadow-lg text-xs text-gray-800 pointer-events-none animate-fadeIn"
            style={{
              top: `${Math.floor((hoveredDate.date() + startDay - 1) / 7) * 42 + 110}px`,
              left: `${((hoveredDate.day()) % 7) * 48 + 8}px`,
            }}
          >
            <div className="font-semibold mb-2">{hoveredDate.format('MMMM D, YYYY')}</div>
            <ul className="space-y-1 max-h-48 overflow-auto">
              {appointmentsForHoveredDay.map((app, idx) => (
                <li key={idx} className="p-1 rounded bg-gray-100">
                  <div>{app.time}</div>
                  <div className={`text-xs font-medium ${getAppointmentColorClass(app.type)}`}>
                    {app.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {selectedDate.format('dddd, MMMM D')}
        </h3>

        {appointmentsForSelectedDay.length === 0 ? (
          <p className="text-gray-400 text-sm">No appointments.</p>
        ) : (
          <ul className="space-y-3">
            {appointmentsForSelectedDay.map((appointment, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg"
              >
                <div className="text-sm text-gray-600 w-16">{appointment.time}</div>
                <div className={`flex-1 p-2 rounded ${getAppointmentColorClass(appointment.type)}`}>
                  <p className="text-sm font-medium">{appointment.title}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const getAppointmentColorClass = (type) => {
  switch (type) {
    case 'dentist':
      return 'bg-blue-100 text-blue-700';
    case 'physio':
      return 'bg-purple-100 text-purple-700';
    case 'general':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default CalendarView;
