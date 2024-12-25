import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Col, Button } from "react-bootstrap";
import { deleteCategories } from '../http/productsAPI';

const CategoriesBar = observer(() => {
    const { products } = useContext(Context);
    const { user } = useContext(Context);

    const handleDelete = async (id) => {
        try {
            const result = await deleteCategories(id);
            console.log(result); // Логируем ответ от сервера
            
            // Обновляем состояние после удаления
            products.setCategories(products.categories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    return (
        <Row className="d-flex flex-row">
            {products.categories.map((category) => (
                <Col key={category.id} className="mb-3" xs="auto">
                    <Card
                        style={{
                            cursor: 'pointer',
                            backgroundColor:
                                category.id === products.selectedCategories?.id
                                    ? '#31372b' // Выделение зеленым, если категория выбрана
                                    : 'white', // Обычный белый фон для остальных
                            color: category.id === products.selectedCategories?.id 
                                    ? 'white' // Белый цвет текста на зеленом фоне 
                                    : 'black' // Черный текст по умолчанию
                        }}
                        className="p-3 text-center"
                        onClick={() => products.setSelectedCategories(category)}
                        border={
                            category.id === products.selectedCategories?.id
                                ? 'success' // Зеленая рамка для активного элемента
                                : 'light'
                        }
                    >
                        <div>{category.name}</div>
                        {user.isAuth && user.user.role === 'ADMIN' && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation(); // Предотвращает срабатывание onClick родительского элемента
                                handleDelete(category.id);
                            }}
                        >
                            Удалить
                        </Button>
                        )}
                    </Card>
                </Col>
            ))}
        </Row>
    );
});

export default CategoriesBar;