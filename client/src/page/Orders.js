import React, { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";


const Orders = observer(() => {
    const { products } = useContext(Context);

    if (!products.orders || products.orders.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h2>У вас пока нет заказов</h2>
                <p>Оформите первый заказ!</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Мои заказы</h2>
            <Row className="g-4">
                {products.orders.map((order) => (
                    <Col key={order.id} xs={12}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Заказ #{order.id}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Дата: {order.date}
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Итоговая стоимость:</strong> {order.total.toFixed(2)} руб.
                                </Card.Text>
                                <h6>Состав заказа:</h6>
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={item.id || idx}>
                                            {item.name} — {item.quantity || 1} шт. за {item.price} руб.
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
});

export default Orders;