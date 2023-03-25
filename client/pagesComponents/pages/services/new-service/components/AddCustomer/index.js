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

// modal
import NewCustomer from './newCustomer.js'

//queries
import GET_ALL_CUSTOMER from '../../../../../../api/customer/queries.js'
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

function AddCustomer ({ formData }) {
  const { loading, error, data } = useQuery(GET_ALL_CUSTOMER)

  const { formField, values, errors, touched } = formData
  const { customer } = formField
  const { customer: customerV } = values

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
        Asignar Cliente
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <MDBox mt={1.5}>
              <FormControl fullWidth variant='standard'>
                <Field
                  name={customer.name}
                  component={CustomizedSelectForFormik}
                  label={customer.label}
                  value={customerV}
                  error={errors.customer && touched.customer}
                  success={!loading && customerV.length > 0 && !errors.customer}
                >
                  {!loading && data
                    ? data.allCustomers.map(st => {
                        return <MenuItem value={st.name} key={st.name}>{st.name}</MenuItem>
                      })
                    : null}
                </Field>
              </FormControl>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <NewCustomer/>
    </MDBox>
  )
}

// typechecking props for Profile
AddCustomer.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default AddCustomer
