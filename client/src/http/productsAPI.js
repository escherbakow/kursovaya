import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createAnimals = async (animals) => {
    const {data} = await $authHost.post('api/animals', animals)
    return data
}

export const fetchAnimals = async () => {
    const {data} = await $host.get('api/animals')
    return data
}

export const createCategories = async (categories) => {
    const {data} = await $authHost.post('api/categories', categories)
    return data
}

export const fetchCategories = async () => {
    try {
        const { data } = await $host.get('api/categories');
        console.log('Fetched categories:', data); // Лог консоли для проверки
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error); // Для анализа проблемы
        return [];
    }
};

export const createProducts = async (products) => {
    const {data} = await $authHost.post('api/products', products)
    return data
}

export const fetchProducts = async (animalId, categoryId) => {
    const {data} = await $host.get('api/products', {params: {
            animalId, categoryId
        }})
    return data
}

export const fetchOneProducts = async (id) => {
    const {data} = await $host.get('api/products/' + id)
    return data
}