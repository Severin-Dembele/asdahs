import React, { useState, useEffect } from 'react';
import { getData, postDataWithNoToken, putDataWithNoToken, postData } from '../../services';
import { ENDPOINT, PaginatedTable, formatStatus } from '../../utils';

import { Modal, Label, Button, TextInput, Textarea } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';

function InvestigatorDetailsRespondent() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({});

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