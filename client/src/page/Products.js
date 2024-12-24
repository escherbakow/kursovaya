import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneProducts} from "../http/productsAPI";

const Products = () => {
    const [products, setProducts] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneProducts(id).then(data => setProducts(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                {/* Изображение продукта */}
                <Col md={4}>
                <Image width={350} height={350} src={`${process.env.REACT_APP_API_URL}/${products.img}`} />
                </Col>

                {/* Описание продукта */}
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{products.name}</h2>
                        <p>Вес товара: {products.weight} грамм.</p>
                        <p>Информация о товаре: {products.information}</p>
                        {/* Здесь можно указать дополнительную информацию о продукте */}
                    </Row>
                </Col>

                {/* Для будущих компонентов или информации */}
                <Col md={4}>
                <Card
                     className="d-flex flex-column align-items-center justify-content-around"
                     style={{
                    width: 300,
                    height: 300,
                    fontSize: 32,
                    border: '5px solid lightgray',
                    backgroundColor: '#31372b' // Установка фона в зеленый цвет
                     }}
>
    <h3 style={{ color: 'white' }}>Цена товара: {products.price} руб.</h3>
    <Button variant={"outline-light"}>Добавить в корзину</Button>
</Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;