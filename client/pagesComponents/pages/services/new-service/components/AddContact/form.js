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
      first_name: {
        name: 'first_name',
        label: 'Nombre',
        type: 'text',
        errorMsg: 'El Nombre es requerido.',
        invalidMsg: 'No corresponde a un texto válido.'
      },
      last_name: {
        name: 'last_name',
        label: 'Apellido',
        type: 'text',
        errorMsg: 'El Apellido es requerido.',
        invalidMsg: 'No corresponde a un texto válido.'
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
  