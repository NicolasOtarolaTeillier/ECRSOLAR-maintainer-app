
import * as Yup from "yup";
import checkout from "/pagesComponents/pages/services/new-service/components/AddPhotovoltaicPowerStation/form.js";

const {
  formField: {
    name,
    strings,
    modules,
    module_size,
    hectares ,
    investor_brand,
    module_brand,
    mw,
    owner,
    manager_name,
    customer,
    manager_number,
  },
} = checkout;

const validations = 
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [strings.name]: Yup.number().required(strings.errorMsg),
    [modules.name]: Yup.number().required(modules.errorMsg),
    [module_size.name]: Yup.string().required(module_size.errorMsg),
    [hectares.name]: Yup.number().required(hectares.errorMsg),
    [investor_brand.name]: Yup.string().required(investor_brand.errorMsg),
    [module_brand.name]: Yup.string().required(module_brand.errorMsg),
    [mw.name]: Yup.number().required(mw.errorMsg),
    [owner.name]: Yup.string().required(owner.errorMsg),
    [manager_name.name]: Yup.string().required(manager_name.errorMsg),
    [customer.name]: Yup.string(),
    [manager_number.name]: Yup.string().required(manager_number.errorMsg),
  })
;

export default validations;
