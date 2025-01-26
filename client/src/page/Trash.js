import React, { useContext, useState } from "react";
import { Button, Container, Row, Col, Card, Modal, Form } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom"; 


const Trash = observer(() => {
    const { products } = useContext(Context);
    console.log("Products in trash:", products); 

    const navigate = useNavigate(); 

    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleOpenPaymentModal = () => setShowPaymentModal(true);
    const handleClosePaymentModal = () => setShowPaymentModal(false);

    const increaseQuantity = (product) => {
        product.quantity = (product.quantity || 1) + 1;
        recalculateTotal();
    };

    const decreaseQuantity = (product) => {
        if (product.quantity > 1) {
            product.quantity -= 1;
            recalculateTotal();
        }
    };

    const recalculateTotal = () => {
        const newTotal = products.cart.reduce(
            (sum, product) => sum + product.price * (product.quantity || 1),
            0
        );
        setTotalPrice(newTotal);
    };

    const deleteProduct = (productIndex) => {
        products.cart.splice(productIndex, 1);
        recalculateTotal();
    };

    const [totalPrice, setTotalPrice] = useState(
        products.cart.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0)
    );

    const [formData, setFormData] = useState({
        cardNumber: "",
        cardHolder: "",
        expirationDate: "",
        cvc: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!/^\d{16}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = "Введите корректный номер карты (16 цифр).";
        }

        if (!/^[a-zA-Z\s]+$/.test(formData.cardHolder)) {
            newErrors.cardHolder = "Имя должно содержать только буквы и пробелы.";
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expirationDate)) {
            newErrors.expirationDate = "Введите срок действия в формате MM/YY.";
        }

        if (!/^\d{3}$/.test(formData.cvc)) {
            newErrors.cvc = "Введите корректный CVC (3 цифры).";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = () => {
        if (validateForm()) {
            const order = {
                id: Date.now(),
                items: [...products.cart],
                total: totalPrice,
                date: new Date().toLocaleString(),
            };
    
            console.log("Order to add:", order); 
            products.addOrder(order); 
            console.log("Current orders:", products.orders); 
    
            products.clearCart();

            alert(`Оплата на сумму ${totalPrice.toFixed(2)} руб. прошла успешно!`);
            handleClosePaymentModal();
            setFormData({
                cardNumber: "",
                cardHolder: "",
                expirationDate: "",
                cvc: "",
            });

            
            navigate("/orders");
        }
    };

    if (!products.cart || products.cart.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h2 className="mb-4">Ваша корзина пуста</h2>
                <p>Кажется, Вы еще ничего не добавили в корзину.</p>
                <Button variant="primary" href="/">
                    Перейти к товарам
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Моя корзина</h2>
            <Row className="g-4">
                {products.cart.map((product, index) => (
                    <Col key={`${product.id}-${index}`} xs={12} sm={6} md={4} lg={3}>
                        <Card className="shadow-sm h-100">
                            <Card.Img
                                variant="top"
                                src={`${process.env.REACT_APP_API_URL}/${product.img}`}
                                alt={product.name}
                                style={{ width: 150, height: 150, cursor: 'pointer' }} border={"light"}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-center">
                                    {product.name} - {product.price} руб.
                                </Card.Title>
                                <div className="text-center mb-3">
                                    Количество: {product.quantity || 1}
                                </div>
                                <div className="d-flex justify-content-between mt-auto">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => increaseQuantity(product)}
                                    >
                                        +
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => decreaseQuantity(product)}
                                    >
                                        -
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => deleteProduct(index)}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="mt-4">
                <h4 className="text-end">Итоговая стоимость: {totalPrice.toFixed(2)} руб.</h4>
            </div>

            <div className="mt-4 d-flex justify-content-end">
                <Button variant="success" size="lg" onClick={handleOpenPaymentModal}>
                    Перейти к оплате
                </Button>
            </div>

            <Modal show={showPaymentModal} onHide={handleClosePaymentModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Оплата заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="text-center mb-4">
                        Итоговая сумма к оплате: <strong>{totalPrice.toFixed(2)} руб.</strong>
                    </h5>
                    <Form>
                        <Form.Group className="mb-3" controlId="formCardNumber">
                            <Form.Label>Номер карты</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                isInvalid={!!errors.cardNumber}
                                placeholder="Введите номер карты"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cardNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCardHolder">
                            <Form.Label>Имя держателя карты</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardHolder"
                                value={formData.cardHolder}
                                onChange={handleInputChange}
                                isInvalid={!!errors.cardHolder}
                                placeholder="Введите имя держателя карты"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cardHolder}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formExpirationDate">
                            <Form.Label>Срок действия</Form.Label>
                            <Form.Control
                                type="text"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleInputChange}
                                isInvalid={!!errors.expirationDate}
                                placeholder="MM/YY"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.expirationDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCVC">
                            <Form.Label>CVC</Form.Label>
                            <Form.Control
                                type="text"
                                name="cvc"
                                value={formData.cvc}
                                onChange={handleInputChange}
                                isInvalid={!!errors.cvc}
                                placeholder="Введите CVC"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cvc}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePaymentModal}>
                        Отмена
                    </Button>
                    <Button variant="success" onClick={handlePayment}>
                        Оплатить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default Trash;