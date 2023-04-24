import { useEffect, useMemo, useState } from 'react'

// @mui material components
import Grid from '@mui/material/Grid'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from '/examples/LayoutContainers/DashboardLayout'

import EventCalendar from '/examples/Calendar'

// context
import { useMaterialUIController, setSelectService } from '/context'

// query
import GET_ALL_SERVICES from '../../../../../../../api/service/queries.js'
import { useQuery } from '@apollo/client'

function Calendar ({ formData }) {
  const { setActiveStep, activeStep } = formData
  const [controller, dispatch] = useMaterialUIController()
  const { service } = controller

  const { data, loading, error } = useQuery(GET_ALL_SERVICES)
  const [dataService, setDataService] = useState([])

  useEffect(() => {
    setDataService(
      data?.allServices?.map(service => {
        let name
        switch (service.step) {
          case 0:
            name = 'error'
            break
          case 1:
            name = 'error'
            break
          case 2:
            name = 'warning'
            break
          case 3:
            name = 'info'
            break
          case 4:
            name = 'success'
            break
          default:
            name = 'error'
        }
        return {
          title:
            service.service_type.name +
            ' - ' +
            service.photovoltaic_power_station.name.replace(
              /(PFV|PMGD|PMG)/g,
              ''
            ) +
            ' - ' +
            service.customer.fantasy_name,
          end: diaSiguiente(service.finish_execution_date, 2),
          start: service.proposed_execution_date,
          id: service.id,
          className: name
        }
      })
    )
  }, [data])

  return (
    <MDBox pt={2}>
      <Grid container>
        <Grid item xs={12} xl={12} sx={{ height: 'max-content' }}>
          {useMemo(
            () => (
              <EventCalendar
                initialView='dayGridMonth'
                initialDate={new Date()}
                events={dataService}
                selectable
                editable
                eventClick={info => {
                  const value_className = dataService.filter(
                    ds => ds.id === info.event.id
                  )[0].className
                  if (value_className != 'error') {
                    return
                  }
                  console.log(info.event.id)
                  const id = info.event.id
                  setSelectService(dispatch, id)
                  setActiveStep(activeStep + 1)
                }}
              />
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [dataService]
          )}
        </Grid>
      </Grid>
    </MDBox>
  )
}

export default Calendar
// "primary",
// "secondary",
// "info",
// "success",
// "warning",
// "error",
// "dark",
function diaSiguiente (fecha, dias) {
  const fechaObj = new Date(fecha)
  console.log(fechaObj)
  fechaObj.setDate(fechaObj.getDate() + dias)
  const year = fechaObj.getFullYear()
  const month = String(fechaObj.getMonth() + 1).padStart(2, '0')
  const day = String(fechaObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
