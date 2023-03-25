
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

const initialValues = {
  [name.name]: "",
  [strings.name]: "",
  [modules.name]: "",
  [module_size.name]: "",
  [hectares.name]: "",
  [investor_brand.name]: "",
  [module_brand.name]: "",
  [mw.name]: "",
  [owner.name]: "",
  [manager_name.name]: "",
  [customer.name]: "",
  [manager_number.name]: "",
};

export default initialValues;
