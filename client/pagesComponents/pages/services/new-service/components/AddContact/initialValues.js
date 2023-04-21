
import checkout from "/pagesComponents/pages/services/new-service/components/AddContact/form.js";

const {
  formField: {
    customer,
    first_name,
    last_name,
    email,
    phone_number,
    functional_area,
  },
} = checkout;

const initialValues = {
  [customer.name]: "",
  [first_name.name]: "",
  [last_name.name]: "",
  [email.name]: "",
  [phone_number.name]: "",
  [functional_area.name]: "",
};

export default initialValues;
