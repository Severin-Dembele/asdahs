import React, { useState, useEffect } from 'react';
import { ENDPOINT } from '../../utils';
import { getData, postDataWithNoToken, putDataWithNoToken, postData } from '../../services';
import { useNavigate } from 'react-router-dom';

import { Modal, Label, Button, TextInput, Textarea, Select } from 'flowbite-react';

function InvestigatorAddUser() {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        typeChurch: '',
        name: null,
        conferenceId: "",
        telephone: "",
        email: "",
        churchName: "",
        role: "RESPONDENT",
        password: "7Q$GV1TI#KOALLA#2023",
        selfResponse: true,
        langage: ""
    });
    const [listConference, setListConference] = useState([]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };


    const reloadData = () => {
        Promise.all([
            getData(ENDPOINT.conferences)
        ])
            .then(([confRes]) => {

                setListConference(confRes?.data || []);
            })
            .catch(error => {
                // Gérer les erreurs ici
            });
    };

    useEffect(() => {
        reloadData();
    }, []);


    const [message, setMessage] = useState('Information');

    const handleSubmit = async () => {


        try {
            let response;
            response = await postData(`${ENDPOINT.users}`, formData);


            const successMessage = response?.data?.message || "Informations enregistrées avec succès.";
            setMessage(successMessage);
            setFormData({});
            console.log(response);
        } catch (error) {
            console.log("Error", error?.response);
            const errorMessage = error?.response?.data?.message || "Une erreur est survenue, réessayez plus tard !";
            setMessage(errorMessage);
        }
    };





    return (


        <div className="">

            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 lg:py-16 lg:px-4 p-4 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">New  Respondent</h2>

                    <div class="space-y-8">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name <span className='font-bold text-xl text-red-800'> *</span> </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                        </div>

                        <div>
                            <label
                                for="telephone"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone  <span className='font-bold text-xl text-red-800'> *</span></label>
                            <input type="tel"
                                id="telephone"
                                name="telephone"
                                onChange={handleChange}
                                value={formData.telephone}
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email  </label>
                            <input type="email"

                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                        </div>
                        <div>
                            <div className="block mb-2">
                                <label for="conferenceId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Conference <span className='font-bold text-xl text-red-800'> *</span> </label>
                            </div>
                            <Select
                                id="conferenceId"
                                sizing="md"
                                name="conferenceId"
                                helperText={
                                    !formData?.conferenceId ? (
                                        <span className="font-normal text-red-500"></span>
                                    ) : null
                                }
                                value={formData?.conferenceId}
                                onChange={handleChange}
                                label={"conferenceId"}
                                type="name"
                            >
                                <option disabled>Choose option</option>
                                {listConference && (
                                    listConference.map((item, index) => (
                                        <option key={index} value={item?.id}> {item?.name} </option>
                                    ))
                                )}
                            </Select>
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
                        <div>

                            <div class="flex">
                                <div class="flex items-center h-5">
                                    <input
                                        id="selfResponse"
                                        name="selfResponse"
                                        aria-describedby="selfResponse"
                                        type="checkbox"
                                        // onChange={handleChange}
                                        checked={true}
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                </div>
                                <div class="ms-2 text-sm">
                                    <label for="selfResponse" class="font-medium text-gray-900 dark:text-gray-300">Respondent wishes </label>
                                    <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">The respondent wishes to fill out the form themselves</p>
                                </div>
                            </div>

                        </div>


                        <button
                            onClick={() => { navigate(-1) }}
                            class="py-3 m-2 text-sm font-medium text-center text-white rounded-lg bg-red-900 w-full lg:w-20 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Cancel
                        </button>

                        <button
                            onClick={() => { handleSubmit() }}
                            class="py-3 m-2 text-sm font-medium text-center text-white rounded-lg bg-blue-900 w-full lg:w-20 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Save
                        </button>

                    </div>
                </div>
            </section>
        </div>

    )
}

export default InvestigatorAddUser