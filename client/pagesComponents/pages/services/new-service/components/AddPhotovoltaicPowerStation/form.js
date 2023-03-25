const form = {
    formId: 'new-photovoltaic-power-station-form',
    formField: {
      name: {
        name: 'name',
        label: 'Nombre Planta',
        type: 'text',
        errorMsg: 'El nombre es requerido.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      strings: {
        name: 'strings',
        label: 'Cantidad de Strings',
        type: 'number',
        errorMsg: 'La cantaidad es requerida.',
        invalidMsg: 'No corresponde a un número valido.'
      },
      modules: {
        name: 'modules',
        label: 'Cantidad de Paneles',
        type: 'number',
        errorMsg: 'La cantaidad es requerida.',
        invalidMsg: 'No corresponde a un número valido.'
      },
      module_size: {
        name: 'module_size',
        label: 'Tamaño del Panel',
        type: 'text',
        errorMsg: 'La cantaidad es requerida.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      hectares: {
        name: 'hectares',
        label: 'Hectáreas',
        type: 'number',
        errorMsg: 'La cantaidad es requerida.',
        invalidMsg: 'No corresponde a un número valido.'
      },
      investor_brand: {
        name: 'investor_brand',
        label: 'Marca Inversor',
        type: 'text',
        errorMsg: 'La Marca es requerida.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      module_brand: {
        name: 'module_brand',
        label: 'Marca Panel',
        type: 'text',
        errorMsg: 'La Marca es requerida.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      mw: {
        name: 'mw',
        label: 'Mw',
        type: 'number',
        errorMsg: 'Mw es requerido.',
        invalidMsg: 'No corresponde a un número valido.'
      },
      owner: {
        name: 'owner',
        label: 'Nombre Dueño',
        type: 'text',
        errorMsg: 'El nombre es requerido.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      manager_name: {
        name: 'manager_name',
        label: 'Nombre Administrador',
        type: 'text',
        errorMsg: 'El nombre es requerido.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      customer: {
        name: 'customer',
        label: 'Cliente',
        type: 'text',
        errorMsg: 'El nombre es requerido.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
      manager_number: {
        name: 'manager_number',
        label: 'Número Administrador',
        type: 'text',
        errorMsg: 'El número de telefono es requerido.',
        invalidMsg: 'No corresponde a un texto valido.'
      },
    }
  }
  
  export default form

