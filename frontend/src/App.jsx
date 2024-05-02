import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import Layout from './Layout/Layout';
import Payment from './Components/Payment';
import Classifier from './Pages/Classifier';
import Profile from './Pages/Profile';
import Form from './Pages/Form'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>
        <Route
          path="/"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        ></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/view-plans" element={<Classifier />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/claim-form"
          element={
            <Layout>
              <Form />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
