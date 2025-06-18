// src/App.tsx - WITHOUT Router wrapper (Router should be in main.tsx)
import Navbar from './components/Navbar/Navbar.tsx'
import Footer from './components/Footer/Footer.tsx'
import MMcosmetica from './components/MentoriaMicroCosmetica/MentoriaMicroCosmetica.tsx'
import Certification from './components/Certification/Certification.tsx'

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
            <MMcosmetica />
            <Certification />
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