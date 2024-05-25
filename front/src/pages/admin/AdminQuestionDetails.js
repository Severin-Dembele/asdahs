import React, { useState, useEffect } from "react";
import {
  getData,
  postDataWithNoToken,
  putDataWithNoToken,
} from "../../services";
import { ENDPOINT, PaginatedTable, OPTIONS_SELCT } from "../../utils";

import { Modal, Label, Button, TextInput, Textarea } from "flowbite-react";
import { useParams } from "react-router-dom";

function AdminQuestionDetails() {
      let { id } = useParams();

  const [list, setList] = useState([]);
  const [listInitial, setListInitial] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const reloadData = async () => {
    try {
      const adminRes = await getData(`${ENDPOINT.questions}/${id}/responses-proposed`);
      setList(adminRes?.data || []);
      setListInitial(adminRes?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    reloadData();
  }, []);

  // Fonction pour extraire les données paginées en fonction de la page
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return list.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deleteDta = async (id) => {
    setAlertModal(true);

    try {
      const response = await deleteDta(`${ENDPOINT.response}/${id}`);
      const successMessage =
        response?.data?.message || "Informations enregistrées avec succès.";
      setMessage(successMessage);
      reloadData();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur est survenue, réessayez plus tard !";
      setMessage(errorMessage);
    }
  };

  const [isModal, setIsModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    id: null,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [message, setMessage] = useState("Information");

  const handleSubmit = async () => {
    setIsModal(false);
    setAlertModal(true);

    try {
      let endpoint = ENDPOINT.reponses;
      let response;

      if (formData?.id) {
        endpoint = `${ENDPOINT.reponses}`;
        response = await putDataWithNoToken(endpoint, formData,false);
      } else {
        response = await postDataWithNoToken(
          `${ENDPOINT.questions}/${id}/responses-proposed`,
          formData, false
        );
      }

      const successMessage =
        response?.data?.message || "Enregistrement effectué";
      setMessage(successMessage);

      reloadData();
      setFormData({});
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur est survenue, réessayez plus tard !";
      setMessage(errorMessage);
    }
  };

  const onSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const rechercheMinuscule = value.toLowerCase();

    const filterList = (list, properties) => {
      return list.filter((user) => {
        return properties.some((property) => {
          const propertyValue = user?.[property]?.toLowerCase() || "";
          return propertyValue.includes(rechercheMinuscule);
        });
      });
    };

    const propertiesToFilter1 = ["title", "description"];
    const resultatsRecherche1 = filterList(listInitial, propertiesToFilter1);
    setList(resultatsRecherche1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between text-center">
        <p className="mt-3 mb-6 text-2xl font-bold">List of possible responses</p>
        <button
          className="p-2 text-white bg-teal-800 rounded-lg "
          onClick={() => {
            setIsModal(true);
            setFormData({});
          }}
        >
          New
        </button>
      </div>
      <form className="m-3">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={onSearch}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-950 focus:border-blue-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-950 dark:focus:border-blue-950"
            placeholder="Search ....."
            required
          />
        </div>
      </form>

      <div className="flex flex-wrap px-5 py-4 bg-blue-50 ">
        {getPaginatedData()?.length > 0 && (
          <ul role="list" className="w-full divide-y divide-blue-950">
            {getPaginatedData()?.map((item, index) => (
              <li key={index} className="flex justify-between py-5 gap-x-6">
                <div className="flex min-w-0 gap-x-4">
                  <div className="flex-auto min-w-0">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {item?.title}{" "}
                    </p>
                   
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                
                  <div className="flex justify-center">
                    <button className="px-4 py-1 m-1 text-center border rounded-md bg-gray-50">
                      Details
                    </button>
                    <button
                      onClick={() => {
                        deleteDta(item?.id);
                      }}
                      className="px-4 py-1 m-1 text-center bg-red-500 border rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setFormData({
                          ...item,
                        });
                        setIsModal(true);
                      }}
                      className="px-4 py-1 m-1 text-center bg-green-500 border rounded-md"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <PaginatedTable
        data={list}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      <Modal show={isModal} onClose={() => setIsModal(false)}>
        <Modal.Header>Responses possible</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-1">
            <div>
              <div className="block mb-2">
                <Label htmlFor="name" value="Title of the responses." />
              </div>
              <TextInput
                id="title"
                sizing="md"
                name="title"
                helperText={
                  !formData?.title ? (
                    <span className="font-normal text-red-500">
                      Please fill in this field. Thank you..
                    </span>
                  ) : null
                }
                value={formData.title}
                onChange={handleChange}
                label={`Title du formulaire`}
                type="text"
              />
            </div>

            {/* <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a response type.
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-950 focus:border-blue-950 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-950 dark:focus:border-blue-950"
              >
                <option disabled selected>
                  Choisissez un type de réponse
                </option>
                {OPTIONS_SELCT.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="red" onClick={() => setIsModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>

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
  );
}

export default AdminQuestionDetails;
