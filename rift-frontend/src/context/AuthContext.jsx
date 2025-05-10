// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import { mockUsers } from "../data/users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Start logged out

  const user_login = (username, password) => {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser && foundUser.role === "user") {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const admin_login = (username, password) => {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser && foundUser.role === "admin") {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = (newUser) => {
    if (mockUsers.some((u) => u.username === newUser.username)) {
      return false; // Username taken
    }
    const userData = {
      id: `user${mockUsers.length + 1}`,
      username: newUser.username,
      password: newUser.password,
      email: newUser.email || "",
      avatar: newUser.avatar || "/src/assets/images/placeholder.jpg",
      followers: [],
      following: [],
      role: "user",
    };
    mockUsers.push(userData);
    setUser(userData);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFollow = (profileId) => {
    if (!user) return;
    setUser((prev) => {
      const isFollowing = prev.following.includes(profileId);
      return {
        ...prev,
        following: isFollowing
          ? prev.following.filter((id) => id !== profileId)
          : [...prev.following, profileId],
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, user_login, signup, logout, toggleFollow, admin_login }}>
      {children}
    </AuthContext.Provider>
  );
}