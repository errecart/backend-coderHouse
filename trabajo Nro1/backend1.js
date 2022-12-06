class ProductManager {
    static productId = 0
    constructor(){
        this.productos = [];
    }
    getProducts(){
        return this.productos
    }

    addProduct(name,description,price,thumbnail,code,stock){
        ProductManager.productId++;
        const newCode = this.productos.find(c => c.code === code); 
        const newProduct = {
            id: ProductManager.productId,
            name:name,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock:stock
        };
        if(newCode){
            console.error('this code already exist');
            return;
        }
        let complete = Object.values(newProduct)
        let validateComplete = complete.filter(item => item !== undefined)
        if(validateComplete.lenght < 7){
           return console.error("Please complete all the info")
            
        }else{
            this.productos.push(newProduct)
            return console.log("New Product added")
        }
    }

    getProductById(productId){
        const busquedaProduct = this.productos.find(pro => pro.id === productId)
        if(!busquedaProduct){
            console.error("Not Found");
            return
        }else{
            console.log("product found");
            
            
        }
    }
}

const shopProduct = new ProductManager();


console.log(shopProduct.addProduct("Chocolate","barra de chocolate",15,"https://media.istockphoto.com/id/186682188/es/foto/barra-de-chocolate-con-un-bocado-faltante-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=6yX3nYgnqhb3WWrf3MjTEeLAskc2938cHnmnQ7CQBqM=",01,40));
console.log(shopProduct.addProduct("helado","muchos sabores",20,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2JLsRJoAD-9iPTwEZaGe9X8JnLqubh8ztJV42M3hQuA&s",02,40));
console.log(shopProduct.addProduct("Torta","un solo sabor",40,"https://d1uz88p17r663j.cloudfront.net/original/e89d19d331ac413811e3b1c11a893991_torta-princesa.jpg",02,25));
console.log(shopProduct.getProducts());
console.log(shopProduct.getProductById(1));
console.log(shopProduct.getProductById(4));