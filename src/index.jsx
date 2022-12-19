import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { store, persistor } from './Redux/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(<Provider store={store}>
    <PersistGate persistor={persistor}>
        <App />
    </PersistGate>
</Provider>, document.getElementById('root'))

// serviceWorker.register()

serviceWorkerRegistration.unregister()

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('./service-worker.js')
//             .then(registration => {
//                 console.log('SW registered: ', registration)
//             })
//             .catch(registrationError => {
//                 console.log('SW registration failed: ', registrationError)
//             })
//     })
// }