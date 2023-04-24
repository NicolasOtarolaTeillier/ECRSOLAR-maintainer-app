import { useState } from 'react'

// formik components
import { Formik, Form } from 'formik'

// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from '/examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '/examples/Navbars/DashboardNavbar'
import Footer from '/examples/Footer'

// Planning Service page components
import Summary from '../../../pagesComponents/pages/services/summary-service/components/Summary'



function Service() {
  return (
    <DashboardLayout>
     
      <MDBox py={0} mb={0} height='100vh'>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ height: '100%', mt: 0 }}
        >
          <Grid item xs={12} lg={11}>
                <Card sx={{ height: '100%' }}>
                  <MDBox>
                    <Summary></Summary>
                  </MDBox>
                </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  )
}



export default Service
