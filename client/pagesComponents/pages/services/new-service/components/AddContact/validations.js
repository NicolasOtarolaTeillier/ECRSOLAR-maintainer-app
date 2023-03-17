
import * as Yup from "yup";
import checkout from "/pagesComponents/pages/services/new-service/components/AddContact/form";

const {
  formField: {
    customer, // name cliente
    person,  // id person (first_name, last_name, rut, phone_number, email)
    email,
    phone_number,
    address, 
    functional_area, // name of the area
  },
} = checkout;

const validations = 
  Yup.object().shape({
    [customer.name]: Yup.string().required(customer.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(),
    [person.name]: Yup.number().required(person.errorMsg),
    [phone_number.name]: Yup.string().required(phone_number.errorMsg),
    [address.name]: Yup.string().required(address.errorMsg),
    [functional_area.name]: Yup.string().required(functional_area.errorMsg),
  })
;

export default validations;
