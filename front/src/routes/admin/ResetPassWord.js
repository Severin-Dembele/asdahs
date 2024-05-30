import React, { useState } from "react";
import { postDataWithNoToken, setItem, postData } from "../../services";
import { ENDPOINT } from "../../utils";
import { Modal, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassWord() {
    const navigation = useNavigate();

    const [alertModal, setAlertModal] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("Information");

    const handleSubmit = async (event) => {
        setAlertModal(true);

        try {
            let endpoint = ENDPOINT.security;
            let response;
            response = await postDataWithNoToken(endpoint, formData, false);
            const successMessage =
                response?.data?.message || "Informations enregistrées avec succès.";
            setMessage(successMessage);
            setItem(response?.data);
            console.log(response);
            setFormData({ username: "", password: "" });
            if (response?.data?.role === "ADMIN") {
                navigation("/africanhealthstudy/panel-administration");
            } else if (response?.data?.role === "INVESTIGATOR") {
                navigation("/investigator");
            } else {
                navigation("/formulaire?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxNjY2OTIyNywiZXhwIjoxNzE5MjYxMjI3fQ.3DECr5LKQB1XWGADjbOVMm9da9oQ4TaqaVVS0PMx7lY")
            }
        } catch (error) {
            console.log(error?.response);

            const errorMessage =
                error?.response?.data?.message ||
                "Une erreur est survenue, réessayez plus tard !";
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
                    Please provide your email address to receive the procedure for recovering your password.
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        {/* <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}


                        <div class="max-w-md mx-auto">
                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Send</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                                    </svg>

                                </div>
                                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-500" placeholder="Email..." required />
                                <button
                                    onClick={() => handleSubmit()}
                                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900">Send</button>
                            </div>
                        </div>


                        <div>

                            {/* <div className="mt-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                    className=" mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
                                />
                            </div> */}

                            <div className="flex items-center justify-between">

                                <div className="text-sm m-1 underline">
                                    <Link
                                        to="/africanhealthstudy/panel-administration/authentification"
                                        className="font-semibold text-blue-950 hover:text-blue-950"
                                    >
                                        Do you have an account ?{" "}
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
                <Modal.Header>Information</Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={() => setAlertModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
