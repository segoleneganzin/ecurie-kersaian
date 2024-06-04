// Form field settings
// default tag = input
// default pattern = null
// label and type are always required

const isRequired = true; // default value

const isDurationValid = (value) => {
  let res = true;
  if (value % 15 !== 0 || value < 15) {
    res = false;
  }
  return res;
};

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
  // holiday period form
  HolidayInfos: {
    tag: 'textarea',
    label: 'Informations (dates, tarifs) :',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner la période',
    isRequired,
  },
  // general prices
  season: {
    label: 'Saison :',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner la saison',
    isRequired,
  },
  annualSubscription: {
    label: 'Cotisation annuelle :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  ffeLicenseUnder18: {
    label: '- de 18ans :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  ffeLicenseOver18: {
    label: '+ de 18ans :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  // equestrian center prices
  period: {
    tag: 'textarea',
    label: 'Période :',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner la période',
    isRequired,
  },
  infos: {
    tag: 'textarea',
    label: 'Informations diverses :',
    type: 'text',
    isRequired: false,
  },
  baby: {
    label: 'Baby :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  oneHourUnder18: {
    label: '- de 18 ans :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  oneHourOver18: {
    label: '+ de 18 ans :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  twoHoursUnder18: {
    label: '- de 18 ans :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  twoHoursOver18: {
    label: '+ de 18 ans :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  hours5: {
    label: '5 heures :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  hours10: {
    label: '10 heures :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  clubLesson5: {
    label: '5 cours club :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  ownerLesson5: {
    label: '5 cours propriétaire :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  halfPensionDescription: {
    tag: 'textarea',
    label: 'Description :',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner une description',
    isRequired,
  },
  halfPensionTarif: {
    label: 'Tarif mensuel :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  thirdPartPensionDescription: {
    tag: 'textarea',
    label: 'Description :',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner une description',
    isRequired,
  },
  thirdPartPensionTarif: {
    label: 'Tarif mensuel :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
  // weekly planner
  title: {
    tag: 'textarea',
    label: 'Intitulé :',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner un intitulé',
    isRequired,
  },
  duration: {
    label: 'Durée (tranche de 15 minutes) :',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    validate: isDurationValid,
    isRequired,
  },
  cellBg: {
    label: 'Couleur de fond :',
    type: 'color',
    fieldErrorMessage: 'Veuillez renseigner le tarif',
    isRequired,
  },
};
