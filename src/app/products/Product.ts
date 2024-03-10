export class Product {
    constructor(productId: string, productName: string) {
        this.productName = productName;
        this.productId = productId;
    }

    public productId: string;
    public productName: string;
}
