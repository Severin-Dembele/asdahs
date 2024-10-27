import React, { useState } from "react";
import { postDataWithNoToken, setItem, postData, putDataToken } from "../../services";
import { ENDPOINT } from "../../utils";
import { Modal, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function VisitorAcceptAnswerConsent() {
    const navigation = useNavigate();
    const { t } = useTranslation();

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
            setMessage( `${t("thankYouForConsenting")}`)
            return null;
        }

        try {
            let endpoint = ENDPOINT.accept;
            let response;
            response = await putDataToken(endpoint, formData, false, token);
            const successMessage = response?.data?.message || `${t("informationSaved")}`;
            setMessage(successMessage);

            console.log(response);
            setTimeout(() => {
                navigation('/')
            }, 500);

        } catch (error) {

            const errorMessage = error?.response?.data?.message || `${t("error")}`;
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
            <a
              href="https://africanhealthstudy.com/"
              class="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {t("africanSDAHealthStudy")}
              </span>
            </a>
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {/* <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{t("getStarted")}</button> */}
            </div>
            <div
              class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            ></div>
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
                <h1 class="text-3xl font-bold mb-4 text-center">
                  {t("africanSDAHealthStudy")}
                </h1>
                <h2 class="text-2xl font-semibold mb-6 text-center">
                  {t("informedConsent")}
                </h2>

                <div class="bg-white p-8 rounded-lg text-left ">
                  <h1 class="text-2xl font-bold mb-4">{t("dearRespondent")}</h1>
                  <p class="mb-4">
                    {t("invitationToParticipate")}{" "}
                    <span class="font-semibold">
                      {" "}
                      {t("africanSDAHealthStudy")}
                    </span>
                    .
                  </p>
                  <p class="mb-4">{t("gratefulAssistance")} </p>
                  <p class="mb-4">{t("confidentialInformation")}</p>
                  <p class="mb-4">{t("cooperation")} </p>
                  <p class="mb-4"> {t("thankYou")}</p>
                  <p class="font-semibold"> {t("yoursFaithfully")}</p>
                  <p class="font-semibold"> {t("researchTeam")}</p>
                </div>

                <p class="mb-4">{t("participationStudy")} </p>
                <p class="mb-4">{t("participationVoluntary")} </p>
                <p class="mb-4">{t("noParticipationReturn")} </p>
                <p class="mb-4">{t("languageAssistance")} </p>
                <p class="mb-4">{t("signingConsent")} </p>
                <p class="mb-4">{t("researchPrincipalInvestigator")} </p>
                <p class="mb-4 font-semibold">
                  Email:{" "}
                  <a
                    href="mailto:ganud@aua.ac.ke"
                    class="text-blue-500 underline"
                  >
                    ganud@aua.ac.ke
                  </a>{" "}
                  <br />
                  {t("cellPhone")}{" "}
                  <a href="tel:+254736656843" class="text-blue-500 underline">
                    +254736656843
                  </a>{" "}
                  <br />
                  {t("facultyOffice")}
                </p>
                <p class="mb-4">{t("ethicsReviewApproved")}</p>
                <div class="flex items-center mb-4">
                  <input
                    id="acceptToAnswer"
                    name="acceptToAnswer"
                    aria-describedby="acceptToAnswer"
                    type="checkbox"
                    checked={formData?.acceptToAnswer}
                    onChange={(e) => handleChangeChecked(e)}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="acceptToAnswer"
                    class="ms-2 font-medium text-xl font-bold text-red-800 dark:text-gray-300"
                  >
                    {t("clickToAgree")} *.
                  </label>
                </div>
                <div class="flex flex-col  space-x-5 items-center  lg:justify-start space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                    class="inline-flex px-10 justify-center items-center py-3  text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                  >
                    {t("send")}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </main>

        <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
          <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <a
                href="https://africanhealthstudy.com/"
                class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <img
                  src={require("../../images/logo.png")}
                  class="h-24"
                  alt="Health Research Study for Adventists in Africa"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
                  ASDAHS
                </span>
              </a>
              <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    Login
                  </a>
                </li>
              </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-black sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="https://africanhealthstudy.com/" class="hover:underline">
                {" "}
                {t("africanSDAHealthStudy")}
              </a>
              . {t("allRight")}
            </span>
          </div>
        </footer>

        <Modal show={alertModal} onClose={() => setAlertModal(false)}>
          <Modal.Header>{t("information")}</Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button color="red" onClick={() => setAlertModal(false)}>
              {t("close")}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default VisitorAcceptAnswerConsent