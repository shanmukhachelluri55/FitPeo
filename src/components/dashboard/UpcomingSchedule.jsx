import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { upcomingAppointments } from '../../data/appointments';

// Group appointments by day
const groupByDay = (appointments) =>
  appointments.reduce((acc, appointment) => {
    const day = appointment.day;
    if (!acc[day]) acc[day] = [];
    acc[day].push(appointment);
    return acc;
  }, {});

const UpcomingSchedule = () => {
  const [expandedDays, setExpandedDays] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const groupedAppointments = useMemo(() => groupByDay(upcomingAppointments), []);

  const filteredGrouped = useMemo(() => {
    if (!searchTerm.trim()) return groupedAppointments;

    const filtered = {};
    Object.entries(groupedAppointments).forEach(([day, apps]) => {
      const filteredApps = apps.filter(app =>
        app.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredApps.length) filtered[day] = filteredApps;
    });
    return filtered;
  }, [groupedAppointments, searchTerm]);

  const toggleDay = (day) => {
    setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Schedule</h2>

      <div className="mb-6 relative max-w-md">
        <input
          type="search"
          aria-label="Search appointments"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      <div className="space-y-8 max-h-[480px] overflow-y-auto pr-2">
        {Object.entries(filteredGrouped).length === 0 && (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}

        {Object.entries(filteredGrouped).map(([day, appointments]) => {
          const isExpanded = expandedDays[day] ?? true;

          return (
            <section key={day}>
              <header
                className="flex items-center justify-between cursor-pointer sticky top-0 bg-white py-2 px-4 border-b border-gray-200 z-10"
                onClick={() => toggleDay(day)}
                aria-expanded={isExpanded}
                aria-controls={`appointments-${day}`}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDay(day);
                  }
                }}
              >
                <h3 className="text-sm font-medium text-gray-700">{day}</h3>
                <button
                  className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={isExpanded ? 'Collapse day' : 'Expand day'}
                >
                  {isExpanded ? (
                    <ChevronUp size={18} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-600" />
                  )}
                </button>
              </header>

              <div
                id={`appointments-${day}`}
                className={`mt-3 space-y-3 transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                {appointments.map((appointment) => (
                  <article
                    key={appointment.id}
                    className="
                      p-4 bg-gray-50 rounded-lg
                      hover:bg-blue-50 hover:shadow-lg
                      hover:-translate-y-1
                      transition-transform transition-colors duration-300 ease-in-out
                      cursor-pointer
                    "
                    aria-label={`${appointment.title} on ${appointment.dateFormatted} at ${appointment.time}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{appointment.title}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${getAppointmentBadgeColor(
                          appointment.type
                        )}`}
                      >
                        {getAppointmentTypeName(appointment.type)}
                      </span>
                    </div>

                    <div className="flex flex-wrap text-sm text-gray-600 gap-x-6 gap-y-1">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{appointment.dateFormatted}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-6">
        <button
          className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          onClick={() => alert('Redirect to all appointments page')}
        >
          View All Appointments
        </button>
      </div>
    </div>
  );
};

const getAppointmentBadgeColor = (type) => {
  switch (type) {
    case 'dentist':
      return 'bg-blue-100 text-blue-800';
    case 'physio':
      return 'bg-purple-100 text-purple-800';
    case 'general':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getAppointmentTypeName = (type) => {
  switch (type) {
    case 'dentist':
      return 'Dental';
    case 'physio':
      return 'Physiotherapy';
    case 'general':
      return 'General';
    default:
      return 'Other';
  }
};

export default UpcomingSchedule;
