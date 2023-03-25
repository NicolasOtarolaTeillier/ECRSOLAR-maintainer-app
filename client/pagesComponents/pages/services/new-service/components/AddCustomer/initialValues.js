
import checkout from "/pagesComponents/pages/services/new-service/components/AddCustomer/form.js";

const {
  formField: {
    name,
    fantasy_name,
    rut,
    address,
    url ,
  },
} = checkout;

const initialValues = {
  [name.name]: "",
  [fantasy_name.name]: "",
  [rut.name]: "",
  [address.name]: "",
  [url.name]: "",
};

export default initialValues;
