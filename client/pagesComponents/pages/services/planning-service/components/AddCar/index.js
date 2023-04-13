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
import GET_ALL_CAR from '../../../../../../api/car/queries.js'

// context
import { useMaterialUIController, setSelectCars } from '/context'

import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'

function AddCar ({ formData }) {
  const { loading, error, data } = useQuery(GET_ALL_CAR)
  const [controller, dispatch] = useMaterialUIController()
  const { cars } = controller
  const [selectCar, setSelectCar] = useState([])

  useEffect(() => {
    const patents = selectCar
    .map(item => item.id)
    .reduce((accumulator, current) => {
      return accumulator.concat(current)
    }, [])

    console.log(patents)
    setSelectCars(dispatch, patents)
  }, [selectCar])

  if (loading ) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const optionsCars = data.allCars.map(c => ({
    id: c.license_plate,
    label: c.license_plate+' - '+c.make+' - '+c.model+' - '+c.color,
    make: c.make,
    model: c.model,
    color: c.color
  })).sort((a, b) => a.id.localeCompare(b.id))

  return (
    <MDBox>
      <MDTypography variant='h5' fontWeight='bold'>
        Asignar Vehículo
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card sx={{ overflow: 'visible' }}>
              <MDBox p={3}>
                <MDBox mt={1}>
                  <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <MDBox my={2} display='inline-block'>
                            <MDTypography
                              component='label'
                              variant='button'
                              fontWeight='regular'
                              color='text'
                            >
                              {"Vehículo"}
                            </MDTypography>
                          </MDBox>
                          <Autocomplete
                            options={optionsCars.filter(c => !selectCar.map(sc => sc.id).includes(c.id))}
                            onChange={(e, values) => {
                                setSelectCar(values)
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
AddCar.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default AddCar
