import { useEffect } from 'react'
import { useState } from 'react'
import MDSnackbar from '/components/MDSnackbar'

function ApiNotification ({data}) {
  // params
  const { message, title, code } = data

  useEffect(() => {
    console.log('aquiiiiiiasdasdasd')
    switch (code) {
      case 'success':
        openSuccessSB()
        return null
      case 'warning':
        openWarningSB()
        return null
      case 'info':
        openInfoSB()
        return null
      case 'error':
        openErrorSB()
        return null
      default:
        return null
    }
  }, [data])

  // useStatte
  const [infoSB, setInfoSB] = useState(false)
  const [errorSB, setErrorSB] = useState(false)
  const [successSB, setSuccessSB] = useState(false)
  const [warningSB, setWarningSB] = useState(false)

  // handle close
  const closeInfoSB = () => setInfoSB(false)
  const closeErrorSB = () => setErrorSB(false)
  const closeSuccessSB = () => setSuccessSB(false)
  const closeWarningSB = () => setWarningSB(false)

  // handle open
  const openInfoSB = () => setInfoSB(true)
  const openErrorSB = () => setErrorSB(true)
  const openSuccessSB = () => setSuccessSB(true)
  const openWarningSB = () => setWarningSB(true)

  const renderSuccessSB = (
    <MDSnackbar
      color='success'
      icon='check'
      title={`${title}`}
      content={`${message}`}
      dateTime='0 mins ago'
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  )

  const renderInfoSB = (
    <MDSnackbar
      color='info'
      icon='notifications'
      title={`${title}`}
      content={`${message}`}
      dateTime='0 mins ago'
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  )

  const renderWarningSB = (
    <MDSnackbar
      color='warning'
      icon='star'
      title={`${title}`}
      content={`${message}`}
      dateTime='0 mins ago'
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  )

  const renderErrorSB = (
    <MDSnackbar
      color='error'
      icon='warning'
      title={`${title}`}
      content={`${message}`}
      dateTime='0 mins ago'
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  )
  return (
    <>
      {renderSuccessSB}
      {renderInfoSB}
      {renderWarningSB}
      {renderErrorSB}
    </>
  )
}

export default ApiNotification
