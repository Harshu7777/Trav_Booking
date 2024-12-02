import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function AdminRoute({ component: Component, ...rest }) {
  const isAuthenticated = true; // Replace with actual auth check
  const isAdmin = true; // Replace with actual admin check

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default AdminRoute;

