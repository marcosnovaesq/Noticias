import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import FormLogin from './components/form/signUp'
import Content from './components/home/content'
import history from './config/history'
import Layout from './components/layout/index'
import FormNews from './components/form/news'
import DashBoard from './components/layout/dashboard'
import ShowNew from './components/show/new'
import ShowUser from './components/show/user'

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Layout>
                    <Route exact path='/' component={Content}></Route>
                    <Route exact path='/users/signup' component={FormLogin}></Route>
                    <Route exact path='/users/:id' component={ShowUser}></Route>
                    <Route exact path='/news/add' component={FormNews}></Route>
                    <Route exact path='/news/:id' component={ShowNew}></Route>
                    <Route exact path='/dashboard' component={DashBoard}></Route>
                </Layout>
            </Switch>
        </Router>
    )
}


export default Routes;