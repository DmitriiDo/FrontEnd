import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Component} from "modules/types.ts";
import "./styles.css"

type Props = {
    selectedComponent: T_Component | null
}

const Breadcrumbs = ({selectedComponent}:Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/components") &&
                <BreadcrumbItem active>
                    <Link to="/components">
						Комплектующие
                    </Link>
                </BreadcrumbItem>
			}
            {selectedComponent &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedComponent.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs