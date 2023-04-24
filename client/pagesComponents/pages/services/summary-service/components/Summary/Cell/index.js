import { Box, TableCell, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import MDInput from '/components/MDInput'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Autocomplete from '@mui/material/Autocomplete'
import MDBox from '/components/MDBox'
import MDTypography from '/components/MDTypography'
const color = nameService => {
  if (nameService === 'PARAGUAY') {
    return 'red'
  }
  if (nameService === 'ROVIAN') {
    return '#FCC27F'
  }
  if (nameService === 'DOÑIHUE') {
    return '#F0C42F'
  }
  if (nameService === 'LOS LIBERTADORES') {
    return '#10E952'
  }
  if (nameService === 'CHIMBARONGO') {
    return '#A54B01'
  }
  if (nameService === 'TILTIL UNO') {
    return '#F0C42F'
  }
  if (nameService === 'LA FRONTERA') {
    return '#336310'
  }
  if (nameService === 'VERANO') {
    return '#D0D0D0'
  }
  if (nameService === 'PORTEZUELO') {
    return '#FA08C4'
  }
  if (nameService === 'GR SANTA ROSA') {
    return '#d6b4a1'
  }

  return 'white'
}
import { useMutation } from '@apollo/client'

import { FIND_SERVICES } from '../../../../../../../api/service/queries.js'
import ADD_SERVICE_X_STAFF from '../../../../../../../api/service_x_staff/mutations.js'
import { DELETE_SERVICE_X_STAFF } from '../../../../../../../api/service_x_staff/mutations.js'
import GET_ALL_STAFF from '../../../../../../../api/staff/queries.js'
import { CHANGE_SERVICES_X_XSTAFF } from '../../../../../../../api/transactions/mutations.js'
import { CHANGE_LEADER_OF_SERVICE } from '../../../../../../../api/transactions/mutations.js'
import ADD_OR_UPDATE_MILESTONE from '../../../../../../../api/milestone/mutations.js'

function UserCellComponent ({
  dateIndex,
  nameService,
  date,
  staff,
  servicesDays,
  servicesNames,
  formatDateWithDay,
  leader,
  serviceId,
  milestone,
  formatDate
}) {
  // variables
  const [open, setOpen] = useState(false)
  const [selectOption, setSelectOption] = useState('')
  const [milestoneNew, setMilestoneNew] = useState('')
  const queries = [
    {
      query: GET_ALL_STAFF
    },
    {
      query: FIND_SERVICES
    }
  ]
  const [addServiceXStaff] = useMutation(ADD_SERVICE_X_STAFF, {
    refetchQueries: queries
  })
  const [deleteServiceXStaff] = useMutation(DELETE_SERVICE_X_STAFF, {
    refetchQueries: queries
  })
  const [changeServiceXStaff] = useMutation(CHANGE_SERVICES_X_XSTAFF, {
    refetchQueries: queries
  })
  const [addMilestone] = useMutation(ADD_OR_UPDATE_MILESTONE, {
    refetchQueries: queries
  })

  // handlers
  const handleClose = () => {
    setOpen(false)
  }
  const handleClick = () => {
    setOpen(true)
  }
  const handleDelete = async () => {
    try {
      const result = await deleteServiceXStaff({
        variables: {
          staff: staff?.id,
          service: serviceId
        }
      })
      setOpen(false)
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }
  const handleUpdate = async () => {
    if (!serviceId) {
      //alert('primer caso (no tiene asignado servicio este dia)')
      try {
        const result = await addServiceXStaff({
          variables: {
            staff: staff?.id,
            service: servicesNames?.filter(
              ({ name }) => name === selectOption
            )[0].id,
            leader: leader,
            status: true
          }
        })
        console.log('result: ', result)
        setOpen(false)
      } catch (e) {
        console.log(e)
      }
    } else {
      // alert('falta hacer el segundo caso, tiene asignado servicio este dia')
      // to-do: agregar elemento al serviceXStaff
      try {
        const result = await changeServiceXStaff({
          variables: {
            serviceOld: serviceId,
            serviceNew: servicesNames?.filter(
              ({ name }) => name === selectOption
            )[0].id,
            staff: staff?.id
          }
        })
        console.log('result: ', result)
        setOpen(false)
      } catch (e) {
        alert(e)
        console.log(e)
      }
    }
  }
  const handleChangeLeader = async () => {
    // to-do: hay que terminar
    alert('el flujo hacerlo después')
  }
  const handleChangeMilestone = async () => {
//    alert('falta cambiar el hito solamente')
    try {
      const result = await addMilestone({
        variables: {
          staff: staff?.id,
          name:  milestoneNew,
          date: formatDate(date)
        }
      })
      setOpen(false)
    } catch (e) {
      console.log(e)
    }
  }

  // constants
  const options = servicesNames
    ?.filter(({ finish_execution_date, proposed_execution_date, name }) => {
      const finish = new Date(finish_execution_date)
      const start = new Date(proposed_execution_date)
      start.setUTCHours(23, 59, 59, 999)
      finish.setUTCHours(23, 59, 59, 999)
      date.setUTCHours(23, 59, 59, 999)
      const valor = date <= finish && date >= start && name != nameService
      return valor
    })
    .map(({ name }) => name)

  const name_milestone = milestone?.length > 0 ? milestone[0].name : 'Ninguno'

  const texts = [
    `Servicio actual: ${nameService ? nameService : 'Ninguno'}`,
    serviceId,
    `Fecha: ${formatDateWithDay(date)}`,
    `Lider de servicio: ${leader ? 'Si' : 'No'}`,
    `Hito actual: ${name_milestone}`
  ]

  const colorBackground =
    name_milestone === 'Ninguno' ? color(nameService) : 'grey'
  return (
    <>
      <TableCell
        key={dateIndex}
        align='center'
        onClick={handleClick}
        style={{
          fontWeight: 'bold', // Aplica el estilo de negrita
          fontSize: '10px', // Ajusta el tamaño de la fuente
          backgroundColor: open ? 'black' : colorBackground,
          border: '1px solid black', // Añadir borde negro a la TableCell
          width: '11.5%',
          height: '6px', // Establece la altura deseada aquí
          lineHeight: '6px' // Asegúrate de que el lineHeight sea igual a la altura
        }}
      >
        {name_milestone === 'Ninguno' ? nameService : name_milestone}
      </TableCell>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {staff.position.name +
            ': ' +
            staff.person.first_name +
            ' ' +
            staff.person.last_name}{' '}
        </DialogTitle>
        <DialogContent>
          <MDBox
            display='flex'
            flexDirection='column'
            alignItems='center'
            ml={10}
            mr={10}
          >
            {texts.map(text => {
              return (
                <DialogContentText style={{ textAlign: 'center' }}>
                  {text}
                </DialogContentText>
              )
            })}
          </MDBox>
          <MDBox my={3} mx={1} display='auto'>
            <Autocomplete
              defaultValue={() => {
                setSelectOption(options[0])
                return options[0]
              }}
              disabled={leader}
              options={options}
              onChange={(e, values) => {
                console.log(values)
                setSelectOption(values)
              }}
              renderInput={params => {
                return (
                  <Box>
                    <MDTypography variant='h6'>
                      Lista de servicios disponibles:
                    </MDTypography>
                    <MDInput {...params} variant='outlined' />
                  </Box>
                )
              }}
            />
          </MDBox>
          <MDBox my={1} mx={1} display='auto'>
            <Autocomplete
              options={['Ausente', 'Licencia ST', 'Permiso']}
              onChange={(e, values) => {
                console.log(values)
                setMilestoneNew(values)
              }}
              renderInput={params => {
                return (
                  <Box>
                    <MDTypography variant='h6'>Lista de Hitos</MDTypography>
                    <MDInput {...params} variant='outlined' />
                  </Box>
                )
              }}
            />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={leader || !serviceId ? true : false}
            onClick={handleDelete}
          >
            Sacar del Servicio
          </Button>
          <Button disabled={!leader} onClick={handleChangeLeader}>
            Cambiar lider
          </Button>
          <Button disabled={!milestoneNew} onClick={handleChangeMilestone}>
            Actualizar Hito
          </Button>
          <Button
            disabled={
              selectOption != null && selectOption != '' && !leader
                ? false
                : true
            }
            onClick={handleUpdate}
          >
            Actualizar servicio
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserCellComponent
