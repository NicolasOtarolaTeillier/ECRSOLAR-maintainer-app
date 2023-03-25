import { useState } from 'react'
import Modal from '@mui/material/Modal'

import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
import MDButton from '/components/MDButton'
import { Card, Grid, Icon } from '@mui/material'

// formik components
import { Formik, Form, Field } from 'formik'
import initialValues from './initialValues.js'
import form from './form.js'

import FormField from '/pagesComponents/pages/services/new-service/components/FormField'

// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'
import validations from './validations.js'

// mutation
import ADD_CONTACT from '../../../../../../api/contact/mutations.js'
import { useMutation } from '@apollo/client'

//query refetching
import GET_ALL_CONTACTS from '../../../../../../api/contact/queries.js'

// notifications
import MDSnackbar from '/components/MDSnackbar'

const style = {
  position: 'absolute',
  mt: '15%',
  width: 'flex',
  ml: '20%',
  mr: '20%'
}

function NewContact ({ formData }) {
  const { values: valuesFormData } = formData
  const { customer: customerV } = valuesFormData

  // apollo
  const [addContact] = useMutation(ADD_CONTACT, {
    refetchQueries: [
      {
        query: GET_ALL_CONTACTS
      }
    ]
  })

  // message:
  const [message, setMessage] = useState('')

  //notifications
  const [successSB, setSuccessSB] = useState(false)
  const [infoSB, setInfoSB] = useState(false)
  const [warningSB, setWarningSB] = useState(false)
  const [errorSB, setErrorSB] = useState(false)

  const openSuccessSB = () => setSuccessSB(true)
  const closeSuccessSB = () => setSuccessSB(false)
  const closeInfoSB = () => setInfoSB(false)
  const closeWarningSB = () => setWarningSB(false)
  const openErrorSB = () => setErrorSB(true)
  const closeErrorSB = () => setErrorSB(false)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { formId, formField } = form
  const { email, customer, first_name, last_name, phone_number, address, functional_area } =
    formField

  const submitForm = async (values, actions) => {
    console.log('hola')
    alert(JSON.stringify(values, null, 2))
    try {
      const result = await addContact({
        variables: {
          customer: customerV,
          firstName: values['first_name'],
          lastName: values['last_name'],
          email: values['email'],
          phoneNumber: values['phone_number'],
          address: values['address'],
          functionalArea: values['functional_area']
        }
      })
      console.log('result', result)
      const { data } = result
      console.log('data', data)
      setMessage(data.addContact.id)
      openSuccessSB()
      setOpen(false)
    } catch (err) {
      console.log(err)
      setMessage(err)
      openErrorSB()
    }
    actions.setSubmitting(false)
  }
  const renderSuccessSB = (
    <MDSnackbar
      color='success'
      icon='check'
      title='Exito al crear el Cliente'
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
      title='Error al crear Cliente'
      content={`${message}`}
      dateTime='0 mins ago'
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  )
  return (
    <MDBox>
      {renderSuccessSB}
      {renderInfoSB}
      {renderWarningSB}
      {renderErrorSB}
      <MDBox mt={5}>
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid sx={{ textAlign: 'right' }}>
            <MDButton variant='gradient' color='info' onClick={handleOpen}>
              <Icon>add</Icon>&nbsp; Nuevo Contacto
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Modal open={open} onClose={handleClose} sx={style}>
        <MDBox px={5} py={3} variant='gradient'>
          <MDTypography variant='body1' color='dark' fontWeight='bold'>
            Crea un nuevo Contacto
          </MDTypography>

          <MDBox>
            <Grid item xs={12} lg={12}>
              <Formik
                initialValues={initialValues}
                onSubmit={submitForm}
                validationSchema={validations}
              >
                {({ values, errors, touched, isSubmitting }) => (
                  <Form id={formId} autoComplete='off'>
                    <Grid
                      container
                      justifyContent='center'
                      alignItems='center'
                      sx={{ height: '100%', width: '100%', mt: 8 }}
                    ></Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={email.type}
                          label={email.label}
                          name={email.name}
                          value={values.email}
                          placeholder={email.placeholder}
                          error={errors.email && touched.email}
                          success={values.email.length > 0 && !errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={first_name.type}
                          label={first_name.label}
                          name={first_name.name}
                          value={values.first_name}
                          placeholder={first_name.placeholder}
                          error={errors.first_name && touched.first_name}
                          success={values.first_name.length > 0 && !errors.first_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={last_name.type}
                          label={last_name.label}
                          name={last_name.name}
                          value={values.last_name}
                          placeholder={last_name.placeholder}
                          error={errors.last_name && touched.last_name}
                          success={values.last_name.length > 0 && !errors.last_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={phone_number.type}
                          label={phone_number.label}
                          name={phone_number.name}
                          value={values.phone_number}
                          placeholder={phone_number.placeholder}
                          error={errors.phone_number && touched.phone_number}
                          success={
                            values.phone_number.length > 0 &&
                            !errors.phone_number
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={address.type}
                          label={address.label}
                          name={address.name}
                          value={values.address}
                          placeholder={address.placeholder}
                          error={errors.address && touched.address}
                          success={values.address.length > 0 && !errors.address}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={functional_area.type}
                          label={functional_area.label}
                          name={functional_area.name}
                          value={values.functional_area}
                          placeholder={functional_area.placeholder}
                          error={
                            errors.functional_area && touched.functional_area
                          }
                          success={
                            values.functional_area.length > 0 &&
                            !errors.functional_area
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container style={{ justifyContent: 'right' }}>
                      <MDTypography mt={2}>
                        <MDButton type='submit' variant='gradient' color='dark'>
                          Guardar
                        </MDButton>
                      </MDTypography>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </MDBox>
        </MDBox>
      </Modal>
    </MDBox>
  )
}

export default NewContact
