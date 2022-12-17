const fs = require("fs/promises")
const {existsSync} = require("fs")


class ProductManager{
    static productId = 0

    constructor(path){
        this.path = path
    }

    async readFile(){
        return await fs.readFile(this.path,"utf-8")
    }

    async writeFile(string){
        return await fs.writeFile(this.path, string,"utf-8")
    }

    async getProducts(){
        try{
            if(existsSync(this.path)){
                const productString = await this.readFile()
                const product = await JSON.parse(productString)
                return product
            }else{
                return []
            }
        }catch(error){
            throw new Error(error.message)
        }
    }

    async addProduct(products){
        try{
            const productMarket = await this.getProducts()
            if(!productMarket.lenght){
                ProductManager.productId = 1
            }else{
                ProductManager.productId = productMarket[productMarket.lenght-1].id + 1
            }
            const newProduct = {
                id:ProductManager.productId,
                name: products.name,
                description:products.description,
                price: products.price,
                thumbnail: products.thumbnail,
                code: products.code,
                stock: products.stockt
            }

            productMarket.push(newProduct)
            const productString = JSON.stringify(productMarket,null,"\t")
            await fs.writeFile(this.path,productString)
            console.log("product saved succesfully");
            
            let complete = Object.values(newProduct)
            let validateComplete = complete.filter(item => item !== undefined)
            if(validateComplete.lenght < 7){
            return console.error("Please complete all the info")
            }

        }catch(error){
            console.log(error);
        }

    }

    
    async getProdcutById(id){

        try {
            const product = await this.getProducts()
            const foundProduct = product.find(prod=> prod.id===id);

            if(!foundProduct){
                throw new Error("That product doesn't exist.")
            }else{
                return foundProduct;
            }

        } catch (error) {
                console.log(error.message)
        }

    }

    async updateProduct(id,newProperties){
        const products = await this.getProducts()
        const foundProduct = await this.getProdcutById(id)

        const productUpdated = {...foundProduct, ...newProperties}

        const updatedList = products.map(prod=>{
            if(prod.id === productUpdated.id){
                return productUpdated
            }else{
                return prod
            }
        })

        const stringList = await JSON.stringify(updatedList,null, "\t")

        await this.writeFile(stringList)
        return stringList
    }

     async deleteProduct(){
        if (fs.existsSync(this.path)) {
            const products = await this.getProducts();
            const filteredProducts = products.filter((product) => product.id !== id);
            return [filteredProducts];
          } else {
            console.error("No se encontró ese producto");
          }
    }

}

module.exports = ProductManager



