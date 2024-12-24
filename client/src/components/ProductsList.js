import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ProductsItem from "./ProductsItem";



const ProductsList = observer(() => {
    const {products} = useContext(Context)

    return (
        <Row className="d-flex">
            {products.products?.map(product => (
                <ProductsItem key={product.id} products={product} />
            ))}
        </Row>
    );
});

export default ProductsList;