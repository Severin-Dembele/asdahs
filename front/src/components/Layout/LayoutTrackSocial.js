import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function LayoutTrackSocial() {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
      <div classNameName="pt-6 sm:ml-16 p-10" style={{ paddingTop: "20px" }}>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to="/africanhealthstudy/panel-administration/social"
                className={`flex items-center p-2 rounded-lg group ${
                  currentPath === "/africanhealthstudy/panel-administration/social"
                    ? "bg-blue-100 text-blue-950"
                    : "hover:bg-blue-100"
                }`}
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                The forms
              </Link>
            </li>

            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="/africanhealthstudy/panel-administration/sections"
                  className={`flex items-center p-2 rounded-lg group ${
                    currentPath ===
                    "/africanhealthstudy/panel-administration/sections"
                      ? "bg-blue-100 text-blue-950"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {" "}
                  The sections
                </Link>
              </div>
            </li>

            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="/africanhealthstudy/panel-administration/sub-sections"
                  className={`flex items-center p-2 rounded-lg group ${
                    currentPath ===
                    "/africanhealthstudy/panel-administration/sub-sections"
                      ? "bg-blue-100 text-blue-950"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {" "}
                  The sub sections
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="/africanhealthstudy/panel-administration/social-question"
                  className={`flex items-center p-2 rounded-lg group ${
                    currentPath ===
                    "/africanhealthstudy/panel-administration/social-question"
                      ? "bg-blue-100 text-blue-950"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {" "}
                  The questions
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="/africanhealthstudy/panel-administration/social-reponse"
                  className={`flex items-center p-2 rounded-lg group ${
                    currentPath ===
                    "/africanhealthstudy/panel-administration/social-reponse"
                      ? "bg-blue-100 text-blue-950"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {" "}
                  The possible answers to the questions
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="/africanhealthstudy/panel-administration/social-dowload"
                  className={`flex items-center p-2 rounded-lg group ${
                    currentPath ===
                    "/africanhealthstudy/panel-administration/social-dowload"
                      ? "bg-blue-100 text-blue-950"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {" "}
                  The responses{" "}
                </Link>
              </div>
            </li>
          </ol>
        </nav>

        <div style={{ paddingTop: "20px" }}>
          <Outlet />
        </div>
      </div>
    );
}

export default LayoutTrackSocial