import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, TRASH_ROUTE, REVIEW_ROUTE, ORDER_ROUTE} from "../utils/consts"; // Подключаем путь для корзины
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar style={{ backgroundColor: '#31372b', color: 'white' }}>
            <Container>
                <Col>
                    <NavLink style={{ color: 'white', fontWeight: 'bold' }} to={SHOP_ROUTE}>
                        Зоомагазин №1
                    </NavLink>
                </Col>
                {user.isAuth ? (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        {user.user.role === 'ADMIN' && (
                            <Col>
                                <Button
                                    variant="outline-light"
                                    style={{ backgroundColor: '#31372b', color: 'white', whiteSpace: 'nowrap' }}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Административная панель
                                </Button>
                            </Col>
                        )}
                        <Col>
                            <Button
                                variant="outline-light"
                                style={{ backgroundColor: '#31372b', color: 'white', whiteSpace: 'nowrap' }}
                                onClick={() => navigate(TRASH_ROUTE)} // Переход на страницу корзины
                                className="ml-2"
                            >
                                Корзина
                            </Button>
                        </Col>
                        <Col>
                            {/* Кнопка корзины */}
                            <Button
                                variant="outline-light"
                                style={{ backgroundColor: '#31372b', color: 'white', whiteSpace: 'nowrap' }}
                                onClick={() => navigate(ORDER_ROUTE)} // Переход на страницу корзины
                                className="ml-2"
                            >
                                Мои заказы
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="outline-light"
                                style={{ backgroundColor: '#31372b', color: 'white', whiteSpace: 'nowrap' }}
                                onClick={() => navigate(REVIEW_ROUTE)} // Переход на страницу корзины
                                className="ml-2"
                            >
                                Отзывы
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="outline-light"
                                style={{ backgroundColor: '#31372b', color: 'white' }}
                                onClick={logOut}
                                className="ml-2"
                            >
                                Выйти
                            </Button>
                        </Col>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Col>
                            <Button
                                variant="outline-light"
                                style={{ backgroundColor: '#465945', color: 'white' }}
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Авторизация
                            </Button>
                        </Col>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;