import { TableCell } from "@mui/material"

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

function UserCellComponent ({dateIndex,nameService,date,staff}) {
    const handleClick = () => {
        console.log('Se hizo clic en el componente TableCell',staff.person.first_name+' '+staff.person.first_name,date.getDate(),date.getMonth()+1);
      };
  return (
    <TableCell 
      key={dateIndex}
      align='center'
      onClick={handleClick}
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
}

export default UserCellComponent


