import React, { useState, useEffect } from 'react';
import { getData, postDataWithNoToken, putDataWithNoToken } from '../../services';
import { ENDPOINT, PaginatedTable, IMAGES_URLS, IMAGES_LINKS, checkForAtSymbol } from '../../utils';

import { Table, Modal, Label, Button, TextInput } from 'flowbite-react';
import { useParams, useNavigate } from 'react-router-dom';
function AminDetailDevis() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState([]);
    const [listInitial, setListInitial] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        id: null,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const reloadData = async () => {
        try {
            const [adminRes, participantsRes] = await Promise.all([
                getData(`${ENDPOINT.devis}/${id}`),
                getData(`${ENDPOINT.devis}/${id}/participants`)
            ]);

            setFormData(adminRes?.data || {});
            setList(participantsRes?.data || []);
            setListInitial(participantsRes?.data || []);
        } catch (error) {
            // Handle or log the error
            console.error("Error while fetching data:", error);
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




    const [alertModal, setAlertModal] = useState(false);


    const [message, setMessage] = useState('Information');

    const handleSubmit = async () => {
        setAlertModal(true);

        try {
            const response = await postDataWithNoToken(`${ENDPOINT.validateDevis}${formData?.id}`, formData);
            const successMessage = response?.data?.message || "Informations enregistrées avec succès.";
            setMessage(successMessage);
            reloadData();
            setFormData(response);
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Une erreur est survenue, réessayez plus tard !";
            setMessage(errorMessage);
        }
    };




    const [selectedImage, setSelectedImage] = useState(null);
    const onImageChange = event => {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
        setFormData({
            ...formData,
            avatar: event.target.files[0],
        });
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


        const propertiesToFilter1 = ['firstname', 'lastname', 'profession', 'phoneNumber', 'email', 'poste', 'genre','niveau'];
        const resultatsRecherche1 = filterList(listInitial, propertiesToFilter1);
        setList(resultatsRecherche1);
    };


    return (
        <div >
            {/* <button className="bg-gray-400 px-10 py-1 rounded-xl" onClick={() => navigate(-1)}>
        <svg className="h-9 w-10 text-teal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
      </button> */}
            {/* <div className='flex flex-wrap items-center text-center justify-between'>
                <p className="text-2xl mt-3 mb-6 font-bold">Ils nous contactent pour obtenir des devis.</p>
                <button className='bg-teal-800 p-2 text-white rounded-lg ' onClick={() => { setIsModal(true); setFormData({}) }}>
                    Add a user
                </button>
            </div> */}



            <div className='mt-4'>
                <div className="px-4 sm:px-0 flex flex-wrap justify-around">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Ils nous contactent pour obtenir des
                        devis.</h3>

                </div>
                <div className="px-4 sm:px-0 flex flex-wrap  space-x-6 items-center">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Statut de la démande   :</h3>
                    {formData?.isValid ? (
                        <span className='flex space-x-3 items-center'>
                            <button className='bg-teal-600 px-2 py-1 rounded-lg text-white'> valider</button>
                            <button className='bg-red-600 px-2 py-1 rounded-lg text-white flex space-x-1 items-cente'
                                onClick={() => handleSubmit()}
                            >

                                <span className='items-cente'>Cliquez sur ce bouton pour Cancel.</span></button>
                        </span>
                    ) : (
                        <span className='flex space-x-3 items-center'>

                            {!formData?.token && (
                                <span className='bg-red-600 px-2 py-1 rounded-lg text-white'> Statut : Non encore confirmé</span>
                            )}
                            <button className='bg-teal-600 px-2 py-1 rounded-lg text-white flex space-x-1 items-cente'
                                onClick={() => handleSubmit()}
                            >

                                <span className='items-cente'>Cliquez sur ce bouton pour confirmer.</span></button>

                        </span>
                    )}
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">

                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Nom et Prénom de la personne contact</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${formData?.firstname}  ${formData?.lastname}`}</dd>
                        </div>
                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Poste </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formData?.poste}</dd>
                        </div>
                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Civilité</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formData?.genre}</dd>
                        </div>
                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Entreprise</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formData?.company ?? "--"}</dd>
                        </div>
                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Contacts</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {formData?.phone ?? "--"}  <br /> {checkForAtSymbol(formData?.email) ?? "--"}
                            </dd>
                        </div>
                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Coordonnées et adresse de résidence</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {formData?.pays}
                                <br />
                                {formData?.ville}</dd>
                        </div>
                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Date de démande</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {formData?.createAt} </dd>
                        </div>
                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {formData?.message}</dd>
                        </div>

                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Pièce jointe</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"

                                    // onClick={() => { window.open(`${IMAGES_URLS}${IMAGES_LINKS.devis}${formData?.piece}`, '_blank'); }}

                                    >
                                        <div className="flex w-0 flex-1 items-center">
                                            <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                                            </svg>
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">Fichier pdf</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href={`${IMAGES_URLS}${IMAGES_LINKS.devis}${formData?.piece}`} target='_blank' className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Téléchargez la pièce jointe
                                            </a>
                                        </div>
                                    </li>
                                    {formData?.token && (
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"


                                        >
                                            <div className="flex w-0 flex-1 items-center cursor-pointer"

                                                onClick={() => { window.open(`https://devis.essitechgroup.com/${formData?.token}`, '_blank'); }}
                                            >
                                                <svg className="h-5 w-5 text-blue-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>

                                                <div className="ml-4 flex min-w-0 flex-1 gap-2 cursor-pointer"
                                                    onClick={() => { window.open(`https://devis.essitechgroup.com/formation?token=${formData?.token}`, '_blank'); }}
                                                >
                                                    <span className="truncate font-medium underline text-blue-400">Adresse d'enregistrement des participants à la formation.</span>
                                                </div>

                                            </div>
                                        </li>
                                    )}

                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="px-4 sm:px-0 flex flex-wrap justify-around">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Les participants à la formation.</h3>

            </div>
            <form className='m-3'>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        onChange={onSearch}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-950 focus:border-blue-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-950 dark:focus:border-blue-950"
                        placeholder="Search ....."
                        required />
                </div>
            </form>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell className="p-4">#</Table.HeadCell>
                    <Table.HeadCell>First name & Last name  </Table.HeadCell>
                    <Table.HeadCell>Poste - Proffession - Niveau</Table.HeadCell>
                    <Table.HeadCell>Contact</Table.HeadCell>
                    <Table.HeadCell>Attentes</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {getPaginatedData()?.length > 0 && (
                        <>
                            {getPaginatedData()?.map((item, index) => (
                                <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800" key={index}>
                                    <Table.Cell className="p-4">{index + 1}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item?.firstname} {item?.lastname}
                                    </Table.Cell>
                                    <Table.Cell>{item?.poste} <br /> {item?.profession} <br /> {item?.niveau}</Table.Cell>
                                    <Table.Cell>{item?.phoneNumber} <br /> {checkForAtSymbol(item?.email)}</Table.Cell>
                                    <Table.Cell>{item?.attente}</Table.Cell>

                                </Table.Row>
                            ))}
                        </>
                    )}
                </Table.Body>
            </Table>
            <PaginatedTable
                data={list}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />







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

export default AminDetailDevis;
