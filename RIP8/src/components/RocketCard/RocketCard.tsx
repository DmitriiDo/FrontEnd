import {Button, Card, Col, Row} from "reactstrap";
import {E_RocketStatus, T_Rocket} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptRocket, fetchRockets, rejectRocket} from "store/slices/rocketsSlice.ts";

type Props = {
    rocket: T_Rocket
    index: number
}

const RocketCard = ({rocket, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptRocket = async (rocket_id) => {
        await dispatch(acceptRocket(rocket_id))
        await dispatch(fetchRockets())
    }

    const handleRejectRocket = async (rocket_id) => {
        await dispatch(rejectRocket(rocket_id))
        await dispatch(fetchRockets())
    }

    const navigate = useNavigate()

    const openRocketPage = () => {
        navigate(`/rockets/${rocket.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[rocket.status]}
                </Col>
                <Col md={1}>
                    {rocket.weight}
                </Col>
                <Col>
                    {formatDate(rocket.date_created)}
                </Col>
                <Col>
                    {formatDate(rocket.date_formation)}
                </Col>
                <Col>
                    {formatDate(rocket.date_complete)}
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openRocketPage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {rocket.owner}
                        </Col>
                        <Col>
                            {rocket.status == E_RocketStatus.InWork && <Button color="primary" onClick={() => handleAcceptRocket(rocket.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {rocket.status == E_RocketStatus.InWork && <Button color="danger" onClick={() => handleRejectRocket(rocket.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default RocketCard