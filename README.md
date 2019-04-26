# swavy-tees
An e-commerce app, that gives users the ability shop online for t-shirts, and make payments when they order. 

This is the server for the full-stack application. The front-end repository can be found [here](https://github.com/emekafredy/swavy-tees-react)

## Badges
[![Build Status](https://travis-ci.org/emekafredy/swavy-tees.svg?branch=develop)](https://travis-ci.org/emekafredy/swavy-tees)     \|
[![codecov](https://codecov.io/gh/emekafredy/swavy-tees/branch/develop/graph/badge.svg)](https://codecov.io/gh/emekafredy/swavy-tees)     \|
[![DeepScan grade](https://deepscan.io/api/teams/2900/projects/4836/branches/38490/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2900&pid=4836&bid=38490)

## Stack
[NodeJS](https://nodejs.org/en/)     \|
[ExpresJS](https://expressjs.com/)     \|
[MySQL](https://www.mysql.com/)        \|
[Sequelize ORM](http://docs.sequelizejs.com/)



# Installation

- filepath> git clone https://github.com/emekafredy/swavy-tees.git
- move to the project directory with `cd swavy-tees`
- run **_yarn install_**
- create a `.env` file and populate it with values for the variables listed in the `.sample.env` file on this repo
- create database with the MySQL DB (name should correspond with your DB_NAME in your `.env` file)
- run **_yarn migrations_**
- run **_yarn seed_** to add data for view
- run **_yarn dev_**
- app runs on `http://localhost:4000`
- You should be able to test the endpoints below with `postman` or its likes.


# API Endpoints
- every endpoint is prefixed with `/api`

 | Method | Description | Endpoints |
 | ------ | ----------- | --------- |
 | GET | Get all products in the app | /products |
 | GET | Get all products in a queried category | /products?category=`categoryName` |
 | GET | Get all products in a queried keyword | /products?keyword=`keywordName` |
 | POST | Users Sign Up | /register |
 | POST | Users Login | /login |
 | GET | Get a logged-in User's profile | /user |
 | PUT | Update a logged-in User's profile | /user |
 | GET | Get product categories | /product-categories |
 | GET | Get departments | /departments |
 | GET | Get a single product | /products/product/`:id` |
 | POST | Add a product to cart | /shopping-cart/`:productId` |
 | GET | Get all products added in cart | /shopping-cart |
 | DELETE |  Remove a product from cart | /shopping-cart/`:cartId` |
 | PUT |  Update product quantity in cart | /shopping-cart/`:cartId` |
 | DELETE |  Clear all products in the cart | /shopping-cart |
 | POST |  Make payment for products with stripe | /charge |
 | GET |  Get all orders made | /orders |
 | GET |  Get all shipping regions | /regions |

 
 # Request Examples

 - get all products - `{url}/api/products`
 - get products by categories - `{url}/api/products?category=French`
 - get products by keywords either in the products name or description - `{url}/api/products?keyword=shirt`
 - User sign up request body format (all fields are required)
 ```
  {
    "firstName": "emeka",
    "lastName": "emeka",
    "email": "em@em.com",
    "password": "confirmed",
    "confirmPassword": "confirmed"
  }
 ```
 - User login (all fields are required)
 ```
 {
    "email": "em@em.com",
    "password": "confirmed",
 }
 ```
- Update user's profile (fields are optional)
included fields: `firstName`, `lastName`, `address1`, `address2`, `city`, `postalCode`, `region`, `dayPhone`, `eveningPhone`, `mobilePhone`.

- Add product to cart: request body sample
```
{
	"sizeId": 2,
	"colorId": 1
}
```

- Update product quantity in cart: request body sample
```
{
	"quantity": 2,
}
```


# Production API 
- [api](https://swavy-tees.herokuapp.com/api)

- If you wish to test the app from the browser, you should get the Front-end repo [here](https://github.com/emekafredy/swavy-tees-react) and follow the installation instructions.

# API documentation
- Coming up soon

# Author
- Emeka Samuel Chinedu
