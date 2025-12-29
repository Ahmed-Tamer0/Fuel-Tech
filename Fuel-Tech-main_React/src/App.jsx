import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RequestService from './pages/RequestService';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';

function App() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/verify-email" element={<EmailVerification />} />
                            <Route path="/request-service" element={<RequestService />} />
                        </Routes>
                    </div>
                </Router>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;
