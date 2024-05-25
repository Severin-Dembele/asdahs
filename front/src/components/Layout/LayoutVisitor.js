import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FrameLogo } from '../../frame';

function LayoutVisitor() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuClass = isMobileMenuOpen ? 'block' : 'hidden';

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl spa flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex space-x-3 items-center">
            <span className="self-center md:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300 whitespace-nowrap dark:text-white ">
              <FrameLogo />

            </span>
          </Link>
          <div className="flex space-x-2 md:order-2">
            <div className="rounded-2xl hover:bg-gradient-to-r from-blue-950 to-blue-300">
              <button type="button" className="border px-4 py-2 rounded-2xl  text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300 hover:bg-blue-400 hover:text-white hover:border-blue-400"

                onClick={() => { navigate("/contact-us"); }}
              >
                Nous contacter
              </button>
            </div>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`items-center w-full md:flex md:w-auto md:order-1 ${mobileMenuClass}`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded ${location.pathname === '/' ? 'border-b text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300' : 'hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300'
                    } md:p-0 md:dark:hover:text-blue-950 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:border-b-sky-500 hover:border-b`}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/we-are"
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded ${location.pathname === '/we-are' ? 'border-b text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300' : 'hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300'
                    } md:p-0 md:dark:hover:text-blue-950 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700 hover:border-b-sky-500 hover:border-b`}
                >
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link
                  to="/our-society"
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded ${location.pathname === '/our-society' ? 'border-b text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300' : 'hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300'
                    } md:p-0 md:dark:hover:text-blue-950 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700 hover:border-b-sky-500 hover:border-b`}
                >
                  La Société
                </Link>
              </li>
              <li>
                <Link
                  to="/offers-services"
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded ${location.pathname === '/offers-services' ? 'border-b text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300' : 'hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300'
                    } md:p-0 md:dark:hover:text-blue-950 dark:text-white dark:hover-bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700 hover:border-b-sky-500 hover:border-b`}
                >
                  Nos Offres et Services
                </Link>
              </li>
              <li>
                <Link
                  to="/our-partners"
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded ${location.pathname === '/our-partners' ? 'border-b text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300' : 'hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300'
                    } md:p-0 md:dark:hover-text-blue-950 dark:text-white dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700 hover:border-b-sky-500 hover:border-b`}
                >
                  Nos Partenaires
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="pt-20 bg-white" id="essitech">
        <Outlet />
      </div>
      <footer className="bg-blue-900 text-white text-center p-4">
        <div className='flex justify-center space-x-10 flex-wrap '>
          <div className='flex items-center justify-center'>
            <span className="self-center md:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300 whitespace-nowrap dark:text-white ">
              <FrameLogo />

            </span>

          </div>
          <div className='lg:text-justify md:text-center'>
            <p className='md:text-xl lg:text-2xl font-bold '> ASDAHS || African Seventh-day Adventist Health Study </p>
            <p>
              Secteur 25, avenue du Kouritenga
            </p>
            <p>
              01 BP 6803 Ouagadougou 01, Burkina Faso
            </p>
            <p>
              Tel : (+226) 54 09 20 75/ (+226) 70 60 62 97
            </p>
            <p>
              Email : <a href="mailto:contact@essitechgroup.com">contact@essitechgroup.com</a>

            </p>
            <p className='flex mt-5'>
              <p> Suivez-nous sur</p>
              <p className='flex justify-center mx-2'>
                <a className='border rounded-full py-1 text-center hover:bg-white' href='https://www.facebook.com/essitech'
                  target="_blank"
                >
                  <svg className="h-5 w-5 text-blue-950 mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a className='border rounded-full py-1 text-center hover:bg-white ml-1' href='https://www.linkedin.com/school/essitech/'
                  target="_blank"
                >
                  <svg className="h-5 w-5 text-blue-950 mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />  <rect x="2" y="9" width="4" height="12" />  <circle cx="4" cy="4" r="2" /></svg>
                </a>

                <a className='border rounded-full py-1 text-center hover:bg-white ml-1' href='https://twitter.com/essitech'
                  target="_blank"
                >
                  <svg
                    className="h-5 w-5 text-blue-950 mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    style={{
                      enableBackground: "new 0 0 1668.56 1221.19",
                    }}
                    viewBox="0 0 1668.56 1221.19"
                  >
                    <circle
                      cx={834.28}
                      cy={610.6}
                      r={481.33}
                      style={{
                        stroke: "#fff",
                        strokeMiterlimit: 10,
                      }}
                    />
                    <path
                      d="m485.39 356.79 230.07 307.62-231.52 250.11h52.11l202.7-218.98 163.77 218.98h177.32L836.82 589.6l215.5-232.81h-52.11L813.54 558.46 662.71 356.79H485.39zm76.63 38.38h81.46l359.72 480.97h-81.46L562.02 395.17z"
                      style={{
                        fill: "#fff",
                      }}
                      transform="translate(52.39 -25.059)"
                    />
                  </svg>

                </a>
                <a className='border rounded-full p-1 text-center hover:bg-white ml-1' href='https://www.instagram.com/essitechinternational/' target="_blank">
                  <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>

                <a className='border rounded-full p-1 text-center hover:bg-white ml-1' href='https://www.youtube.com/c/essitech' target="_blank">
                  <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>

                </a>

              </p>

            </p>

          </div>
          <div className='lg:text-justify md:text-center'>
            <button
              onClick={() => { navigate('africanhealthstudy/panel-administration/authentification') }}
              className='md:text-xl lg:text-2xl  font-bold'>Essitech Group</button>
            <p>
              <a href="/our-society#essitech-fab">Essitech Fab</a>
            </p>
            <p>
              <a href="/our-society#essitech-academy">Essitech Academy</a>
            </p>
            <p>
              <a href="/our-society#essitech-community">Essitech Community</a>
            </p>
            <p>
              <a href="/our-society#essitech-consulting">Essitech Consulting</a>
            </p>

          </div>

          <div className='lg:text-justify md:text-center'>
            <p className='md:text-xl lg:text-2xl  font-bold'>
              Suivre une de nos formations
            </p>

            <div className='rounded-2xl mt-5 hover:bg-gradient-to-r '>
              <a className='px-4 py-2 border rounded-2xl   text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300 hover:bg-blue-400 hover:text-white hover:border-blue-400' href='https://devis.essitechgroup.com/' target="_blank">
                Demander une estimation tarifaire
              </a>
            </div>
            <div className='rounded-2xl  mt-5 bg-gradient-to-r from-blue-950 to-blue-300 hover:bg-white'>
              <button
                onClick={() => { navigate('essitech-catalog-request') }}
                className='px-4 py-2 border rounded-2xl    hover:bg-clip-text bg-gradient-to-r from-blue-950 to-blue-300 bg-blue-400 text-white border-blue-400 hover:text-black'>
                Téléchargez notre  catalogue de formations.
              </button>
            </div>

          </div>
        </div>
        <p className='p-4'><a href="http://localhost:5000/">Copyright © October 2023 Powered by Essitech</a></p>

      </footer >
    </div >
  );
}

export default LayoutVisitor;
