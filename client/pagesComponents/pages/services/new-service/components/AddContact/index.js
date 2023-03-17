// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Grid from '@mui/material/Grid'
import { FormControl, Icon, InputLabel, MenuItem, Select } from '@mui/material'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
import MDButton from '/components/MDButton'

// formik
import { Field } from 'formik'

// modal
import NewContact from './newContact.js'

//queries
import GET_ALL_CONTACTS from '../../../../../../api/contact/queries.js'
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

function AddContact ({ formData }) {
  const { loading, error, data } = useQuery(GET_ALL_CONTACTS)

  const { formField, values, errors, touched } = formData
  const { contact } = formField
  const { contact: contactV } = values

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
        Asignar Contacto
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <MDBox mt={1.5}>
              <FormControl fullWidth variant='standard'>
                <Field
                  name={contact.name}
                  component={CustomizedSelectForFormik}
                  label={contact.label}
                  value={contactV}
                  error={errors.contact && touched.contact}
                  success={!loading && contactV.length > 0 && !errors.contact}
                >
                  {!loading && data
                    ? data.allContacts.map(st => {
                        return (
                          <MenuItem value={st.id}>
                            {st.person.first_name + ' ' + st.person.last_name}
                          </MenuItem>
                        )
                      })
                    : null}
                </Field>
              </FormControl>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    <NewContact/>
    </MDBox>
  )
}

// typechecking props for Profile
AddContact.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default AddContact
