import React, { useState } from "react";
import { postDataWithNoToken, setItem, postData } from "../../services";
import { ENDPOINT } from "../../utils";
import { Modal, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ResetPassWord() {
    const navigation = useNavigate();
    const { t } = useTranslation();

    const [alertModal, setAlertModal] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("Information");

    const handleSubmit = async (event) => {
        setAlertModal(true);

        try {
            let endpoint = ENDPOINT.forgotPassword;
            let response;
            response = await postDataWithNoToken(endpoint, formData, false);
            const successMessage =
                response?.data?.message || `${t("informationSaved")}`;
            setMessage(successMessage);
            setItem(response?.data);
            console.log(response);
            setFormData({ username: "", password: "" });
            setTimeout(() => {
                navigation("/")

            }, 500);
        } catch (error) {
            console.log(error?.response);

            const errorMessage =
                error?.response?.data?.message ||
                `${t("error")}`;
            setMessage(errorMessage);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    return (
        <>
            <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="w-auto h-24 mx-auto"
                        src={require("../../images/logo.png")}
                        alt="Essitech"
                    />
                    <h2 className="mt-10  font-bold  tracking-tight text-center text-gray-900">
                        {t("provideEmailForPasswordRecovery")}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">


                        <div class="max-w-md mx-auto">
                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Send</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                                    </svg>

                                </div>
                                <input
                                    onChange={handleChange}
                                    type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-500" placeholder="Email..." required />
                                <button
                                    onClick={() => handleSubmit()}
                                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900">{t("send")}</button>
                            </div>
                        </div>


                        <div>


                            <div className="flex items-center justify-between">

                                <div className="text-sm m-1 underline">
                                    <Link
                                        to="/africanhealthstudy/panel-administration/authentification"
                                        className="font-semibold text-blue-950 hover:text-blue-950"
                                    >
                                        {t("haveAccount")}
                                        {" "}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <button
                                onClick={() => handleSubmit()}
                                className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
                            >
                                Send
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>

            <Modal show={alertModal} onClose={() => setAlertModal(false)}>
                <Modal.Header>    {t("haveAcinformationcount")}</Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={() => setAlertModal(false)}>
                        {t("close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
