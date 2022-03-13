import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {setContext} from 'apollo-link-context'
import Users from './components/Users'
import Main from './components/Main';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import IsAuthentificated from './components/isAuthentificated';

const httpLink = new HttpLink({uri: "http://127.0.0.1:4000"})
const authLink = setContext(async(req, {headers}) => {
  const token = localStorage.getItem('token')

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httpLink as any)

const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client} >
        <Router>
          <Routes>        
            <Route path="/main" element={<Main />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            
            <Route path="/users" element={
              <IsAuthentificated>
                  <Users/>
            </IsAuthentificated> }/> 

            <Route path="/profile" element={
              <IsAuthentificated>
                  <Profile/>
            </IsAuthentificated> }/> 

          </Routes>
        </Router>
    </ApolloProvider>
    
  );
}

export default App;
