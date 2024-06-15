import React, { useState, useEffect } from "react";
import { postDataWithNoToken1, getData, postDataWithNoTokenForm, postData, postDataToken, getDataToken } from "../../services";
import { ENDPOINT } from "../../utils";
import { Modal, Button } from "flowbite-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function RespondentFillForms() {
    const [formData, setFormData] = useState([]);
    const navigation =useNavigate();
    // const { search } = useLocation();
    // const params = new URLSearchParams(search);
    // const token = params.get("token");
    let { id } = useParams();
    const { t } = useTranslation();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get("token");

    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxNjY2OTIyNywiZXhwIjoxNzE5MjYxMjI3fQ.3DECr5LKQB1XWGADjbOVMm9da9oQ4TaqaVVS0PMx7lY";
    const [alertModal, setAlertModal] = useState(false);
    const [message, setMessage] = useState("Information");

    const [formulaire, setFormulaire] = useState({});

    const [currentPage, setCurrentPage] = useState(0);
    const sectionsPerPage = 1; // Nombre de sections par page

    useEffect(() => {
        const reloadData = async () => {
            try {
                const [adminRes] = await Promise.all([
                    // getData(`${ENDPOINT.formulaires}/token/${token}`),
                    getDataToken(`${ENDPOINT.researcheAssistantFillForm}`, token),

                ]);

                setFormulaire(adminRes?.data || {});
            } catch (error) {
                console.error("Error while fetching data:", error);
            }
        };

        reloadData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value, checked, type } = event.target;
        const questionId = name.split("-")[0];

        // Find the question index in formData array
        const questionIndex = formData.findIndex((item) => item.id === questionId);

        // If the question is not in formData, add it
        if (questionIndex === -1) {
            setFormData([
                ...formData,
                {
                    id: questionId,
                    reponses: [value],
                },
            ]);
        } else {
            // If the question is already in formData, update its responses
            const updatedFormData = [...formData];
            const existingResponses = updatedFormData[questionIndex].reponses;

            if (checked && type === "checkbox") {
                // Add the response if checked and it's a CHOIX_MULTIPLE with checkbox
                updatedFormData[questionIndex].reponses = [...existingResponses, value];
            } else {
                // Otherwise, update the responses as before
                updatedFormData[questionIndex].reponses = [value];
            }

            setFormData(updatedFormData);
        }
    };

    const handleSubmit = async () => {
        id = 1;

        setAlertModal(true);
        try {
            const response = await postDataToken(
                `${ENDPOINT.formulaires}/${formulaire?.id}/${ENDPOINT.users}/${id}/reponses`,
                formData,
                false,
                token
            );
            const successMessage =
                response?.data?.message ||
                "Votre message a été envoyé avec succès à l'équipe ASDAHS.";
            setMessage(successMessage);

            setTimeout(() => {
                navigation('/')
            }, 600);
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                "Une erreur est survenue, réessayez plus tard !";
            setMessage(errorMessage);
        }
    };

    const totalPages = Math.ceil(
        (formulaire?.section?.length || 0) / sectionsPerPage
    );

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    if (!formulaire?.isValid) {
        return (
            <>
                <div className="min-h-[90vh] flex justify-center items-center  ">
                    <div className="text-center">
                        <img
                            src={require("../../images/logo.png")}
                            alt="Image de chargement"
                            className="object-contain w-64 mx-auto"
                        />
                        <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-center md:text-2xl lg:text-3xl typewriter">
                           
                        </h1>

                        <div className="flex justify-center">
                            <p className="container mt-4 text-lg leading-5 tracking-tight text-center md:text-xl lg:text-2xl">
                                Dear partner, The response period{" "}
                                <span className="text-red-700">to this form has expired</span>.
                                We appreciate your understanding. You can contact us directly at
                                the following email address: mail@mail.com. We remain at your
                                disposal for any assistance."
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className="min-h-[95vh] flex justify-center ">
            <div className="w-full max-w-3xl lg:p-8 bg-whiterounded-lg shadow-lg lg:max-w-5xl md:p-2">
                <section className="bg-center bg-no-repeat bg-blend-multiply backgrougImage">
                    <div className="max-w-screen-xl px-4 py-24 pt-10 mx-auto text-center lg:py-46 "></div>
                </section>

                <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-center md:text-2xl lg:text-3xl">
                   {" "}
                </h1>

                <h1 className="mb-4 text-xs font-extrabold leading-none tracking-tight text-center md:text-xs lg:text-xl">
                    {formulaire?.title} <br />
                    <span className="font-light"> {formulaire?.description} </span>
                </h1>
                {/* <p>{JSON.stringify(formData)}</p> */}
                <div className="m-9 sm:m-3">
                    <ol
                        style={{
                            listStyle: "upper-roman",
                        }}
                        className="space-y-1 text-gray-900 list-outside dark:text-gray-400 md:text-xs lg:text-xl "
                    >
                        {formulaire?.section?.length > 0 &&
                            formulaire?.section
                                ?.slice(
                                    currentPage * sectionsPerPage,
                                    (currentPage + 1) * sectionsPerPage
                                )
                                .map((section, idxSection) => (
                                    <li key={idxSection}>
                                        <span className="text-3xl font-semibold leading-normal text-gray-900 dark:text-white md:text-xs lg:text-xl">
                                            {section?.title}
                                        </span>{" "}
                                        <br />
                                        <span className="text-xs leading-normal text-gray-900 dark:text-white ">
                                            {section?.description}
                                        </span>{" "}
                                        <br />
                                        <ol className="list-decimal list-outside ">
                                            {section?.question?.length > 0 &&
                                                section?.question.map((question, index) => (
                                                    <li
                                                        className="flex flex-wrap mb-7"
                                                        key={index}
                                                    >
                                                        <div className="container mx-auto bg-white rounded-md">
                                                            <label className="block mb-2 font-semibold text-black text">
                                                                {question?.title} :
                                                            </label>
                                                            {renderFormField(question)}
                                                        </div>
                                                    </li>
                                                ))}
                                            {section?.sous_sections?.length > 0 &&
                                                section?.sous_sections.map((soussection, indexSous) => (
                                                    <div
                                                        className="items-center justify-center my-2 bg-white"
                                                        key={indexSous}
                                                    >
                                                        <span className="text-3xl font-semibold leading-normal text-gray-900 dark:text-white md:text-xs lg:text-xl">
                                                            {soussection?.title}
                                                        </span>{" "}
                                                        <br />
                                                        <span className="text-xs leading-normal text-gray-900 dark:text-white ">
                                                            {soussection?.description}
                                                        </span>{" "}
                                                        <br />
                                                        {soussection?.question?.length > 0 &&
                                                            soussection?.question.map((question, indexQ) => (
                                                                <li
                                                                    // className="mb-4 bg-red-400"
                                                                    key={indexQ}
                                                                >
                                                                    <div className="container p-6 py-2 mx-auto bg-white rounded-md">
                                                                        <label className="block mb-2 text-sm font-semibold text-black">
                                                                            {question?.title} :
                                                                        </label>
                                                                        {renderFormField(question)}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        <hr className="w-1/6 h-1 mx-auto my-6 bg-blue-900 border-0 rounded md:my-10 dark:bg-gray-700" />
                                                    </div>
                                                ))}
                                        </ol>
                                        <hr className="w-1/2 h-2 mx-auto my-6 bg-blue-900 border-0 rounded md:my-10 dark:bg-gray-700" />
                                    </li>
                                ))}
                    </ol>
                </div>

                <div className="flex flex-col items-center">
                    {/* <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {currentPage * sectionsPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.min(
                                (currentPage + 1) * sectionsPerPage,
                                formulaire?.section?.length
                            )}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {formulaire?.section?.length}
                        </span>{" "}
                        Entries
                    </span> */}

                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        {t("page")}{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {currentPage * sectionsPerPage + 1}
                        </span>{" "}

                        {t("of")}{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {formulaire?.section?.length}
                        </span>{" "}
                    </span>


                    <div className="inline-flex mt-2 xs:mt-0">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-blue-800 rounded-s hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <svg
                                class="w-3.5 h-3.5 me-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 5H1m0 0 4 4M1 5l4-4"
                                />
                            </svg>
                            {t("previous")}
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-blue-800 border-0 border-blue-700 border-s rounded-e hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {t("next")}
                            <svg
                                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <section className="items-center justify-center mb-6 lg:flex">
                    <div className="items-center w-full max-w-6xl px-5">
                        <div className="px-6 py-10 isolate lg:px-8">
                            <div className="mx-auto mt-16 sm:mt-20">
                                <div className="mt-10">
                                    <button
                                        onClick={handleSubmit}
                                        className="block w-full rounded-md bg-blue-950 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
                                    >
                                        {t("send")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section />

                {/* ... (votre code existant) ... */}

                <Modal show={alertModal} onClose={() => setAlertModal(false)}>
                    <Modal.Header>  {t("information")}</Modal.Header>
                    <Modal.Body>{message}</Modal.Body>
                    <Modal.Footer>
                        <Button color="red" onClick={() => setAlertModal(false)}>
                            {t("close")}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );

    function renderFormField(question) {
        switch (question?.type) {
            case "REPONSE_COURTE":
                return (
                    <input
                        type="text"
                        name={question?.id}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                );
            case "ECHELLE_LINEAIRE":
                return (
                    <input
                        type="range"
                        min={question?.option[0]?.title}
                        max={question?.option[1]?.title}
                        name={question?.id}
                        onChange={handleInputChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                );
            case "HEURE":
                return (
                    <input
                        type="time"
                        name={question?.id}
                        onChange={handleInputChange}
                        className="block py-1.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-950 focus:outline-none focus:ring-0 focus:border-blue-950 peer"
                    />
                );
            case "DATE":
                return (
                    <input
                        type="date"
                        name={question?.id}
                        onChange={handleInputChange}
                        className="block py-1.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-950 focus:outline-none focus:ring-0 focus:border-blue-950 peer"
                    />
                );
            case "PARAGRAPHE":
                return (
                    <textarea
                        name={question?.id}
                        onChange={handleInputChange}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                );
            case "CHOIX_MULTIPLE":
                return renderMultipleChoice(question);
            case "CASE_COCHER":
                return <div class="flex flex-wrap font-normal ">
                    {renderRadioButtons(question)}
                </div>;
            case "LISTE_DEROULANTE":
                return renderDropdown(question);
            default:
                return null;
        }
    }

    function renderMultipleChoice(question) {
        return (
            <>
                {question?.option?.map((reponse, idx) => (
                    <div key={idx} className="flex items-center mb-3">
                        <input
                            type="checkbox"
                            name={question?.id}
                            value={reponse?.title}
                            onChange={handleInputChange}
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-950 focus:ring-blue-950 dark:focus:ring-blue-950 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="text-sm font-medium text-gray-800 ms-2 dark:text-gray-900">
                            {reponse?.title}
                        </label>
                    </div>
                ))}
            </>
        );
    }

    function renderRadioButtons(question) {
        return (
            <>
                {question?.option?.map((reponse, idx) => (
                    <div key={idx} className="flex items-center mb-4 me-7">
                        <input
                            type="radio"
                            name={question?.id}
                            value={reponse?.title}
                            onChange={handleInputChange}
                            className="w-4 h-4 bg-gray-100 border-gray-300 text-blue-950 focus:ring-blue-950 dark:focus:ring-blue-950 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                            {reponse?.title}
                        </label>
                    </div>
                ))}
            </>
        );
    }

    function renderDropdown(question) {
        return (
            <select
                name={question?.id}
                onChange={handleInputChange}
                className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-950"
            >
                <option value="" disabled>
                    Select an option
                </option>
                {question?.option?.map((reponse, idx) => (
                    <option key={idx} value={reponse?.title}>
                        {reponse?.title}
                    </option>
                ))}
            </select>
        );
    }
}

export default RespondentFillForms;
