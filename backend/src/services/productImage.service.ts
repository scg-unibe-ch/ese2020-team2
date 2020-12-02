import { ProductImage } from '../models/productImage.model';

export class ImageService {

    public async create(file: any) {
        return ProductImage.create(file);
    }

    public async getFileName(imageId: string) {
        const image = await ProductImage.findOne({
            where: {
                fileId: imageId,
            },
        });
        return image.fileName;
    }

}

export const imageService = new ImageService();
