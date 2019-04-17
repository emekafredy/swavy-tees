import { Op } from 'sequelize';
import models from '../../database/models';
import { errorResponse } from '../../helpers/errorResponse';

/**
 * @class ProductsController
 */
class ProductsController {
  /**
   * @description method to call pagination on data that could be much
   * @static
   * @param {object} req express request object
   * @memberof ProductsController
   */
  static getPagination(req) {
    let { page } = req.query;
    page = page || 1;
    const limit = 5;
    const offset = limit * (page - 1);
    return {
      page, limit, offset,
    };
  }

  /**
   * @description query to called on the getProducts method. This helps identify what w call in the params and acts accordingly
   * @static
   * @param {string} category string for product categories
   * @param {object} keyword string for keywords in a product
   * @memberof ProductsController
   */
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

  /**
   * @description query to get all products and serach for specific results with added query params
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof ProductsController
   */
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
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to get all products categories
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof ProductsController
   */
  static async getCategories(req, res) {
    try {
      const categories = await models.Category.findAll();
      return res.status(200).json({
        success: true,
        message: 'Categories succesfully retrieved',
        categories
      });
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to get all departments
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof ProductsController
   */
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
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to get a product by its id
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof ProductsController
   */
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
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }
}

export default ProductsController;
