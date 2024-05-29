import React, { useState, useEffect } from 'react';
import { getData, postDataWithNoToken, putDataWithNoToken, postData } from '../../services';
import { ENDPOINT, PaginatedTable } from '../../utils';

import { Modal, Label, Button, TextInput, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function AdminSetting() {

  const navigation = useNavigate();
  const [list, setList] = useState([]);
  const [listInitial, setListInitial] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const reloadData = async () => {
    try {
      const adminRes = await getData(ENDPOINT.divisions);
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
      const response = await deleteDta(`${ENDPOINT.divisions}/${id}`);
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
      let endpoint = `${ENDPOINT.divisions}/token/${id}`;;
      let response;
      response = await postDataWithNoToken(endpoint, {}, false);

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
      let endpoint = ENDPOINT.divisions;
      let response;

      if (formData?.id) {
        endpoint = `${ENDPOINT.divisions}/${formData?.id}`;
        response = await putDataWithNoToken(endpoint, formData, false);
      } else {
        response = await postDataWithNoToken(endpoint, formData, false);
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
      let endpoint = ENDPOINT.divisions;
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


    const propertiesToFilter1 = ['shortname', 'name'];
    const resultatsRecherche1 = filterList(listInitial, propertiesToFilter1);
    setList(resultatsRecherche1);
  };


  return (
    <div>
      <div className="flex flex-wrap items-center justify-between text-center">
        <p className="mt-3 mb-6 text-2xl font-bold">List of Division</p>

      </div>




      {/* 
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
                    {item?.shortname}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item?.name}
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={() => { navigation(`/africanhealthstudy/panel-administration/details/${item?.id}`); }}
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
                      href={`https://asdahs.online/formulaire?token=${item?.token}`}
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
      </div> */}


      <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div class="mx-auto  px-4 ">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="w-full md:w-1/2">
                <form class="flex items-center">
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      onChange={onSearch}
                      type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                  </div>
                </form>
              </div>
              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  onClick={() => {
                    setIsModal(true);
                    setFormData({});
                  }}
                  type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Add Division
                </button>
                <div class="flex items-center space-x-3 w-full md:w-auto">
                  <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                    <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                    Actions
                  </button>
                  <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                      <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                      </li>
                    </ul>
                    <div class="py-1">
                      <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                    </div>
                  </div>
                  <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                    </svg>
                    Filter
                    <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                  <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                    <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>

                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-3">Short Name</th>
                    <th scope="col" class="px-4 py-3">Name</th>

                    <th scope="col" class="px-4 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData()?.length > 0 && (
                    <>
                      {getPaginatedData()?.map((item, index) => (
                        <tr key={index} class="border-b dark:border-gray-700">
                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.shortname}</th>
                          <td class="px-4 py-3">{item?.name}</td>

                          <td class="px-4 py-3 flex items-center justify-end">
                            <div className="flex justify-center">
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
                              <button
                                onClick={() => {
                                  deleteDta(item?.id);
                                }}
                                className="px-4 py-1 m-1 text-center bg-red-500 border rounded-md"
                              >
                                Delete
                              </button>
                             
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              </span>
              <ul class="inline-flex items-stretch -space-x-px">
                <PaginatedTable
                  data={list}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <Modal show={isModal} onClose={() => setIsModal(false)}>
        <Modal.Header>Division</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-1">
            <div>
              <div className="block mb-2">
                <Label htmlFor="name" value="Division shortname." />
              </div>
              <TextInput
                id="shortname"
                sizing="md"
                name="shortname"
                helperText={
                  !formData?.shortname ? (
                    <span className="font-normal text-red-500">
                      Please fill in this field. Thank you..
                    </span>
                  ) : null
                }
                value={formData.shortname}
                onChange={handleChange}
                label={`Titre du formulaire`}
                type="text"
              />
            </div>

            <div>
              <div className="block mb-2">
                <Label htmlFor="message" value="Name" />
              </div>
              <Textarea
                id="name"
                sizing="md"
                name="name"
                helperText={
                  !formData?.name ? (
                    <span className="font-normal text-red-500"></span>
                  ) : null
                }
                value={formData.name}
                onChange={handleChange}
                label={"name"}
                type="name"
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

export default AdminSetting;
