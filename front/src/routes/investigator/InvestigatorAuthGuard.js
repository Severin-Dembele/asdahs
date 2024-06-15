import React from "react";
import { Navigate } from "react-router-dom";
function InvestigatorAuthGuard({ children }) {
  const storedData = localStorage.getItem(
    "africanhealthstudy"
  );
  const token = JSON.parse(storedData);

  if (true) {
    return children;
  } else {
    return <Navigate to="/africanhealthstudy/panel-administration/authentification" />;
  }
}

export default InvestigatorAuthGuard;
