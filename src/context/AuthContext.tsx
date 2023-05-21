import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from "next/router";
import { app } from "../lib/firebase";

export type UserType = User | null;
export type AuthContextProps = {
  user: UserType;
};
export type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState<UserType>(null);
  const isAvailableForViewing =
    router.pathname === "/" ||
    router.pathname === "/signin" ||
    router.pathname === "/signup";
  const value = {
    user,
  };

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      !user &&
        !isAvailableForViewing &&
        (await router.replace(
          {
            pathname: "/signin",
            query: { situation: "need_to_signin" },
          },
          "/signin"
        ));
    });
    return () => {
      authStateChanged();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
