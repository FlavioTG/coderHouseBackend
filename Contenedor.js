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

module.exports = Contenedor

