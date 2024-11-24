import React from 'react';
import UserForm from './components/UserForm';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Форма регистрации</h1>
      <UserForm />
    </div>
  );
};

export default App;