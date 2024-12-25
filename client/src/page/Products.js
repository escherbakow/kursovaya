import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom'; // Импорт useNavigate
import { Context } from '../index';
import { fetchOneProducts } from "../http/productsAPI";

const Products = () => {
    const [products, setProducts] = useState({ info: [] });
    const { id } = useParams();
    const navigate = useNavigate(); // Хук для навигации
    const { user, products: productStore } = useContext(Context); // Доступ к хранилищу

    useEffect(() => {
        fetchOneProducts(id).then(data => setProducts(data));
    }, []);

    const handleAddToCart = () => {
        if (!user.isAuth) {
            navigate('/login'); // Если не авторизован, перенаправляем на страницу логина
        } else {
            productStore.addToCart(products); // Если авторизован, добавляем в корзину
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={350} height={350} src={`${process.env.REACT_APP_API_URL}/${products.img}`} />
                </Col>

                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{products.name}</h2>
                        <p>Вес товара: {products.weight} грамм.</p>
                        <p>Информация о товаре: {products.information}</p>
                    </Row>
                </Col>

                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{
                            width: 300, height: 300, fontSize: 32, border: '5px solid lightgray', backgroundColor: '#31372b'
                        }}
                    >
                        <h3 style={{ color: 'white' }}>Цена товара: {products.price} руб.</h3>
                        <Button variant={"outline-light"} onClick={handleAddToCart}>
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;