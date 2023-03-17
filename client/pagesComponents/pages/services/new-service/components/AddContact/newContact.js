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
import ADD_CONTACT from '../../../../../../api/contact/mutations.js'
import { useMutation } from '@apollo/client'

const style = {
  position: 'absolute',
  mt: '15%',
  width: 'flex',
  ml: '20%',
  mr: '20%'
}

function NewContact () {
    // apollo
    const [addContact] = useMutation(ADD_CONTACT)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { formId, formField } = form
  const { email, customer, person, phone_number,address,functional_area } = formField

  const submitForm = async (values, actions) => {
    alert(JSON.stringify(values, null, 2))
    try {
      const result = await addContact({
        variables: {
            customer: values['customer'],
            person: values['person'],
            email: values['email'],
            phoneNumber: values['phone_number'],
            address: values['address'],
            functionalArea: values['functional_area'],
        }
      })
      console.log("result",result)
      const { data } = result
      console.log('data', data)
    } catch (err) {
      console.log(err)
    }
    actions.setSubmitting(false)
  }

  return (
    <MDBox>
      <MDBox mt={5}>
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid sx={{ textAlign: 'right' }}>
            <MDButton variant='gradient' color='success' onClick={handleOpen}>
              <Icon>add</Icon>&nbsp; Nuevo Contacto
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Modal open={open} onClose={handleClose} sx={style}>
        <MDBox px={5} py={3}  variant='gradient'>
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
                      type={customer.type}
                      label={customer.label}
                      name={customer.name}
                      value={values.customer}
                      placeholder={customer.placeholder}
                      error={errors.customer && touched.customer}
                      success={values.customer.length > 0 && !errors.customer}
                    />
       
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormField
                      type={person.type}
                      label={person.label}
                      name={person.name}
                      value={values.person}
                      placeholder={person.placeholder}
                      error={errors.person && touched.person}
                      success={values.person.length > 0 && !errors.person}
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
                      success={values.phone_number.length > 0 && !errors.phone_number}
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
                      error={errors.functional_area && touched.functional_area}
                      success={values.functional_area.length > 0 && !errors.functional_area}
                    />
                  </Grid>
                    </Grid>
                  <Grid container style={{ justifyContent: 'right' }}>
                    <MDTypography mt={2}>
                      <MDButton
                        type='submit'
                        variant='gradient'
                        color='dark'
                      >
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
