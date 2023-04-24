
import * as Yup from "yup";
import checkout from "/pagesComponents/pages/services/new-service/components/AddCustomer/form";

const {
  formField: {
    name,
    fantasy_name,
    rut,
    // address,
    // url ,
  },
} = checkout;

const validations = 
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [fantasy_name.name]: Yup.string().required(fantasy_name.errorMsg),
    [rut.name]: Yup.string().required(rut.errorMsg),
    // [address.name]: Yup.string().required(address.errorMsg),
    // [url.name]: Yup.string().required(url.errorMsg),
  })
;

export default validations;
