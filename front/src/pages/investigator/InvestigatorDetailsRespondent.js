import React, { useState, useEffect } from 'react';
import { getData, postDataWithNoToken, putDataWithNoToken, postData } from '../../services';
import { ENDPOINT, PaginatedTable, formatStatus } from '../../utils';

import { Modal, Label, Button, TextInput, Textarea } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function InvestigatorDetailsRespondent() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  let { id } = useParams()
  const reloadData = async () => {
    try {
      const [apRes] = await Promise.all([

        getData(`${ENDPOINT.users}/${id}/reponses`)
      ]);
      setFormData(apRes?.data || {});
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
    }
  };


  useEffect(() => {
    reloadData();
  }, []);


  return (
    <div className='w-full flex justify-center '>
      <div className='w-full p-4'>
        <div class="px-4 sm:px-0">


          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-start sm:space-y-0 m-3">
            <button
              onClick={() => { navigation(-1) }}
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
              <svg class="mx-1 w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
              </svg>
              {t("goBack")}


            </button>

          </div>
          <h3 class="text-base font-semibold leading-7 text-gray-900">{formData?.name}</h3>
          <p class="max-w-4xl text-sm  text-blue-500 ">
            Email: <a href={`mailto:${formData.email ?? '--'}`} className='underline mr-4'>{formData.email ?? '--'},</a>
            Phone: <a href={`tel:${formData.telephone ?? '--'}`} className='underline'>{formData.telephone ?? '--'}</a>

          </p>
          <p class="max-w-4xl text-sm  text-gray-500 font-bold">
            Church Name: <span className='font-normal mr-4'> {formData.churchName ?? '--'},</span>
            Church Type : <span className='font-normal'> {formData.typeChurch ?? '--'}</span>
          </p>
        </div>

        <div class="flex items-center font-bold  w-auto">
          <div class={`h-2.5 w-2.5 rounded-full me-2 ${formData?.status === "NOT_STARTED" ? "bg-red-500" :
            formData?.status === "PROGRESS" ? "bg-yellow-500" :
              formData?.status === "CLOSED" ? "bg-green-500" :
                formData?.status === "REOPENED" ? "bg-blue-500" : "bg-gray-500"
            }`}></div>
          {formatStatus(formData?.status)}
        </div>

        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">

            {formData?.reponseRepondu && formData?.reponseRepondu.map((item, index) => (
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium  text-gray-900 font-semibold">{item?.question?.title}</dt>
                <dd class="mt-1 text-sm  text-gray-700 sm:col-span-2 sm:mt-0">
                  {item?.question?.reponseRepondu && item?.question?.reponseRepondu.map((rep, idx) => (
                    <span className='text-black' key={idx} >{rep?.title ?? "--"}</span>
                  ))}
                </dd>
              </div>
            ))}



          </dl>
        </div>
      </div>


    </div>
  )
}

export default InvestigatorDetailsRespondent