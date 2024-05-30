// Form field settings
// default tag = input
// default pattern = null
// label and type are always required
const isRequired = true; // default value
export const formFieldsConfig = {
  // authentication + contact
  email: {
    label: 'Email',
    type: 'email',
    pattern: /\S+@\S+\.\S+/,
    fieldErrorMessage: 'Veuillez renseigner votre email',
    isRequired,
  },
  newEmail: {
    label: 'Nouvel e-mail :',
    type: 'email',
    pattern: /\S+@\S+\.\S+/,
    fieldErrorMessage: 'Veuillez renseigner votre nouvel email',
    isRequired,
  },
  password: {
    label: 'Mot de passe',
    type: 'password',
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    fieldErrorMessage: 'Veuillez renseigner votre mot de passe',
    isRequired,
  },
  passwordConfirmation: {
    label: 'Confirmer le mot de passe :',
    type: 'password',
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    fieldErrorMessage: 'Veuillez confirmer votre mot de passe',
    isRequired,
  },

  // contact
  contactName: {
    label: 'Nom',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre nom',
    isRequired,
  },

  message: {
    tag: 'textarea',
    label: 'Message',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre message',
    isRequired,
  },

  // Identity
  job: {
    label: 'Emploi*',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre emploi',
    isRequired,
  },
  presentation: {
    tag: 'textarea',
    label: 'Présentation*',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner votre présentation',
    isRequired,
  },

  // Project
  title: {
    label: 'Titre*',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner un titre',
    isRequired,
  },
  description: {
    tag: 'textarea',
    label: 'Description*',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner la description',
    isRequired,
  },
  context: {
    tag: 'select',
    label: 'Contexte*',
    defaultValue: 'Choisir une option',
    fieldErrorMessage: 'Veuillez renseigner le contexte',
    isRequired,
    options: [
      {
        label: 'Projet professionnel',
        value: 'Projet professionnel',
      },
      {
        label: 'Projet personnel',
        value: 'Projet personnel',
      },
      {
        label: 'Projet scolaire',
        value: 'Projet scolaire',
      },
    ],
  },
  link: {
    label: 'Lien',
    type: 'url',
    isRequired: false,
  },
  githubLink: {
    label: 'Lien GitHub',
    type: 'url',
    isRequired: false,
  },
  img: {
    tag: 'textarea',
    label: 'Image en base64*',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre image',
    isRequired,
  },
  alt: {
    label: "Description de l'image*",
    type: 'text',
    fieldErrorMessage: "Veuillez renseigner une description pour l'image",
    isRequired,
  },
  technos: {
    label: 'Technos (séparées par une virgule)*',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner une ou plusieurs technos',
    isRequired,
  },
  date: {
    label: 'Date de réalisation*',
    type: 'date',
    fieldErrorMessage: 'Veuillez renseigner une date',
    isRequired,
  },

  // Skill
  name: {
    label: 'Nom de la compétence*',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner un nom',
    isRequired,
  },
  level: {
    label: 'Niveau (multiple de 5)*',
    type: 'number',
    step: '5',
    pattern: /^(2[5]|[3-9][05]|100)$/, //multiple of 5, between 25 and 100
    fieldErrorMessage: 'Veuillez renseigner un niveau',
    isRequired,
  },
  type: {
    tag: 'select',
    label: 'Type*',
    defaultValue: 'Choisir une option',
    fieldErrorMessage: 'Veuillez renseigner le type',
    isRequired,
    options: [
      {
        label: 'Hardskill',
        value: 'hardskill',
      },
      {
        label: 'Softskill',
        value: 'softskill',
      },
    ],
  },
};
