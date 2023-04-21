import MDBox from '/components/MDBox'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'

//queries
import GET_ALL_STAFF from '../../../../../../api/staff/queries.js'
import { useQuery } from '@apollo/client'
import CellUserComponent from './Cell'

function MyTable () {
  const { loading, error, data } = useQuery(GET_ALL_STAFF)
  console.log(data)
  const currentDate = new Date()
  const startOfCurrentWeek = getStartOfWeek(currentDate)
  const initialOffset =
    Math.floor((currentDate - startOfCurrentWeek) / (7 * 24 * 60 * 60 * 1000)) *
    7

  //console.log('currentDate', currentDate)
  // Calcula la fecha de inicio del año
  const startOfYear = getStartOfYear()
  // Calcula el desplazamiento inicial en función de la diferencia entre la fecha actual y la fecha de inicio del año
  const [offset, setOffset] = useState(initialOffset)

  const handlePrevious = () => {
    const newOffset = offset - 7
    setOffset(newOffset)
  }

  const handleNext = () => {
    setOffset(offset + 7)
  }

  const daysOfWeek = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ]
  const startDate = new Date(
    startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + offset)
  )
  console.log('startDate', startDate)

  const arrayOfDays = daysOfWeek.map(
    (_, i) => new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
  )

  const formatDateWithDay = date => {
    if (date.getDay() === 0) {
      return `${daysOfWeek[6]} ${date.getDate()}/${date.getMonth() + 1}`
    }
    return `${daysOfWeek[date.getDay() - 1]} ${date.getDate()}/${
      date.getMonth() + 1
    }`
  }

  return (
    <>
      {loading ? (
        <div>Cargando ...</div>
      ) : (
        <>
          <MDBox style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handlePrevious}>Retroceder</Button>
            <Button onClick={handleNext}>Avanzar</Button>
          </MDBox>

          <TableContainer
            component={Paper}
            style={{ maxWidth: '100%', margin: 'auto' }}
          >
            <Table style={{ display: 'flex', justifyContent: 'center' }}>
              <TableHead>
                <TableRow>
                  <TableCell align='center' style={{ width: '20%' }}>
                    PERSONAL
                  </TableCell>
                  {arrayOfDays.map((date, index) => {
                    return (
                      <TableCell key={index} align='center'>
                        {formatDateWithDay(date)}
                      </TableCell>
                    )
                  })}
                </TableRow>
                <TableBody>
                  {data?.allStaffs // traer todos los miembros del equipo ecrsolar
                    .filter(
                      // filtramos para que no aparesca el equipo que no queremos
                      u =>
                        u.position.name != 'Operaria Administrativa' &&
                        u.position.name != 'Trabajadora Especialista'
                    )
                    .sort((a, b) => {
                      // Ordenar por los servicios en el primer, segundo, tercer y cuarto día de la semana
                      const serviceA1 = getServiceForDate(a, arrayOfDays[0])
                      const serviceB1 = getServiceForDate(b, arrayOfDays[0])
                      const serviceA4 = getServiceForDate(a, arrayOfDays[3])
                      const serviceB4 = getServiceForDate(b, arrayOfDays[3])
                      const serviceA6 = getServiceForDate(a, arrayOfDays[5])
                      const serviceB6 = getServiceForDate(b, arrayOfDays[5])

                      // Comprobar el primer día
                      if (serviceA1 != serviceB1) {
                        return serviceB1.localeCompare(serviceA1)
                      }
                      // Comprobar el cuarto día
                      if (serviceA4 != serviceB4) {
                        return serviceB4.localeCompare(serviceA4)
                      }
                      // sexto dia

                      return serviceB6.localeCompare(serviceA6)
                    })
                    .map((staff, userIndex) => {
                      let isLeader = false
                      const idStaff = staff?.id
                      // dia 1 de la semana
                      // utlimo dia de la semana
                      if (staff?.id === 27) {
                        console.log(staff)
                      }
                      const servicesDays = staff.services
                        .filter(servicio => {
                          const fecha_inicio_semana = arrayOfDays[0]
                          const fecha_fin_semana = arrayOfDays[6]
                          // Convertimos las fechas a objetos Date para poder compararlas
                          const fecha_inicio_servicio = new Date(
                            servicio.proposed_execution_date
                          )
                          const fecha_fin_servicio = new Date(
                            servicio.finish_execution_date
                          )
                          const fecha_inicio_semana_obj = new Date(
                            fecha_inicio_semana
                          )
                          const fecha_fin_semana_obj = new Date(
                            fecha_fin_semana
                          )
                          if (servicio.leader?.id === idStaff ? true : false) {
                            console.log(
                              servicio.photovoltaic_power_station.name
                            )
                            console.log(servicio.leader?.id)
                            console.log(fecha_inicio_semana)
                            console.log(fecha_fin_semana)
                            console.log(fecha_inicio_servicio)
                            console.log(fecha_fin_servicio)
                          }
                          return (
                            (fecha_inicio_servicio <= fecha_inicio_semana_obj && //1
                              fecha_fin_servicio >= fecha_fin_semana_obj) ||
                            (fecha_inicio_servicio >= fecha_inicio_semana_obj && //2
                              fecha_inicio_servicio <= fecha_fin_semana &&
                              fecha_fin_servicio >= fecha_fin_semana_obj) ||
                            (fecha_inicio_servicio <= fecha_inicio_semana_obj && //3
                              fecha_fin_servicio >= fecha_inicio_semana &&
                              fecha_fin_servicio < fecha_fin_semana_obj) ||
                            (fecha_inicio_servicio >= fecha_inicio_semana_obj && //4
                              fecha_fin_servicio <= fecha_fin_semana_obj)
                          )
                        })
                        .map(
                          ({
                            id,
                            leader,
                            photovoltaic_power_station,
                            finish_execution_date,
                            proposed_execution_date
                          }) => {
                            console.log(leader?.id)
                            if (leader?.id === idStaff) {
                              isLeader = true
                            }
                            return {
                              service: photovoltaic_power_station?.name,
                              days: generateDateArray(
                                proposed_execution_date,
                                finish_execution_date
                              )
                            }
                          }
                        )
                      const font = isLeader ? '12px' : '10px'
                      const c = isLeader ? '#C3EBEA' : 'white'

                      return (
                        <TableRow key={staff.id}>
                          <TableCell
                            style={{
                              fontSize: font, // Ajusta el tamaño de la fuente
                              border: '1px solid black', // Añadir borde negro a la TableCell
                              fontWeight: 'bold', // Aplica el estilo de negrita
                              height: '6px', // Establece la altura deseada aquí
                              lineHeight: '6px', // Asegúrate de que el lineHeight sea igual a la altura
                              backgroundColor: c,
                              textAlign: 'center' // Centra el contenido horizontalmente
                            }}
                          >
                            {isLeader ? '*' : ''} {staff.person.first_name}{' '}
                            {staff.person.last_name}
                            {' ('} {staff.position.name} {')'}
                          </TableCell>
                          {arrayOfDays?.map((date, dateIndex) => {
                            const values = servicesDays.find(
                              ({ service, days }) => {
                                const value = days.find(
                                  day => day === formatDate(date)
                                )
                                return value?.length > 0 ? service : ''
                              }
                            )
                            const nameService = values?.service
                              ? values?.service
                                  .replace(/(PFV|PMGD|PMG)/g, '')
                                  .trim()
                              : ''

                            return (
                              <CellUserComponent
                                nameService={nameService}
                                dateIndex={dateIndex}
                                date={date}
                                staff={staff}
                              />
                            )
                          })}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </TableHead>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}

export default MyTable

function generateDateArray (startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dateArray = []

  while (start <= end) {
    dateArray.push(start.toISOString().split('T')[0])
    start.setDate(start.getDate() + 1)
  }

  return dateArray
}

function formatDate (date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getServiceForDate = (user, date) => {
  const formattedDate = formatDate(date)
  const serviceDay = user.services.find(
    ({ proposed_execution_date, finish_execution_date }) => {
      const dateArray = generateDateArray(
        proposed_execution_date,
        finish_execution_date
      )
      return dateArray.includes(formattedDate)
    }
  )
  return serviceDay ? serviceDay.photovoltaic_power_station.name : ''
}
// Agrega esta función al principio del archivo
function getStartOfYear () {
  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 1)
  return startOfYear
}

function getStartOfWeek (date) {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.getFullYear(), date.getMonth(), diff)
}
