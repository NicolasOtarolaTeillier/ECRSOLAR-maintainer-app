const form = {
    formId: 'new-customer-form',
    formField: {
      name: {
        name: 'name',
        label: 'Razon Social',
        type: 'text',
        errorMsg: 'El nombre es requerido.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      fantasy_name: {
        name: 'fantasy_name',
        label: 'Nombre de Fantasia',
        type: 'text',
        errorMsg: 'El Nombre de Fantasia es requerida.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      rut: {
        name: 'rut',
        label: 'Rut',
        type: 'text',
        errorMsg: 'El reut es requerido',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      // address: {
      //   name: 'address',
      //   label: 'Dirección',
      //   type: 'text',
      //   errorMsg: 'La Dirección es requerida.',
      //   invalidMsg: 'No corresponde a texto valido.'
      // },
      // url: {
      //   name: 'url',
      //   label: 'Página web',
      //   type: 'text',
      //   errorMsg: 'La página web es requerido.',
      //   invalidMsg: 'No corresponde a un texto valido.'
      // },

    }
  }
  
  export default form
  