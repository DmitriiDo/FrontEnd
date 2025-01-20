import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Component} from "modules/types.ts";
import {ComponentMocks} from "modules/mocks.ts";

type Props = {
    selectedComponent: T_Component | null,
    setSelectedComponent: React.Dispatch<React.SetStateAction<T_Component | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ComponentPage = ({selectedComponent, setSelectedComponent, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/components/${id}`)
            const data = await response.json()
            setSelectedComponent(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedComponent(ComponentMocks.find(component => component?.id == parseInt(id as string)) as T_Component)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedComponent(null)
    }, []);

    if (!selectedComponent) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <CardImg src={isMock ? mockImage as string : selectedComponent.image} className="mb-3" />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedComponent.name}</h1>
                    <p className="fs-5">Описание: {selectedComponent.description}</p>
                    <p className="fs-5">Категория: {selectedComponent.category}</p>
                    <p className="fs-5">Цена: {selectedComponent.price} руб.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ComponentPage