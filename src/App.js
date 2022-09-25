import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'

import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import ProtectedRoute from './components/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <ProtectedRoute component={NotFound} />

    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
