
import checkout from "/pagesComponents/pages/services/planning-service/schemas/form";

const {
  formField: {
    texto
  },
} = checkout;

const initialValues = {
  [texto.name]: "",
};

export default initialValues;
