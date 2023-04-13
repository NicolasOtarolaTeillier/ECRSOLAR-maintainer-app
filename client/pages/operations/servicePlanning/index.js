import { useState } from 'react'

// formik components
import { Formik, Form } from 'formik'

// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDButton from '/components/MDButton'

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from '/examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '/examples/Navbars/DashboardNavbar'
import Footer from '/examples/Footer'

// Planning Service page components
import SelectService from '../../../pagesComponents/pages/services/planning-service/components/SelectService'
import AddStaff from '../../../pagesComponents/pages/services/planning-service/components/AddStaff'
import AddEquipment from '../../../pagesComponents/pages/services/planning-service/components/AddEquipment'
import AddCar from '../../../pagesComponents/pages/services/planning-service/components/AddCar'

// Planning Service  layout schemas for form and form feilds
import validations from '/pagesComponents/pages/services/planning-service/schemas/validations'
import form from '/pagesComponents/pages/services/planning-service/schemas/form'
import initialValues from '/pagesComponents/pages/services/planning-service/schemas/initialValues'

// apollo
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'

// context
import { useMaterialUIController, setSelectService, setSelectLeader,setSelectCars,setSelectEquipments,setSelectStaffs } from '/context'

// mutation
import SERVICE_PLANNING from '../../../api/transactions/mutations.js'

//notifications
import ApiNotification from '../../../components/ApiNotification'

function getSteps () {
  return [
    '1. Seleccionar Servicio',
    '2. Asignar Cuadrilla',
    '3. Asignar Equipamiento',
    '4. Asignar Vehículo'
  ]
}

function getStepContent (stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <SelectService formData={formData} />
    case 1:
      return <AddStaff formData={formData} />
    case 2:
      return <AddEquipment formData={formData} />
    case 3:
      return <AddCar formData={formData} />
    default:
      return null
  }
}

function Service () {
  // context
  const [controller, dispatch] = useMaterialUIController()
  const { service,leader,cars,equipments,staffs } = controller

  // notification
  const [notification,setNotification] = useState({})

  // apollo
  const [servicePlanning] = useMutation(SERVICE_PLANNING)

  // steps
  const [activeStep, setActiveStep] = useState(0)
  const currentValidation = validations[activeStep]
  const steps = getSteps()
  const isLastStep = activeStep === steps.length - 1
  const handleBack = () => setActiveStep(activeStep - 1)


  // form
  const { formId, formField } = form
  const handleSubmit = (values, actions) => {
    console.log(values)
    if (isLastStep) {
      submitForm(values, actions)
    } else {
      setActiveStep(activeStep + 1)
      actions.setTouched({})
      actions.setSubmitting(false)
    }
  }
  const submitForm = async (values, actions) => {
    alert(JSON.stringify(values, null, 2))
    // to-do:  SERVICE_PLANNING
    try {
      const result = await servicePlanning({
        variables:{
          service: service,
          leader: leader,
          staffs: staffs,
          equipments: equipments,
          cars: cars,
          step: 2
        }
      })
    setNotification({message:result, code:'success',title:'Exito al hacer la transaccion'})

    }
    catch (err) {
      setNotification({message:err, code:'error',title:'Exito al hacer la transacción'})

    }


    actions.setSubmitting(false)
  }

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
          <ApiNotification data={notification}/>
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete='off'>
                  <Card sx={{ height: '100%' }}>
                    <MDBox mx={2} mt={-3}>
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
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          setActiveStep,
                          activeStep,
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
                          {activeStep === 0 ? null : (
                            <MDButton
                              disabled={isSubmitting}
                              type='submit'
                              variant='gradient'
                              color={isLastStep ? 'success' : 'dark'}
                            >
                              {isLastStep ? 'Guardar' : 'siguiente'}
                            </MDButton>
                          )}
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
    </DashboardLayout>
  )
}



export default Service
