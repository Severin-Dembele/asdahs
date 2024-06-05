import React, { useState } from "react";
import { postDataWithNoToken, setItem, postData, putDataToken } from "../../services";
import { ENDPOINT } from "../../utils";
import { Modal, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function VisitorAcceptAnswerConsent() {
    const navigation = useNavigate();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get("token");

    const [alertModal, setAlertModal] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        acceptToAnswer: false,
    });
    const [message, setMessage] = useState("Information");

    const handleSubmit = async (event) => {
        setAlertModal(true);

        if (!formData?.acceptToAnswer) {
            setMessage('Thank you for consenting to participate in our study session.')
            return null;
        }

        try {
            let endpoint = ENDPOINT.accept;
            let response;
            response = await putDataToken(endpoint, formData, false, token);
            const successMessage = response?.data?.message || "Informations enregistrées avec succès.";
            setMessage(successMessage);

            console.log(response);
            setTimeout(() => {
                navigation('/')
            }, 500);

        } catch (error) {

            const errorMessage = error?.response?.data?.message || "Une erreur est survenue, réessayez plus tard !";
            setMessage(errorMessage);
        }
    };

    const handleChangeChecked = (event) => {
        const { name, checked } = event.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };


    return (
        <div>


            <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Adventist University of Africa</span>
                    </a>
                    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>

                    </div>
                    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">

                    </div>
                </div>
            </nav>


            <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
                <div class="flex justify-center px-4 mx-auto ">
                    <article class="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert flex justify-center">

                        <div class="bg-white p-8 rounded-lg  ">
                            <img
                                src={require("../../images/logo.png")}
                                className="h-24 mr-3"
                                alt="ASDAHS"
                            />
                            <h1 class="text-3xl font-bold mb-4 text-center">AFRICAN SEVENTH-DAY ADVENTIST HEALTH STUDY</h1>
                            <h2 class="text-2xl font-semibold mb-6 text-center">Informed Consent</h2>

                            <div class="bg-whiterounded-lg text-left ">
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

                            <div class="flex items-center mb-4">
                                <input
                                    id="acceptToAnswer"
                                    name="acceptToAnswer"
                                    aria-describedby="acceptToAnswer"
                                    type="checkbox"
                                    checked={formData?.acceptToAnswer}
                                    onChange={(e) => handleChangeChecked(e)}


                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="acceptToAnswer" class="ms-2 font-medium text-xl font-bold text-red-800 dark:text-gray-300">By clicking here, you agree to participate in our study *.</label>
                            </div>
                            <div class="flex flex-col  space-x-5 items-center  lg:justify-start space-y-4 sm:flex-row sm:justify-center sm:space-y-0">

                                <button onClick={() => {
                                    handleSubmit()
                                }} class="inline-flex px-10 justify-center items-center py-3  text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">

                                    Send

                                </button>

                            </div>
                        </div>

                    </article>

                </div>

            </main>



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
                    <span class="block text-sm text-black sm:text-center dark:text-gray-400">© 2024 <a href="https://africanhealthstudy.com/" class="hover:underline">African Seventh-day Adventist Health Study</a>. All Rights Reserved.</span>
                </div>
            </footer>




            <Modal show={alertModal} onClose={() => setAlertModal(false)}>
                <Modal.Header>Information</Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={() => setAlertModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default VisitorAcceptAnswerConsent