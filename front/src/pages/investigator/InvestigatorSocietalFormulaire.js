import React, { useState, useEffect } from 'react';
import { getData, postDataWithNoToken, putDataWithNoToken, postData } from '../../services';
import { ENDPOINT, PaginatedTable, checkForAtSymbol, formatStatus } from '../../utils';

import { Modal, Label, Button, TextInput, Textarea } from 'flowbite-react';
import { useNavigate ,useParams} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AdminStatistique() {
  const { t } = useTranslation();

  const navigation = useNavigate();
  const [list, setList] = useState([]);
  const [listInitial, setListInitial] = useState([]);
  const [listUnion, setListUnion] = useState([]);
  const [listConference, setListConference] = useState([]);
  const [listConferenceInitial, setListConferenceInitial] = useState([]);
  const [listDivision, setListDivision] = useState([]);
  const [listUnionInitial, setListUnionInitial] = useState([]);

  const [listChurch, setListChurch] = useState([]);
  const [listChurchInitial, setListChurchInitial] = useState([]);
  const [listStatistique, setListStatistique] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const reloadData = async () => {
    try {
      const [divisionRes, unionRes, confRes, churchRes, userRes,statRes] = await Promise.all([
        getData(ENDPOINT.divisions),
        getData(ENDPOINT.unions),
        getData(ENDPOINT.conferences),
        getData(ENDPOINT.churches),
        getData(ENDPOINT.usersList),
        getData(ENDPOINT.statistiques)
      ]);

      setListDivision(divisionRes?.data || []);
      setListUnionInitial(unionRes?.data || []);
      setListUnion(unionRes?.data || []);
      setListConference(confRes?.data || []);
      setListConferenceInitial(confRes?.data || []);
      setListChurch(churchRes?.data || []);
      setListChurchInitial(churchRes?.data || []);
      setList(userRes?.data || []);
      setListInitial(userRes?.data || []);
      setListStatistique(statRes?.data || [])
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
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
      const successMessage = response?.data?.message ||`${t("informationSaved")}`;
      setMessage(successMessage);
      reloadData();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || `${t("error")}`;
      setMessage(errorMessage);
    }
  };






  const [isModal, setIsModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    id: null,
  });



  const [message, setMessage] = useState('Information');


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


    const propertiesToFilter1 = ['email', 'name', 'status', 'telephone', 'church.name'];
    const resultatsRecherche1 = filterList(listInitial, propertiesToFilter1);
    setList(resultatsRecherche1);
  };


  const [selectedChurch, setSelectedChurch] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);
  const [selectedUnion, setSelectedUnion] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);

  // const handleFilter = (conferenceId, churchId, divisionId, unionId) => {
  //   const filterListById = (list, conferenceId, churchId, divisionId, unionId) => {
  //     return list.filter(item => {
  //       const matchesConference = conferenceId ? item.church?.conference?.id === parseInt(conferenceId, 10) : true;
  //       const matchesChurch = churchId ? item.church?.id === parseInt(churchId, 10) : true;
  //       const matchesDivision = divisionId ? item.church?.conference?.union?.division?.id === parseInt(divisionId, 10) : true;
  //       const matchesUnion = unionId ? item.church?.conference?.union?.id === parseInt(unionId, 10) : true;

  //       return matchesConference && matchesChurch && matchesDivision && matchesUnion;
  //     });
  //   };

  //   const filteredList = filterListById(listInitial, conferenceId, churchId, divisionId, unionId);
  //   setList(filteredList);
  // };

  const handleFilterDivisions = (divisionId) => {
    // Filtrer la liste des unions en fonction de divisionId si celui-ci n'est pas nul, sinon renvoyer la liste initiale
    const filteredUnions = divisionId ? listUnionInitial.filter(item => item.divisionId === parseInt(divisionId, 10)) : listUnionInitial;
    // Mettre à jour la liste des unions avec les unions filtrées
    setListUnion(filteredUnions);


    const matchesDivision = divisionId ? listInitial.filter(item => item.church?.conference?.union?.division?.id === parseInt(divisionId, 10)) : listInitial;
    setList(matchesDivision)
  };

  const handleFilterUnion = (unionId) => {
    // Filtrer la liste des conférences en fonction de unionId si celui-ci n'est pas nul, sinon renvoyer la liste initiale
    const filteredConferences = unionId ? listConferenceInitial.filter(item => item.unionId === parseInt(unionId, 10)) : listConferenceInitial;

    // Mettre à jour la liste des conférences avec les conférences filtrées
    setListConference(filteredConferences);


    const matchesUnion = unionId ? listInitial.filter(item => item.church?.conference?.union?.id === parseInt(unionId, 10)) : listInitial;
    setList(matchesUnion)
  };

  const handleFilterConference = (conferenceId) => {
    // Filtrer la liste des églises en fonction de conferenceId si celui-ci n'est pas nul, sinon renvoyer la liste initiale
    const filteredChurches = conferenceId ? listChurchInitial.filter(item => item.conferenceId === parseInt(conferenceId, 10)) : listChurchInitial;

    // Mettre à jour la liste des églises avec les églises filtrées
    setListChurch(filteredChurches);
    const matchesConference = conferenceId ? listInitial.filter(item => item.church?.conference?.id === parseInt(conferenceId, 10)) : listInitial;
    setList(matchesConference);

  };


  const handleFilter = (selectedConference, selectedChurch, selectedDivision, selectedUnion) => {
    // Vérifier si les identifiants sélectionnés sont nuls
    const isAnyIdSelected = selectedConference || selectedChurch || selectedDivision || selectedUnion;

    const filterListById = (list, selectedConference, selectedChurch, selectedDivision, selectedUnion) => {
      return list.filter(item => {
        const matchesConference = selectedConference ? item.conferenceId === parseInt(selectedConference, 10) : true;
        const matchesChurch = selectedChurch ? item.churchId === parseInt(selectedChurch, 10) : true;
        const matchesDivision = selectedDivision ? item.church?.conference?.union?.divisionId === parseInt(selectedDivision, 10) : true;
        const matchesUnion = selectedUnion ? item.church?.conference?.unionId === parseInt(selectedUnion, 10) : true;

        return matchesConference && matchesChurch && matchesDivision && matchesUnion;
      });
    };

    // Si aucun identifiant sélectionné n'est présent, retournez la liste initiale
    if (!isAnyIdSelected) {
      setList(listInitial);
      return;
    }

    // Sinon, filtrez la liste en fonction des identifiants sélectionnés
    const filteredList = filterListById(listInitial, selectedConference, selectedChurch, selectedDivision, selectedUnion);
    setList(filteredList);
  };





  return (
    <div className='p-2'>
      <div className="flex flex-wrap items-center justify-between text-center">
        {/* <p className="mt-3 mb-6 text-3xl font-bold">Dashboard</p> */}

      </div>
      <div>

        {/* <div className='lg:columns-2  sm:columns-1 m-2'> */}
        {/* <div className='w-full '>

          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">

              <div>
                <label htmlFor="select-division" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Division</label>
                <select
                  id="select-division"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedDivision(value);
                    handleFilterDivisions(value);
                  }}
                >
                  <option selected value={null}>Choose a division</option>
                  {listDivision && listDivision.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="select-union" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Union</label>
                <select
                  id="select-union"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedUnion(value);
                    handleFilterUnion(value);
                  }}
                >
                  <option selected value={null}>Choose a union</option>
                  {listUnion && listUnion.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="select-conference" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Conference</label>
                <select
                  id="select-conference"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedConference(value);
                    handleFilterConference(value);
                  }}
                >
                  <option selected value={null}>Choose a conference</option>
                  {listConference && listConference.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="select-church" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select church</label>
                <select
                  id="select-church"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedChurch(value);
                    handleFilterConference(selectedConference, value, selectedDivision, selectedUnion);
                  }}
                >
                  <option selected value={null}>Choose a church</option>
                  {listChurch && listChurch.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>

        </div> */}
        <div className='w-full'>
          <div>

          </div>

          <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">


            <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1 m-3">{t("formCompletions")}</h5>

              <div class="grid lg:grid-cols-4 gap-3 mb-2 md:grid-cols-2">
                <dl class="bg-blue-300 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                  <dt class="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-blue-900 dark:text-blue-800 text-sm font-medium flex items-center justify-center mb-1">
                  {listStatistique.reduce((total, item) => total + ((item?.nb_no_started != null) ? parseInt(item.nb_no_started) : 0) + ((item?.nb_progress != null) ? parseInt(item.nb_progress) : 0) + ((item?.nb_completed != null) ? parseInt(item.nb_completed) : 0), 0)}

                  </dt>
                  <dd class="text-blue-900 dark:text-blue-800 text-sm font-medium">Total</dd>
                </dl>
                <dl class="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                  <dt class="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1">{listStatistique[0]?.nb_no_started ?? "0"}</dt>
                  <dd class="text-orange-600 dark:text-orange-300 text-sm font-medium">{t("notStarted")}</dd>
                </dl>
                <dl class="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                  <dt class="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1">{listStatistique[0]?.nb_progress ?? "0"}</dt>
                  <dd class="text-teal-600 dark:text-teal-300 text-sm font-medium">{t("inProgress")}</dd>
                </dl>
                <dl class="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                  <dt class="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm font-medium flex items-center justify-center mb-1">{listStatistique[0]?.nb_completed ?? "0"}</dt>
                  <dd class="text-blue-600 dark:text-blue-300 text-sm font-medium">{t("completed")}</dd>
                </dl>
              </div>


            </div>

            {/* <div class="py-6" id="radial-chart"></div> */}

          </div>

        </div>
      </div>


      <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div class="mx-auto  px-4 ">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="w-full md:w-1/2">
                <form class="flex items-center">
                  <label for="simple-search" class="sr-only">{t("search")}</label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      onChange={onSearch}
                      type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={`${t("search")} ...`} required="" />
                  </div>
                </form>
              </div>
              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  onClick={() => {
                    // setIsModal(true);
                    // setFormData({});
                    navigation(("/investigator/useradd"))
                  }}
                  type="button" class="flex items-center justify-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 10V4a1 1 0 0 0-1-1H9.914a1 1 0 0 0-.707.293L5.293 7.207A1 1 0 0 0 5 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2M10 3v4a1 1 0 0 1-1 1H5m5 6h9m0 0-2-2m2 2-2 2" />
                  </svg>

                  {t("newRespondent")}
                </button>

              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-3"> {t("fullName")}</th>
                    {/* <th scope="col" class="px-4 py-3">Conference</th> */}
                    <th scope="col" class="px-4 py-3">{t("church")}</th>
                    <th scope="col" class="px-4 py-3">{t("consent")}</th>

                    <th scope="col" class="px-4 py-3">{t("status")}</th>
                    <th scope="col" class="px-4 py-3">
                      {/* <span class="sr-only">Actions</span> */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData()?.length > 0 && (
                    <>
                      {getPaginatedData()?.map((item, index) => (
                        <tr key={index} class="border-b dark:border-gray-700">
                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.name}
                            <br />
                            {item?.telephone}, {checkForAtSymbol(item?.email)}
                          </th>

                          {/* <td class="px-4 py-3">{item?.church?.conference?.name}</td> */}
                          <td class="px-4 py-3">
                            {item?.typeChurch} <br />
                            {item?.churchName}
                          </td>
                          <td className='px-4 '>
                            {item?.acceptResponse ? (
                              <svg class="w-6.5 h-5  me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                              </svg>
                            ) : (
                              <svg class="w-6 h-6 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                              </svg>

                            )}

                          </td>
                          <td class="px-4 py-3 ">
                            <div class="flex items-center">
                              <div class={`h-2.5 w-2.5 rounded-full me-2 ${item?.status === "NOT_STARTED" ? "bg-red-500" :
                                item?.status === "PROGRESS" ? "bg-yellow-500" :
                                  item?.status === "CLOSED" ? "bg-green-500" :
                                    item?.status === "REOPENED" ? "bg-blue-500" : "bg-gray-500"
                                }`}></div>
                              {formatStatus(item?.status)}
                            </div>
                          </td>


                          <td class="px-4 py-3 flex items-center justify-end">
                            <div className="flex justify-center">
                              {!item?.selfResponse && (
                                <button
                                  onClick={() => {
                                    navigation(`/investigator/formulaire/${item?.id}`)
                                  }}
                                  className="px-4 py-1 m-1 text-center text-white bg-green-500 border rounded-md"
                                >
                                  {t("enrollPerson")}
                                </button>
                              )}
                              <button
                                onClick={() => {
                                 navigation(`/investigator/detail/${item?.id}`)
                                }}
                                className="px-4 py-1 m-1 text-center text-white bg-gray-500 border rounded-md"
                              >
                                 {t("view")}
                              </button>



                              {/*
                              <button
                                onClick={() => {
                                  deleteDta(item?.id);
                                }}
                                className="px-4 py-1 m-1 text-center bg-red-500 border rounded-md"
                              >
                                Delete
                              </button> */}

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


      <Modal show={alertModal} onClose={() => setAlertModal(false)}>
        <Modal.Header> {t("information")}</Modal.Header>
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

export default AdminStatistique;
