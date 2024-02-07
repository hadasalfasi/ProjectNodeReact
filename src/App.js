import SignUp from './components/signUp';
import { Provider } from 'react-redux';
import store from './redux/store';
import LogIn from './components/logIn';
import ShowTask from './components/showTask';
import { Route, Routes } from 'react-router-dom';
import ShowTasks from './components/showTasks';
import AddTask from './components/addTask';
import Nav from './components/nav';
import { useState } from 'react';
import './App.css';
import picture from './components/picture2.jpg'


function App() {
  const [flagConect,setFlagConect]=useState(false);
  
  return (
    <div className="App">
      <Provider store={store}>
        <Nav flagConect={flagConect} setFlagConect={setFlagConect}/>
        <Routes>
          <Route path="/SignUp" element={<SignUp flagConect={flagConect} setFlagConect={setFlagConect}/>}/>
          <Route path="/LogIn" element={<LogIn flagConect={flagConect} setFlagConect={setFlagConect}/>}/>
          <Route path='/ShowTask' element={<ShowTask/>}/>
          <Route path='/ShowTasks' element={<ShowTasks flagConect={flagConect} setFlagConect={setFlagConect}/>}/>
          <Route path='/addTask' element={<AddTask flagConect={flagConect} setFlagConect={setFlagConect}/>}/>
          <Route path='/' element={<img src={picture} width='100%'></img>}></Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;


