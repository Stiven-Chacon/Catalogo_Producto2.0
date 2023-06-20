var myHeaders = new Headers();
myHeaders.append("apikey", "");

let valor = localStorage.valor;
let producto = localStorage.producto;

let precio=""
const categorias = []
const productos = []
var allProductos=[]
function getCategorias() {
  return new Promise((resolve) => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.forEach(element => {
          categorias.push(element)
        });
        return resolve("Ok")
      })//Termina el fech
  })  //termina la promesa
}
function slideCategorias(){
    getCategorias()
        .then(data=>{
            let slide="" ;
            categorias.forEach((element,index)=>{
                slide+=`<li>
                  <a class="dropdown-item" href="filtro.html" onclick="Categorias('${element.id}')">
                    ${element.name}
                  </a>
                </li>`
            })
            document.getElementById("categorias").innerHTML=slide
        })
}
function slideProductos(){
fetch(`https://api.escuelajs.co/api/v1/products/${producto}`)
  .then(response => response.json())
  .then(data => {
      console.log(data)
      allProductos = Object.values(data)
        precio=`Precio ${data.price} USD`
        coverciones(data.price)
        document.getElementById("producto").innerHTML =
        `<div class="card" style="width: 38rem;">
            <img id="imagenPoke" class="card-img-top" src="${data.images}." alt="Card image cap">
            <div  class="card-body text-align-center">
            <h3 class="card-title d-flex justify-content-center">${data.title}</h3>
            <p class="card-text"><b>${data.description}</b>
            </div>
            <ul class="list-group list-group-flush">
            <li id="precio${data.price}" style="text-align: center;" class="list-group-item">${precio} </li>
            <div class="row">
                <div class="col-4 d-grid gap-2">
                  <button class="btn btn-warning">Agregar</button>
                </div>
                <div class="col-4">
                  <input type="number" class="form-control" min=0 name="txtCantidad id="txtCantidad placeholder="Cantidad">
                </div>
              </div>
            </ul>
            <div class="card-body">
            <a href="index.html" class="card-link">Pagina Principal</a>
            </div>
        </div>`
      })
}

function Categorias(categoria){
  localStorage.categoria = categoria
}
function Moneda(valor){
  localStorage.valor = valor
}   

function autoComplete(){
  let textoBuscar = document.getElementById("txtBuscar").value
  if (textoBuscar.length>=1){
    const filtroProductos = allProductos.filter(filtrarProducto)
    let lista = `<div class="list-group " >
                  <ul class="list-group ">`
    filtroProductos.forEach(element =>{
      lista += `<a onclick="" href="" class="list-group-item list-group-item-action bg-dark" >
                  <li class="list-group-item bg-dark text-white">
                    ${element.title}
                    <img id="">
                  </li>
                </a>`
    });
    lista +=  ` </ul>
              </div>`
    document.getElementById("lista").innerHTML=lista
  }
}

function filtrarProducto(data){
  let textoBuscar = document.getElementById("txtBuscar").value
  return data.title.includes(textoBuscar)
}

function coverciones(precio){
  fetch(`https://api.apilayer.com/fixer/convert?to=${valor}&from=USD&amount=${precio}`)
  .then(response => response.text())
  .then(result => {
      let data=JSON.parse(result)
      document.getElementById(`precio${precio}`).innerHTML = `Precio ${data.result} ${valor}`
  })
}