import ProductModel from "../models/products.model.js";

class Products {
  constructor() {
    console.log("new instance of dbmanager");
  }

  async getProducts(ReqQuery) {
    let { query, sort, category, status } = ReqQuery;
    let opt = {};

    let limit = ReqQuery.limit || 10;
    let page = ReqQuery.page || 1;

    if (query) {
      opt = JSON.parse(query);
    }

    console.log(typeof opt);
    //console.log(JSON.parse(query));
    /* 
    if (category) {
      opt.categoria = category;
  }

  if (status) {
      opt.disponible = (status === 'true')
  } */

    if (limit && (isNaN(limit) || Number(limit) < 0)) {
      throw new AppError(400, { message: "Invalid limit query." });
    }

    let sortOption = {};
    if (sort === "asc") {
      sortOption = { price: 1 };
    } else if (sort === "desc") {
      sortOption = { price: -1 };
    }

    const options = {
      page,
      limit,
      sort: sortOption,
      lean: true,
    };

    console.log(
      "TESTEO PAGE",
      page,
      "TESTEO LIMIT",
      limit,
      "TESTEO sort",
      sort
    );

    let result = await ProductModel.paginate(opt, options);

    return result;
  }

  async addProduct(body) {
    let result = await ProductModel.create(body);
    return result;
  }

  async getProductById(id) {
    const foundProduct = await ProductModel.findOne({ _id: id });
    return foundProduct;
  }

  async updateProduct(pid, upProd) {
    const product = await ProductModel.findByIdAndUpdate(pid, upProd, {
      new: true,
    });
    return product;
  }

  async deleteProduct(pid) {
    const product = await ProductModel.deleteOne({ _id: pid });
    return product;
  }
}

export default Products;
