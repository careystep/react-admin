import React from 'react'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import Authroute from '../components/Authroute'
import Home from '../containers/Home'
import Role from '../containers/Role'

class RouterMap extends React.Component {

    render() {
        return (

            <BrowserRouter>
               <div>
                   <Authroute></Authroute>
                   <Switch>
                       <Route exact path="/" component={Home} />
                       <Route exact path="/role" component={Role} />
                   </Switch>
               </div>
            </BrowserRouter>
        )
    }

}

export default RouterMap;