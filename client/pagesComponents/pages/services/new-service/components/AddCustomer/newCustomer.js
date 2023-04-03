import * as React from 'react'
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
import ADD_CUSTOMER from '../../../../../../api/customer/mutations.js'
import { useMutation } from '@apollo/client'

//query refetching
import GET_ALL_CUSTOMERS from '../../../../../../api/customer/queries.js'

const style = {
  position: 'absolute',
  mt: '10%',
  width: 'flex',
  ml: '20%',
  mr: '20%'
}


// notifications
import MDSnackbar from '/components/MDSnackbar'
import { useState } from 'react'

function NewCustomer () {
  // apollo
  const [addCustomer] = useMutation(ADD_CUSTOMER, {

    refetchQueries: [
      {
        query: GET_ALL_CUSTOMERS
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

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { formId, formField } = form
  const { name, fantasy_name, rut } =
    formField

  const submitForm = async (values, actions) => {
    alert(JSON.stringify(values, null, 2))
    try {
      const result = await addCustomer({
        variables: {
          name: values['name'],
          fantasyName: values['fantasy_name'],
          rut: values['rut'],
          // address: values['address'],
          // url: values['url'],
        }
      })
      const { data } = result
      console.log('result', result)
      console.log('data', data)
      setMessage(data.addCustomer.id)
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
              <Icon>add</Icon>&nbsp; Nuevo Cliente
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Modal open={open} onClose={handleClose} sx={style}>
        <MDBox px={5} py={3} variant='gradient'>
          <MDTypography variant='body1' color='dark' fontWeight='bold'>
            Crea un nuevo Cliente
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
                          type={name.type}
                          label={name.label}
                          name={name.name}
                          value={values.name}
                          placeholder={name.placeholder}
                          error={errors.name && touched.name}
                          success={values.name.length > 0 && !errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={rut.type}
                          label={rut.label}
                          name={rut.name}
                          value={values.rut}
                          placeholder={rut.placeholder}
                          error={errors.rut && touched.rut}
                          success={
                            values.rut.length > 0 && !errors.rut
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={fantasy_name.type}
                          label={fantasy_name.label}
                          name={fantasy_name.name}
                          value={values.fantasy_name}
                          placeholder={fantasy_name.placeholder}
                          error={errors.fantasy_name && touched.fantasy_name}
                          success={values.fantasy_name.length > 0 && !errors.fantasy_name}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={12}>
                        <FormField
                          type={url.type}
                          label={url.label}
                          name={url.name}
                          value={values.url}
                          placeholder={url.placeholder}
                          error={errors.url && touched.url}
                          success={
                            values.url.length > 0 &&
                            !errors.url
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormField
                          type={address.type}
                          label={address.label}
                          name={address.name}
                          value={values.address}
                          placeholder={address.placeholder}
                          error={errors.address && touched.address}
                          success={values.address.length > 0 && !errors.address}
                        />
                      </Grid> */}
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

export default NewCustomer
