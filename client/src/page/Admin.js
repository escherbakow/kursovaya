import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateAnimals from '../components/modals/CreateAnimals';
import CreateProducts from '../components/modals/CreateProducts';
import CreateCategories from '../components/modals/CreateCategories';

const Admin = () => {
    const [animalsVisible, setAnimalsVisible] = useState(false)
    const [categoriesVisible, setCategoriesVisible] = useState(false)
    const [productsVisible, setProductsVisible] = useState(false)
   
    return (
        <Container className="d-flex flex-column">
             <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setAnimalsVisible(true)}
            >
                Добавить животное
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setCategoriesVisible(true)}
            >
                Добавить категорию
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setProductsVisible(true)}
            >
                Добавить товар
            </Button>
        <CreateAnimals show={animalsVisible}  onHide={() => setAnimalsVisible(false)}/>
        <CreateCategories show={categoriesVisible} onHide={() => setCategoriesVisible(false)}/>
        <CreateProducts show={productsVisible} onHide={() => setProductsVisible(false)}/>
            
        </Container>
    );
};

export default Admin;