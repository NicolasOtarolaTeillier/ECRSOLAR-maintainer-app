import { useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import Image from "next/image";
import IMAGEN1 from "../../../../../../../assets/images/IMAGEN1.jpg"; // Asegúrate de reemplazar 'my-image.jpg' con la ruta correcta de tu imagen.
import IMAGEN2 from "../../../../../../../assets/images/IMAGEN2.jpg"; // Asegúrate de reemplazar 'my-image.jpg' con la ruta correcta de tu imagen.
import IMAGEN3 from "../../../../../../../assets/images/IMAGEN3.jpg"; // Asegúrate de reemplazar 'my-image.jpg' con la ruta correcta de tu imagen.

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";

import EventCalendar from "/examples/Calendar";

// context
import { useMaterialUIController, setSelectService } from "/context";

// query
import GET_ALL_SERVICES from "../../../../../../../api/service/queries.js";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";

function Calendar({ formData }) {
  const [open, setOpen] = useState(false);
  const [idService, setIdService] = useState(0);
  const { setActiveStep, activeStep } = formData;
  const [controller, dispatch] = useMaterialUIController();
  const { service } = controller;

  const { data, loading, error } = useQuery(GET_ALL_SERVICES);
  const [dataService, setDataService] = useState([]);

  useEffect(() => {
    setDataService(
      data?.allServices?.map((service, index) => {
        let name;
        switch (service.step) {
          case 0:
            name = "error";
            break;
          case 1:
            name = "error";
            break;
          case 2:
            name = "warning";
            break;
          case 3:
            name = "info";
            break;
          case 4:
            name = "success";
            break;
          default:
            name = "error";
        }
        let a = "";
        if (index === 5) {
          a = " Correctivo Electrico complejo";
          name = "success";
          return {
            title: a,

            // + ' - ' +service.photovoltaic_power_station.name.replace(
            //   /(PFV|PMGD|PMG)/g,
            //   ''
            // ) +
            // ' - ' +
            // service.customer.fantasy_name,
            end: diaSiguiente(service.finish_execution_date, 2),
            start: service.proposed_execution_date,
            id: service.id,
            className: name,
          };
        }
        if (index === 6) {
          a = " Correctivo Electrico simple";
          name = "error";
          return {
            title: a,

            // + ' - ' +service.photovoltaic_power_station.name.replace(
            //   /(PFV|PMGD|PMG)/g,
            //   ''
            // ) +
            // ' - ' +
            // service.customer.fantasy_name,
            end: diaSiguiente(service.finish_execution_date, 2),
            start: service.proposed_execution_date,
            id: service.id,
            className: name,
          };
        }
        return {
          title: service.service_type.name + a,

          // + ' - ' +service.photovoltaic_power_station.name.replace(
          //   /(PFV|PMGD|PMG)/g,
          //   ''
          // ) +
          // ' - ' +
          // service.customer.fantasy_name,
          end: diaSiguiente(service.finish_execution_date, 2),
          start: service.proposed_execution_date,
          id: service.id,
          className: name,
        };
      })
    );
  }, [data]);

  return (
    <MDBox pt={2}>
      <Grid container>
        <Grid item xs={12} xl={12} sx={{ height: "max-content" }}>
          {useMemo(
            () => (
              <EventCalendar
                initialView="dayGridMonth"
                initialDate={new Date()}
                events={dataService}
                selectable
                editable
                eventClick={(info) => {
                  const value_className = dataService.filter(
                    (ds) => ds.id === info.event.id
                  )[0].className;
                  console.log("value_className", value_className);

                  if (value_className === "success") {
                    console.log("open modal");
                    setOpen(true);
                    setIdService(info.event.id);
                    return;
                  }
                  if (value_className != "error") {
                    setOpen(false);
                    return;
                  }
                  setOpen(false);
                  console.log(info.event.id);
                  const id = info.event.id;
                  setSelectService(dispatch, id);
                  setActiveStep(activeStep + 1);
                }}
              />
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [dataService, open]
          )}
          {open
            ? (() => {
                console.log(dataService);
                const inicio = `Fecha : ${
                  dataService?.filter((s) => s.id === idService)[0]?.start
                }`;
                const fin = ` - ${
                  dataService?.filter((s) => s.id === idService)[0]?.end
                }`;
                return (
                  <>
                    <Box>
                      {inicio} {fin}
                    </Box>
                    <Box>Ejecucion:</Box>
                    <Box>
                      Producción diaria:
                      <Box pl={2}>Lunes: 10 %</Box>
                      <Box pl={2}>Martes: 30%</Box>
                      <Box pl={2}>Miércoles: 55%</Box>
                      <Box pl={2}>Jueves: 80%</Box>
                      <Box pl={2}>Viernes: 100%</Box>
                    </Box>
                    <Box>
                      Hallasgos:
                      <Box>

                      <Image
                        src={IMAGEN1}
                        alt="My Cool Image"
                        width={500}
                        height={300}
                        />
                      <Image
                        src={IMAGEN2}
                        alt="My Cool Image"
                        width={500}
                        height={300}
                        />
                      <Image
                        src={IMAGEN3}
                        alt="My Cool Image"
                        width={500}
                        height={300}
                        />
                        </Box>
                    </Box>
                    <Box>
                      Proveedores:
                      <Box pl={2}>
                        Empresa:
                        <Box pl={2}>
                          Dartel:
                          <Box pl={2}>
                            - 2000 metros cable solar, negro 2000 metros
                          </Box>
                          <Box pl={2}>- cable solar rojo 500 pares mc4</Box>
                          Monto neto:
                          <Box pl={2}> $ 2.276.000 clp</Box>
                        </Box>
                      </Box>
                    </Box>
                    <div></div>
                  </>
                );
              })()
            : null}
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Calendar;
// "primary",
// "secondary",
// "info",
// "success",
// "warning",
// "error",
// "dark",
function diaSiguiente(fecha, dias) {
  const fechaObj = new Date(fecha);
  console.log(fechaObj);
  fechaObj.setDate(fechaObj.getDate() + dias);
  const year = fechaObj.getFullYear();
  const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
  const day = String(fechaObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
