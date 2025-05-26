import { Home, Users, Calendar, BarChart2, Settings, FileText, Bell, MessageSquare, Heart as Heartbeat, Shield } from 'lucide-react';

export const navigationItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: Home,
    category: 'general',
    isActive: true,
  },
  {
    id: 'patients',
    name: 'Patients',
    icon: Users,
    category: 'general',
    isActive: false,
  },
  {
    id: 'appointments',
    name: 'Appointments',
    icon: Calendar,
    category: 'general',
    isActive: false,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart2,
    category: 'general',
    isActive: false,
  },
  {
    id: 'medical-records',
    name: 'Records',
    icon: FileText,
    category: 'tools',
    isActive: false,
  },
  {
    id: 'messages',
    name: 'Messages',
    icon: MessageSquare,
    category: 'tools',
    isActive: false,
  },
  {
    id: 'notifications',
    name: 'Alerts',
    icon: Bell,
    category: 'tools',
    isActive: false,
  },
  {
    id: 'vitals',
    name: 'Vitals',
    icon: Heartbeat,
    category: 'tools',
    isActive: false,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    category: 'tools',
    isActive: false,
  },
];