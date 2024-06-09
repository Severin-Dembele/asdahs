import React, { useState, useEffect } from 'react';
import { getData, postDataWithNoToken, putDataWithNoToken, postData, putData } from '../../services';
import {
  ENDPOINT,
  PaginatedTable,
  IMAGES_URLS,
  IMAGES_LINKS,
  ROLE_LIST,
} from "../../utils";

import { Table, Modal, Label, Button, TextInput } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

function AdminSettingUnion() {

  const navigation = useNavigate();
  const [list, setList] = useState([]);
  const [listConference, setlistConference] = useState([]);

  const [listInitial, setListInitial] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const reloadData = () => {
    Promise.all([
      getData(ENDPOINT.users),
      getData(ENDPOINT.conferences)
    ])
      .then(([adminRes, divisionRes]) => {
        setList(adminRes?.data || []);
        setListInitial(adminRes?.data || []);
        setlistConference(divisionRes?.data || []);
      })
      .catch(error => {
        // Gérer les erreurs ici
      });
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


  const [selectedImage, setSelectedImage] = useState(null);
  const onImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    setFormData({
      ...formData,
      profile: event.target.files[0],
    });
  };

  const deleteDta = async (id) => {
    setAlertModal(true);

    try {
      const response = await deleteDta(`${ENDPOINT.users}/${id}`);
      const successMessage = response?.data?.message || "Informations enregistrées avec succès.";
      setMessage(successMessage);
      reloadData();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Une erreur est survenue, réessayez plus tard !";
      setMessage(errorMessage);
    }
  };





  const [isModal, setIsModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [importFile, setImportFile] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    divisionId: "",
    typeChurch: '',
    name: null,
    conferenceId: "",
    telephone: "",
    email: "",
    churchName: "",
    role: "RESPONDENT",
    password: "7Q$GV1TI#KOALLA#2023",
    selfResponse: false,
    langage: ""
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
      let endpoint = ENDPOINT.users;
      let response;

      if (formData?.id) {
        endpoint = `${ENDPOINT.users}/${formData?.id}`;
        response = await putData(endpoint, formData, true);
      } else {
        response = await postData(`${ENDPOINT.users}`, formData, true);
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


    const propertiesToFilter1 = ['name', 'email', 'role', 'telephone'];
    const resultatsRecherche1 = filterList(listInitial, propertiesToFilter1);
    setList(resultatsRecherche1);
  };





  return (
    <div>
      <div className="flex flex-wrap items-center justify-between text-center">
        <p className="mt-3 mb-6 text-2xl font-bold">List of User</p>
      </div>

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
                  New user
                </button>
                <div class="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    onClick={() => { setImportFile(true) }}
                    class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-white focus:outline-none bg-green-900 rounded-lg border border-green-200 hover:bg-green-600 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                    <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" />
                    </svg>

                    Mutiples import
                  </button>

                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th></th> */}
                    <th scope="col" class="px-4 py-3">Full Name</th>
                    {/* <th scope="col" class="px-4 py-3">Login</th> */}
                    <th scope="col" class="px-4 py-3">Phone</th>
                    <th scope="col" class="px-4 py-3">Email</th>
                    <th scope="col" class="px-4 py-3">Role</th>

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
                          {/* <th>
                            <img
                              alt={`p-${index}`}
                              className="max-h-11"
                              src={`${IMAGES_URLS}${IMAGES_LINKS.users}${item?.profile}`}
                            />
                          </th> */}
                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.name}</th>
                          <td class="px-4 py-3">{item?.telephone}</td>
                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.email}</th>
                          <td class="px-4 py-3">{item?.role}</td>

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


        <Modal.Header>Adding an administrator </Modal.Header>
        <Modal.Body>


          <div className="flex flex-col gap-1">
            <div>
              <div className="block mb-2">
                <Label htmlFor="name" value="First name & Last name" />
              </div>
              <TextInput
                id="name"
                sizing="md"
                name="name"
                helperText={
                  !formData?.name ? (
                    <span className="font-normal text-red-500">
                      Thank you for providing the name.
                    </span>
                  ) : null
                }
                value={formData?.name}
                onChange={handleChange}
                label={`Nom  & Prénom `}
                type="text"
              />
            </div>
            <div>
              <div className="block mb-2">
                <Label htmlFor="telephone" value="Phone" />
              </div>
              <TextInput
                id="telephone"
                sizing="md"
                name="telephone"
                helperText={
                  !formData?.telephone ? (
                    <span className="font-normal text-red-500">
                      Thank you for specifying the phone for the connection.
                    </span>
                  ) : null
                }
                value={formData.telephone}
                onChange={handleChange}
                label={`Phone`}
                type="text"
              />
            </div>
            <div>
              <div className="block mb-2">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                sizing="md"
                name="email"
                helperText={
                  !formData?.email ? (
                    <span className="font-normal text-red-500">
                      Please specify the email.
                    </span>
                  ) : null
                }
                value={formData?.email}
                onChange={handleChange}
                label={"Email"}
                type="text"
              />
            </div>


            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select  Conference.
              </label>
              <select
                name="conferenceId"
                value={formData?.conferenceId}
                onChange={handleChange}
                id="conferenceId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-950 focus:border-blue-950 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-950 dark:focus:border-blue-950"
              >
                <option disabled selected>
                  Select Conference.
                </option>
                {listConference.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a role.
              </label>
              <select
                name="role"
                value={formData?.role}
                onChange={handleChange}
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-950 focus:border-blue-950 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-950 dark:focus:border-blue-950"
              >
                <option disabled selected>
                  Select role.
                </option>
                {ROLE_LIST.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label for="churchName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Church</label>
              <input type="text"
                id="churchName"
                name="churchName"
                onChange={handleChange}
                value={formData.churchName}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
            </div>
            <div>
              <div className="block ">
                <label for="typeChurch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Type of Church <span className='font-bold text-xl text-red-800'> *</span> </label>
              </div>
              <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input
                      type="radio"
                      id="typeChurch"
                      name="typeChurch"
                      onChange={handleChange}
                      value="Small"
                      checked={formData?.typeChurch === 'Small'}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Small</label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input type="radio"
                      id="typeChurch"
                      name="typeChurch"
                      value="Medium"
                      checked={formData?.typeChurch === 'Medium'}
                      onChange={handleChange}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medium</label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input
                      type="radio"
                      id="typeChurch"
                      onChange={handleChange}
                      name="typeChurch"
                      value="Large"
                      checked={formData?.typeChurch === 'Large'}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label for="horizontal-list-radio-military" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Large</label>
                  </div>
                </li>

              </ul>

            </div>

            <div>
              <div className="block ">
                <label for="typeChurch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Language <span className='font-bold text-xl text-red-800'> *</span> </label>
              </div>
              <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input
                      type="radio"
                      id="langage"
                      name="langage"
                      onChange={handleChange}
                      value="English"
                      checked={formData?.langage === 'English'}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">English</label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input type="radio"
                      id="langage"
                      name="langage"
                      value="French"
                      checked={formData?.langage === 'French'}
                      onChange={handleChange}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">French</label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center ps-3">
                    <input
                      type="radio"
                      id="langage"
                      name="langage"
                      onChange={handleChange}
                      value="Spanish"
                      checked={formData?.langage === 'Spanish'}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label for="horizontal-list-radio-military" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Spanish</label>
                  </div>
                </li>

              </ul>

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

export default AdminSettingUnion;
