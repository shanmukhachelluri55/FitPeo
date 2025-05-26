import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { upcomingAppointments } from '../../data/appointments';

const AppointmentCards = () => {
  const [showAll, setShowAll] = useState(false);

  const shownAppointments = showAll ? upcomingAppointments : upcomingAppointments.slice(0, 2);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
        {upcomingAppointments.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
            className="inline-flex items-center text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {showAll ? 'Show less' : 'View all'}
            {showAll ? (
              <ChevronUp size={16} className="ml-1" />
            ) : (
              <ChevronDown size={16} className="ml-1" />
            )}
          </button>
        )}
      </div>

      <div className="space-y-6">
        {shownAppointments.map((appointment) => (
          <article
            key={appointment.id}
            className={`
              p-5 rounded-lg border-l-4 shadow-sm ${getAppointmentBorderColor(appointment.type)} bg-white
              hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1
              transition-transform transition-colors duration-300 ease-in-out cursor-pointer
            `}
            aria-label={`${appointment.title} appointment on ${appointment.dateFormatted} at ${appointment.time}`}
          >
            <header className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{appointment.title}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${getAppointmentBadgeColor(appointment.type)}`}
                aria-label={`Appointment type: ${getAppointmentTypeName(appointment.type)}`}
              >
                {getAppointmentTypeName(appointment.type)}
              </span>
            </header>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-600 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <dd>{appointment.dateFormatted}</dd>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <dd>{appointment.time}</dd>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <dd>{appointment.location}</dd>
              </div>
              <div className="flex items-center space-x-2">
                <User size={16} />
                <dd>{appointment.doctor}</dd>
              </div>
            </dl>

            <footer className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Reschedule appointment ${appointment.title}`}
              >
                Reschedule
              </button>
              <button
                type="button"
                className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Confirm appointment ${appointment.title}`}
              >
                Confirm
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

// Helper functions (no type annotations)
const getAppointmentBorderColor = (type) => {
  switch (type) {
    case 'dentist':
      return 'border-blue-500';
    case 'physio':
      return 'border-purple-500';
    case 'general':
      return 'border-green-500';
    default:
      return 'border-gray-500';
  }
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

export default AppointmentCards;
