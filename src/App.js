import React from 'react';
import './App.scss';
import { PurchaseForm, SellForm } from './components/form';

function App() {
  return (
    <div className="App">
      <PurchaseForm />
      <SellForm />
    </div>
  );
}

export default App;
