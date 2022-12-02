const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.Archivo = fileName;
    }

    // método adicional para guardar datos
    saveData = async (data) => {
        try {
            await fs.promises.writeFile(this.Archivo, JSON.stringify(data, null, 2));
        } catch (err) {
            console.log('error escritura en archivo!', err);
        }
    };

    save = async (item) => {

        const productsArray = (await this.getAll()) || [];// Si no existe el archivo se asigna un array vacio
        try {
            let id = 0;
            productsArray.length === 0
                ? (id = 1)
                : (id = productsArray[productsArray.length - 1].id + 1);
            const newItem = { ...item, id: id };
            productsArray.push(newItem);
            await this.saveData(productsArray);
            console.log(`producto ${item.title} ingresado ok!`);
            return newItem.id;
        } catch (err) {
            console.log('error escritura en archivo!', err);
        }
    };

    getById = async (id) => {
        const productsArray = (await this.getAllHide()) || [];
        try {
            const productById = productsArray.find((product) => product.id === id);
            console.log('Producto encontrado: \n', productById || 'No existe id');
            return productById || null;
        } catch (err) {
            console.log('Error, ', err);
        }
    };

    getAllHide = async () => {//para no visualizar el contenido al buscar en el archivo (no hago el log, despues veo de optimizar)
        try {
            const content = await fs.promises.readFile(this.Archivo);
            const contentArray = JSON.parse(content);
            return contentArray;
        } catch (err) {
            console.log('Archivo vacío');
        }
    };


    getAll = async () => {
        try {
            const content = await fs.promises.readFile(this.Archivo);
            const contentArray = JSON.parse(content);
            console.log('Productos: \n', contentArray);
            return contentArray;
        } catch (err) {
            console.log('Archivo vacío');
        }
    };

    deleteById = async (id) => {
        const productsArray = (await this.getAllHide()) || [];
        try {
            const filteredProducts = productsArray.filter(
                (product) => product.id !== id
            );
            this.saveData(filteredProducts);
            console.log('Producto eliminado!');
        } catch (err) {
            console.log('Error, ', err);
        }
    };

    deleteAll = async () => {
        try {
            this.saveData([]);
            console.log('Productos eliminados!');
        } catch (err) {
            console.log('Error, productos no eliminados!', err);
        }
    };
}

const produ = {
    title: 'Martillo de Juez',
    price: 100,
    thumbnail: 'https://cdn.pixabay.com/photo/2017/07/10/23/49/club-2492011_960_720.jpg',
};

const produ1 = {
    title: 'Taladro Electrico',
    price: 150,
    thumbnail: 'https://cdn.pixabay.com/photo/2013/07/12/19/30/power-drill-154903_960_720.png',
};

const produ2 = {
    title: 'Pelota Sonrisa',
    price: 20,
    thumbnail: 'https://cdn.pixabay.com/photo/2016/11/21/13/58/ball-1845546_960_720.jpg',
};

const produ3 = {
    title: 'Remera',
    price: 35,
    thumbnail: 'https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png',
};

const productos = new Contenedor('productos.txt');

/*
console.log("Prueba 1: Ingreso de productos");
productos.save(produ);
//productos.save(produ1);
//productos.save(produ2);
//productos.save(produ3);
*/

/*
console.log("Prueba 2: Obtener producto con el ID correspondiente");
productos.getById(2)
*/

/*
console.log("Prueba 3: Obtener todos los productos");
productos.getAll()
*/

/*
console.log("Prueba 4: Eliminar un elemento por ID");
productos.deleteById(1)
*/

/*
console.log("Prueba 5: Borrar todos los productos");
productos.deleteAll()
*/


