import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function VisitorAbout() {
    const { t } = useTranslation();

    return (
        <div>
            <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
                <div class="flex justify-center px-4 mx-auto max-w-screen-xl ">
                    <article class="mx-auto w-full max-w-screen-xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert flex justify-center">

                        <div class="bg-white p-8 rounded-lg shadow-lg max-w-3xl">
                            <h1 class="text-3xl font-bold mb-4 text-center">{t("africanSDAHealthStudy")}</h1>
                            <h2 class="text-2xl font-semibold mb-6 text-center">{t("informedConsent")}</h2>

                            <div class="bg-white p-8 rounded-lg text-left ">
                                <h1 class="text-2xl font-bold mb-4">{t("dearRespondent")}</h1>
                                <p class="mb-4">
                                    {t("invitationToParticipate")} <span class="font-semibold"> {t("africanSDAHealthStudy")}</span>.
                                </p>
                                <p class="mb-4">
                                {t("gratefulAssistance")}                                </p>
                                <p class="mb-4">
                                {t("confidentialInformation")}  
                                </p>
                                <p class="mb-4">
                                {t("cooperation")}                                  </p>
                                <p class="mb-4">   {t("thankYou")}</p>
                                <p class="font-semibold"> {t("yoursFaithfully")}</p>
                                <p class="font-semibold"> {t("researchTeam")}</p>
                            </div>

                            <p class="mb-4">
                            {t("participationStudy")}                            </p>
                            <p class="mb-4">
                            {t("participationVoluntary")}                               </p>
                            <p class="mb-4">
                            {t("noParticipationReturn")}                            </p>
                            <p class="mb-4">
                            {t("languageAssistance")}                              </p>
                            <p class="mb-4">
                            {t("signingConsent")}                               </p>
                            <p class="mb-4">
                            {t("researchPrincipalInvestigator")}                               </p>
                            <p class="mb-4 font-semibold">
                                Email: <a href="mailto:ganud@aua.ac.ke" class="text-blue-500 underline">ganud@aua.ac.ke</a> <br />
                                {t("cellPhone")} <a href="tel:+254736656843" class="text-blue-500 underline">+254736656843</a> <br />
                                {t("facultyOffice")} 
                            </p>
                            <p class="mb-4">
                            {t("ethicsReviewApproved")} 
                            </p>
                            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                                <Link to="/" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                <svg class="mx-1 w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                                    </svg>
                                    {t("goBack")}
                                   

                                </Link>

                            </div>
                        </div>

                    </article>

                </div>

            </main>
        </div>
    )
}

export default VisitorAbout