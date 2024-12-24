import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._animals = []
        this._categories = []   
        this._products = []
        this._selectedAnimals = {}
        this._selectedCategories = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
    makeAutoObservable(this)
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
}