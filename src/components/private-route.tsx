import React, { ComponentType, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,

  ...rest
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
