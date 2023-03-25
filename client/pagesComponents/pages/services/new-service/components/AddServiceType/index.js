// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Grid from '@mui/material/Grid'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
import MDButton from '/components/MDButton'

import { FormControl, Icon, InputLabel, MenuItem, Select } from '@mui/material'
import { Field } from 'formik'

//queries
import GET_ALL_SERVICES_TYPE from '../../../../../../api/service_type/queries.js'
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

function AddServiceType ({ formData }) {
  const { loading, error, data } = useQuery(GET_ALL_SERVICES_TYPE)

  const { formField, values, errors, touched } = formData
  const { service_type } = formField
  const { service_type: service_typeV } = values

  const CustomizedSelectForFormik = ({ children, form, field }) => {
    const { name, value } = field
    const { setFieldValue } = form

    return (
      <Select
        name={name}
        value={value}
        onChange={e => {
          setFieldValue(name, e.target.value)
        }}
      >
        {children}
      </Select>
    )
  }

  useEffect(() => {
    if (!loading) {
      console.log(data)
    }
  }, [data])

  return (
    <MDBox>
      <MDTypography variant='h5' fontWeight='bold'>
        Asignar Tipo de Servicio
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <MDBox mt={1.5}>
              <FormControl fullWidth variant='standard'>
                <Field
                  name={service_type.name}
                  component={CustomizedSelectForFormik}
                  label={service_type.label}
                  value={service_typeV}
                  error={errors.service_type && touched.service_type}
                  success={
                    !loading && service_typeV.length > 0 && !errors.service_type
                  }
                >
                  {!loading && data
                    ? data.allServiceTypes.map(st => {
                        return <MenuItem value={st.name}>{st.name}</MenuItem>
                      })
                    : null}
                </Field>
              </FormControl>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox mt={5}>
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid sx={{ textAlign: 'right' }}>
            <MDButton variant='gradient' color='success'>
              <Icon>add</Icon>&nbsp; Nuevo Tipo de Servicio
            </MDButton>
          </Grid>
        </Grid>
      </MDBox> */}
    </MDBox>
  )
}

// typechecking props for Profile
AddServiceType.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default AddServiceType
