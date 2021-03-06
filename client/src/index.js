import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store/index"
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Login from './components/login';
import Register from './components/register';
import NavBar from './components/navbar';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <NavBar />
                <section className="container">
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </section>

            </div>

        </BrowserRouter>

    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });
