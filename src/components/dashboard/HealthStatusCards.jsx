import React, { useState } from 'react';
import { Heart, Settings as Lungs, Smile, Bone } from 'lucide-react';
import { motion } from 'framer-motion';
import { healthStatus } from '../../data/healthStatus';

const HealthStatusCards = () => {
  const [activeId, setActiveId] = useState(null);

  const handleCardClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  // Helpers to get glow and focus ring colors for active state
  const getGlowColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'rgba(52, 211, 153, 0.7)'; // Tailwind success-400 transparent
      case 'warning':
        return 'rgba(251, 191, 36, 0.7)'; // warning-400
      case 'critical':
        return 'rgba(239, 68, 68, 0.7)'; // danger-400
      case 'treatment':
        return 'rgba(59, 130, 246, 0.7)'; // primary-400
      default:
        return 'rgba(107, 114, 128, 0.7)'; // gray-500
    }
  };

  const getFocusRingColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'focus:ring-success-400';
      case 'warning':
        return 'focus:ring-warning-400';
      case 'critical':
        return 'focus:ring-danger-400';
      case 'treatment':
        return 'focus:ring-primary-400';
      default:
        return 'focus:ring-gray-400';
    }
  };

  return (
    <section
      aria-label="Health Status Overview"
      className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6 select-none">
        Health Status
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {healthStatus.map((item) => {
          const isActive = activeId === item.id;

          return (
            <motion.div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item.id);
                }
              }}
              className={`p-5 rounded-lg border cursor-pointer select-none
                ${getStatusBorderColor(item.status)}
                shadow-sm transition-shadow duration-300
                focus:outline-none focus:ring-4 ${getFocusRingColor(item.status)}
                relative break-words whitespace-normal
                `}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              aria-label={`${item.label} status: ${getStatusText(item.status)}`}
              initial={false}
              animate={
                isActive
                  ? {
                      scale: 1.05,
                      boxShadow: `0 0 15px ${getGlowColor(
                        item.status
                      )}, 0 8px 15px rgba(0,0,0,0.12)`,
                    }
                  : {}
              }
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 15px ${getGlowColor(
                  item.status
                )}, 0 8px 15px rgba(0,0,0,0.12)`,
              }}
              whileTap={{
                scale: 0.98,
                boxShadow: `0 0 12px ${getGlowColor(
                  item.status
                )}, 0 6px 10px rgba(0,0,0,0.1)`,
              }}
              whileFocus={{
                scale: 1.05,
                boxShadow: `0 0 15px ${getGlowColor(
                  item.status
                )}, 0 8px 15px rgba(0,0,0,0.12)`,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ touchAction: 'manipulation' }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusBgColor(
                    item.status
                  )} animate-pulse-custom shadow-md`}
                >
                  {getStatusIcon(item.position, getStatusIconColor(item.status))}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-700 truncate">
                    {item.label}
                  </h3>
                  <p className="text-xs text-gray-500 tracking-wide truncate">
                    {getStatusText(item.status)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-8 w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all duration-300 select-none"
        aria-label="View full health report"
      >
        View Full Report
      </button>
    </section>
  );
};

// Icon render helper
const getStatusIcon = (position, className) => {
  const iconProps = { size: 24, className };
  switch (position) {
    case 'heart':
      return <Heart {...iconProps} />;
    case 'lungs':
      return <Lungs {...iconProps} />;
    case 'teeth':
      return <Smile {...iconProps} />;
    case 'bone':
      return <Bone {...iconProps} />;
    default:
      return <Heart {...iconProps} />;
  }
};

// Border color based on status
const getStatusBorderColor = (status) => {
  switch (status) {
    case 'healthy':
      return 'border-success-300 hover:border-success-400';
    case 'warning':
      return 'border-warning-300 hover:border-warning-400';
    case 'critical':
      return 'border-danger-300 hover:border-danger-400';
    case 'treatment':
      return 'border-primary-300 hover:border-primary-400';
    default:
      return 'border-gray-300 hover:border-gray-400';
  }
};

// Background gradient based on status
const getStatusBgColor = (status) => {
  switch (status) {
    case 'healthy':
      return 'bg-gradient-to-br from-success-100 to-success-200';
    case 'warning':
      return 'bg-gradient-to-br from-warning-100 to-warning-200';
    case 'critical':
      return 'bg-gradient-to-br from-danger-100 to-danger-200';
    case 'treatment':
      return 'bg-gradient-to-br from-primary-100 to-primary-200';
    default:
      return 'bg-gradient-to-br from-gray-100 to-gray-200';
  }
};

// Icon color based on status
const getStatusIconColor = (status) => {
  switch (status) {
    case 'healthy':
      return 'text-success-700';
    case 'warning':
      return 'text-warning-700';
    case 'critical':
      return 'text-danger-700';
    case 'treatment':
      return 'text-primary-700';
    default:
      return 'text-gray-600';
  }
};

// Text description for status
const getStatusText = (status) => {
  switch (status) {
    case 'healthy':
      return 'Excellent condition';
    case 'warning':
      return 'Check-up recommended';
    case 'critical':
      return 'Immediate attention';
    case 'treatment':
      return 'Under treatment';
    default:
      return 'Status unknown';
  }
};

export default HealthStatusCards;
