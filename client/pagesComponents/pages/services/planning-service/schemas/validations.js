
import * as Yup from "yup";
import checkout from "/pagesComponents/pages/services/planning-service/schemas/form";

const {
  formField: {
  texto
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [texto.name]: Yup.string().required(),
  })
];

export default validations;
