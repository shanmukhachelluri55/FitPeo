import AnatomySection from './AnatomySection';
import HealthStatusCards from './HealthStatusCards';
import CalendarView from './CalendarView';
import AppointmentCards from './AppointmentCard';
import UpcomingSchedule from './UpcomingSchedule';
import ActivitySection from './ActivitySection';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnatomySection />
          <HealthStatusCards />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CalendarView />
          <AppointmentCards />
        </div>
      </div>

      <div className="space-y-6">
        <UpcomingSchedule />
        <ActivitySection />
      </div>
    </div>
  );
};

export default Dashboard;
