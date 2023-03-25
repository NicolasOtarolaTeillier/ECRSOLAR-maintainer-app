
import * as Yup from "yup";
import checkout from "/pagesComponents/pages/services/new-service/components/AddContact/form";

const {
  formField: {
    customer, // name cliente
    first_name,
    last_name,
    email,
    phone_number,
    address, 
    functional_area, // name of the area
  },
} = checkout;

const validations = 
  Yup.object().shape({
    [customer.name]: Yup.string(),
    [email.name]: Yup.string().required(email.errorMsg).email(),
    [first_name.name]: Yup.string().required(first_name.errorMsg),
    [last_name.name]: Yup.string().required(last_name.errorMsg),
    [phone_number.name]: Yup.string().required(phone_number.errorMsg),
    [address.name]: Yup.string().required(address.errorMsg),
    [functional_area.name]: Yup.string().required(functional_area.errorMsg),
  })
;

export default validations;
