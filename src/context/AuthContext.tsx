import { createContext, useState, FC } from "react";
import { useNavigate } from "react-router-dom";

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
