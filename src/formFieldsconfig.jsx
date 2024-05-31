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
};
