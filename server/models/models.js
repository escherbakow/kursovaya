const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique: true},
    password:{type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    adress:{type: DataTypes.STRING},
})

const Animals = sequelize.define('animals', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
});

const Categories = sequelize.define('categories', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
});

const Products = sequelize.define('products', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    information: { type: DataTypes.TEXT, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: false },

});

const Orders = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    totalprice: {type: DataTypes.FLOAT, allowNull: false}
    
})

const Trashes = sequelize.define('trash', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    totalprice: {type: DataTypes.FLOAT, allowNull: false}
})

const Reviews = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark: {type: DataTypes.INTEGER},
    information: { type: DataTypes.TEXT, allowNull: true },
}) 

const AnimalsCategories = sequelize.define('animals_categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})



User.hasOne(Trashes)
Trashes.belongsTo(User)

User.hasMany(Orders)
Orders.belongsTo(User)

Animals.hasMany(Products)
Products.belongsTo(Animals)

Categories.hasMany(Products)
Products.belongsTo(Categories)

Animals.belongsToMany(Categories, {through: AnimalsCategories })
Categories.belongsToMany(Animals, {through: AnimalsCategories })



module.exports = {
    User,
    Products,
    Orders,
    Trashes,
    Reviews,
    Animals,
    Categories,
    AnimalsCategories
}