import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Rating {
  id: string;
  name: string;
  rating: number;
  content: string;
  date: string;
  role: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
}

export interface DealerInfo {
  headerDesc: string;
  imageUrl: string;
  legacyTitle: string;
  legacyDesc1: string;
  legacyDesc2: string;
}

interface DataContextType {
  ratings: Rating[];
  addRating: (rating: Omit<Rating, 'id' | 'date' | 'role'>) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  properties: Property[];
  updateProperty: (property: Property) => void;
  addProperty: (property: Omit<Property, 'id'>) => void;
  deleteProperty: (id: string) => void;
  dealerInfo: DealerInfo;
  updateDealerInfo: (info: DealerInfo) => void;
  adminPassword: string;
  updateAdminPassword: (password: string) => void;
}

const defaultDealerInfo: DealerInfo = {
  headerDesc: "With over 15 years of curating excellence in the Indian real estate market, we bring you unmatched expertise and exclusive access to the most coveted luxury properties in Bangalore North.",
  imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  legacyTitle: "A Legacy of Trust",
  legacyDesc1: "Bangalore North Real Estate was founded on a simple principle: luxury is not just about the price tag; it's about the experience, the architectural brilliance, and the bespoke lifestyle it offers.",
  legacyDesc2: "We sit down with every client to understand their vision deeply, providing end-to-end white-glove service from the initial tour to the final handover."
};

const defaultProperties: Property[] = [
  {
    id: '1',
    title: 'The Sky Penthouse',
    location: 'Worli Sea Face, Mumbai',
    price: '₹45 Cr',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    beds: 5,
    baths: 6,
    sqft: '8,500',
    tag: 'For Sale',
  },
  {
    id: '2',
    title: 'Aurum Signature Villa',
    location: 'Banjara Hills, Hyderabad',
    price: '₹28 Cr',
    image: 'https://images.unsplash.com/photo-1613490908236-a7367033d86c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    beds: 6,
    baths: 7,
    sqft: '12,000',
    tag: 'For Sale',
  },
  {
    id: '3',
    title: 'Luxe Marina Apartment',
    location: 'Marine Drive, Kochi',
    price: '₹12 Cr',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    beds: 4,
    baths: 4,
    sqft: '4,200',
    tag: 'For Rent',
  },
];

const defaultRatings: Rating[] = [
  {
    id: '1',
    name: 'Rajesh Singhania',
    role: 'CEO, TechCorp India',
    content: 'Bangalore North Real Estate redefined my luxury home buying experience. Their attention to detail and exclusive portfolio is unmatched in the Indian market.',
    rating: 5,
    date: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Priya Mehra',
    role: 'Fashion Designer',
    content: 'Finding a studio space that matches my aesthetic was challenging until I met the team here. They understand luxury and design perfectly.',
    rating: 5,
    date: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Vikram Oberoi',
    role: 'Investment Banker',
    content: 'Professional, discreet, and highly efficient. They secured a penthouse for me that wasn\'t even listed on the open market.',
    rating: 5,
    date: new Date().toISOString(),
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [dealerInfo, setDealerInfo] = useState<DealerInfo>(defaultDealerInfo);
  const [adminPassword, setAdminPassword] = useState('Banglore-North-Admin123');

  useEffect(() => {
    // Ratings
    const savedRatings = localStorage.getItem('gurugram_ratings');
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    } else {
      setRatings(defaultRatings);
      localStorage.setItem('gurugram_ratings', JSON.stringify(defaultRatings));
    }

    // Appointments
    const savedAppointments = localStorage.getItem('gurugram_appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }

    // Properties
    const savedProps = localStorage.getItem('gurugram_props');
    if (savedProps) {
      setProperties(JSON.parse(savedProps));
    } else {
      setProperties(defaultProperties);
      localStorage.setItem('gurugram_props', JSON.stringify(defaultProperties));
    }
    
    // Dealer
    const savedDealer = localStorage.getItem('gurugram_dealer');
    if (savedDealer) {
      setDealerInfo(JSON.parse(savedDealer));
    } else {
      setDealerInfo(defaultDealerInfo);
      localStorage.setItem('gurugram_dealer', JSON.stringify(defaultDealerInfo));
    }

    // Admin Password
    const savedPwd = localStorage.getItem('gurugram_admin_pwd');
    if (savedPwd) {
      setAdminPassword(savedPwd);
    }
  }, []);

  const addRating = (newRating: Omit<Rating, 'id' | 'date' | 'role'>) => {
    const rating: Rating = {
      ...newRating,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      role: 'Valued Client'
    };
    const updatedRatings = [rating, ...ratings];
    setRatings(updatedRatings);
    localStorage.setItem('gurugram_ratings', JSON.stringify(updatedRatings));
  };

  const addAppointment = (newAppt: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
    const appointment: Appointment = {
      ...newAppt,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updatedAppointments = [appointment, ...appointments];
    setAppointments(updatedAppointments);
    localStorage.setItem('gurugram_appointments', JSON.stringify(updatedAppointments));
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const updatedAppointments = appointments.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('gurugram_appointments', JSON.stringify(updatedAppointments));
  };

  const updateProperty = (updatedProp: Property) => {
    const newProps = properties.map(p => p.id === updatedProp.id ? updatedProp : p);
    setProperties(newProps);
    localStorage.setItem('gurugram_props', JSON.stringify(newProps));
  };

  const addProperty = (newProp: Omit<Property, 'id'>) => {
    const property: Property = {
      ...newProp,
      id: Math.random().toString(36).substr(2, 9)
    };
    const updatedProps = [property, ...properties];
    setProperties(updatedProps);
    localStorage.setItem('gurugram_props', JSON.stringify(updatedProps));
  };

  const deleteProperty = (id: string) => {
    const updatedProps = properties.filter(p => p.id !== id);
    setProperties(updatedProps);
    localStorage.setItem('gurugram_props', JSON.stringify(updatedProps));
  };

  const handleUpdateDealerInfo = (info: DealerInfo) => {
    setDealerInfo(info);
    localStorage.setItem('gurugram_dealer', JSON.stringify(info));
  };

  const updateAdminPassword = (newPwd: string) => {
    setAdminPassword(newPwd);
    localStorage.setItem('gurugram_admin_pwd', newPwd);
  };

  return (
    <DataContext.Provider value={{ 
      ratings, addRating, 
      appointments, addAppointment, updateAppointmentStatus,
      properties, updateProperty, addProperty, deleteProperty,
      dealerInfo, updateDealerInfo: handleUpdateDealerInfo,
      adminPassword, updateAdminPassword
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
