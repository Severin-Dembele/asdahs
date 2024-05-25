import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FrameNew, FramePartener, FrameRequest } from '../../frame'
import { ENDPOINT } from '../../utils';

function LayoutVisitor() {
  const [formData, setFormData] = useState({});

  // const reloadData = async () => {
  //   try {
  //     const userRes = await getData(ENDPOINT.users);
  //     setFormData(userRes)
  //     console.log(userRes)
  //   } catch (error) {

  //   }
  // };

  // useEffect(() => {
  //   reloadData();
  // }, []);

  const location = useLocation();

  // Le chemin actuel de l'emplacement
  const currentPath = location.pathname;

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only"></span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/" className="flex ml-2 md:mr-24">
                <img
                  src={require("../../images/logo.png")}
                  className="h-8 mr-3"
                  alt="EssitechLogo"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button type="button" className="flex text-sm ">
                    <p>Severin connecter</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <hr className="w-48 h-1 mx-auto my-4 border-0 rounded bg-blue-950 md:my-10 dark:bg-gray-700" />

            <li>
              <Link
                to="/africanhealthstudy/panel-administration/statistic"
                className={`flex items-center p-2 rounded-lg group ${currentPath ===
                  "/africanhealthstudy/panel-administration/statistic"
                  ? "bg-blue-600 text-blue-950"
                  : "hover:bg-blue-600"
                  }`}
              >
                

                <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 
                ${currentPath ===
                    "/africanhealthstudy/panel-administration/statistic"
                    ? "text-blue-950"
                    : "hover:bg-blue-600"
                  }
                `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Statistic</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/africanhealthstudy/panel-administration/social"
                className={`flex items-center p-2 rounded-lg group ${currentPath ===
                  "/africanhealthstudy/panel-administration/social"
                  ? "bg-blue-600 text-blue-950"
                  : "hover:bg-blue-600"
                  }`}
              >
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 
                   ${currentPath ===
                      "/africanhealthstudy/panel-administration/social"
                      ? "text-blue-950"
                      : "hover:bg-blue-600"
                    }
                   `}
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8 5a1 1 0 0 1 1-1h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1a1 1 0 1 1 0-2h1V6H9a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M4 7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4Zm0 11v-5.5h11V18H4Z" clip-rule="evenodd" />
                </svg>


                <span className="flex-1 ml-3 whitespace-nowrap">Forms</span>
              </Link>
            </li>
 */}




            <li>
              <Link
                to="/africanhealthstudy/panel-administration/settings"
                className={`flex items-center p-2 rounded-lg group ${currentPath ===
                  "/africanhealthstudy/panel-administration/settings"
                  ? "bg-blue-600 text-blue-950"
                  : "hover:bg-blue-600"
                  }`}
              >


                <svg c className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 
                ${currentPath ===
                    "/africanhealthstudy/panel-administration/settings"
                    ? "text-blue-950"
                    : "hover:bg-blue-600"
                  }
                `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z" />
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>


                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/africanhealthstudy/panel-administration/users"
                className={`flex items-center p-2 rounded-lg group ${currentPath ===
                  "/africanhealthstudy/panel-administration/users"
                  ? "bg-blue-600 text-blue-950"
                  : "hover:bg-blue-600"
                  }`}
              >
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 
                ${currentPath ===
                      "/africanhealthstudy/panel-administration/users"
                      ? "text-blue-950"
                      : "hover:bg-blue-600"
                    }
                `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            {/* <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </a>
            </li> */}
          </ul>
        </div>
      </aside>

      <div className="p-10 pt-6 sm:ml-64" style={{ paddingTop: "60px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutVisitor;
