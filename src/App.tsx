import React from 'react';
import logo from './logo.svg';
import './App.css';
import {LeafletMap} from "./components/LeafletMap";
import { Form } from './components/Form';

const App:React.FC = () => {
  return (
    <div className='app'>
      <div className='form'>
        <Form/>
      </div>
      {/* <div className='map'>
        <LeafletMap />
      </div>
      <div className='overlay'>

      </div> */}
    </div>
  )
}
export default App;
