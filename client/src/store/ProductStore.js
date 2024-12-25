import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._animals = [];
        this._categories = [];
        this._products = [];
        this._cart = [];
        this._orders = []; // Убедитесь, что массив инициализирован здесь
        this._selectedAnimals = {};
        this._selectedCategories = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;
        makeAutoObservable(this); // Не забудьте инициализировать MobX
    }

    addOrder(order) {
        // Добавляем заказ, здесь важно чтобы не было ошибок
        this._orders.push(order);
    }

    // Геттеры для доступа к состоянию
    get orders() {
        return this._orders;
    }

    setAnimals(animals) {
        this._animals = animals
    }
    setCategories(categories) {
        this._categories= categories
    }
    setProducts(products) {
        this._products = products
    }

    setSelectedAnimals(animals) {
        this.setPage(1)
        this._selectedAnimals = animals
    }
    setSelectedCategories(categories) {
        this.setPage(1)
        this._selectedCategories = categories
    }
   
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    addToCart(product) {
        const existingProduct = this._cart.find(item => item.id === product.id); // Проверяем, есть ли продукт в корзине
        if (!existingProduct) {
            this._cart = [...this._cart, product]; // Добавляем новый продукт в массив
        } else {
            console.log("Продукт уже в корзине.");
        }
    }

    removeFromCart(productId) {
        this._cart = this._cart.filter(product => product.id !== productId)
    }

    clearCart() {
        this._cart = []
    }


    get animals() {
        return this._animals
    }
    get categories() {
        return this._categories
    }
    get products() {
        return this._products
    }
    get selectedAnimals() {
        return this._selectedAnimals
    }
    get selectedCategories() {
        return this._selectedCategories
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

    get cart() { // Возвращаем товары в корзине
        return this._cart
    }
}