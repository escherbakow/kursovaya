import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import { createCategories } from '../../http/productsAPI';

const CreateCategories = ({show, onHide}) => {
   const [value, setValue] = useState('')
   
       const addCategories = () => {
           createCategories({name: value}).then(data => {
               setValue('')
               onHide()
           })
       }  

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название категории"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCategories}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategories;