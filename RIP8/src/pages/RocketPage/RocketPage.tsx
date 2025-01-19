import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftRocket,
    fetchRocket,
    removeRocket, sendDraftRocket,
    triggerUpdateMM, updateRocket
} from "store/slices/rocketsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_RocketStatus, T_Component} from "modules/types.ts";
import ComponentCard from "components/ComponentCard/ComponentCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";

const RocketPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const rocket = useAppSelector((state) => state.rockets.rocket)

    const [name, setName] = useState<string>(rocket?.name)

    const [weight, setWeight] = useState<string>(rocket?.weight)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchRocket(id))
        return () => dispatch(removeRocket())
    }, []);

    useEffect(() => {
        setName(rocket?.name)
        setWeight(rocket?.weight)
    }, [rocket]);

    const sendRocket = async (e) => {
        e.preventDefault()

        await saveRocket()

        await dispatch(sendDraftRocket())

        navigate("/rockets/")
    }

    const saveRocket = async (e?) => {
        e?.preventDefault()

        const data = {
            name
        }

        await dispatch(updateRocket(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteRocket = async () => {
        await dispatch(deleteDraftRocket())
        navigate("/components/")
    }

    if (!rocket) {
        return (
            <></>
        )
    }

    const isDraft = rocket.status == E_RocketStatus.Draft
    const isCompleted = rocket.status == E_RocketStatus.Completed

    return (
        <Form onSubmit={sendRocket} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой проект" : `Ракета №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName} disabled={!isDraft || is_superuser}/>
                {isCompleted && <CustomInput label="Фактическая масса (кг)" value={weight} disabled={true}/>}
            </Row>
            <Row>
                {rocket.components.length > 0 ? rocket.components.map((component:T_Component) => (
                    <Row key={component.id} className="d-flex justify-content-center mb-5">
                        <ComponentCard component={component} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Комплектующие не добавлены</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveRocket}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteRocket}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default RocketPage