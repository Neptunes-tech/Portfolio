import React from 'react'
import { hot } from 'react-hot-loader/root'
import AOS from 'aos'
import { Routes } from './Config/routes'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { pdfjs } from 'react-pdf'
import './App.css'
import 'antd/dist/antd.css'
import 'aos/dist/aos.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

if (process.env.NODE_ENV === 'production') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`
}
else {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`
}

AOS.init()

const theme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
      secondMain: '#1890ff'
    }
  }
})

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  )
}

export default hot(App)