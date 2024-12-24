import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnimalsBar from '../components/AnimalsBar';
import CategoriesBar from '../components/CategoriesBar';
import ProductsList from '../components/ProductsList';
import { Context } from "../index";
import { fetchCategories, fetchProducts, fetchAnimals } from '../http/productsAPI'; // Не забывайте импортировать fetchAnimals 
import {observer} from "mobx-react-lite";

const Shop = observer(() => {
  const { products } = useContext(Context);

  useEffect(() => {
    fetchAnimals().then(data => products.setAnimals(data))
    fetchCategories().then(data => products.setCategories(data))
    fetchProducts().then(data => {
        products.setProducts(data)
        products.setTotalCount(data.count)
    })
}, [])

useEffect(() => {
    fetchProducts(products.selectedAnimals.id, products.selectedCategories.id).then(data => {
      products.setProducts(data)
      products.setTotalCount(data.count)
    })
}, [products.selectedAnimals, products.selectedCategories])

return (
  <Container>
    <Row className='nt-2'>
      <Col md={3}>
        <AnimalsBar />
      </Col>
      <Col md={9}>
        <CategoriesBar />
        <ProductsList />
      </Col>
    </Row>
  </Container>
);
});

export default Shop;