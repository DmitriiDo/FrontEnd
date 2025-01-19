import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchComponents, updateComponentName} from "store/slices/componentsSlice.ts";
import ComponentCard from "components/ComponentCard/ComponentCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const ComponentsListPage = () => {

    const dispatch = useAppDispatch()

    const {components, component_name} = useAppSelector((state) => state.components)

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {draft_rocket_id, components_count} = useAppSelector((state) => state.rockets)

    const hasDraft = draft_rocket_id != null

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
                {is_authenticated && !is_superuser &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_rocket_id={draft_rocket_id} components_count={components_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {components?.map(component => (
                    <Col key={component.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <ComponentCard component={component} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ComponentsListPage