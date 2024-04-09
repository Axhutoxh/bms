import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './router/index.jsx'
import {Provider} from 'react-redux'
import store from './redux/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router />
  </Provider>,
)
