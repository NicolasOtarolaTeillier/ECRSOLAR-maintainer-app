// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
import MDInput from '/components/MDInput'
import MDButton from '/components/MDButton'

import { FormControl, Icon, InputLabel, MenuItem, Select } from '@mui/material'
import { Field } from 'formik'

//queries
import GET_ALL_STAFF from '../../../../../../api/staff/queries.js'
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'

function AddStaff ({ formData }) {
  const { loading, error, data } = useQuery(GET_ALL_STAFF)
  const [selectedStaff, setSelectedStaff] = useState([])
  const [selectedIDLeader, setSelectedIDLeader] = useState(null)
  useEffect(() => {}, [selectedStaff])

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const options = data.allStaffs
    .map(s => ({
      id: s.id,
      label:
        s.person.first_name +
        ' ' +
        s.person.last_name +
        ' (' +
        s.position.name +
        ')',
      person: s.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
  return (
    <MDBox>
      <MDTypography variant='h5' fontWeight='bold'>
        Asignar Equipamiento
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card sx={{ overflow: 'visible' }}>
              <MDBox p={3}>
                <MDBox mt={1}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <MDBox my={2} display='inline-block'>
                        <MDTypography
                          component='label'
                          variant='button'
                          fontWeight='regular'
                          color='text'
                        >
                          Dron
                        </MDTypography>
                      </MDBox>
                      <Autocomplete
                        options={options.filter(o => !selectedStaff.map(s => s.person).includes(o.person))}
                        onChange={(e, values) => {
                          setSelectedStaff(values)
                          console.log(values)
                        }}
                        multiple
                        //getOptionLabel={option => option.label}
                        renderInput={params => {
                          return <MDInput {...params} variant='outlined' />
                        }}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  )
}

// typechecking props for Profile
AddStaff.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default AddStaff
