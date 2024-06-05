import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { FrameEror404 } from "./frame";
import { Authentification, AdminAuthGuard, AdminRoutes, ResetPassWord } from "./routes/admin";
import { VisitoWelcomePage, VisitorAbout, VisitorAcceptAnswerConsent, VisitorHome } from "./pages/visitor";
import { InvestigatorAuthGuard } from "./routes/investigator";
import { InvestigatorSocietalFormulaire, InvestigatorAddUser } from "./pages/investigator";
import { LayoutInvestigator } from "./components/Layout";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-6 py-12 lg:px-8">
        <img
          src={require("./images/logo1.png")}
          alt="Image de chargement"
          className="object-contain w-24 mx-auto mb-4"
        />
        <p className="text-lg text-center text-gray-600">
          Please wait a moment...
          <span className="text-indigo-500 animate-pulse">...</span>
        </p>{" "}
        <br />
        <div className="col-3">
          <div className="snippet" data-title="dot-bricks">
            <div className="stage">
              <div className="dot-bricks"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {" "}
        <Router>
          <Routes>
            <Route index element={<VisitoWelcomePage />} />
            <Route path="concent" element={<VisitorAcceptAnswerConsent />} />
            <Route
              path="africanhealthstudy/*"
              element={
                <AdminAuthGuard>
                  <AdminRoutes />
                </AdminAuthGuard>
              }
            />

            <Route path="formulaire" element={<VisitorHome />} />
            <Route
              path="africanhealthstudy/panel-administration/authentification"
              element={<Authentification />}
            />
            <Route
              path="africanhealthstudy/panel-administration/reset_password"
              element={<ResetPassWord />}
            />
            <Route
              path="about"
              element={<VisitorAbout />}
            />
            <Route element={<LayoutInvestigator />}>
              <Route
                path="investigator/*"
                element={
                  <InvestigatorAuthGuard>
                    <Routes >
                      <Route index element={<InvestigatorSocietalFormulaire />} />
                      <Route
                        path="/investigator"
                        element={<InvestigatorSocietalFormulaire />}
                      />
                      <Route
                        path="/useradd"
                        element={<InvestigatorAddUser />}
                      />
                    </Routes>
                  </InvestigatorAuthGuard>
                }
              />
            </Route>

            <Route path="*" element={<FrameEror404 />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
