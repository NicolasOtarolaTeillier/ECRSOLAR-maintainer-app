// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Grid from '@mui/material/Grid'
import { Autocomplete, InputAdornment } from '@mui/material'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
import MDInput from "/components/MDInput";


// NewService page components
import FormField from '/pagesComponents/pages/services/new-service/components/FormField'

function NewService ({ formData }) {
  const { formField, values, errors, touched } = formData
  const { purchase_order, contract, price, proposed_execution_date, finish_execution_date  } = formField
  const {
    purchase_order: purchase_orderV,
    contract: contractV,
    price: priceV,
    proposed_execution_date: proposed_execution_dateV,
    finish_execution_date: finish_execution_dateV
  } = values


  return (
    <MDBox>
      <MDBox lineHeight={0}>
      <MDTypography variant='h5' fontWeight='bold'>
        Información básica
      </MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormField
              inputProps={{ onWheel: e => e.target.blur() }}
              type={purchase_order.type}
              label={purchase_order.label}
              name={purchase_order.name}
              value={purchase_orderV}
              placeholder={purchase_order.placeholder}
              error={errors.purchase_order && touched.purchase_order}
              success={purchase_orderV.length > 0 && !errors.purchase_order}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              type={price.type}
              label={price.label}
              name={price.name}
              value={priceV}
              placeholder={price.placeholder}
              error={errors.price && touched.price}
              success={priceV.length > 0 && !errors.price}
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              type={contract.type}
              label={contract.label}
              name={contract.name}
              value={contractV}
              placeholder={contract.placeholder}
              error={errors.contract && touched.contract}
              success={contractV.length > 0 && !errors.contract}

            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              type={proposed_execution_date.type}
              label={proposed_execution_date.label}
              name={proposed_execution_date.name}
              value={proposed_execution_dateV}
              placeholder={proposed_execution_date.placeholder}
              error={
                errors.proposed_execution_date &&
                touched.proposed_execution_date
              }
              success={
                proposed_execution_dateV.length > 0 &&
                !errors.proposed_execution_date
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={finish_execution_date.type}
              label={finish_execution_date.label}
              name={finish_execution_date.name}
              value={finish_execution_dateV}
              placeholder={finish_execution_date.placeholder}
              error={
                errors.finish_execution_date &&
                touched.finish_execution_date
              }
              success={
                finish_execution_dateV.length > 0 &&
                !errors.finish_execution_date
              }
            />
          </Grid>
          
        </Grid>
      </MDBox>
    </MDBox>
  )
}

// typechecking props for NewService
NewService.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default NewService
