
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
    mw_ac,
    mw_dc,
    owner,
    manager_name,
    customer,
    commune,
    manager_number,
  },
} = checkout;

const validations = 
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [strings.name]: Yup.number(),
    [modules.name]: Yup.number(),
    [module_size.name]: Yup.string(),
    [hectares.name]: Yup.number(),
    [investor_brand.name]: Yup.string(),
    [module_brand.name]: Yup.string(),
    [mw_ac.name]: Yup.number(),
    [mw_dc.name]: Yup.number(),
    [owner.name]: Yup.string(),
    [manager_name.name]: Yup.string(),
    [commune.name]: Yup.string(),
    [customer.name]: Yup.string(),
    [manager_number.name]: Yup.string(),
  })
;

export default validations;
