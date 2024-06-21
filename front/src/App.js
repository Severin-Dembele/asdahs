import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { FrameEror404 } from "./frame";
import { Authentification, AdminAuthGuard, AdminRoutes, ResetPassWord, NewPassword } from "./routes/admin";
import { VisitoWelcomePage, VisitorAbout, VisitorAcceptAnswerConsent, VisitorHome ,RespondentFillForms} from "./pages/visitor";
import { InvestigatorAuthGuard } from "./routes/investigator";
import { InvestigatorSocietalFormulaire, InvestigatorAddUser, InvestigatorResponseToform, InvestigatorDetailsRespondent, InvestigatorEdit } from "./pages/investigator";
import { LayoutInvestigator } from "./components/Layout";
import { useTranslation } from 'react-i18next';

function App() {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

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
        {t("wait")}          <span className="text-indigo-500 animate-pulse">...</span>
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
            <Route path="Consent" element={<VisitorAcceptAnswerConsent />} />
            <Route
              path="africanhealthstudy/*"
              element={
                <AdminAuthGuard>
                  <AdminRoutes />
                </AdminAuthGuard>
              }
            />

            <Route path="formulaire" element={<VisitorHome />} />
            <Route path="fillForm" element={<RespondentFillForms />} />
            <Route path="password" element={<NewPassword />} />
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
                        path="/detail/:id"
                        element={<InvestigatorDetailsRespondent />}
                      />
                       <Route
                        path="/formulaire/:id"
                        element={<InvestigatorResponseToform/>}
                      />
                      <Route
                        path="/useradd"
                        element={<InvestigatorAddUser />}
                      />
                       <Route
                        path="/userEdit"
                        element={<InvestigatorEdit />}
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
