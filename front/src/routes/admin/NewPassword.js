import React, { useState } from "react";
import { postDataWithNoToken, setItem, postData } from "../../services";
import { ENDPOINT } from "../../utils";
import { Modal, Button } from "flowbite-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function NewPassword() {
    const navigation = useNavigate();
    const { t } = useTranslation();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const otp = params.get("otp");
    const [alertModal, setAlertModal] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        isRest: false,
        otp: otp,
        newPassword: "",
    });
    const [message, setMessage] = useState("Information");

    const isPasswordValid = (password) => {
        // Check if the password has at least 4 characters, one uppercase letter, one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
        return passwordRegex.test(password);
    };


    const handleSubmit = async (event) => {
        setAlertModal(true);
        if (formData?.newPassword != formData?.password) {
            setMessage("The passwords do not match.");
            return null;
        }
        if (formData?.newPassword?.length < 4) {
            setMessage("The password must be at least 4 characters long, include uppercase and lowercase letters, a number, and a special character.");
            return null;
        }
        try {
            let endpoint = ENDPOINT.resetpassword;
            let response;
            response = await postDataWithNoToken(endpoint, formData, false);
            const successMessage =
                response?.data?.message || `${t("informationSaved")}`;
            setMessage(successMessage);
            setTimeout(() => {
                navigation('/');
            }, 100);
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
                            <label for="password" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">New password</label>

                            <div class="relative">

                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="password"

                                    id="password" class="block w-full  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-500" placeholder="New password..." required />
                            </div>
                        </div>


                        <div class="max-w-md mx-auto">
                            <label for="newPassword" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">Confirm new password</label>
                            <div class="relative">

                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="newPassword"

                                    id="newPassword" class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-500" placeholder="Confirm new password..." required />
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
                <Modal.Header>    {t("informations")}</Modal.Header>
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
