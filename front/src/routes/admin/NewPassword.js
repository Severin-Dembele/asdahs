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

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

                        <div className="mt-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("password")}
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z" />
                                            <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                                            <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div class="max-w-md mx-auto">
                            <label for="newPassword" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">Confirm new password</label>
                            <div class="relative">

                                <input
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"

                                    id="newPassword" class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-500" placeholder="Confirm new password..." required />
                                <button
                                    onClick={() => handleSubmit()}
                                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900">{t("send")}</button>
                            </div>
                        </div>

                        {formData?.password != formData?.newPassword && (
                            <span className="text-red-800 text-sm">The two passwords do not match</span>

                        )}
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
