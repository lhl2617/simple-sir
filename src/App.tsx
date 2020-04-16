import React from 'react';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Router } from 'react-router-dom';
import { AppContent } from './components/AppContent';
import { history } from './utils/history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <div style={{ paddingTop: 64 }}>
          <AppContent />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
