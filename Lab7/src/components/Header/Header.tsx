import {Col, Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {NavLink as RRNavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {useState} from "react";
import {handleLogout} from "store/slices/userSlice.ts";

const Header = () => {

    const dispatch = useAppDispatch()

    const isAuthenticated = useAppSelector((state) => state.user.is_authenticated)

    const username = useAppSelector((state) => state.user.username)

    const navigate = useNavigate()

    const logout = async (e) => {
        e.preventDefault()
        await dispatch(handleLogout())
        navigate("/")
    }

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const hideMenu = () => setCollapsed(true)

    return (
        <header>
            <Navbar className="p-3" expand="lg">
                <Container className="p-0">
                    <Navbar collapseOnSelect expand="lg" dark>
                        <Col className="d-flex align-items-center">
                            <NavbarBrand>
                                <NavLink tag={RRNavLink} to="/">
                                     Сборка ракетоносителей Ангара разных типов
                                </NavLink>
                            </NavbarBrand>
                        </Col>
                        <NavbarToggler aria-controls="responsive-navbar-nav" onClick={toggleNavbar} />
                        <Collapse id="responsive-navbar-nav" navbar isOpen={!collapsed}>
                            <Nav className="mr-auto fs-5 d-flex flex-grow-1 justify-content-end align-items-center" onClick={hideMenu} navbar>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/components/">
                                        Комплектующие
                                    </NavLink>
                                </NavItem>
                                {isAuthenticated ?
                                    <>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to="/rockets/">
                                                Ракеты
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to="/profile/">
                                                {username}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{cursor: "pointer"}} onClick={logout}>
                                                Выйти
                                            </NavLink>
                                        </NavItem>
                                    </>
                                    :
                                    <>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to="/login/">
                                                Войти
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to="/register/">
                                                Зарегистрироваться
                                            </NavLink>
                                        </NavItem>
                                    </>
                                }
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header