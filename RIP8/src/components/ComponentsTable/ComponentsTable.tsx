import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Component} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteComponent} from "store/slices/componentsSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    components:T_Component[]
}

const ComponentsTable = ({components}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (component_id) => {
        navigate(`/components/${component_id}`)
    }

    const openComponentEditPage = (component_id) => {
        navigate(`/components/${component_id}/edit`)
    }

    const handleDeleteComponent = async (component_id) => {
        dispatch(deleteComponent(component_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Цена',
                accessor: 'price',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openComponentEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteComponent(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!components.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={components} onClick={handleClick} />
    )
};

export default ComponentsTable