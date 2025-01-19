import {useAppSelector} from "store/store.ts";
import {Card, Col, Row} from "reactstrap";
import RocketCard from "components/RocketCard/RocketCard.tsx";
import {T_Rocket} from "modules/types.ts";
import "./RocketTable.css"

type Props = {
    rockets:T_Rocket[]
}

const RocketsTable = ({rockets}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    return (
        <div className="mb-5">
            <div className="mb-2" style={{fontWeight: "bold"}}>
                <Card style={{padding: "10px"}}>
                    <Row>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={1}>
                            Статус
                        </Col>
                        <Col md={1}>
                            Фактическая масса
                        </Col>
                        <Col>
                            Дата создания
                        </Col>
                        <Col>
                            Дата формирования
                        </Col>
                        <Col>
                            Дата завершения
                        </Col>
                        {!is_superuser &&
                            <Col>
                                Действие
                            </Col>
                        }
                        {is_superuser &&
                            <>
                                <Col>
                                    Пользователь
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                            </>
                        }
                    </Row>
                </Card>
            </div>
            <div className="d-flex flex-column gap-2">
                {rockets.map((rocket, index) => (
                    <RocketCard rocket={rocket} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
};

export default RocketsTable