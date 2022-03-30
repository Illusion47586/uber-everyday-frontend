import { createContext, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthContextInterface {
  isAuthorized: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider: FC = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsAuthorized(true);
    toast.info("Logged in as " + import.meta.env.VITE_TEST_ID + ".");
    navigate("/");
  };
  const logout = () => {
    setIsAuthorized(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
export type { AuthContextInterface };
