import { ProductAttributes, Product } from '../models/product.model';

export class ProductService {

    /**
     *This method is to add new products/services to the products
     */

    public addProduct(product: ProductAttributes): Promise<ProductAttributes> {
        return Product.create(product)
            .then(inserted => Promise.resolve(inserted))
            .catch(err => Promise.reject(err));
    }
}
