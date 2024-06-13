// Les constantes relatives aux endpoints de l'application
const ENDPOINT = {
  login: "security/login",
  users: "users",
  usersList: "users/list",
  formations: "formations",
  formulaires: "formulaires",
  researcheAssistantFillForm:"formulaires/langage-user-connected",
  importFile: "importFile",
  questions: "questions",
  reponses: "reponses",
  reponse_propose: "reponse-propose",
  prospects: "prospects",
  partners: "partners",
  actualites: "actualites",
  contacts: "contacts",
  requestCatalog: "mails/essitech-catalog",
  devis: "devis",
  participants: "participants",
  validateDevis: "devis/validate-devis/",
  security: "auth/login",
  sections: "sections",
  subsections: "sub-sections",
  divisions: "divisions",
  unions: "unions",
  conferences: "conferences",
  churches: "churches",
  accept: "users/accept-answer",
  statistiques:"dashboard/statistiques"
};

export { default as PaginatedTable } from "./PaginatedTable";

// L'URL de base du serveur
const SERVERURLS = process.env.API_SERVER;

// L'URL pour les images d'utilisateur
const IMAGES_URLS = `${process.env.API_SERVER}uploads/`;

const IMAGES_LINKS = {
  users: "users/",
  partners: "partners/",
  actualites: "actualites/",
  formations: "formations/",
  devis: "devis/",
};

//
const MESSAGE = {
  authError:
    "Votre Password ou votre Login est incorrect. Si le problème persiste, veuillez contacter notre service client.",
  registerError:
    "Nous rencontrons des problèmes lors de la création de votre compte. Veuillez contacter notre service client pour obtenir de l'aide.",
};

const OPTIONS_SELCT = [
  { value: "REPONSE_COURTE", label: "Réponse Courte" },
  { value: "PARAGRAPHE", label: "Paragraphe" },
  { value: "CHOIX_MULTIPLE", label: "Choix Multiple" },
  { value: "CASE_COCHER", label: "Cases à Cocher" },
  { value: "LISTE_DEROULANTE", label: "Liste Déroulante" },
  { value: "ECHELLE_LINEAIRE", label: "Échelle Linéaire" },
  { value: "DATE", label: "Date" },
  { value: "HEURE", label: "Heure" },
];

const ROLE_LIST = [
  { value: "INVESTIGATOR", label: "Investigator" },
  { value: "ADMIN", label: "Administrator" },
  { value: "RESPONDENT", label: 'Respondent' }
];

function formatStatus(status) {
  if (!status) {
    return "---"
  }
  // Convert the status to lowercase, split by underscore, capitalize each word, and join them back
  return status
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function checkForAtSymbol(str) {
  if (typeof str === 'string' && str.includes('@')) {
      return str;
  } else {
      return null;
  }
}

// Exportation des constantes ENDPOINT
export {
  ENDPOINT,
  SERVERURLS,
  IMAGES_URLS,
  MESSAGE,
  IMAGES_LINKS,
  OPTIONS_SELCT,
  ROLE_LIST,
  formatStatus,
  checkForAtSymbol
};
