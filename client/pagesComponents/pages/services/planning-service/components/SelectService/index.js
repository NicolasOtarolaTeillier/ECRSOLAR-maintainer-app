// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'

// NewService page components
import Calendar from './Calendar'


function SelectService ({formData}) {

  return (
    <MDBox>
      <MDBox lineHeight={0}>
      </MDBox>
      <MDBox >
          <Calendar formData={formData}/>
      </MDBox>
    </MDBox>
  )
}

// typechecking props for NewService
SelectService.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default SelectService
