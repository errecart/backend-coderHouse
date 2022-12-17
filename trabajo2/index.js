const manageProd = require('./productManager.js');

const prod = new manageProd('./products/products.json')

const viewProducts = async () =>{

    try {
        console.log("Primera consulta")
        let seeProduct = await prod.getProducts()
        console.log(seeProduct);

        console.log("Nuevo usuario")
        const productDemo = {name: "Chocolate", description: "barra de chocolate", price: 35, thumbnail:"https://media.istockphoto.com/id/186682188/es/foto/barra-de-chocolate-con-un-bocado-faltante-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=6yX3nYgnqhb3WWrf3MjTEeLAskc2938cHnmnQ7CQBqM=",code: 02,stock:40};
        await prod.addProduct(productDemo)

        console.log("Nueva consulta")
        seeProduct = await prod.getProducts()
        console.log(seeProduct);

    } catch (error) {
        console.log(error)
    }
}

viewProducts()