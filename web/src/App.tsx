import React,{Fragment} from 'react';
import './App.css';
import Header from './components/layout/header/Header';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router, Route, Routes,Navigate, useRoutes } from 'react-router-dom';
import LoginForm from './components/app/Login';
import { GraphsProvider } from './context';

function App() {
  return (
    <>
    <GraphsProvider>
      <Router>
      <Fragment>
        <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='/login'
            element={<LoginForm />}
          />
          <Route path='/home' element={<Layout />} />
        </Routes>
      </Fragment>
    </Router>
    </GraphsProvider>
    </>
  );
}

export default App;
