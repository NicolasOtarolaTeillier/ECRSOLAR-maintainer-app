const today = new Date()
const startOfWeek = new Date(
  today.setDate(
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
  )
)

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

function MyTable () {
  const { loading, error, data } = useQuery(GET_ALL_STAFF)
  console.log(data)
  const currentDate = new Date();
const startOfCurrentWeek = getStartOfWeek(currentDate);
const initialOffset = Math.floor((currentDate - startOfCurrentWeek) / (7 * 24 * 60 * 60 * 1000)) * 7;

  //console.log('currentDate', currentDate)
  // Calcula la fecha de inicio del año
  const startOfYear = getStartOfYear();
  // Calcula el desplazamiento inicial en función de la diferencia entre la fecha actual y la fecha de inicio del año
  const [offset, setOffset] = useState(initialOffset)

  const handlePrevious = () => {
    const newOffset = offset - 7;
    setOffset(newOffset);
  };

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

  

  const currentWeekStart = new Date(
    currentDate.setDate(
      currentDate.getDate() -
        currentDate.getDay() +
        (currentDate.getDay() === 0 ? -6 : 1)
    )
  )
  //console.log("currentWeekStart", currentWeekStart)

  const startDate = new Date(
    startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + offset)
  );
  //console.log("startDate", startDate)

  const arrayOfDays = Array.from(
    { length: 7 },
    (_, i) => new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
  )
  //console.log("arrayOfDays", arrayOfDays)

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
          <Button onClick={handlePrevious}>
  Retroceder
</Button>
            <Button onClick={handleNext}>Avanzar</Button>
          </MDBox>
          <MDBox style={{ display: 'flex', justifyContent: 'center' }}>
            <TableContainer
              component={Paper}
              style={{ maxWidth: '100%', margin: 'auto' }}
            >
              <Table style={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' style={{ width: '20%' }}>
                      PERSONAL
                    </TableCell>
                    {arrayOfDays.map((date, index) => {
                      console.log(index, date)
                      return (
                        <TableCell key={index} align='center'>
                          {formatDateWithDay(date)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  <TableBody>
                    {data?.allStaffs
                      .filter(
                        u =>
                          u.position.name != 'Operaria Administrativa' &&
                          u.position.name != 'Trabajadora Especialista'
                      )
                      .sort((a, b) => {
                        // Ordenar por los servicios en el primer, segundo, tercer y cuarto día de la semana
                        const serviceA1 = getServiceForDate(a, arrayOfDays[0])
                        const serviceB1 = getServiceForDate(b, arrayOfDays[0])
                        const serviceA2 = getServiceForDate(a, arrayOfDays[1])
                        const serviceB2 = getServiceForDate(b, arrayOfDays[1])
                        const serviceA3 = getServiceForDate(a, arrayOfDays[2])
                        const serviceB3 = getServiceForDate(b, arrayOfDays[2])
                        const serviceA4 = getServiceForDate(a, arrayOfDays[3])
                        const serviceB4 = getServiceForDate(b, arrayOfDays[3])
                        const serviceA5 = getServiceForDate(a, arrayOfDays[4])
                        const serviceB5 = getServiceForDate(b, arrayOfDays[4])
                        const serviceA6 = getServiceForDate(a, arrayOfDays[5])
                        const serviceB6 = getServiceForDate(b, arrayOfDays[5])

                        // Comprobar el primer día
                        if (serviceA1 !== serviceB1) {
                          return serviceB1.localeCompare(serviceA1)
                        }

                        // Comprobar el segundo día
                        if (serviceA2 !== serviceB2) {
                          return serviceB2.localeCompare(serviceA2)
                        }

                        // Comprobar el tercer día
                        if (serviceA3 !== serviceB3) {
                          return serviceB3.localeCompare(serviceA3)
                        }
                        // Comprobar el tercer día
                        if (serviceA4 !== serviceB4) {
                          return serviceB3.localeCompare(serviceA4)
                        }
                        // Comprobar el tercer día
                        if (serviceA5 !== serviceB5) {
                          return serviceB5.localeCompare(serviceA5)
                        }

                        // Comprobar el cuarto día
                        return serviceB6.localeCompare(serviceA6)
                      })
                      .map((user, userIndex) => {
                        let isLeader = false
                        const idStaff = user?.id
                        const servicesDays = user?.services.map(
                          ({
                            id,
                            leader,
                            photovoltaic_power_station,
                            finish_execution_date,
                            proposed_execution_date
                          }) => {
                            console.log(leader.id, idStaff)
                            isLeader = leader?.id === idStaff ? true : false
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
                          <TableRow key={user.id}>
                            <TableCell
                              style={{
                                fontSize: font, // Ajusta el tamaño de la fuente
                                border: '1px solid black', // Añadir borde negro a la TableCell
                                fontWeight: 'bold', // Aplica el estilo de negrita

                                height: '6px', // Establece la altura deseada aquí
                                lineHeight: '6px', // Asegúrate de que el lineHeight sea igual a la altura
                                backgroundColor: c
                              }}
                            >
                              {isLeader ? '*' : ''} {user.person.first_name}{' '}
                              {user.person.last_name}
                              {' ('} {user.position.name} {')'}
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
                                <TableCell
                                  key={dateIndex}
                                  align='center'
                                  style={{
                                    fontWeight: 'bold', // Aplica el estilo de negrita
                                    fontSize: '10px', // Ajusta el tamaño de la fuente
                                    backgroundColor: color(nameService),
                                    border: '1px solid black', // Añadir borde negro a la TableCell

                                    width: '11.5%',
                                    height: '6px', // Establece la altura deseada aquí
                                    lineHeight: '6px' // Asegúrate de que el lineHeight sea igual a la altura
                                  }}
                                >
                                  {nameService}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </TableHead>
              </Table>
            </TableContainer>
          </MDBox>
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
  if(nameService === 'PORTEZUELO'){
    return '#FA08C4'
  }

  return 'white'
}

// Agrega esta función al principio del archivo
function getStartOfYear () {
  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 1)
  return startOfYear
}

function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.getFullYear(), date.getMonth(), diff);
  }
  