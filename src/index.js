import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import { Provider } from "react-redux";  // provider for the store
import store from './store'             // adding the store
import { ApolloProvider } from '@apollo/react-hooks';  // provier and rider.
import {ApolloClient} from '@apollo/client'; // the client which lets us define the uri
//import 'react-toastify/dist/ReactToastify.css'; // react toastify css file.
import { createHttpLink } from 'apollo-link-http'; 
import { InMemoryCache } from 'apollo-cache-inmemory'; // in memory cache for the create http link.



 // client and cache both have been defiend here.
const client = new ApolloClient({
  link : createHttpLink({
    uri: 'https://vieuth-backend.herokuapp.com/graphql',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache()
});



ReactDOM.render(

  <React.StrictMode>

  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
