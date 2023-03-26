import { useState } from 'react'

// formik components
import { Formik, Form } from 'formik'

// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDButton from '/components/MDButton'

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from '/examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '/examples/Navbars/DashboardNavbar'
import Footer from '/examples/Footer'

// NewService page components
import NewService from '/pagesComponents/pages/services/new-service/components/NewService'
import AddServiceType from '/pagesComponents/pages/services/new-service/components/AddServiceType'
import AddCustomer from '../../../pagesComponents/pages/services/new-service/components/AddCustomer'
import AddPhotovoltaicPowerStation from '../../../pagesComponents/pages/services/new-service/components/AddPhotovoltaicPowerStation'
import AddContact from '../../../pagesComponents/pages/services/new-service/components/AddContact'


// NewService layout schemas for form and form feilds
import validations from '/pagesComponents/pages/services/new-service/schemas/validations'
import form from '/pagesComponents/pages/services/new-service/schemas/form'
import initialValues from '/pagesComponents/pages/services/new-service/schemas/initialValues'


// hook
import ClientOnly from '../../../components/ClientOnly'
//import AllServices from '../../../maintainer/AllServices'

// mutation
import ADD_SERVICE from '../../../api/Service/mutations.js'
import { useMutation } from '@apollo/client'

import GET_ALL_SERVICES from '../../../api/service/queries.js'
import { useQuery } from '@apollo/client'


function getSteps () {
  return [
    '1. Nuevo Servicio',
    '2. Asignar Servicio',
    '3. Asignar Cliente',
    '4. Asignar Planta',
    '5. Asignar Contacto',

  ]
}

function getStepContent (stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <NewService formData={formData} />
    case 1:
      return <AddServiceType formData={formData}/>
    case 2:
      return <AddCustomer formData={formData}/>
    case 3:
      return <AddPhotovoltaicPowerStation formData={formData}/>
    case 4:
      return <AddContact formData={formData}/>
    default:
      return null
  }
}

// notifications
import MDSnackbar from '/components/MDSnackbar'

function Service () {
  // apollo
  const [addService] = useMutation(ADD_SERVICE)
  const { data, loading, error } = useQuery(GET_ALL_SERVICES)
  console.log(data)


  // message:
  const [message, setMessage] = useState('')

  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const { formId, formField } = form
  const currentValidation = validations[activeStep]
  const isLastStep = activeStep === steps.length - 1

  //notifications
  const [successSB, setSuccessSB] = useState(false)
  const [infoSB, setInfoSB] = useState(false)
  const [warningSB, setWarningSB] = useState(false)
  const [errorSB, setErrorSB] = useState(false)

  const openSuccessSB = () => setSuccessSB(true)
  const closeSuccessSB = () => setSuccessSB(false)
  //const openInfoSB = () => setInfoSB(true)
  const closeInfoSB = () => setInfoSB(false)
  //const openWarningSB = () => setWarningSB(true)
  const closeWarningSB = () => setWarningSB(false)
  const openErrorSB = () => setErrorSB(true)
  const closeErrorSB = () => setErrorSB(false)

  const sleep = ms =>
    new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  const handleBack = () => setActiveStep(activeStep - 1)

  const submitForm = async (values, actions) => {
    alert(JSON.stringify(values, null, 2))
    try {
      const result = await addService({
        variables: {
          purchaseOrder: values['purchase_order'],
          contract: values['contract'],
          price: values['price'],
          proposedExecutionDate: values['proposed_execution_date'],
          finishExecutionDate: values['finish_execution_date'],
          serviceType: values['service_type'],
          customer: values['customer'],
          photovoltaicPowerStation: values['photovoltaic_power_station'],
          contact: values['contact']
        }
      })
      console.log("result",result)
      const { data } = result
      setMessage(data.addService.id)
      console.log('data', data.addService.id)
      openSuccessSB()
      actions.resetForm()
      setActiveStep(0)
    } catch (err) {
      console.log(err)
      setMessage(err)
      openErrorSB()
      setActiveStep(0)
    }
    actions.setSubmitting(false)
  }
  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions)
    } else {
      setActiveStep(activeStep + 1)
      actions.setTouched({})
      actions.setSubmitting(false)
    }
  }

  const renderSuccessSB = (
    <MDSnackbar
      color='success'
      icon='check'
      title='Exito al crear el servicio'
      content={`${message}`}
      dateTime='0 mins ago'
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  )

  const renderInfoSB = (
    <MDSnackbar
      color='info'
      icon='notifications'
      title='Material Dashboard'
      content={`${message}`}
      dateTime='0 mins ago'
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  )

  const renderWarningSB = (
    <MDSnackbar
      color='warning'
      icon='star'
      title='Material Dashboard'
      content={`${message}`}
      dateTime='0 mins ago'
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  )

  const renderErrorSB = (
    <MDSnackbar
      color='error'
      icon='warning'
      title='Error al crear servicio'
      content={`${message}`}
      dateTime='0 mins ago'
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  )

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} mb={20} height='65vh'>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ height: '100%', mt: 8 }}
        >
          {renderSuccessSB}
          {renderInfoSB}
          {renderWarningSB}
          {renderErrorSB}
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete='off'>
                  <Card sx={{ height: '100%' }}>
                    <MDBox mx={2} mt={-3} >
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={3}>
                      <MDBox>
                        {/* {
                          <ClientOnly>
                            <AllServices />
                          </ClientOnly>
                        } */}
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors
                        })}
                        <MDBox
                          mt={2}
                          width='100%'
                          display='flex'
                          justifyContent='space-between'
                        >
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton
                              variant='gradient'
                              color='light'
                              onClick={handleBack}
                            >
                              atrás
                            </MDButton>
                          )}
                          <MDButton
                            disabled={isSubmitting}
                            type='submit'
                            variant='gradient'
                            color={isLastStep ? 'success': 'dark'}
                          >
                            {isLastStep ? 'Guardar' : 'siguiente'}
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Service
