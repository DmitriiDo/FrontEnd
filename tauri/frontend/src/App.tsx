import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import ComponentPage from "pages/ComponentPage/ComponentPage.tsx";
import ComponentsListPage from "pages/ComponentsListPage/ComponentsListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Component} from "modules/types.ts";

function App() {

    const [components, setComponents] = useState<T_Component[]>([])

    const [selectedComponent, setSelectedComponent] = useState<T_Component | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedComponent={selectedComponent}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/components/" element={<ComponentsListPage components={components} setComponents={setComponents} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/components/:id" element={<ComponentPage selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
