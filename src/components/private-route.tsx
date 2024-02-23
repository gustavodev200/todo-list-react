import React, { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticatedStore } from "../store/useAuthenticatedStore";

interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,

  ...rest
}) => {
  const isAuthenticated = useAuthenticatedStore(
    (state) => state.isAuthenticated
  );
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
