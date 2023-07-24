import { environment } from "../../../environments/environment";

export const urlApi = {
    listDepartment: `${environment.apiUrl}depatement/all`
};

export const ERROR_MESSAGES = {
    required: 'Ce champ est requis',
    minlength: 'Ce numéro de téléphone ne contient pas assez de chiffres',
    maxlength: 'Ce numéro de téléphone ne contient pas assez de chiffres',
    email: 'Merci d\'entrer une adresse mail valide',
    NONE: 'Ce champ contient une erreur'
  }
