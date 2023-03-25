
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

const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const nextNextWeek =  new Date(nextWeek);
nextNextWeek.setDate(nextWeek.getDate() + 7);

const initialValues = {
  [purchase_order.name]: "",
  [contract.name]: false,
  [price.name]: "",
  [proposed_execution_date.name]: nextWeek.toISOString().substring(0, 10),
  [finish_execution_date.name]: nextNextWeek.toISOString().substring(0, 10),
  [service_type.name]: "Limpieza en seco",
  [customer.name]: " ",
  [photovoltaic_power_station.name]: " ",
  [contact.name]: 0,

};

export default initialValues;
