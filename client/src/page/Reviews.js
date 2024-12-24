import React from 'react';
import {Button, Card} from'react-bootstrap';

const Reviews = () => {
    return (
        <div>
            <Card
                     className="d-flex flex-column align-items-center justify-content-around"
                     style={{
                    width: 200,
                    height: 100,
                    fontSize: 32,
                    border: '5px solid lightgray',
                    backgroundColor: '#31372b' // Установка фона в зеленый цвет
                     }}
>
    
    <Button variant={"outline-light"}>Оставить отзыв</Button>
</Card>
        </div>
    );
};

export default Reviews;