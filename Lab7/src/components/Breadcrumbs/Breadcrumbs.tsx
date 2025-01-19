import * as React from 'react';
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "store/store.ts";

const Breadcrumbs = () => {

    const location = useLocation()

    const component = useAppSelector((state) => state.components.component)

    const rocket = useAppSelector((state) => state.rockets.rocket)

    const crumbs = () => {

        if (location.pathname == '/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/">
                            Главная
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/components/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/components/">
                            Комплектующие
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (component) {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/components/">
                            Комплектующие
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            {component?.name}
                        </Link>
                    </BreadcrumbItem>
                </>
            )
        }

        if (rocket) {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to="/rockets/">
                            Ракеты
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Ракета №{rocket?.id}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/rockets/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Ракеты
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/login/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Вход
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/register/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Регистрация
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/profile/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/profile/">
                            Личный кабинет
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }
    };

    return (
        <Breadcrumb className="fs-5">
            {crumbs()}
        </Breadcrumb>
    );
};

export default Breadcrumbs