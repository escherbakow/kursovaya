import React, { useContext } from 'react';
import { Card, Col, Image, Button } from "react-bootstrap";
import rub from '../assets/rub.png';
import { useNavigate } from "react-router-dom"; 
import { PRODUCTS_ROUTE } from "../utils/consts";
import { deleteProducts } from '../http/productsAPI';
import { Context } from "../index"; 

const ProductsItem = ({ products, onDelete }) => {
    const navigate = useNavigate(); 
    const { user } = useContext(Context); // Предполагаем, что `user` предоставляется контекстом

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
            await deleteProducts(products.id);
            onDelete(products.id); // Сообщаем родительскому компоненту, что товар был удален
        }
    };

    return (
        <Col 
            md={3} 
            className={"mt-3"} 
            onClick={() => navigate(PRODUCTS_ROUTE + '/' + products.id)}
        >
            <Card style={{ width: 150, cursor: 'pointer' }} border={"light"}>
                <Image width={150} height={150} src={`${process.env.REACT_APP_API_URL}/${products.img}`} />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div>{products.price}</div>
                        <Image width={18} height={18} src={rub} />
                    </div>
                </div>
                <div>{products.name}</div>
                {user.isAuth && user.user.role === 'ADMIN' && (
                    <Button variant="danger" onClick={handleDelete}>Удалить</Button>
                )} {/* Кнопка для удаления */}
            </Card>
        </Col>
    );
};

export default ProductsItem;