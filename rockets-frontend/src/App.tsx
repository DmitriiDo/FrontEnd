import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import ComponentsPage from "./ComponentsPage.tsx";
import ComponentDescriptionPage from "./ComponentDescriptionPage.tsx";
// import AnimalPage from "./AnimalPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/components" element={<ComponentsPage />} />
                <Route path="/components/:componentId" element={<ComponentDescriptionPage />} />
            </Routes>
        </Router>
    );
}

export default App;
