import { useEffect, useMemo, useState } from 'react'

// @mui material components
import Grid from '@mui/material/Grid'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from '/examples/LayoutContainers/DashboardLayout'

import EventCalendar from '/examples/Calendar'

import { useMaterialUIController, setSelectService } from '/context'

// query
import GET_ALL_SERVICES from '../../../../../../../api/service/queries.js'
import { useQuery } from '@apollo/client'

function Calendar ({ formData }) {
  const { setActiveStep, activeStep } = formData
  const [controller, dispatch] = useMaterialUIController()
  const { service } = controller

  const { data, loading, error } = useQuery(GET_ALL_SERVICES)
  const [dataService, setDataService] = useState(null)

  useEffect(() => {
    setDataService(
      data?.allServices?.map(service => {
        const name = service.step == 0 ? 'error' : 'warning'
         
        const start = new Date(service.proposed_execution_date)
        const end = new Date(service.finish_execution_date)
        console.log(start,end)
        return {
          title:
            service.service_type.name +
            ' - ' +
            service.photovoltaic_power_station.name +
            ' - ' +
            service.customer.fantasy_name,
          end: !isNaN(end) ? end : null,
          start: !isNaN(start) ? start : null,
          id: service.id,
          className: service.step == 2 ? 'success' : name
        }
      })
    )
  }, [data])


  return (
    <MDBox pt={5}>
      <Grid container>
        <Grid item xs={12} xl={12} sx={{ height: 'max-content' }}>
          {useMemo(
            () => (
              <EventCalendar
                initialView='dayGridMonth'
                initialDate={new Date()}
                //initialDate={new Date(2023, 2, 4)}
                events={dataService}
                selectable
                editable
                 dateClick={a => {
                   console.log(a)
                 }}
                 eventClick={info => {
                   //                    console.log(info.event.start)
                   //                  console.log(info.event.end)
                   console.log(info.event.id)
                   const id = info.event.id
                   setSelectService(dispatch, id)
                   setActiveStep(activeStep+1)
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
