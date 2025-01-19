import {useAppDispatch, useAppSelector} from "store/store.ts";
import {Button, CardText, Form} from "reactstrap";
import {FormEvent, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {handleUpdateProfile} from "store/slices/userSlice.ts";

const ProfilePage = () => {

    const {username} = useAppSelector((state) => state.user)

    const [inputPassword, setInputPassword] = useState("")

    const dispatch = useAppDispatch()

    const handleSaveProfile = async (e:FormEvent) => {
        e.preventDefault()

        const data = {
            password: inputPassword
        }

        dispatch(handleUpdateProfile(data))
    }

    return (
        <Form onSubmit={handleSaveProfile} className="w-25">
            <CardText>Логин: {username}</CardText>
            <CustomInput label="Сбросить пароль" placeholder="Введите новый пароль" value={inputPassword} setValue={setInputPassword} errorText={"Введены некорректные данные"} required={true} />
            <Button type="submit" color="primary" className="mt-3">Сохранить</Button>
        </Form>
    )
}

export default ProfilePage