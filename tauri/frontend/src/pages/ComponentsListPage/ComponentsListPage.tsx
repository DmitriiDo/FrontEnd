import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import ComponentCard from "components/ComponentCard/ComponentCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateComponentName} from "src/store/slices/componentsSlice.ts";
import {T_Component} from "modules/types.ts";
import {ComponentMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"

type Props = {
    components: T_Component[],
    setComponents: React.Dispatch<React.SetStateAction<T_Component[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ComponentsListPage = ({components, setComponents, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {component_name} = useAppSelector((state:RootState) => state.components)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateComponentName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setComponents(ComponentMocks.filter(component => component.name.toLowerCase().includes(component_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchComponents()
    }

    const fetchComponents = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/components/?component_name=${component_name.toLowerCase()}`)
            const data = await response.json()
            setComponents(data.components)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchComponents()
    }, []);

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
            </Row>
            <Row>
                {components?.map(component => (
                    <Col key={component.id} sm="12" md="6" lg="4">
                        <ComponentCard component={component} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ComponentsListPage