"use client";
import LoadingSpinner from "@/components/reusable/Loading";
import { useUserSession } from "@/services/auth/auth";
import useCustomStore from "@/store";
import { IUser } from "@/types";
import React, { useEffect } from "react";


type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { data, isLoading, isError, isSuccess } = useUserSession();
  const setUser = useCustomStore((state: { setUser: (user: IUser) => void; }) => state.setUser);
  const setIsAdmin = useCustomStore((state: { setIsAdmin: (isAdmin: boolean) => void; }) => state.setIsAdmin);

  useEffect(() => {
    if (isError) {
      window.location.href = "/login";
    }
    if (isSuccess && data) {
      setUser(data);
      setIsAdmin(data.isAdmin);
    }
  }, [isError, isSuccess, data, setUser, setIsAdmin]);

  const isAdmin = useCustomStore((state) => state.isAdmin);
  if (isLoading) {
    return <LoadingSpinner className="h-screen w-screen" />;
  }
  if (isAdmin) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default AuthProvider;
