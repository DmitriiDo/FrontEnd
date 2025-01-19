import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_rocket_id: string,
    components_count: number
}

const Bin = ({isActive, draft_rocket_id, components_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return (
        <Link to={`/rockets/${draft_rocket_id}/`} className="bin-wrapper">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {components_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin