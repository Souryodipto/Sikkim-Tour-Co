import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedPackageSlugs: string[];
  savedDestinationIds: string[];
  createdAt: string;
}

interface AuthContextType {
  user: UserRecord | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, role?: 'customer' | 'admin') => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  register: (name: string, email: string, phone: string) => Promise<{ success: boolean; message?: string }>;
  toggleSavePackage: (slug: string) => void;
  toggleSaveDestination: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CUSTOMER: UserRecord = {
  id: 'USR-CUST-810',
  name: 'Ananya Sharma',
  email: 'traveler@example.com',
  phone: '+91 98200 12345',
  role: 'customer',
  savedPackageSlugs: ['grand-sikkim-odyssey-2-weeks', 'north-sikkim-adventure'],
  savedDestinationIds: ['gurudongmar-lake', 'rabdentse-ruins', 'yumthang-valley'],
  createdAt: '2026-08-15T10:00:00.000Z',
};

const DEMO_ADMIN: UserRecord = {
  id: 'USR-ADM-001',
  name: 'Tenzing Norbu (Operations Director)',
  email: 'admin@sikkimtourco.com',
  phone: '+91 97330 99887',
  role: 'admin',
  savedPackageSlugs: [],
  savedDestinationIds: [],
  createdAt: '2026-01-01T08:00:00.000Z',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserRecord | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('bk_auth_user');
        if (stored) return JSON.parse(stored);
      } catch (err) {
        console.error('Failed reading auth from storage', err);
      }
    }
    // Default to demo customer so the user starts with an authenticated experience
    return DEMO_CUSTOMER;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bk_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bk_auth_user');
    }
  }, [user]);

  const login = async (email: string, role?: 'customer' | 'admin'): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 350));

    try {
      const normalized = email.trim().toLowerCase();
      if (normalized.includes('admin') || role === 'admin') {
        setUser(DEMO_ADMIN);
      } else {
        setUser({
          ...DEMO_CUSTOMER,
          email: normalized || DEMO_CUSTOMER.email,
        });
      }
      setIsLoading(false);
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, message: 'Authentication failed. Please try again.' };
    }
  };

  const register = async (name: string, email: string, phone: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 350));

    const newUser: UserRecord = {
      id: `USR-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: 'customer',
      savedPackageSlugs: [],
      savedDestinationIds: [],
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSavePackage = (slug: string) => {
    if (!user) return;
    const exists = user.savedPackageSlugs.includes(slug);
    const updated = exists
      ? user.savedPackageSlugs.filter((s) => s !== slug)
      : [...user.savedPackageSlugs, slug];
    setUser({ ...user, savedPackageSlugs: updated });
  };

  const toggleSaveDestination = (id: string) => {
    if (!user) return;
    const exists = user.savedDestinationIds.includes(id);
    const updated = exists
      ? user.savedDestinationIds.filter((s) => s !== id)
      : [...user.savedDestinationIds, id];
    setUser({ ...user, savedDestinationIds: updated });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading,
        login,
        logout,
        register,
        toggleSavePackage,
        toggleSaveDestination,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
