import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, ListGroup } from 'react-bootstrap';

const Reviews = () => {
    const [show, setShow] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [mark, setMark] = useState(1);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reviews');
            const data = await response.json();
            setReviews(data); // Сохраняем отзывы в состояние
        } catch (error) {
            console.error('Ошибка при получении отзывов:', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleMarkChange = (e) => {
        setMark(Number(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            mark,
            information: reviewText,
        };

        try {
            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                await fetchReviews(); // Обновляем список отзывов после успешной отправки
                setReviewText('');
                setMark(1);
                handleClose();
            } else {
                alert('Ошибка при отправке отзыва');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке отзыва');
        }
    };

    return (
        <div>
            <Card
                className="d-flex flex-column align-items-center justify-content-around"
                style={{
                    width: 200,
                    height: 100,
                    fontSize: 32,
                    border: '5px solid lightgray',
                    backgroundColor: '#31372b'
                }}
            >
                <Button variant={"outline-light"} onClick={handleShow}>
                    Оставить отзыв
                </Button>
            </Card>

            {/* Модальное окно */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Оставить отзыв</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="reviewMark">
                            <Form.Label>Оценка (от 1 до 5)</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={mark} 
                                onChange={handleMarkChange}
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="reviewText">
                            <Form.Label>Ваш отзыв</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={reviewText} 
                                onChange={handleInputChange} 
                                placeholder="Введите ваш отзыв" 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Отправить
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Список оставленных отзывов */}
            <h3 className="mt-4">Отзывы:</h3>
            <ListGroup>
                {reviews.map((review) => (
                    <ListGroup.Item key={review.id}>
                        <strong>Оценка: {review.mark} </strong>
                        <p>{review.information}</p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Reviews;