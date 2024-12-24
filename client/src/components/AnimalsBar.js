import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const AnimalsBar = observer(() => {
    const {products} = useContext(Context)
    return (
        <ListGroup>
            {products.animals.map(animals =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={animals.id === products.selectedAnimals.id}
                    onClick={() => products.setSelectedAnimals(animals)}
                    key={animals.id}
                >
                    {animals.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default AnimalsBar;