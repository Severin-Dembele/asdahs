import React, { useState, useEffect } from "react";
import { postDataWithNoToken1, getData, postDataWithNoTokenForm, postData } from "../../services";
import { ENDPOINT, checkForAtSymbol, formatStatus } from "../../utils";
import { Modal, Button } from "flowbite-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function InvestigatorResponseToform() {
  const [formData, setFormData] = useState([]);
  const navigation = useNavigate();
  let { id } = useParams();
  const { t } = useTranslation();

  const [alertModal, setAlertModal] = useState(false);
  const [message, setMessage] = useState("Information");
  const [listResponse, setListResponse] = useState([]);

  const [formulaire, setFormulaire] = useState({});
  const [headerForm, setHeaderForm] = useState({})

  const [currentPage, setCurrentPage] = useState(0);
  const sectionsPerPage = 1; // Nombre de sections par page

  const [loading, setloading] = useState(false);

  useEffect(() => {
    const reloadData = async () => {
      setloading(true);
      try {
        const [adminRes, repRes] = await Promise.all([
          // getData(`${ENDPOINT.formulaires}/token/${token}`),
          getData(`${ENDPOINT.researcheAssistantFillForm}`),
          getData(`${ENDPOINT.users}/${id}/reponses`)
        ]);
        setListResponse(repRes?.data || []);
        setFormulaire(adminRes?.data || {});
        setHeaderForm(repRes?.data)
      } catch (error) {
        console.error("Error while fetching data:", error);
      }finally {
        setloading(false)
    }

    };

    reloadData();
  }, []);
  useEffect(() => {
    const userResponsesByQuestionId = listResponse?.reponseRepondu?.map((response) => ({
      id: response?.questionId,
      reponses: [response?.title],
    }));

    setFormData(userResponsesByQuestionId || []);
  }, [listResponse]);





  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    const questionId = parseInt(name.split("-")[0], 10); // Convertir l'id en nombre entier

    // Find the question index in formData array
    const questionIndex = formData.findIndex((item) => item.id === questionId);

    // Prepare updated form data array
    let updatedFormData = [];

    if (questionIndex === -1) {
      // If the question is not in formData, add it with the new response
      updatedFormData = [
        ...formData,
        {
          id: questionId,
          reponses: checked && type === "checkbox" ? [value] : [value], // Adjust as needed based on your logic
        },
      ];
    } else {
      // If the question is already in formData, update its responses
      updatedFormData = formData.map((item) =>
        item.id === questionId
          ? {
            ...item,
            reponses: checked && type === "checkbox"
              ? [...new Set([...item.reponses, value])]
              : [value], // Adjust as needed based on your logic
          }
          : item
      );
    }

    // Update formData state with the updated form data
    setFormData(updatedFormData);
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
  
  if (loading) {
    return (
        <div className="h-[100vh] flex justify-center items-center text-center">
            <div className="flex items-center justify-center w-64 h-64 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-1  font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200 text-2xl">loading...</div>
            </div>
        </div>
    )
}


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

      <div className="w-full max-w-3xl lg:p-8 bg-whiterounded-lg shadow-lg lg:max-w-5xl md:p-2 pt-20">

        <div class="px-4 sm:px-0">


          <div class="flex flex-col space-y-4 sm:flex-row  justify-around sm:space-y-0 m-3">
            <button
              onClick={() => { navigation(-1) }}
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
              <svg class="mx-1 w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
              </svg>
              {t("goBack")}
            </button>

            <button
              onClick={() => { navigation(`/investigator/userEdit?token=${id}`) }}
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-green-900">
              <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z" clip-rule="evenodd" />
              </svg>

              {t("edit")}
            </button>

          </div>
          <h3 class="text-base font-semibold leading-7 text-gray-900">{headerForm?.name}</h3>
          <p class="max-w-4xl text-sm  text-blue-500 ">
            Email: <a href={`mailto:${headerForm.email ?? '--'}`} className='underline mr-4'>{checkForAtSymbol(headerForm.email) ?? '--'},</a>
            Phone: <a href={`tel:${headerForm.telephone ?? '--'}`} className='underline'>{headerForm.telephone ?? '--'}</a>

          </p>
          <p class="max-w-4xl text-sm  text-gray-500 font-bold">
            Church Name: <span className='font-normal mr-4'> {headerForm.churchName ?? '--'},</span>
            Church Type : <span className='font-normal'> {headerForm.typeChurch ?? '--'}</span>
          </p>
        </div>

        <div class="flex items-center font-bold  w-auto">
          <div class={`h-2.5 w-2.5 rounded-full me-2 ${headerForm?.status === "NOT_STARTED" ? "bg-red-500" :
            headerForm?.status === "PROGRESS" ? "bg-yellow-500" :
              headerForm?.status === "CLOSED" ? "bg-green-500" :
                headerForm?.status === "REOPENED" ? "bg-blue-500" : "bg-gray-500"
            }`}></div>
          {formatStatus(headerForm?.status)}
        </div>

        <section className="bg-center bg-no-repeat bg-blend-multiply backgrougImage">
          <div className="max-w-screen-xl px-4 py-24 pt-10 mx-auto text-center lg:py-46 ">

          </div>
        </section>


        <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-center md:text-2xl lg:text-3xl">
          {" "}
        </h1>

        <h1 className="mb-4 text-xs font-extrabold leading-none tracking-tight text-center md:text-xs lg:text-xl">
          {formulaire?.title} <br />
          <span className="font-light"> {formulaire?.description} </span>
        </h1>

        <div className="m-9 sm:m-3">
          <ol
            style={{
              listStyle: "upper-roman",
            }}
            className="space-y-1 text-gray-900 list-outside dark:text-gray-400 md:text-xs lg:text-xl "
          >
            {formulaire?.section?.length > 0 &&
              formulaire?.section
                ?.map((section, idxSection) => (
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

        {/* <div className="flex flex-col items-center">

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
        </div> */}

        <section className="items-center justify-center mb-6 lg:flex">
          <div className="items-center w-full max-w-6xl px-5">
            <div className="px-6 py-10 isolate lg:px-8">
              <div className="mx-auto mt-16 sm:mt-20">
                <div className="mt-10">
                  <button
                    onClick={() => { navigation(-1) }}
                    className="block w-full rounded-md bg-red-950 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
                  >
                    {t("goBack")}
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
            disabled
            defaultValue={formData.find((item) => item.id === question?.id)?.reponses[0] || ""}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        );
      case "NUMERIC":
        return (
          <input
            type="number"
            name={question?.id}
            disabled
            defaultValue={formData.find((item) => item.id === question?.id)?.reponses[0] || ""}
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
            disabled
            onChange={handleInputChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        );
      case "HEURE":
        return (
          <input
            type="time"
            name={question?.id}
            disabled
            onChange={handleInputChange}
            className="block py-1.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-950 focus:outline-none focus:ring-0 focus:border-blue-950 peer"
          />
        );
      case "DATE":
        return (
          <input
            type="date"
            name={question?.id}
            disabled
            onChange={handleInputChange}
            className="block py-1.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-950 focus:outline-none focus:ring-0 focus:border-blue-950 peer"
          />
        );
      case "PARAGRAPHE":
        return (
          <textarea
            name={question?.id}
            disabled
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
      case "CHOIX_MULTIPLE_OTHER":
        return renderMultipleChoiceOther(question);
      case "CASE_COCHER_OTHER":
        return <div class="flex flex-wrap font-normal ">
          {renderRadioButtonsOther(question)}
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
              checked={
                formData.find(
                  (item) =>
                    item.id === question?.id &&
                    item.reponses.includes(reponse?.title)
                )
                  ? true
                  : false
              }
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



  function renderMultipleChoiceOther(question) {
    return (
      <>
        {question?.option?.map((reponse, idx) => (
          <div key={idx} className="flex items-center mb-3">
            <input
              type="checkbox"
              name={question?.id}
              value={reponse?.title}
              onChange={handleInputChange}
              checked={
                formData.find(
                  (item) =>
                    item.id === question?.id &&
                    item.reponses.includes(reponse?.title)
                )
                  ? true
                  : false
              }
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-950 focus:ring-blue-950 dark:focus:ring-blue-950 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="text-sm font-medium text-gray-800 ms-2 dark:text-gray-900">
              {reponse?.title}
            </label>
          </div>
        ))}
        <input
          type="text"
          name={question?.id}
          defaultValue={formData.find((item) => item.id === question?.id)?.reponses[0] || ""}
          onChange={handleInputChange}
          className="block border-l-2 border-r-2 rounded-lg px-2 py-2.5  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
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
              checked={
                formData.find(
                  (item) =>
                    item.id === question?.id &&
                    item.reponses.includes(reponse?.title)
                )
                  ? true
                  : false
              }
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


  function renderRadioButtonsOther(question) {
    return (
      <>
        {question?.option?.map((reponse, idx) => (
          <div key={idx} className="flex items-center mb-4 me-7">
            <input
              type="radio"
              name={question?.id}
              value={reponse?.title}
              checked={
                formData.find(
                  (item) =>
                    item.id === question?.id &&
                    item.reponses.includes(reponse?.title)
                )
                  ? true
                  : false
              }
              onChange={handleInputChange}
              className="w-4 h-4 bg-gray-100 border-gray-300 text-blue-950 focus:ring-blue-950 dark:focus:ring-blue-950 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
              {reponse?.title}
            </label>
          </div>
        ))}
        <input
          type="text"
          name={question?.id}
          defaultValue={formData.find((item) => item.id === question?.id)?.reponses[0] || ""}
          onChange={handleInputChange}
          className="block border-l-2 border-r-2 rounded-lg px-2 py-2.5  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
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

export default InvestigatorResponseToform;
