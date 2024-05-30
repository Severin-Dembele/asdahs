import React from 'react'
import { Link } from 'react-router-dom'

function VisitorAbout() {
    return (
        <div>
            <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
                <div class="flex justify-center px-4 mx-auto max-w-screen-xl ">
                    <article class="mx-auto w-full max-w-screen-xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert flex justify-center">

                        <div class="bg-white p-8 rounded-lg shadow-lg max-w-3xl">
                            <h1 class="text-3xl font-bold mb-4 text-center">AFRICAN SEVENTH-DAY ADVENTIST HEALTH STUDY</h1>
                            <h2 class="text-2xl font-semibold mb-6 text-center">Informed Consent</h2>

                            <div class="bg-white p-8 rounded-lg text-left ">
                                <h1 class="text-2xl font-bold mb-4">Dear Respondent,</h1>
                                <p class="mb-4">
                                    This letter invites you to participate in a research study entitled <span class="font-semibold">African Seventh-day Adventist Health Study</span>.
                                </p>
                                <p class="mb-4">
                                    We would be very grateful if you assist in this important research by taking some time to answer the research questionnaire that you will receive.
                                </p>
                                <p class="mb-4">
                                    All information that you provide will be kept confidential.
                                </p>
                                <p class="mb-4">
                                    Please know that your cooperation will greatly help us to accomplish this study.
                                </p>
                                <p class="mb-4">Thank you.</p>
                                <p class="font-semibold">Yours faithfully,</p>
                                <p class="font-semibold">The Research Team</p>
                            </div>

                            <p class="mb-4">
                                You are being asked to participate in a study about health and health behaviors by answering a questionnaire. The information you give may help African Seventh-day Adventists be healthier and get better health education. There are no identifiable risks to you for participating. The questionnaire is anonymous, and your identity will not be revealed. Do not write your name on the questionnaire.
                            </p>
                            <p class="mb-4">
                                You will not be paid to participate. Your participation is voluntary. Your answers cannot identify you, so please answer every question as honestly as possible. Finishing the questionnaire should take about an hour or a little more. After the completed questionnaires are returned, they will be kept in a locked office at the Adventist University of Africa in Nairobi, Kenya. When the research is completed, the questionnaires will be destroyed.
                            </p>
                            <p class="mb-4">
                                If you do not want to participate, return the questionnaire to the Research Assistant. You will not be penalized in any way for not participating. If you begin the questionnaire and do not want to finish it, stop and give it to the research assistant.
                            </p>
                            <p class="mb-4">
                                If English is not your primary language, ask the Research Assistant to give you a copy of this Informed Consent in a language you read and understand. The questionnaire you receive will also be in the same language. If you cannot see, read, write, or understand this Informed Consent, tell the Research Assistant and he/she will assist you. The Research Assistant will also assist you in completing the questionnaire.
                            </p>
                            <p class="mb-4">
                                Signing this Informed Consent means agreeing to participate in the research study. If you have any questions, please ask them now. When you finish the questionnaire, your participation is over.
                            </p>
                            <p class="mb-4">
                                The Research Principal Investigator is Prof. Daniel Ganu. You can contact him if you have comments or complaints about this process. His contact information is:
                            </p>
                            <p class="mb-4 font-semibold">
                                Email: <a href="mailto:ganud@aua.ac.ke" class="text-blue-500 underline">ganud@aua.ac.ke</a> <br />
                                Cell phone: <a href="tel:+254736656843" class="text-blue-500 underline">+254736656843</a> <br />
                                Faculty office: Adventist University of Africa, Library 1st floor, Office of the Dean, School of Postgraduate Studies
                            </p>
                            <p class="mb-4">
                                The appropriate Ethics Review Committee has approved this study and is grant-funded.
                            </p>
                            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                                <Link to="/" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                <svg class="mx-1 w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                                    </svg>
                                    Cancel
                                   

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