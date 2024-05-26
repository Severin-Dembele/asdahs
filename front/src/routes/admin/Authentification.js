import React, { useState } from "react";
import { postDataWithNoToken, setItem, postData } from "../../services";
import { ENDPOINT } from "../../utils";
import { Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function Authentification() {
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
      }else{
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
            className="w-auto h-10 mx-auto"
            src={require("../../images/logo.png")}
            alt="Essitech"
          />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Adresse/Email/Tel
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
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-950 hover:text-blue-950"
                  >
                    Forgot password ?{" "}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => handleSubmit()}
                className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
              >
                Sign in
              </button>
            </div>
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
