import React, { useContext, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import ProductsItem from "./ProductsItem";
import { fetchProducts } from '../http/productsAPI'; // Импортируем функцию для получения товаров

const ProductsList = observer(() => {
    const { products } = useContext(Context);

    const loadProducts = async () => {
        const data = await fetchProducts();
        console.log('Fetched products:', data); // Логируем полученные данные
        products.setProducts(data); // Устанавливаем продукты в store
    };

    useEffect(() => {
        loadProducts(); // Загружаем продукты при монтировании компонента
    }, []);

    const handleDelete = (id) => {
        products.setProducts(prevProducts => prevProducts.filter(product => product.id !== id)); // Удаляем продукт из списка
    };

    return (
        <Row className="d-flex">
            {Array.isArray(products.products) && products.products.length > 0 ? (
                products.products.map(product => (
                    <ProductsItem key={product.id} products={product} onDelete={handleDelete} />
                ))
            ) : (
                <div>Товары отсутствуют</div>
            )}
        </Row>
    );
});

export default ProductsList;