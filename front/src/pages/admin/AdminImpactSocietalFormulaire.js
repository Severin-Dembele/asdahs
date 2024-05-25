import React, { useState, useEffect } from 'react';
import { getData, postDataWithNoToken, putDataWithNoToken, postData } from '../../services';
import { ENDPOINT, PaginatedTable } from '../../utils';

import { Modal, Label, Button, TextInput, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function AdminImpactSocietalFormulaire() {

  const navigation =useNavigate();
    const [list, setList] = useState([]);
    const [listInitial, setListInitial] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const reloadData = async () => {
        try {
            const adminRes = await getData(ENDPOINT.formulaires);
            setList(adminRes?.data || []);
            setListInitial(adminRes?.data || []);
        } catch (error) {

        }
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
            const successMessage = response?.data?.message || "Informations enregistrées avec succès.";
            setMessage(successMessage);
            reloadData();
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Une erreur est survenue, réessayez plus tard !";
            setMessage(errorMessage);
        }
    };




    const handleActive = async (id) => {
        setIsModal(false);
        setAlertModal(true);

        try {
            let endpoint = `${ENDPOINT.formulaires}/token/${id}`;;
            let response;
            response = await postDataWithNoToken(endpoint, {},false);

            const successMessage = response?.data?.message || "Informations enregistrées avec succès.";
            setMessage(successMessage);

            reloadData();
            setFormData({});
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Une erreur est survenue, réessayez plus tard !";
            setMessage(errorMessage);
        }
    };

    const [isModal, setIsModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [importFile, setImportFile] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        id: null,
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const [message, setMessage] = useState('Information');

    const handleSubmit = async () => {
        setIsModal(false);
        setAlertModal(true);

        try {
            let endpoint = ENDPOINT.formulaires;
            let response;

            if (formData?.id) {
                endpoint = `${ENDPOINT.formulaires}/${formData?.id}`;
                response = await putDataWithNoToken(endpoint, formData,false);
            } else {
                response = await postDataWithNoToken(endpoint, formData,false);
            }


            const successMessage = response?.data?.message || "Informations enregistrées avec succès.";
            setMessage(successMessage);

            reloadData();
            setFormData({});
        } catch (error) {
            console.log("Error", error?.response);
            const errorMessage = error?.response?.data?.message || "Une erreur est survenue, réessayez plus tard !";
            setMessage(errorMessage);
        }
    };


    const onFileChange = event => {
        setFormData({
            ...formData,
            file: event.target.files[0],
        });
    };


    const [imporLoading, setImporLoading] = useState(false);

    const handleSubmitImport = async () => {
        setImporLoading(true);
        try {
            let endpoint = ENDPOINT.formulaires;
            let response;

            response = await postData(`${endpoint}/${formData?.id}/import`, formData);

            const successMessage = response?.data?.message || "Informations enregistrées avec succès.";
            setMessage(successMessage);

            reloadData();
            setFormData({});
            console.log(response)
        } catch (error) {
            console.log(error?.response)
            const errorMessage = error?.response?.data?.message || "Une erreur est survenue, réessayez plus tard !";
            setMessage(errorMessage);
        } finally {

            setImporLoading(false);
            setImportFile(false);
            setAlertModal(true);


        }
    };





    const onSearch = (event) => {
        const value = event.target.value.toLowerCase();
        const rechercheMinuscule = value.toLowerCase();

        const filterList = (list, properties) => {
            return list.filter((user) => {
                return properties.some((property) => {
                    const propertyValue = user?.[property]?.toLowerCase() || '';
                    return propertyValue.includes(rechercheMinuscule);
                });
            });
        };


        const propertiesToFilter1 = ['title', 'description'];
        const resultatsRecherche1 = filterList(listInitial, propertiesToFilter1);
        setList(resultatsRecherche1);
    };


    return (
      <div>
        <div className="flex flex-wrap items-center justify-between text-center">
          <p className="mt-3 mb-6 text-2xl font-bold">List of forms</p>
          <button
            className="p-2 text-white bg-teal-800 rounded-lg "
            onClick={() => {
              setIsModal(true);
              setFormData({});
            }}
          >
            New form
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
        <div className="flex flex-wrap px-5 py-4 bg-gray-50 ">
          {getPaginatedData()?.length > 0 && (
            <>
              {getPaginatedData()?.map((item, index) => (
                <div
                  className="max-w-sm p-6 m-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <a >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item?.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item?.description}
                  </p>

                  <div className="flex justify-center">
                    <button 
                      onClick={()=>{navigation(`/africanhealthstudy/panel-administration/details/${item?.id}`);}}
                    className="px-4 py-1 m-1 text-center border rounded-md bg-gray-50">
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
                  <div className="flex flex-wrap m-10 space-x-2 space-y-2">
                    <button
                      onClick={() => {
                        handleActive(item?.id);
                      }}
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Activer
                    </button>

                    {item?.isValid && (
                      <a
                        href={`http://localhost:3000/formulaire?token=${item?.token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-950 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-950 dark:hover:bg-blue-950 dark:focus:ring-blue-950"
                      >
                        Response URLs
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    )}

                    <button
                      type="button"
                      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                      onClick={() => {
                        setFormData({
                          ...item,
                        });
                        setImportFile(true);
                      }}
                    >
                      Import response file
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <PaginatedTable
          data={list}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <Modal show={isModal} onClose={() => setIsModal(false)}>
          <Modal.Header>Formulaire</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-1">
              <div>
                <div className="block mb-2">
                  <Label htmlFor="name" value="Form Title." />
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
                  label={`Titre du formulaire`}
                  type="text"
                />
              </div>

              <div>
                <div className="block mb-2">
                  <Label htmlFor="message" value="Description" />
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
       
        <Modal show={importFile} onClose={() => setImportFile(false)}>
          <Modal.Header>Information</Modal.Header>
          <Modal.Body>
            {imporLoading ? (
              <div className="flex items-center justify-center w-full p-10">
                <div className="spinner"></div>
                <span className="m-10">
                  Please wait, the file upload is in progress.
                </span>
              </div>
            ) : (
              <form className="flex items-center justify-center w-full">
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Cliquez pour téléverser un fichier excel
                      </span>{" "}
                      Ou faites glisser et déposez
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      XLSX, XLS, CSV ou ODS{" "}
                    </p>
                    <br />
                    <p className="underline text-blue-950">
                      {formData?.file?.name}
                    </p>
                  </div>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={onFileChange}
                    name="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                </label>
              </form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button color="red" onClick={() => setImportFile(false)}>
              Close
            </Button>
            <Button onClick={() => handleSubmitImport()}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default AdminImpactSocietalFormulaire;
