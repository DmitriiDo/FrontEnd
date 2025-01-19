import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Component} from "modules/types.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addComponentToRocket, fetchComponents} from "store/slices/componentsSlice.ts";
import {removeComponentFromDraftRocket, updateComponentValue} from "store/slices/rocketsSlice.ts";

type Props = {
    component: T_Component,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
}

const ComponentCard = ({component,  showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.rockets)

    const [local_count, setLocal_count] = useState(component.count)
    
    const location = useLocation()

    const isRocketPage = location.pathname.includes("rockets")

    const handeAddToDraftRocket = async () => {
        await dispatch(addComponentToRocket(component.id))
        await dispatch(fetchComponents())
    }

    const handleRemoveFromDraftRocket = async () => {
        await dispatch(removeComponentFromDraftRocket(component.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateComponentValue({
            component_id: component.id,
            count: local_count
        }))
    }

    if (isRocketPage) {
        return (
            <Card key={component.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={component.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {component.name}
                            </CardTitle>
                            <CardText>
                                Цена: {component.price} руб.
                            </CardText>
                            <CustomInput label="Количество" type="number" value={local_count} setValue={setLocal_count} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/components/${component.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftRocket}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={component.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={component.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {component.name}
                </CardTitle>
                <CardText>
                    Цена: {component.price} руб.
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/components/${component.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftRocket}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default ComponentCard