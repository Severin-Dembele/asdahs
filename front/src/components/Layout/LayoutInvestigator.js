import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { clear, removeItem } from '../../services';

function LayoutInvestigator() {
    const { t } = useTranslation();
    const navigation =useNavigate();

    return (
        <div>


            <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/">
                        <img
                            src={require("../../images/logo.png")}
                            className="h-24  mr-3 sm:h-14 md:mr-3"
                            alt="ASDAHS"
                        />
                    </Link>
                    <div>
                        <button 
                         onClick={()=>{
                            removeItem();
                            navigation("/")
                         }}
                        className='bg-red-800 p-2 rounded-full'><svg class="w-8 h-8 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                        </svg> 
                        </button>
                    </div>
                </div>

            </nav >
            <div className=' py-12 sm:py-24'>

                <Outlet />

            </div>



            <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">


                <span class="block text-sm text-black sm:text-center dark:text-gray-400">© 2024 <a href="https://africanhealthstudy.com/" class="hover:underline"> {t("africanSDAHealthStudy")}</a>. {t("allRight")}</span>

                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link to="/about" class="hover:underline me-4 md:me-6">About</Link>
                    </li>

                </ul>
            </footer>

        </div >
    )
}

export default LayoutInvestigator