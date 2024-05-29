// Les constantes relatives aux endpoints de l'application
const ENDPOINT = {
  login: "security/login",
  users: "users",
  usersList: "users/list",
  formations: "formations",
  formulaires: "formulaires",
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
  churches: "churches"
};

export { default as PaginatedTable } from "./PaginatedTable";

// L'URL de base du serveur
const SERVERURLS = `https://backend.asdahs.online/`;

// L'URL pour les images d'utilisateur
const IMAGES_URLS = `https://backend.asdahs.online/uploads/`;

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

// Exportation des constantes ENDPOINT
export {
  ENDPOINT,
  SERVERURLS,
  IMAGES_URLS,
  MESSAGE,
  IMAGES_LINKS,
  OPTIONS_SELCT,
  ROLE_LIST,
};
