// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'

// formik components
import { ErrorMessage, Field } from 'formik'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
import MDInput from '/components/MDInput'
import { InputAdornment } from '@mui/material'

function FormField ({ label, name, type, ...rest }) {
  return (
    <MDBox mb={1.5}>
      <Field
        {...rest}
        type={type}
        InputProps={
          name === 'price'
            ? {
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                )
              }
            : null
        }
        name={name}
        as={MDInput}
        variant='outlined'
        label={label}
        fullWidth
      />
      <MDBox mt={0.75}>
        <MDTypography
          component='div'
          variant='caption'
          color='error'
          fontWeight='regular'
        >
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  )
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default FormField
