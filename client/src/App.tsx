// src/App.tsx - WITHOUT Router wrapper (Router should be in main.tsx)
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import {Routes, Route} from 'react-router-dom'
import PrivacyPolicy from './pages/privacy-policy/PrivacyPolicy'
import CookiesPolicy from './pages/cookies-policy/CookiesPolicy'
import TermsConditions from './pages/terms-conditions/TermsConditions'
import './App.css'
import './i18n.js'


// Main Home Page Component
function HomePage() {
    return (
        <>
            <Navbar />
            <Footer />
        </>
    )
}

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                {/* Main home page route */}
                <Route path="/" element={<HomePage/>}/>

                {/* Policy pages routes */}
                <Route path="/politica-privacidade" element={<PrivacyPolicy/>}/>
                <Route path="/politica-cookies" element={<CookiesPolicy/>}/>
                <Route path="/termos-condicoes" element={<TermsConditions/>}/>
            </Routes>
        </>
    )
}

export default App