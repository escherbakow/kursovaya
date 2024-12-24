import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Col } from "react-bootstrap";

const CategoriesBar = observer(() => {
    const { products } = useContext(Context);

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
                        {category.name}
                    </Card>
                </Col>
            ))}
        </Row>
    );
});

export default CategoriesBar;