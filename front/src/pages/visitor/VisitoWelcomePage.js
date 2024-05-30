import React from 'react';
import { Link } from 'react-router-dom';

function VisitoWelcomePage() {
    return (
        <div>
            <div className='min-h-[80vh] '>


                <section class="bg-center bg-no-repeat bg-gray-100 bg-blend-multiply">
                    <div class="px-4 mx-auto max-w-screen-xl text-center  lg:py-56">
                        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">African Seventh-Day Adventist Health Study</h1>
                        <p class="mb-8 text-lg font-normal text-black lg:text-xl sm:px-16 lg:px-48">This letter invites you to participate in a research study entitled African Seventh-day Adventist Health Study. {process.env.API_SERVER}</p>
                        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <Link to="/africanhealthstudy/panel-administration/authentification" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Get started
                                <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                            <Link to="/about" class=" bg-blue-700  inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                                Learn more
                            </Link>
                        </div>
                    </div>
                </section>

                {/*  */}

            </div>



            <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={require("../../images/logo.png")} class="h-24" alt="African Seventh-day Adventist Health Study" />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">ASDAHS</span>
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                           
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Login</a>
                            </li>
                            
                        </ul>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-black sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">African Seventh-day Adventist Health Study</a>. All Rights Reserved.</span>
                </div>
            </footer>



        </div>
    )
}

export default VisitoWelcomePage