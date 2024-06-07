import React from "react";
import { Routes, Route } from "react-router-dom";
import { LayoutAdmin, LayoutTrackSocial, LayoutSetting } from "../../components/Layout";
import {
  AdminHome,
  AdminUser,
  AdminImpactSocietalFormulaire,
  AdminImpactSocietalQuestions,
  AdminImpactSocietalReponses,
  AdminImpactSocietalResponseDowload,
  AdminImpactSocieltalSubSection,
  AdminImpactSocieltalSection,
  AdminDetailForm,
  AdminDetailsSections,
  AdminQuestionDetails,
  AdminStatistique,
  AdminSetting,
  AdminSettingChurch,
  AdminSettingUnion,
  AdminSettingConference,
  AdminAccounSetting,
} from "../../pages/admin";
import { FrameEror404 } from "../../frame";
import { InvestigatorDetailsRespondent } from "../../pages/investigator";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<LayoutAdmin />}>
        <Route index element={<AdminHome />} />
        <Route path="panel-administration">
          <Route index element={<AdminStatistique />} />
          <Route path="details/:id" element={<AdminDetailForm />} />
          <Route
            path="details-section/:id"
            element={<AdminDetailsSections />}
          />

          <Route path="statistic" element={<AdminStatistique />} />
          <Route path="account" element={<AdminAccounSetting />} />


          <Route
            path="details-question/:id"
            element={<AdminQuestionDetails />}
          />

          <Route path="users" element={<AdminUser />} />

          <Route element={<LayoutTrackSocial />}>
            <Route path="social" element={<AdminImpactSocietalFormulaire />} />
            <Route path="sections" element={<AdminImpactSocieltalSection />} />
            <Route
              path="sub-sections"
              element={<AdminImpactSocieltalSubSection />}
            />
            <Route
              path="social-question"
              element={<AdminImpactSocietalQuestions />}
            />
            <Route
              path="social-reponse"
              element={<AdminImpactSocietalReponses />}
            />
            <Route
              path="social-dowload"
              element={<AdminImpactSocietalResponseDowload />}
            />
          </Route>
          <Route
            path="detail/:id"
            element={<InvestigatorDetailsRespondent />}
          />

          <Route element={<LayoutSetting />}>
            <Route path="settings" element={<AdminSetting />} />
            <Route path="churchs" element={<AdminSettingChurch />} />
            <Route path="conferences" element={<AdminSettingConference />} />
            <Route path="unions" element={<AdminSettingUnion />} />


          </Route>
        </Route>
        <Route path="/*" element={<FrameEror404 />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
