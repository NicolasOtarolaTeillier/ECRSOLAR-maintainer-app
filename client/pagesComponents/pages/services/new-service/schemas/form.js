const form = {
  formId: 'new-service-form',
  formField: {
    purchase_order: {
      name: 'purchase_order',
      label: 'Número de OC',
      type: 'number',
      errorMsg: 'El número de OC es requerido.'
    },
    contract: {
      name: 'contract',
      label: 'Es un contrato?',
      type: 'checkbox',
      errorMsg: 'Este campo es requerido.'
    },
    price: {
      name: 'price',
      label: 'Precio Neto (sin iva)',
      type: 'number',
      errorMsg: 'El precio de servicio es requerido.'
    },
    proposed_execution_date: {
      name: 'proposed_execution_date',
      label: 'Fecha propuesta de ejecución',
      type: 'date',
      errorMsg: 'La fecha de servicio es requerido.'
    },
    finish_execution_date: {
      name: 'finish_execution_date',
      label: 'Fecha propuesta de finalización',
      type: 'date',
      errorMsg: 'La fecha de servicio es requerido.'
    },
    service_type: {
      name: 'service_type',
      label: 'Nombre del Tipo de Servicio',
      type: 'text',
      errorMsg: 'El nombre del tipo de servicio es requerido.'
    },
    customer: {
      name: 'customer',
      label: 'Cliente',
      type: 'text',
      errorMsg: 'El cliente es requerido.'
    },
    photovoltaic_power_station: {
      name: 'photovoltaic_power_station',
      label: 'Planta',
      type: 'text',
      errorMsg: 'La planta es requerido.'
    },
    contact: {
      name: 'contact',
      label: 'Contacto',
      type: 'number',
      errorMsg: 'El contacto es requerido.'
    }
  }
}

export default form
