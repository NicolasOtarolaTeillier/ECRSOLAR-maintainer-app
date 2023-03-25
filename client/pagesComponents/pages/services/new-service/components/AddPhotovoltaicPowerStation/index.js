// prop-type is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Grid from '@mui/material/Grid'
import Icon from '@mui/material/Icon'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
import MDButton from '/components/MDButton'

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Field } from 'formik'

import NewPhotovoltaicPowerStation from './newPhotovoltaicPowerStation.js'

//queries
import GET_ALL_PHOTOVOLTAIC_POWER_STATIONS from '../../../../../../api/photovoltaic_power_station/queries.js'
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

function AddPhotovoltaicPowerStation ({ formData }) {
  const { loading, error, data } = useQuery(GET_ALL_PHOTOVOLTAIC_POWER_STATIONS)

  const { formField, values, errors, touched } = formData
  const { photovoltaic_power_station } = formField
  const { photovoltaic_power_station: photovoltaic_power_stationV } = values
  const { customer: getCustomer} = values

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
    <>
      <MDBox>
        <MDTypography variant='h5' fontWeight='bold'>
          Asignar Planta
        </MDTypography>
        <MDBox mt={1.625}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDBox mt={1.5}>
                <FormControl fullWidth variant='standard'>
                  <Field
                    name={photovoltaic_power_station.name}
                    component={CustomizedSelectForFormik}
                    label={photovoltaic_power_station.label}
                    value={photovoltaic_power_stationV}
                    error={
                      errors.photovoltaic_power_station &&
                      touched.photovoltaic_power_station
                    }
                    success={
                      !loading &&
                      photovoltaic_power_stationV.length > 0 &&
                      !errors.photovoltaic_power_station
                    }
                  >
                    {!loading && data
                      ? data.allPhotovoltaicPowerStations.map(pv => {
                          if (pv.customer.name === getCustomer){
                            //console.log('getCustomer',getCustomer)
                            //console.log('pv.customer',pv.customer.name)
                            return <MenuItem value={pv.name}>{pv.name}</MenuItem>
                          }
                          else{
                            null
                          }
                            

                        })
                      : null}
                  </Field>
                </FormControl>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

        <NewPhotovoltaicPowerStation formData={formData}/>
    </>
  )
}

// typechecking props for Profile
AddPhotovoltaicPowerStation.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default AddPhotovoltaicPowerStation
