import { gql } from '@apollo/client'
const GET_ALL_STAFF = gql`
query AllStaffs {
  allStaffs  {
    id
    person {
      id
      email
      first_name
      last_name
      phone_number
      rut
      status
    }
    services {
      id
      proposed_execution_date
      finish_execution_date
      photovoltaic_power_station {
        id
        name
      }
      leader {
        id
    }
  }
    position {
      id
      name
      status
    }
    admission_date
    dismissal_date
    status
    
  }
  
}
`
export default GET_ALL_STAFF


export const GET_ALL_STAFF_AVAILABLE = gql`
query AllStaffsAvailable (
  $service: ID!
)
{
  allStaffsAvailable (
    service: $service
  )
  {
    id
    person {
      id
      email
      first_name
      last_name
      phone_number
      rut
      status
    }
    services {
      id
      proposed_execution_date
      finish_execution_date
      photovoltaic_power_station {
        id
        name
      }
      leader {
        id
    }
  }
    position {
      id
      name
      status
    }
    admission_date
    dismissal_date
    status
    
  }

  
}
`

// "3fc94817-dd49-45ab-a333-02e9d3ba8bd6"	0	false	2366774	"2023-04-17"	"2023-04-19"	"Limpieza con agua"	"Grenergy Opex SPA"	1	"PMGD PFV CHIMBARONGO"
// "dd374ce0-370a-4c82-8c3b-5aea04fbf56e"	0	false	5279160	"2023-04-19"	"2023-04-26"	"Limpieza en seco"	"Grenergy Opex SPA"	1	"PMGD PFV LOS LIBERTADORES"
// "c45a1975-f9e3-4825-9fa8-1ea5e6fe3c4d"	1425006501	false	6196300	"2023-04-17"	"2023-04-21"	"Desmalezado"	"Ingeteam SPA"	2	"PMGD PFV PARAGUAY"
// "bf9f6950-2953-4690-9e50-9b1d411687a6"	0	false	3860196	"2023-04-10"	"2023-04-18"	"Limpieza en seco"	"Grenergy Opex SPA"	1	"PMGD PFV DOÑIHUE"
// "bc178b90-58da-4031-9bc6-49592d4cb84d"	0	false	3746831	"2023-04-10"	"2023-04-21"	"Limpieza en seco"	"Grenergy Opex SPA"	1	"PMGD PFV ROVIAN"
// "5b582ac2-cf8a-483a-a133-cf445b577aa7"	0	false	1810614	"2023-04-24"	"2023-04-28"	"Desmalezado"	"Hanwha Q Cells Chile SPA"	3	"PMGD PFV TILTIL UNO"
// "4c43f211-5d45-4bb8-a43e-bf70643e9a57"	0	false	2851143	"2023-04-24"	"2023-04-28"	"Limpieza con agua"	"Grenergy Opex SPA"	1	"PMGD PFV LA FRONTERA"
// "8df14e73-d37f-43a1-8057-fb96325f4053"	0	false	0	"2023-04-27"	"2023-04-28"	"Limpieza en seco"	"Grenergy Opex SPA"	1	"PMGD PFV PORTEZUELO"