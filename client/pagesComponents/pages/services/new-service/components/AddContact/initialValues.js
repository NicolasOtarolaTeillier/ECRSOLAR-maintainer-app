
import checkout from "/pagesComponents/pages/services/new-service/components/AddContact/form.js";

const {
  formField: {
    customer,
    person,
    email,
    phone_number,
    address,
    functional_area,
  },
} = checkout;

const initialValues = {
  [customer.name]: "",
  [person.name]: "",
  [email.name]: "",
  [phone_number.name]: "",
  [address.name]: "",
  [functional_area.name]: "",
};

export default initialValues;
