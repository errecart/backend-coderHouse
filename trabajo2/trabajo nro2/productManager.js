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
            if(productMarket.lenght === 0){
                ProductManager.productId = 1
            }else{
                ProductManager.productId++
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
            this.path.push(newProduct)
            
             let complete = Object.values(newProduct)
             let validateComplete = complete.filter(item => item !== undefined)
            if(validateComplete.lenght < 7){
            return console.error("Please complete all the info")
            
            }
            const productString = JSON.stringify(productArray,null,"\t")
            await this.writeFile(productString)
            console.log("product saved succesfully");
        }catch(error){
            console.log(error);
        }

    }

    
    async getUsersById(id){

        try {
            const product = await this.getProducts()
            const busquedaProduct = product.find(prod=> prod.id===id);

            if(!busquedaProduct){
                throw new Error("That user doesn't exist.")
            }else{
                return busquedaProduct;
            }

        } catch (error) {
                console.log(error.message)
        }

    }

    async updateUser(id,newProperties){
        const products = await this.getUsers()
        const foundProduct = await this.getUsersById(id)

        const productUpdated = {...foundProduct, ...newProperties}

        const updatedList = products.map(prod=>{
            if(prod.id=== productUpdated.id){
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
            const products = await this.getData();
            const filteredProducts = products.filter((product) => product.id !== id);
            return [filteredProducts];
          } else {
            console.error("No se encontró ese producto");
          }
    }

}

const productManager1 = new ProductManager('./products/products.json')



// getProducts(){
//     if(fs.existsSync(this.path)){
//         const data = fs.readFileSync(this.path, 'utf-8')
//         console.log(data)
//         const products = JSON.parse(data)
//         return products
//     }else{
//         console.log("No products found");
//         return []
//     }
// }

// async addProduct(products){
//     const productMarket = await this.getProducts();
//     if(productMarket.lenght === 0){
//         ProductManager.productId = 1
//     }else{
//         ProductManager.productId++
//     }
//     const newProduct = {
//         id:ProductManager.productId,
//         name: products.name,
//         description:products.description,
//         price: products.price,
//         thumbnail: products.thumbnail,
//         code: products.code,
//         stock: products.stock
//     }
//     productMarket.push(newProduct)
//     await fs.writeFile(this.path, JSON.parse(productMarket,null,'\t'))
//     return newProduct
// }








// async deleteProduct(id) {
//     try{
//         const savedProducts = await this.getProducts();
//         const targetProduct = await this.getProductById(id)
//         const filteredList = savedProducts.filter(prod => prod.id !== id)
//         if(!targetProduct){
//             throw new Error('ERROR: No se encuentra la id especificada')
//         }
//         else{
//             const productListString = JSON.stringify(filteredList, null, '\t')
//             await fs.writeFile(this.path, productListString)
//             console.log(`${targetProduct.title} eliminado`)
//         }
//     }
//     catch(error){
//         console.log(error.message)
//     }
// }