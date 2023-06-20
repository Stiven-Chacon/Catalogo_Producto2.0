
var myHeaders = new Headers();
myHeaders.append("apikey", "");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
let categoria = parseInt(localStorage.categoria);
let valor = localStorage.valor;
const categorias = []
var allProductos=[]
let precio=""
function getCategorias() {
  return new Promise((resolve) => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then(response => response.json())
      .then(data => {
        data.forEach(element => {
            if (element.id==categoria){
                name=`<h1 style="text-align: center;">${element.name}</h1>`
                document.getElementById("cat").innerHTML=name
            }
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

function loadUrl(){  
    fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoria}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let slide="" ;
            allProductos = Object.values(data)
            data.forEach((element,index)=>{
            precio=`Precio ${element.price} USD`
            coverciones(element.price)
            slide += `
            <div class="card mb-3 mx-3" style="max-width: 340px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <a href="producto.html">
                    <img onclick="Producto('${element.id}')" src="${element.images}" style="height: 70%; margin-top: 22px;" class="img-fluid rounded-start" alt="...">
                    </a>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p style="height: 170px;" class="card-text">${element.description}</p>
                      <p class="card-text">
                        <div class="row">
                          <div class="col-6 d-grid gap-2">
                            <button class="btn btn-warning">Agregar</button>
                          </div>
                          <div class="col-6">
                            <input type="number" class="form-control" min=0 name="txtCantidad id="txtCantidad placeholder="Cantidad">
                          </div>
                        </div>
                      </p>
                      <p class="card-text"><small id="precio${element.price}" class="text-muted">${precio}</small></p>           
                    </div>
                  </div>
                </div>
              </div>`;
            })
            document.getElementById("producto").innerHTML=slide
        })
}
function Categorias(categoria){
    localStorage.categoria = categoria
  }
function Producto(producto){
  localStorage.producto = producto
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
      lista += `<a onclick="Producto('${element.id}')" href="producto.html" class="list-group-item list-group-item-action bg-dark" >
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

function filtrarProducto(element){
  let textoBuscar = document.getElementById("txtBuscar").value
  return element.title.includes(textoBuscar)
}

function coverciones(precio){
  fetch(`https://api.apilayer.com/fixer/convert?to=${valor}&from=USD&amount=${precio}`, requestOptions)
  .then(response => response.text())
  .then(result => {
      let data=JSON.parse(result)
      document.getElementById(`precio${precio}`).innerHTML = `Precio ${data.result} ${valor}`
  })
}