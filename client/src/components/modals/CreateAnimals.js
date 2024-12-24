import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import { createAnimals } from '../../http/productsAPI';

const CreateAnimals = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addAnimals = () => {
        console.log('Payload:', { name: value }); // Вывод в консоль
        createAnimals({ name: value })
            .then((data) => {
                console.log('Server response:', data); // Ответ сервера
                setValue('');
                onHide();
            })
            .catch((error) => {
                console.error('Error:', error); // Логируем ошибку
            });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить животное
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={"Введите название животного"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addAnimals}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateAnimals;