import React, { useContext } from 'react';
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import { deleteAnimals } from '../http/productsAPI';

const AnimalsBar = observer(() => {
    const { products } = useContext(Context);
    const { user } = useContext(Context);

    const handleDelete = async (id) => {
        try {
            const result = await deleteAnimals(id);
            console.log(result); // Логируем ответ от сервера
            
            // Обновляем состояние после удаления
            products.setAnimals(products.animals.filter(animal => animal.id !== id));
        } catch (error) {
            console.error('Failed to delete animal:', error);
        }
    };

    return (
        <ListGroup>
            {products.animals.map(animal => (
                <ListGroup.Item
                    key={animal.id}
                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    active={animal.id === products.selectedAnimals.id}
                    onClick={() => products.setSelectedAnimals(animal)}
                >
                    <span>{animal.name}</span>
                    {user.isAuth && user.user.role === 'ADMIN' && (
                        <Button variant="danger" onClick={() => handleDelete(animal.id)} style={{ marginLeft: '10px' }}>
                            Удалить
                        </Button>
                    )}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default AnimalsBar;