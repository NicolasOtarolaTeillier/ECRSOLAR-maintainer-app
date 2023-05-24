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
import { Button } from '@mui/material'
import axios from 'axios'



function ServiceSummary () {
  const [dataUser, setDataUser] = useState({
    email: '',
    username: ''
  })

  const getProfile = async () =>{
    const response = await axios.get('/api/profile');
    setDataUser({ email: response.data.email, username: response.data.username})
  }
 
  return (
    <DashboardLayout>
      <Button onClick={getProfile} > asdasdasd</Button>
      <pre>
        
        {JSON.stringify(dataUser,null,2)}
        </pre>
     
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



export default ServiceSummary
