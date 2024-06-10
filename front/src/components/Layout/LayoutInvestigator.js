import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function LayoutInvestigator() {
    const { t } = useTranslation();

    return (
        <div>


            <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/">
                        <img
                            src={require("../../images/logo.png")}
                            className="h-24 mr-3 sm:h-14 md:mr-3"
                            alt="ASDAHS"
                        />
                    </Link>
                 
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