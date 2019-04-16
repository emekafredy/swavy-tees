import { Op } from 'sequelize';
import models from '../../database/models';
import { errorResponse } from '../../helpers/errorResponse';

class ProductsController {
  static getPagination(req) {
    let { page } = req.query;
    page = page || 1;
    const limit = 5;
    const offset = limit * (page - 1);
    return {
      page, limit, offset,
    };
  }

  static getQueryClause(category, keyword) {
    const queryClause = {};
    if (category) {
      queryClause.include = [{
        model: models.Category,
        as: 'categories',
        where: { name: category },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }];
    }

    if (keyword) {
      queryClause.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    return queryClause;
  }

  static async getProducts(req, res) {
    const { category, keyword } = req.query;
    try {
      const {
        page, limit, offset,
      } = ProductsController.getPagination(req);

      const queryClause = ProductsController.getQueryClause(category, keyword);
      queryClause.limit = limit;
      queryClause.offset = offset;

      const products = await models.Product.findAndCountAll(queryClause);
      if (products.rows.length < 1) {
        const error = `No product found for ${category || keyword || 'now'}`;
        return errorResponse(error, 404, res);
      }
      const pages = Math.ceil(products.count / limit);
      const { count, rows } = products;
      return res.status(200).json({
        success: true,
        message: `${category || ''} Products succesfully retrieved`,
        products: rows,
        currentPage: page,
        pages,
        count,
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async getCategories(req, res) {
    try {
      const categories = await models.Category.findAll();
      return res.status(200).json({
        success: true,
        message: 'Categories succesfully retrieved',
        categories
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getDepartments(req, res) {
    try {
      const departments = await models.Department.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
          model: models.Category,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }]
      });
      return res.status(200).json({
        success: true,
        message: 'Departments succesfully retrieved',
        departments
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await models.Product.findOne({
        where: { id },
        include: [{
          model: models.Color,
          as: 'colors',
          attributes: { exclude: ['createdAt', 'updatedAt'], },
          through: { attributes: [] }
        }, {
          model: models.Size,
          as: 'sizes',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: { attributes: [] }
        }]
      });

      if (!product) {
        const error = 'Product not found';
        return errorResponse(error, 404, res);
      }

      return res.status(200).json({
        success: true,
        message: 'Product succesfully retrieved',
        product
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }
}

export default ProductsController;
