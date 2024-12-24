import React from 'react';
import { Card, Col, Image } from "react-bootstrap";
import rub from '../assets/rub.png';
import { useNavigate } from "react-router-dom"; // Используем useNavigate вместо useHistory
import { PRODUCTS_ROUTE } from "../utils/consts";

const ProductsItem = ({ products }) => {
    const navigate = useNavigate(); // Минимизируем изменения, заменяя useHistory на useNavigate

    return (
        <Col 
            md={3} 
            className={"mt-3"} 
            onClick={() => navigate(PRODUCTS_ROUTE + '/' + products.id)} // Используем navigate вместо history.push
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
            </Card>
        </Col>
    );
};

export default ProductsItem;