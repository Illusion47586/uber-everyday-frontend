import { createContext, useState, FC } from "react";

interface AuthContextInterface {
  isAuthorized: boolean;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider: FC = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
export type { AuthContextInterface };
