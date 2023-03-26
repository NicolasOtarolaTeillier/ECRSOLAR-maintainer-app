
import * as Yup from "yup";
import checkout from "/pagesComponents/pages/services/new-service/schemas/form";

const {
  formField: {
    purchase_order,
    contract,
    price,
    proposed_execution_date,
    finish_execution_date,
    service_type,
    customer,
    photovoltaic_power_station,
    contact,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [purchase_order.name]: Yup.number().required(purchase_order.errorMsg),
    [contract.name]: Yup.boolean().required(contract.errorMsg),
    [price.name]: Yup.string().required(price.errorMsg),
    [proposed_execution_date.name]: Yup.date().required(proposed_execution_date.errorMsg),
    [finish_execution_date.name]: Yup.date().required(finish_execution_date.errorMsg),
    [service_type.name]: Yup.string().required(service_type.errorMsg),
    [customer.name]: Yup.string().required(customer.errorMsg),
    [photovoltaic_power_station.name]: Yup.string().required(photovoltaic_power_station.errorMsg),
    [contact.name]: Yup.number().required(contact.errorMsg),
  })
];

export default validations;
