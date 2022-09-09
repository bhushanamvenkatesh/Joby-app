import './App.css'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'

import Home from './components/Home'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />

      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />

      <ProtectedRoute component={NotFound} />
    </Switch>
  </>
)

export default App
