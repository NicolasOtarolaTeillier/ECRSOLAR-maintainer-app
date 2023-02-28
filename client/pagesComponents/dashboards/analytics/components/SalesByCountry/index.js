/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import SalesTable from "/examples/Tables/SalesTable";

// Data
import salesTableData from "/pagesComponents/dashboards/analytics/components/SalesByCountry/data/salesTableData";



function SalesByCountry() {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const jsVectorMap = require("jsvectormap");
    require("jsvectormap/dist/maps/world-merc.js");
    require("jsvectormap/dist/maps/south-america-merc");

    const createMap = () =>
      new jsVectorMap({
        selector: "#map",
        map: "south_america_merc",
        zoomOnScroll: true,
        zoomButtons: false,
        selectedMarkers: [1, 3],
        markersSelectable: true,
        markers: [
          {
            name: "Chile",
            coords: [-33.437778, -70.650278],
          },

        ],
        markerStyle: {
          initial: {
            fill: "#1A73E8",
          },
          hover: {
            fill: "#1A73E8",
          },
          selected: {
            fill: "#191919",
          },
        },
      });

    if (mapContainer && mapContainer.children.length === 0) createMap();

    () => mapContainer.children[0].remove();
  }, []);

  return (
    <Card sx={{ width: "100%" }}>
      <MDBox display="flex">
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          variant="gradient"
          bgColor="success"
          color="white"
          shadow="md"
          borderRadius="xl"
          ml={3}
          mt={-2}
        >
          <Icon fontSize="medium" color="inherit">
            language
          </Icon>
        </MDBox>
        <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          Sales by Country
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12} md={7} lg={6}>
            <SalesTable rows={salesTableData} shadow={false} />
          </Grid>
          <Grid item xs={12} md={5} lg={6} sx={{ mt: { xs: 5, lg: 0 } }}>
            <MDBox id="map" width="100%" height="100%" mt={-3} />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default SalesByCountry;
