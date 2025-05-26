import React, { useState } from 'react';
import { navigationItems } from '../../data/navigation';
import { Menu, X, ChevronDown, ChevronUp, User } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    tools: true,
  });
  const [activeItemId, setActiveItemId] = useState(
    navigationItems.find(item => item.isActive)?.id || null
  );
  const [hoveredItemId, setHoveredItemId] = useState(null); // 🔹 Hover state

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleItemClick = (id) => {
    setActiveItemId(id);
    closeSidebar();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        } lg:hidden`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`bg-white fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-200 shadow-sm
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:block`}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full py-6 px-6">
          <h2 className="text-3xl font-extrabold tracking-wide select-none mb-12">
            <span className="text-cyan-600">Health</span>
            <span className="text-gray-800">care.</span>
          </h2>

          <nav className="flex-1 flex flex-col justify-between">
            <div className="space-y-8 overflow-y-auto">
              {['general', 'tools'].map(section => (
                <section key={section}>
                  <button
                    type="button"
                    onClick={() => toggleSection(section)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-expanded={expandedSections[section]}
                    aria-controls={`${section}-list`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    {expandedSections[section] ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                  <ul
                    id={`${section}-list`}
                    className={`space-y-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                      expandedSections[section] ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    {navigationItems
                      .filter(item => item.category === section)
                      .map(item => {
                        const isActive = item.id === activeItemId;
                        const isHovered = item.id === hoveredItemId;

                        return (
                          <li key={item.id}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleItemClick(item.id);
                              }}
                              onMouseEnter={() => setHoveredItemId(item.id)} // 🔹 Hover enter
                              onMouseLeave={() => setHoveredItemId(null)}    // 🔹 Hover leave
                              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                ${
                                  isActive
                                    ? 'bg-blue-100 text-blue-700 shadow-inner'
                                    : isHovered
                                    ? 'bg-gray-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                }
                              `}
                              aria-current={isActive ? 'page' : undefined}
                              title={item.name}
                            >
                              <item.icon size={20} className="flex-shrink-0" />
                              <span>{item.name}</span>
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </section>
              ))}
            </div>

            {/* Sidebar footer */}
            <footer className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <User size={24} className="text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Jane Doe</p>
                  <a href="#" className="text-xs text-blue-600 hover:underline" onClick={closeSidebar}>
                    View profile
                  </a>
                </div>
              </div>
            </footer>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
