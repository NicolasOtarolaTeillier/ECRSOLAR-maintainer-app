// apollo client
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'

import { useState, useEffect, useMemo } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

// @emotion
import createCache from '@emotion/cache'

// @emotion/react components
import { CacheProvider } from '@emotion/react'

// @mui material components
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Icon from '@mui/material/Icon'

// @fullcalendar styles
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox'

// NextJS Material Dashboard 2 PRO examples
import Sidenav from '/examples/Sidenav'
import Configurator from '/examples/Configurator'

// NextJS Material Dashboard 2 PRO themes
import theme from '/assets/theme'

// NextJS Material Dashboard 2 PRO Dark Mode themes
import themeDark from '/assets/theme-dark'


// NextJS Material Dashboard 2 PRO routes
import routes from '/routes'

// NextJS Material Dashboard 2 PRO Context Provider
import {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator
} from '/context'

// Images
import favicon from '/assets/images/favicon.png'
import appleIcon from '/assets/images/apple-icon.png'
import brandWhite from '/assets/images/logo-ct.png'
import brandDark from '/assets/images/logo-ct-dark.png'

import { SessionProvider } from 'next-auth/react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: 'css', prepend: true })

function Main({ Component, pageProps }) {
  const [controller, dispatch] = useMaterialUIController()
  const {
    miniSidenav,
    //  direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode
  } = controller
  const [onMouseEnter, setOnMouseEnter] = useState(false)
  const { pathname } = useRouter()


  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false)
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true)
      setOnMouseEnter(false)
    }
  }

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator)


  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const brandIcon =
    (transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite

  const configsButton = (
    <MDBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='3.25rem'
      height='3.25rem'
      bgColor='white'
      shadow='sm'
      borderRadius='50%'
      position='fixed'
      right='2rem'
      bottom='2rem'
      zIndex={99}
      color='dark'
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize='small' color='inherit'>
        settings
      </Icon>
    </MDBox>
  )

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Component {...pageProps} />
      {layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brandIcon}
            brandName='App ECRSOLAR'
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === 'vr' && <Configurator />}
    </ThemeProvider>
  )

}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <MaterialUIControllerProvider>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1'
              />
              <link rel='shortcut icon' href={favicon.src} />
              <link rel='apple-touch-icon' sizes='76x76' href={appleIcon.src} />
              <title>App ECRSOLAR</title>
            </Head>
            <Main Component={Component} pageProps={pageProps} />
          </CacheProvider>
        </MaterialUIControllerProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
