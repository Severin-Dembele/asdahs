import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          welcometxt:
            "This site is dedicated to data collection on the Seventh-day Adventist health study.",
          learnMore: "Learn more",
          getStarted: "Get started",
          africanSDAHealthStudy:
            "Health Research Study for Adventists in Africa",
          allRight: "All Rights Reserved.",
          africanSDA: "African Seventh-Day Adventist",
          healthStudy: "Health Research Study",
          forAdventist: "for Adventists in Africa",
          signIn: "Sign in",
          password: "Password",
          forgotPassword: "Forgot your password?",
          send: "Send",
          information: "Information",
          close: "Close",
          informationSaved: "Information successfully saved.",
          error: "An error occurred, please try again later!",
          formCompletions: "Form completions",
          notStarted: "Not Started",
          inProgress: "In progress",
          completed: "Completed",

          search: "Search",

          newRespondent: "New respondent",
          fullName: "Full Name",
          church: "Church",
          consent: "Consent",
          status: "Status",
          enrollPerson: "Fill Form",
          view: "View",

          previous: "Previous",
          next: "Next",
          phone: "Phone",
          conference: "Conference",
          typeOfChurch: "Type of Church",

          small: "Small",
          medium: "Medium",
          large: "Large",
          language: "Language",

          english: "English",
          french: "French",
          malagasy: "Malagasy",

          portuguese: "Portuguese",
          respondentWishesToFillForm: "The respondent chooses to fill the form",
          readConsentForm: "Read the consent form for the participant",
          cancel: "Cancel",
          save: "Save",
          informedConsent: "Informed Consent",
          dearRespondent: "Dear Respondent,",
          invitationToParticipate:
            "This letter invites you to participate in a research study entitled",
          confidentialInformation:
            "All information that you provide will be kept confidential.",
          gratefulAssistance:
            "We would be very grateful if you assist in this important research by taking some time to answer the research questionnaire that you will receive.",
          cooperation:
            "Please know that your cooperation will greatly help us to accomplish this study.",

          thankYou: "Thank you.",
          yoursFaithfully: "Yours faithfully,",

          researchTeam: "The Research Team",
          participationStudy:
            "You are being asked to participate in a study about health and health behaviors by answering a questionnaire. The information you give may help African Seventh-day Adventists be healthier and get better health education. There are no identifiable risks to you for participating. The questionnaire is anonymous, and your identity will not be revealed. Do not write your name on the questionnaire.",
          participationVoluntary:
            "You will not be paid to participate. Your participation is voluntary. Your answers cannot identify you, so please answer every question as honestly as possible. Finishing the questionnaire should take about an hour or a little more. After the completed questionnaires are returned, they will be kept in a locked office at the Adventist University of Africa in Nairobi, Kenya. When the research is completed, the questionnaires will be destroyed.",
          noParticipationReturn:
            "If you do not want to participate, return the questionnaire to the Research Assistant. You will not be penalized in any way for not participating. If you begin the questionnaire and do not want to finish it, stop and give it to the research assistant.",
          languageAssistance:
            "If English is not your primary language, ask the Research Assistant to give you a copy of this Informed Consent in a language you read and understand. The questionnaire you receive will also be in the same language. If you cannot see, read, write, or understand this Informed Consent, tell the Research Assistant and he/she will assist you. The Research Assistant will also assist you in completing the questionnaire.",
          signingConsent:
            "Signing this Informed Consent means agreeing to participate in the research study. If you have any questions, please ask them now. When you finish the questionnaire, your participation is over.",
          researchPrincipalInvestigator:
            "The Research Principal Investigator is Prof. Daniel Ganu. You can contact him if you have comments or complaints about this process. His contact information is:",
          facultyOffice:
            "Faculty office: Adventist University of Africa, Library 1st floor, Office of the Dean, School of Postgraduate Studies",
          cellPhone: "Cell phone:",

          ethicsReviewApproved:
            "The appropriate Ethics Review Committee has approved this study and is grant-funded.",
          clickToAgree:
            "By clicking here, you agree to participate in our study",
          thankYouForConsenting:
            "Thank you for consenting to participate in our study.",
          provideEmailForPasswordRecovery:
            "Please provide your email address to receive the procedure for recovering your password.",
          haveAccount: "Do you have an account?",
          wait: "Please wait a moment...",
          page: "Page",
          of: "of",
          goBack: "Go Back",
        },
      },
      fr: {
        translation: {
          welcometxt:
            "Ce site est dédié à la collecte de données sur l'étude de santé des Adventistes du Septième Jour.",
          learnMore: "En savoir plus",
          getStarted: "Commencer",
          africanSDAHealthStudy:
            "Étude de recherche en santé pour les adventistes en Afrique",
          allRight: "Tous droits réservés.",
          africanSDA: "Adventiste du Septième Jour Africain",
          healthStudy: "Étude de santé",
          forAdventist: "pour les adventistes en Afrique",
          signIn: "Se connecter",
          password: "Mot de passe",
          forgotPassword: "Mot de passe oublié ?",
          send: "Envoyer",
          information: "Information",

          close: "Fermer",
          informationSaved: "Informations enregistrées avec succès.",
          error: "Une erreur est survenue, réessayez plus tard !",
          formCompletions: "formulaires",
          notStarted: "Non démarré",
          inProgress: "En cours",
          completed: "Terminé",
          search: "Rechercher",
          newRespondent: "Nouveau répondant",
          fullName: "Nom complet",
          church: "Église",
          consent: "Consentement",
          status: "Statut",
          enrollPerson: "Remplir le formulaire",
          view: "Voir",
          previous: "Précédent",
          next: "Suivant",
          phone: "Téléphone",
          conference: "Conférence",
          typeOfChurch: "Type d'Église",
          small: "Petit",
          medium: "Moyen",
          large: "Grand",
          language: "Langue",
          english: "Anglais",
          french: "Français",
          malagasy: "Malagache",

          portuguese: "Portugais",
          respondentWishesToFillForm:
            " Le répondant choisit de remplir le formulaire",
          readConsentForm:
            "Lire le formulaire de consentement pour le participant",
          cancel: "Annuler",
          save: "Enregistrer",
          informedConsent: "Consentement éclairé",
          dearRespondent: "Cher répondant,",
          invitationToParticipate:
            "Cette lettre vous invite à participer à une étude de recherche intitulée",
          confidentialInformation:
            "Toutes les informations que vous fournissez seront traitées de manière confidentielle.",

          gratefulAssistance:
            "Nous vous serions très reconnaissants si vous pouviez aider dans cette importante recherche en prenant le temps de répondre au questionnaire de recherche que vous recevrez.",
          cooperation:
            "Sachez que votre coopération nous aidera grandement à mener à bien cette étude.",

          thankYou: "Merci.",
          yoursFaithfully:
            "Veuillez agréer, Madame/Monsieur, l'expression de mes sentiments distingués,",
          researchTeam: "L'équipe de recherche",
          participationStudy:
            "Vous êtes invité(e) à participer à une étude sur la santé et les comportements liés à la santé en répondant à un questionnaire. Les informations que vous fournissez peuvent aider les Adventistes du Septième Jour africains à être en meilleure santé et à bénéficier d'une meilleure éducation en matière de santé. Il n'y a aucun risque identifiable pour vous de participer. Le questionnaire est anonyme, et votre identité ne sera pas révélée. Ne pas écrire votre nom sur le questionnaire.",
          participationVoluntary:
            "Vous ne serez pas rémunéré(e) pour participer. Votre participation est volontaire. Vos réponses ne peuvent pas vous identifier, alors veuillez répondre à chaque question aussi honnêtement que possible. Finir le questionnaire devrait prendre environ une heure ou un peu plus. Après que les questionnaires remplis seront retournés, ils seront conservés dans un bureau fermé à clé à l'Université Adventiste de l'Afrique à Nairobi, au Kenya. Lorsque la recherche sera terminée, les questionnaires seront détruits.",
          noParticipationReturn:
            "Si vous ne souhaitez pas participer, veuillez retourner le questionnaire à l'Assistant de Recherche. Vous ne serez pénalisé(e) d'aucune manière pour ne pas participer. Si vous commencez le questionnaire et que vous ne souhaitez pas le terminer, arrêtez et remettez-le à l'assistant de recherche.",
          languageAssistance:
            "Si l'anglais n'est pas votre langue principale, demandez à l'Assistant de Recherche de vous fournir une copie de ce Consentement Éclairé dans une langue que vous lisez et comprenez. Le questionnaire que vous recevrez sera également dans la même langue. Si vous ne pouvez pas voir, lire, écrire ou comprendre ce Consentement Éclairé, informez l'Assistant de Recherche et il/elle vous aidera. L'Assistant de Recherche vous aidera également à remplir le questionnaire.",
          signingConsent:
            "Signer ce Consentement Éclairé signifie accepter de participer à l'étude de recherche. Si vous avez des questions, veuillez les poser maintenant. Lorsque vous avez terminé le questionnaire, votre participation est terminée.",
          researchPrincipalInvestigator:
            "Le chercheur principal de cette étude est le Prof. Daniel Ganu. Vous pouvez le contacter si vous avez des commentaires ou des plaintes concernant ce processus. Ses coordonnées sont les suivantes :",
          facultyOffice:
            "Bureau de la faculté : Université Adventiste de l'Afrique, Bibliothèque 1er étage, Bureau du Doyen, École des Études Supérieures",
          ethicsReviewApproved:
            "Le comité d'éthique approprié a approuvé cette étude et elle est financée par une subvention.",
          cellPhone: "Téléphone portable :",
          clickToAgree:
            "En cliquant ici, vous acceptez de participer à notre étude",
          thankYouForConsenting:
            "Merci de consentir à participer à notre étude.",
          provideEmailForPasswordRecovery:
            "Veuillez fournir votre adresse e-mail pour recevoir la procédure de récupération de votre mot de passe.",
          haveAccount: "Avez-vous un compte ?",
          wait: "Veuillez patienter un instant...",
          page: "Page",
          of: "sur",
          goBack: "Retour",
        },
      },
      pt: {
        translation: {
          welcometxt:
            "Este site é dedicado à coleta de dados sobre o estudo de saúde dos Adventistas do Sétimo Dia.",
          learnMore: "Saiba mais",
          getStarted: "Começar",
          africanSDAHealthStudy:
            "Estudo de pesquisa em saúde para adventistas na África",
          allRight: "Todos os direitos reservados.",
          africanSDA: "Adventista do Sétimo Dia Africano",
          healthStudy: "Estudo de saúde",
          forAdventist: "para os adventistas na África",
          signIn: "Entrar",
          password: "Senha",
          forgotPassword: "Esqueceu sua senha?",
          send: "Enviar",
          information: "Informação",
          close: "Fechar",
          informationSaved: "Informações salvas com sucesso.",
          error: "Ocorreu um erro, por favor, tente novamente mais tarde!",
          formCompletions: "Formulário",
          notStarted: "Não Iniciado",
          inProgress: "Em progresso",
          completed: "Concluído",

          search: "Pesquisar",
          newRespondent: "Novo respondente",
          fullName: "Nome completo",

          church: "Igreja",

          consent: "Consentimento",
          status: "Status",

          enrollPerson: "Preencher o formulário",
          view: "Visualizar",
          previous: "Anterior",
          next: "Próximo",

          phone: "Telefone",
          conference: "Conferência",
          typeOfChurch: "Tipo de Igreja",
          small: "Pequeno",
          medium: "Médio",
          large: "Grande",

          language: "Idioma",
          english: "Inglês",
          french: "Francês",
          malagasy: "Malagasy",
          portuguese: "Português",
          respondentWishesToFillForm:
            "O respondente escolhe preencher o formulário",
          readConsentForm:
            "Ler o formulário de consentimento para o participante",
          cancel: "Cancelar",
          save: "Salvar",
          informedConsent: "Consentimento Informado",
          dearRespondent: "Prezado Respondente,",
          invitationToParticipate:
            "Esta carta convida você a participar de um estudo de pesquisa intitulado",
          confidentialInformation:
            "Todas as informações que você fornecer serão mantidas confidenciais.",

          gratefulAssistance:
            "Ficaríamos muito gratos se você colaborar nesta importante pesquisa, dedicando um tempo para responder ao questionário de pesquisa que você receberá.",
          cooperation:
            "Saiba que sua cooperação nos ajudará muito a concluir este estudo.",
          thankYou: "Obrigado(a).",

          yoursFaithfully: "Atenciosamente,",
          researchTeam: "A Equipe de Pesquisa",
          participationStudy:
            "Você está sendo convidado(a) a participar de um estudo sobre saúde e comportamentos de saúde respondendo a um questionário. As informações que você fornecer podem ajudar os Adventistas do Sétimo Dia Africanos a serem mais saudáveis e a receberem uma melhor educação em saúde. Não há riscos identificáveis para você ao participar. O questionário é anônimo, e sua identidade não será revelada. Não escreva seu nome no questionário.",
          participationVoluntary:
            "Você não será pago para participar. Sua participação é voluntária. Suas respostas não podem identificá-lo, então responda a cada pergunta o mais honestamente possível. Terminar o questionário deve levar cerca de uma hora ou um pouco mais. Depois que os questionários preenchidos forem devolvidos, eles serão mantidos em um escritório trancado na Universidade Adventista da África em Nairóbi, Quênia. Quando a pesquisa estiver concluída, os questionários serão destruídos.",
          noParticipationReturn:
            "Se você não quiser participar, devolva o questionário ao Assistente de Pesquisa. Você não será penalizado de forma alguma por não participar. Se você começar o questionário e não quiser terminá-lo, pare e entregue-o ao assistente de pesquisa.",
          languageAssistance:
            "Se o inglês não é sua língua principal, peça ao Assistente de Pesquisa para lhe fornecer uma cópia deste Consentimento Informado em um idioma que você lê e entende. O questionário que você receberá também estará no mesmo idioma. Se você não consegue ver, ler, escrever ou entender este Consentimento Informado, avise o Assistente de Pesquisa e ele/ela irá ajudá-lo. O Assistente de Pesquisa também irá ajudá-lo a preencher o questionário.",
          signingConsent:
            "Assinar este Consentimento Informado significa concordar em participar do estudo de pesquisa. Se você tiver alguma dúvida, por favor, pergunte agora. Quando você terminar o questionário, sua participação estará encerrada.",
          researchPrincipalInvestigator:
            "O Investigador Principal da Pesquisa é o Prof. Daniel Ganu. Você pode contatá-lo se tiver comentários ou reclamações sobre este processo. As informações de contato dele são:",
          facultyOffice:
            "Escritório da faculdade: Universidade Adventista da África, Biblioteca 1º andar, Escritório do Decano, Escola de Pós-Graduação",
          ethicsReviewApproved:
            "O Comitê de Revisão Ética apropriado aprovou este estudo e é financiado por uma bolsa.",
          cellPhone: "Celular :",
          clickToAgree:
            "Ao clicar aqui, você concorda em participar do nosso estudo",
          thankYouForConsenting:
            "Obrigado por consentir em participar de nossa pesquisa.",
          provideEmailForPasswordRecovery:
            "Por favor, forneça seu endereço de e-mail para receber o procedimento de recuperação de senha.",
          haveAccount: "Você tem uma conta?",
          wait: "Por favor, aguarde um momento...",
          page: "Página",
          of: "de",
          goBack: "Voltar",
        },
      },
      mg: {
        translation: {
          welcometxt:
            "Ity tranokala ity dia natokana amin'ny fanangonana angona momba ny fandinihana ny fahasalamana ny Advantista Andro Fahafito.",
          learnMore: "Hianatra misimisy kokoa",
          getStarted: "Atombohy",
          africanSDAHealthStudy:
            "Fandalinana momba ny fahasalamana ho an'ny adventista any Afrika",
          allRight: "Zo rehetra voatokana.",
          africanSDA: "Advantista Andro Fahafito Afrikana",
          healthStudy: "Fandinihana ny Fahasalamana",
          forAdventist: "ho an'ny adventista any Afrika",

          signIn: "Hiditra",
          password: "Teny miafina",
          forgotPassword: "Adino ve ny tenimiafina?",
          send: "Alefaso",
          information: "Fampahalalana",
          close: "Akato",
          informationSaved: "Voavonjy soa aman-tsara ny fampahalalana.",
          error: "Nisy fahadisoana, azafady andramo indray aoriana!",
          formCompletions: "Famenoana taratasy",
          notStarted: "Tsy nanomboka",
          inProgress: "Mandeha",
          completed: "Vita",

          search: "Karoka",

          newRespondent: "Mpamaly vaovao",
          fullName: "Anarana feno",
          church: "Fiangonana",
          consent: "Fekem-pinoana",
          status: "Toetr'andro",
          enrollPerson: "Fenoy ny taratasy",
          view: "Jereo",

          previous: "Teo aloha",
          next: "Manaraka",
          phone: "Telefaonina",
          conference: "Fihaonambe",
          typeOfChurch: "Karazana Fiangonana",

          small: "Kely",
          medium: "Antsasa-dalana",
          large: "Lehibe",
          language: "Fiteny",

          english: "Anglisy",
          french: "Frantsay",
          portuguese: "Portogey",
          malagasy: "Malagasy",
          respondentWishesToFillForm:
            " Ny mpamaly dia misafidy ny hameno ny taratasy",
          readConsentForm:
            "Vakio ny taratasy fifanekena ho an'ny mpandray anjara",
          cancel: "Foano",
          save: "Vonjeo",
          informedConsent: "Fifanarahana Voalazan'ny Lalàna",
          dearRespondent: "Ry Mpamaly Hajaina,",
          invitationToParticipate:
            "Ity taratasy ity dia manasa anao handray anjara amin'ny fandinihana antsoina hoe",
          confidentialInformation:
            "Ny fampahalalana rehetra omenao dia hotazonina ho tsiambaratelo.",
          gratefulAssistance:
            "Misaotra indrindra izahay raha hanampy amin'ity fikarohana manan-danja ity amin'ny famenoana ny fanontaniana momba ny fikarohana.",
          cooperation:
            "Mariho fa ny fiaraha-miasa ataonao dia hanampy betsaka amin'ny fanatanterahana ity fandinihana ity.",

          thankYou: "Misaotra anao.",
          yoursFaithfully: "Misaotra indrindra,",

          researchTeam: "Ny Ekipan'ny Fikarohana",
          participationStudy:
            "Voafantina handray anjara amin'ny fandinihana momba ny fahasalamana sy ny fitondran-tena momba ny fahasalamana ianao amin'ny alalan'ny famaliana fanontaniana. Ny fampahalalana omenao dia mety hanampy ny Advantista Andro Fahafito Afrikana ho salama kokoa sy hahazo fanabeazana tsara kokoa momba ny fahasalamana. Tsy misy loza mety hitranga aminao noho ny fandraisanao anjara. Tsy ho fantatra ny anaranao amin'ny taratasy fanontaniana.",
          participationVoluntary:
            "Tsy hahazo vola ianao noho ny fandraisana anjara. An-tsitrapo ny fandraisanao anjara. Tsy misy fomba hahafantarana anao amin'ny valiny omenanao, koa valio ny fanontaniana rehetra amim-pahamarinana. Tokony ho ora iray eo ho eo na mihoatra kely ny fahavitan'ny fanontaniana. Aorian'ny famerenana ny taratasy fanontaniana vita, dia hotazonina ao amin'ny birao voahidy ao amin'ny Oniversite Advantista Afrikana any Nairobi, Kenya izy ireo. Rehefa vita ny fikarohana, dia hodorana ny taratasy fanontaniana.",
          noParticipationReturn:
            "Raha tsy te handray anjara ianao, avereno ny taratasy fanontaniana any amin'ny Mpanampy Fikarohana. Tsy hisy sazy ho anao noho ny tsy fandraisana anjara. Raha manomboka mamaly ny fanontaniana ianao ary tsy te hanohy azy, ajanony ary omeo ny mpanampy fikarohana.",
          languageAssistance:
            "Raha tsy anglisy ny fiteny fototrao, angataho ny Mpanampy Fikarohana mba hanome anao dika mitovy amin'ity Taratasy Fifanekena ity amin'ny fiteny azonao vakiana sy takarina. Ny taratasy fanontaniana ho azonao dia ho amin'ny fiteny mitovy ihany koa. Raha tsy afaka mahita, mamaky, manoratra, na mahafantatra ity Taratasy Fifanekena ity ianao, lazao amin'ny Mpanampy Fikarohana ary hanampy anao izy. Ny Mpanampy Fikarohana koa dia hanampy anao amin'ny famenoana ny taratasy fanontaniana.",
          signingConsent:
            "Ny sonia ity Taratasy Fifanekena ity dia midika ho fanekena handray anjara amin'ny fandinihana fikarohana. Raha manana fanontaniana ianao, azafady anontanio izy ireo ankehitriny. Rehefa vitanao ny taratasy fanontaniana, dia tapitra ny fandraisana anjaranao.",
          researchPrincipalInvestigator:
            "Ny Mpitari-draharahan'ny Fikarohana dia Profesora Daniel Ganu. Afaka mifandray aminy ianao raha manana fanehoan-kevitra na fitarainana momba ity dingana ity. Ny fampahalalana momba ny fifandraisana aminy dia:",
          facultyOffice:
            "Birao mpampianatra: Oniversite Advantista Afrikana, Trano famakiam-boky rihana voalohany, Biraon'ny Dekana, Sekolin'ny Fianarana ambony",
          cellPhone: "Laharana finday:",

          ethicsReviewApproved:
            "Ny Komity Mpandinika ny Etika sahaza dia nankato ity fandinihana ity ary manana famatsiam-bola.",
          clickToAgree:
            "Amin'ny alalan'ny fanindriana eto, manaiky handray anjara amin'ny fandinihanay ianao",
          thankYouForConsenting:
            "Misaotra anao nanaiky handray anjara amin'ny fandinihanay.",
          provideEmailForPasswordRecovery:
            "Azafady omeo ny adiresy mailakao mba hahazoana ny torolalana amin'ny famerenana ny tenimiafinao.",
          haveAccount: "Manana kaonty ve ianao?",
          wait: "Miandry kely azafady...",
          page: "Pejy",
          of: "amin'ny",
          goBack: "Miverina",
        },
      },
    },
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
