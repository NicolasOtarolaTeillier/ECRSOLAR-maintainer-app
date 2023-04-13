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

// context
import { useMaterialUIController, setSelectEquipments } from '/context'


//queries
import GET_ALL_EQUIPMENT from '../../../../../../api/equipment/queries.js'
import GET_ALL_EQUIPMENT_CATEGORY from '../../../../../../api/equipment_caregory/queries.js'

import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'

function AddEquipment ({ formData }) {
  const { loading, error, data } = useQuery(GET_ALL_EQUIPMENT_CATEGORY)
  const [controller, dispatch] = useMaterialUIController()
  const { equipments } = controller
  const {
    loading: loadingEquipment,
    error: errorEquipment,
    data: dataEquipment
  } = useQuery(GET_ALL_EQUIPMENT)
  const [selectedEquipment_, setselectedEquipment_] = useState([])
  const [selected, setSelected] = useState([])
  useEffect(() => {
    if (selectedEquipment_.length > 0) {
      const labels_id = selectedEquipment_
        .map(item => {
          const key = Object.keys(item)[0]
          return item[key][0].map(i => i.id)
        })
        .reduce((accumulator, current) => {
          return accumulator.concat(current)
        }, [])

      setSelected(labels_id.sort((a,b)=>a-b))
      setSelectEquipments(dispatch,labels_id)

    }
  }, [selectedEquipment_])


  if (loading || loadingEquipment) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  if (errorEquipment) {
    return <p>Error: {errorEquipment.message}</p>
  }

  const optionsEquipments = dataEquipment.allEquipments.map(e => ({
    id: e.id,
    label: '#' + e.number + ' - ' + e.equipment_category.name,
    equipment_category: e.equipment_category.name
  })).sort((a,b)=>a.id-b.id)

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
                    {data?.allEquipmentCategories?.map(ec => {
                      return (
                        <Grid item xs={6}>
                          <MDBox my={2} display='inline-block'>
                            <MDTypography
                              component='label'
                              variant='button'
                              fontWeight='regular'
                              color='text'
                            >
                              {ec.name}
                            </MDTypography>
                          </MDBox>
                          <Autocomplete
                            options={optionsEquipments.filter(
                              e => e.equipment_category === ec.name && !selected.some(selec => selec === e.id)
                            )}
                            onChange={(e, values) => {
                              setselectedEquipment_([
                                ...selectedEquipment_.filter(se => !se[ec.name]),
                                { [ec.name]: [values] }
                              ])
                              console.log('values', values)
                              console.log([
                                ...selectedEquipment_.filter(se => !se[ec.name])
                              ])
                              //console.log([{[ec.name]: [values]}])
                            }}
                            multiple
                            //getOptionLabel={option => option.label}
                            renderInput={params => {
                              return <MDInput {...params} variant='outlined' />
                            }}
                          />
                        </Grid>
                      )
                    })}
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
AddEquipment.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default AddEquipment
