import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Component} from "modules/types.ts";

interface ComponentCardProps {
    component: T_Component,
    isMock: boolean
}

const ComponentCard = ({component, isMock}: ComponentCardProps) => {
    return (
        <Card key={component.id} style={{width: '18rem', margin: "0 auto 50px" }}>
            <CardImg
                src={isMock ? mockImage as string : component.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {component.name}
                </CardTitle>
                <CardText>
                    Цена: {component.price} руб.
                </CardText>
                <Link to={`/components/${component.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default ComponentCard