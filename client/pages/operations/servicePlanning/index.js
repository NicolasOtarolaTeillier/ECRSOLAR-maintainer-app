import { useEffect, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

// @mui material components
import Grid from '@mui/material/Grid'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from '/examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '/examples/Navbars/DashboardNavbar'
import EventCalendar from '/examples/Calendar'

// query
import GET_ALL_SERVICES from '../../../api/service/queries.js'
import { useQuery } from '@apollo/client'

function Calendar () {
  const { data, loading, error } = useQuery(GET_ALL_SERVICES)
  const [dataService,setDataService] = useState(null)

  useEffect(()=>{
    setDataService(data?.allServices?.map((service)=>{
      console.log('service.step',service.step)
      const name = service.step == 0 ? 'error' : 'warning'
        return {
            title: service.service_type.name + ' - ' + service.photovoltaic_power_station.name + ' - ' + service.customer.fantasy_name,
            end: service.finish_execution_date,
            start: service.proposed_execution_date,
            className: service.step == 2 ? 'success' : name
        }
    }))
  },[data])



  const data_Day = () => {
    const today = new Date(Date.now())
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    if (month < 10) {
      return `${year}-0${month}-${day}`
    } else {
      return `${year}-${month}-${day}`
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={5}>
        <Grid container>
          <Grid item xs={12} xl={12} sx={{ height: 'max-content' }}>

            {useMemo(
              () => ( 
                <EventCalendar
                  initialView='dayGridMonth'
                  initialDate={data_Day()}
                  events={dataService}
                  selectable
                  editable
                  dateClick={a => {
                    console.log(a)
                  }}
                  eventClick={info => {
                    console.log(info.event.start)
                    console.log(info.event.end)

                    console.log(info.event.title)
                  }}
                />
              ),
               // eslint-disable-next-line react-hooks/exhaustive-deps
               [dataService]
             )}
            
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
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