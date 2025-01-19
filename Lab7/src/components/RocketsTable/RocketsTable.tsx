import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import {T_Rocket} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";

const RocketsTable = ({rockets}:{rockets:T_Rocket[]}) => {
    const navigate = useNavigate()

    const handleClick = (rocket_id) => {
        navigate(`/rockets/${rocket_id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => STATUSES[value]
            },
            {
                Header: 'Вычисляемое поле',
                accessor: 'weight',
                Cell: ({ value }) => value
            },
            {
                Header: 'Дата создания',
                accessor: 'date_created',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата формирования',
                accessor: 'date_formation',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата завершения',
                accessor: 'date_complete',
                Cell: ({ value }) => formatDate(value)
            }
        ],
        []
    )

    return (
        <CustomTable columns={columns} data={rockets} onClick={handleClick}/>
    )
};

export default RocketsTable