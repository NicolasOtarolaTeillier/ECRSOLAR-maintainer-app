import { useState } from 'react'
import Modal from '@mui/material/Modal'

import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
import MDButton from '/components/MDButton'
import {  FormControl, MenuItem, Select, Grid, Icon } from '@mui/material'

// formik components
import { Formik, Form, Field } from 'formik'
import initialValues from './initialValues.js'
import form from './form.js'

import FormField from '/pagesComponents/pages/services/new-service/components/FormField'

// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'
import validations from './validations.js'

// mutation
import ADD_PHOTOVOLTAIC_POWER_STATION from '../../../../../../api/photovoltaic_power_station/mutations.js'
import { useMutation } from '@apollo/client'

//query refetching
import GET_ALL_PHOTOVOLTAIC_POWER_STATIONS from '../../../../../../api/photovoltaic_power_station/queries.js'
import GET_ALL_COMMUNES from '../../../../../../api/commune/queries.js'

// notifications
import MDSnackbar from '/components/MDSnackbar'


// apollo
import { useQuery } from '@apollo/client'



const style = {
  position: 'absolute',
  mt: '10%',
  width: 'flex',
  ml: '20%',
  mr: '20%'
}

function NewPhotovoltaicPowerStation({ formData }) {
  const { values: valuesFormData } = formData
  const { customer: customerV } = valuesFormData
  // apollo
  const { loading, error, data } = useQuery(GET_ALL_COMMUNES)
  const [addPhotovoltaicPowerStation] = useMutation(
    ADD_PHOTOVOLTAIC_POWER_STATION,
    {
      refetchQueries: [
        {
          query: GET_ALL_PHOTOVOLTAIC_POWER_STATIONS
        }
      ]
    }
  )
  // message:
  const [message, setMessage] = useState('')


  const CustomizedSelectForFormik = ({ children, form, field }) => {
    const { name, value } = field
    const { setFieldValue } = form

    return (
      <>
      <div>
        Seleccionar comuna
      </div>
      <Select
        name={name}
        value={value}
        onChange={e => {
          setFieldValue(name, e.target.value)
        }}
        >
        {children}
      </Select>
        </>
    )
  }

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
  const {
    name,
    strings,
    modules,
    module_size,
    hectares,
    investor_brand,
    module_brand,
    mw_ac,
    mw_dc,
    owner,
    manager_name,
    customer,
    commune,
    manager_number
  } = formField

  const submitForm = async (values, actions) => {
    const variables = {
      name: values['name'],
      strings: values['strings'],
      modules: values['modules'],
      moduleSize: values['module_size'],
      hectares: values['hectares'],
      investorBrand: values['investor_brand'],
      moduleBrand: values['module_brand'],
      mwAc: values['mw_ac'],
      mwDc: values['mw_dc'],
      commune: values['commune'],
      owner: values['owner'],
      managerName: values['manager_name'],
      customer: customerV,
      managerNumber: values['manager_number']
    }
    alert(JSON.stringify(variables, null, 2))
    try {
      const result = await addPhotovoltaicPowerStation({
        variables: variables
      })
      console.log('result', result)
      const { data } = result
      console.log('data', data)
      setMessage(data.addPhotovoltaicPowerStation.id)
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
      title='Exito al crear la Planta'
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
              <Icon>add</Icon>&nbsp; Nueva Planta
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Modal open={open} onClose={handleClose} sx={style}>
        <MDBox px={5} py={3} variant='gradient'>
          <MDTypography variant='body1' color='dark' fontWeight='bold'>
            Crea una nueva Planta
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
                          type={strings.type}
                          label={strings.label}
                          name={strings.name}
                          value={values.strings}
                          placeholder={strings.placeholder}
                          error={errors.strings && touched.strings}
                          success={values.strings.length > 0 && !errors.strings}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={modules.type}
                          label={modules.label}
                          name={modules.name}
                          value={values.modules}
                          placeholder={modules.placeholder}
                          error={errors.modules && touched.modules}
                          success={values.modules.length > 0 && !errors.modules}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={module_size.type}
                          label={module_size.label}
                          name={module_size.name}
                          value={values.module_size}
                          placeholder={module_size.placeholder}
                          error={errors.module_size && touched.module_size}
                          success={
                            values.module_size.length > 0 && !errors.module_size
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={hectares.type}
                          label={hectares.label}
                          name={hectares.name}
                          value={values.hectares}
                          placeholder={hectares.placeholder}
                          error={errors.hectares && touched.hectares}
                          success={
                            values.hectares.length > 0 && !errors.hectares
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={investor_brand.type}
                          label={investor_brand.label}
                          name={investor_brand.name}
                          value={values.investor_brand}
                          placeholder={investor_brand.placeholder}
                          error={
                            errors.investor_brand && touched.investor_brand
                          }
                          success={
                            values.investor_brand.length > 0 &&
                            !errors.investor_brand
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={module_brand.type}
                          label={module_brand.label}
                          name={module_brand.name}
                          value={values.module_brand}
                          placeholder={module_brand.placeholder}
                          error={errors.module_brand && touched.module_brand}
                          success={
                            values.module_brand.length > 0 &&
                            !errors.module_brand
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={mw_ac.type}
                          label={mw_ac.label}
                          name={mw_ac.name}
                          value={values.mw_ac}
                          placeholder={mw_ac.placeholder}
                          error={errors.mw_ac && touched.mw_ac}
                          success={values.mw_ac.length > 0 && !errors.mw_ac}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={mw_dc.type}
                          label={mw_dc.label}
                          name={mw_dc.name}
                          value={values.mw_dc}
                          placeholder={mw_dc.placeholder}
                          error={errors.mw_dc && touched.mw_dc}
                          success={values.mw_dc.length > 0 && !errors.mw_dc}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>

                      <FormControl fullWidth variant='outlined'>
                        <Field
                          name={commune.name}
                          component={CustomizedSelectForFormik}
                          label={commune.label}
                          value={commune}
                          error={errors.commune && touched.commune}
                          success={
                            !loading && commune.length > 0 && !errors.commune
                          }
                          >
                          {!loading && data
                            ? data.allCommunes.map(st => {
                              return <MenuItem value={st.name}>{st.name}</MenuItem>
                            })
                            : null}
                        </Field>
                      </FormControl>
                            </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={owner.type}
                          label={owner.label}
                          name={owner.name}
                          value={values.owner}
                          placeholder={owner.placeholder}
                          error={errors.owner && touched.owner}
                          success={values.owner.length > 0 && !errors.owner}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={manager_name.type}
                          label={manager_name.label}
                          name={manager_name.name}
                          value={values.manager_name}
                          placeholder={manager_name.placeholder}
                          error={errors.manager_name && touched.manager_name}
                          success={
                            values.manager_name.length > 0 &&
                            !errors.manager_name
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormField
                          type={manager_number.type}
                          label={manager_number.label}
                          name={manager_number.name}
                          value={values.manager_number}
                          placeholder={manager_number.placeholder}
                          error={
                            errors.manager_number && touched.manager_number
                          }
                          success={
                            values.manager_number.length > 0 &&
                            !errors.manager_number
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

export default NewPhotovoltaicPowerStation
