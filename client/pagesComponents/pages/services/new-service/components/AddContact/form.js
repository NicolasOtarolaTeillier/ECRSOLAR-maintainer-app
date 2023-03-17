const form = {
    formId: 'new-contact-form',
    formField: {
      customer: {
        name: 'customer',
        label: 'Cliente',
        type: 'text',
        errorMsg: 'El Cliente es requerido.',
        invalidMsg: 'No corresponde a un cliente valido.'
      },
      person: {
        name: 'person',
        label: 'Persona',
        type: 'number',
        errorMsg: 'La persona es requerida.',
        invalidMsg: 'No corresponde a un numero.'
      },
      email: {
        name: 'email',
        label: 'Correo',
        type: 'email',
        errorMsg: 'El Correo es requerido.',
        invalidMsg: 'No corresponde a un email valido.'
      },
      phone_number: {
        name: 'phone_number',
        placeholder: '+56989451122',
        label: 'Número de teléfono',
        type: 'text',
        errorMsg: 'El número de telefono es requerido.',
        invalidMsg: 'No corresponde a un texto válido.'
      },
      address: {
        name: 'address',
        label: 'Dirección',
        type: 'text',
        errorMsg: 'La Dirección es requerida.',
        invalidMsg: 'No corresponde a texto valido.'
      },
      functional_area: {
        name: 'functional_area',
        label: 'Área Funcional',
        type: 'text',
        errorMsg: 'El área funcional es requerido.',
        invalidMsg: 'No corresponde a un texto valido.'
      },

    }
  }
  
  export default form
  