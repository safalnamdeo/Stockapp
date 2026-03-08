import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Extract name from email or use email as name
    const name = email.split("@")[0].replace(/[._-]/g, " ");
    const nameParts = name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts[1] || "";
    
    // Capitalize first letters
    const formattedName = nameParts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    
    // Generate initials
    const initials = (
      (firstName.charAt(0) || "") + (lastName.charAt(0) || "")
    ).toUpperCase() || email.charAt(0).toUpperCase();

    setUser({
      name: formattedName || email,
      email,
      initials,
    });
  };

  const register = (name: string, email: string, password: string) => {
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts[nameParts.length - 1] || "";
    
    // Generate initials
    const initials = (
      firstName.charAt(0) + (nameParts.length > 1 ? lastName.charAt(0) : "")
    ).toUpperCase();

    setUser({
      name,
      email,
      initials,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
