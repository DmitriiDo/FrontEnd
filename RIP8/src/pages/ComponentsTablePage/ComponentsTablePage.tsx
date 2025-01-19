import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchComponents, updateComponentName} from "store/slices/componentsSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import ComponentsTable from "components/ComponentsTable/ComponentsTable.tsx";

const ComponentsTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {components, component_name} = useAppSelector((state) => state.components)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateComponentName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchComponents())
    }

    useEffect(() => {
        dispatch(fetchComponents())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={component_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/components/add">
                        <Button color="primary">Создать комплектующее</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {components.length > 0 ? <ComponentsTable components={components} fetchComponents={fetchComponents}/> : <h3 className="text-center mt-5">Комплектующие не найдены</h3>}
            </Row>
        </Container>
    );
};

export default ComponentsTablePage