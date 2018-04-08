import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './index.css';
import RouterMap from './router/RouterMap'
import 'element-theme-default';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import SysMenu from './components/SysMenu'
import SysBody from './components/SysBody'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
ReactDOM.render(
    (
        <Provider store={store}>
            <div>
                <Header/>
                <Dashboard>
                    <SysMenu></SysMenu>
                    <SysBody>
                        <RouterMap />
                    </SysBody>
                </Dashboard>
            </div>
        </Provider>
    ),
    document.getElementById('root'));
registerServiceWorker();
