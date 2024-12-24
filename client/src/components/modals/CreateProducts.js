import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { createProducts, fetchAnimals, fetchCategories } from '../../http/productsAPI';

const CreateProducts = ({ show, onHide }) => {
    const { products } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [information, setInformation] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchAnimals().then((data) => products.setAnimals(data));
        fetchCategories().then((data) => products.setCategories(data));
    }, []);

    const selectFile = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files)
    };

    const addProducts = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('weight', `${weight}`);
        formData.append('img', file);
        formData.append('animalId', products._selectedAnimals.id);
        formData.append('categoryId', products._selectedCategories.id);
        formData.append('information', information);
        createProducts(formData).then((data) => onHide());
    };

    
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {products.selectedAnimals.name || 'Выберите животное'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {products.animals.map((animal) => (
                                <Dropdown.Item
                                    onClick={() => products.setSelectedAnimals(animal)}
                                    key={animal.id}
                                >
                                    {animal.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {products.selectedCategories.name || 'Выберите категорию'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {products.categories.map((categories) => (
                                <Dropdown.Item
                                    onClick={() => products.setSelectedCategories(categories)}
                                    key={categories.id}
                                >
                                    {categories.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название товара"
                    />
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите цену товара"
                        type="number"
                    />
                    <Form.Control
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите вес товара"
                        type="number"
                    />
                    <Form.Control
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}
                        className="mt-3"
                        placeholder="Введите информацию о товаре"
                    />
                    <Form.Control className="mt-3" type="file" onChange={selectFile} />
                    <hr />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addProducts}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(CreateProducts);