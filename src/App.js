import FeedbackList from "./components/FeedbackList";
import Header from "./components/Header";
import { useState } from 'react';
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from './pages/AboutPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutIconLink from "./components/AboutIconLink";
import {FeedBackProvider} from './context/FeedbackContext'

function App() {
  return (
    <FeedBackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path='/' element = {
              <>
              <FeedbackForm />
              <FeedbackStats />
              <FeedbackList />
              </>
            }>
            </Route>
            <Route path='/about' element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedBackProvider>

  );
}

export default App;
