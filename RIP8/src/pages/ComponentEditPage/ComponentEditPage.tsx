import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteComponent,
    fetchComponent,
    removeSelectedComponent,
    updateComponent,
    updateComponentImage
} from "store/slices/componentsSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const ComponentEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {component} = useAppSelector((state) => state.components)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(component?.name)

    const [category, setCategory] = useState<string>(component?.category)

    const [description, setDescription] = useState<string>(component?.description)

    const [price, setPrice] = useState<number>(component?.price)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(component?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveComponent = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateComponentImage({
                component_id: component.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            price,
            category
        }

        await dispatch(updateComponent({
            component_id: component.id,
            data
        }))

        navigate("/components-table/")
    }

    useEffect(() => {
        dispatch(fetchComponent(id))
        return () => dispatch(removeSelectedComponent())
    }, []);

    useEffect(() => {
        setName(component?.name)
        setDescription(component?.description)
        setCategory(component?.category)
        setPrice(component?.price)
        setImgURL(component?.image)
    }, [component]);

    const handleDeleteComponent = async () => {
        await dispatch(deleteComponent(id))
        navigate("/components-table/")
    }

    if (!component) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput label="Категория" placeholder="Введите категорию" value={category} setValue={setCategory}/>
                    <CustomInput type="number" label="Цена" placeholder="Введите цену" value={price} setValue={setPrice}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveComponent}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteComponent}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default ComponentEditPage