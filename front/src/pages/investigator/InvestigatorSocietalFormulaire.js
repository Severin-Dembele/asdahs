import React, { useState, useEffect } from "react";
import { getData } from "../../services";
import { ENDPOINT, PaginatedTable } from "../../utils";

function InvestigatorSocietalFormulaire() {
  const [list, setList] = useState([]);
  const [listInitial, setListInitial] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const reloadData = async () => {
    try {
      // let endpoint = `${ENDPOINT.users}/${formData?.id}/formulaires`;

      const adminRes = await getData(ENDPOINT.formulaires);
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

    const propertiesToFilter1 = ["ti", "description"];
    const resultatsRecherche1 = filterList(listInitial, propertiesToFilter1);
    setList(resultatsRecherche1);
  };

  return (
    <div className="min-h-[95vh]  xl:p-28 lg:p-12 sm:p-8 md:p-6">
      <div className="flex flex-wrap items-center justify-between text-center ">
        <p className="mt-3 mb-6 text-2xl font-bold">List of forms</p>
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
      <div className="flex flex-wrap px-5 py-4 bg-gray-50">
        {getPaginatedData()?.length > 0 && (
          <>
            {getPaginatedData()?.map((item, index) => (
              <div
                className="max-w-sm p-6 m-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item?.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item?.description}
                </p>

                <div className="flex flex-wrap m-10 space-x-2 space-y-2">
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
    </div>
  );
}

export default InvestigatorSocietalFormulaire;
