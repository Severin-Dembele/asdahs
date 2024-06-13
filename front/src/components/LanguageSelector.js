import React from 'react'
import enIcon from './en.svg';
import frIcon from './fr.svg';
import ptIcon from './pt.svg';
import mgIcon from './mg.svg';

import { useTranslation } from 'react-i18next';

export const languages = [
  {
    code: 'en',
    name: 'English',
    icon: enIcon
  },
  {
    code: 'fr',
    name: 'Français',
    icon: frIcon
  },
  {
    code: 'pt',
    name: 'Português',
    icon: ptIcon
  },
  {
    code: 'mg',
    name: 'Malagasy',
    icon: mgIcon
  }
];
function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='flex justify-end space-x-4 text-center items-center self-center pb-4'>
      {languages.map((language) => (
        <button className='flex justify-center text-center items-center mx-2 border p-2 bg-slate-400 sm:h-5 lg:h-auto'  key={language.code} onClick={() => changeLanguage(language.code)}>
          <img src={language.icon} alt={`${language.name} flag`} style={{ width: '20px', marginRight: '5px' }}  />
          {language.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector
