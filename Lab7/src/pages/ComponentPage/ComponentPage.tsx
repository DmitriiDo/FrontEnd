import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchComponent, removeSelectedComponent} from "store/slices/componentsSlice.ts";

const ComponentPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {component} = useAppSelector((state) => state.components)

    useEffect(() => {
        dispatch(fetchComponent(id))
        return () => dispatch(removeSelectedComponent())
    }, []);

    if (!component) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={component.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{component.name}</h1>
                    <p className="fs-5">Описание: {component.description}</p>
                    <p className="fs-5">Категория: {component.category}</p>
                    <p className="fs-5">Цена: {component.price} руб.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ComponentPage