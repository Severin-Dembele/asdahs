import React, { useState, useEffect } from "react";
import {
  getData,
  postDataWithNoToken,
  putDataWithNoToken,
} from "../../services";
import { ENDPOINT, PaginatedTable } from "../../utils";
import { useParams } from "react-router-dom";
import { Modal, Label, Button, TextInput, Textarea } from "flowbite-react";

function AdminDetailForm() {
  let { id } = useParams();

  const [list, setList] = useState([]);
  const [listInitial, setListInitial] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const reloadData = async () => {
    try {
      const adminRes = await getData(`${ENDPOINT.formulaires}/${id}/sections`);

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
      const response = await deleteDta(`${ENDPOINT.formulaires}/${id}`);
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
      let endpoint = `${ENDPOINT.formulaires}/${id}/sections`;
      let response;

      if (formData?.id) {
        endpoint = `${ENDPOINT.formulaires}/${id}/sections`;
        response = await putDataWithNoToken(endpoint, formData, false);
      } else {
        response = await postDataWithNoToken(endpoint, formData, false);
      }

      console.log(response);
      const successMessage =
        response?.data?.message || "Informations enregistrées avec succès.";
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
        <p className="mt-3 mb-6 text-2xl font-bold">List of sections </p>
        <button
          className="p-2 text-white bg-teal-800 rounded-lg "
          onClick={() => {
            setIsModal(true);
            setFormData({});
          }}
        >
          New section
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

      <ol className="space-y-4 list-decimal list-inside text-bl dark:text-gray-400">
        {getPaginatedData()?.length > 0 && (
          <>
            {getPaginatedData()?.map((item, index) => (
              <li key={index}>
                {item?.title}
                <ul className="mt-2 space-y-1 list-disc list-inside ps-5">
                  {item?.sous_sections?.length > 0 &&
                    item?.sous_sections.map((subsec, idx) => (
                      <li key={idx}>{subsec?.title}</li>
                    ))}
                    
                </ul>
              </li>
            ))}
          
          </>
        )}
      </ol>

      <PaginatedTable
        data={list}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <Modal show={isModal} onClose={() => setIsModal(false)}>
        <Modal.Header>Section</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-1">
            <div>
              <div className="block mb-2">
                <Label htmlFor="name" value="Title of the section" />
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
                label={`Form title`}
                type="text"
              />
            </div>

            <div>
              <div className="block mb-2">
                <Label htmlFor="message" value="Description of the section" />
              </div>
              <Textarea
                id="description"
                sizing="md"
                name="description"
                helperText={
                  !formData?.description ? (
                    <span className="font-normal text-red-500"></span>
                  ) : null
                }
                value={formData.description}
                onChange={handleChange}
                label={"Description"}
                type="description"
              />
            </div>
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

export default AdminDetailForm;
