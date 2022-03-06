import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import Users from './components/Users'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing';

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client} >
        <Router>
          <Routes>        
            <Route path="/landing" element={<Landing />}/>
            <Route path="/" element={<Users/>}/>
          </Routes>
        </Router>
    </ApolloProvider>
    
  );
}

export default App;
