import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import ComponentsListPage from "pages/ComponentsListPage/ComponentsListPage.tsx";
import ComponentPage from "pages/ComponentPage/ComponentPage.tsx";
import RocketsPage from "pages/RocketsPage/RocketsPage.tsx";
import RocketPage from "pages/RocketPage/RocketPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import ComponentsTablePage from "pages/ComponentsTablePage/ComponentsTablePage.tsx";
import ComponentEditPage from "pages/ComponentEditPage/ComponentEditPage.tsx";
import ComponentAddPage from "pages/ComponentAddPage/ComponentAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/components/" element={<ComponentsListPage />} />
                        <Route path="/components-table/" element={<ComponentsTablePage />} />
                        <Route path="/components/:id/" element={<ComponentPage />} />
                        <Route path="/components/:id/edit" element={<ComponentEditPage />} />
                        <Route path="/components/add" element={<ComponentAddPage />} />
                        <Route path="/rockets/" element={<RocketsPage />} />
                        <Route path="/rockets/:id/" element={<RocketPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
