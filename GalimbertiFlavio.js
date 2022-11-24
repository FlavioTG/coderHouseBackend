class Usuario{
  constructor(nombre,apellido,libros,mascotas){
        this.nombre= nombre
        this.apellido  = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
  getFullName(){
        return (`El nombre completo es: ${this.nombre} ${this.apellido}`)
  }
  addMascota(mascota) {
        this.mascotas.push(mascota);
  }
  countMascotas(){
        return this.mascotas.length;
  }
  getMascotas(){
      return this.mascotas;
  }
  addBook(nombre,autor) {
      this.libros.push({name: nombre,author:autor});
  }
  getBookNames(){
      if(this.libros.length>0){
         console.log("Nombres de Libros")
      }
      else{
         console.log("Lista de nombres vacia")
      }
      return this.libros.map(({name})=>name);
  }
  getAutorNames(){
      if(this.libros.length>0){
         console.log("Nombres de Autores ingresados")
      }
      else{
         console.log("Lista de autores vacia")
      }
      return this.libros.map(({author})=>author);
  }
}

//PRUEBA DE INGRESO DE USUARIO
const usuario1 = new Usuario("John", "Doe",[], ["Cora"]);
//PRUEBA DE NOMBRE COMPLETO
console.log(usuario1.getFullName())

//PRUEBA DE AGREGAR MASCOTA
usuario1.addMascota("LOLA")
console.log(usuario1.getMascotas())
console.log("Cantidad de mascotas ingresadas: " ,usuario1.countMascotas())
usuario1.addMascota("PUDIN")
console.log(usuario1.getMascotas())
console.log("Cantidad de mascotas ingresadas: " ,usuario1.countMascotas())


//PRUEBA DE LISTAR NOMBRES DE LIBROS
console.log("PRUEBA DE LISTAR NOMBRES DE LIBROS")
console.log(usuario1.getBookNames());

usuario1.addBook("De la Tierra a la Luna","Julio Verne")
usuario1.addBook("La Isla del Dr Moreau ","H. G. Wells")
usuario1.addBook("ROMPER EL CIRCULO","HOOVER COLLEEN")

console.log(usuario1.getBookNames())
console.log(usuario1.getAutorNames())