const products = []
const elements = []
var element;
var displaystatus = false;
var editing = -1;
var IPC = -1;

class productClass {
    constructor(name, price, quantity) {
        this.IPC = ++IPC;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

elements.push(
    {
        name: 'form',
        doc: document.querySelector('#new-product'),
    },
    {
        name: 'add',
        doc: document.querySelector('#cadastrar'),
    },
    {
        name: 'products',
        doc: document.querySelector("#tbody-produtos"),
    },
    {
        name: 'insert',
        doc: document.querySelector("#form-insert"),
    },
    {
        name: 'ipt-name',
        doc: document.getElementById('nome'),
    },
    {
        name: 'ipt-preco',
        doc: document.getElementById('preco'),
    },
    {
        name: 'ipt-quantidade',
        doc: document.getElementById('quantidade'),
    }
)

element = elements.find(x => x.name === 'form')
element.doc.addEventListener("click", createVisibility)

element = elements.find(x => x.name === 'add')
element.doc.addEventListener("click", createOrEdit)

function regexString(string) {
    if (`${string}`.length > 0 && string != '' && string != ' ') { return true }
    return false
}
function regexNumber(value) {
    if(!isNaN(parseFloat(value)) && value > 0) { return true }
    return false
}
function createProduct() {
    let name = document.getElementById('nome').value;
    let price = document.getElementById('preco').value;
    let quantity = document.getElementById('quantidade').value;
    if (!regexString(name) || !regexNumber(price) || !regexNumber(quantity))
    {
        notifyClient("Não foi possivel adicionar", "Algum dos valores inseridos não pode passar a fase de verificação do regex!")
        toggleVisibility()
        return
    }
    for (let i = 0; i < products.length; i++) {
        if (name == products[i].name) {
            notifyClient("Esse Produto já existe", "Procure editar o produto já existente!")
            return
        }
    }
    products.push(new productClass(name, price, quantity));
    toggleVisibility()
    displayProducts()
}
function EditProduct() {

    let name = document.getElementById('nome').value;
    let price = document.getElementById('preco').value;
    let quantity = document.getElementById('quantidade').value;
    if (!regexString(name) || !regexNumber(price) || !regexNumber(quantity))
    {
        notifyClient("Não foi possivel adicionar", "Algum dos valores inseridos não pode passar a fase de verificação do regex!")
        toggleVisibility()
        return
    }
    for (let i = 0; i < products.length; i++) {
        if (name == products[i].name && editing != i) {
            notifyClient("Esse Produto já existe", "Procure editar o já existente!")
            return
        }
    }
    products[editing].name = name;
    products[editing].price = price;
    products[editing].quantity = quantity;

    toggleVisibility()
    displayProducts()
}
function deleteProduct(IPC) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].IPC === IPC) {
            products.splice(i, 1);
            break;
        }
    }
    if(displaystatus) {toggleVisibility()}
    displayProducts()
}
function createOrEdit() {
    let text = document.getElementById('cadastrar').innerText;
    if (text == 'Cadastrar') { createProduct() }
    if (text == 'Editar') { EditProduct() }
}
async function createVisibility() {
    let element = elements.find(x => x.name === 'add')
    element = element.doc;
    element.innerHTML = 'Cadastrar';

    if(element.classList.contains("edit-product"))
    {
        element.classList.toggle("add-product");
        element.classList.toggle("edit-product");
    }

    document.getElementById('nome').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('quantidade').value = '';

    await toggleVisibility()
}
async function editVisibility(IPC) {
    let element = elements.find(x => x.name === 'add')
    element = element.doc;
    element.innerHTML = 'Editar';

    element = elements.find(x => x.name === 'add')
    element = element.doc;
    
    if(element.classList.contains("add-product"))
    {
        element.classList.toggle("add-product");
        element.classList.toggle("edit-product");
    }

    for (let i = 0; i < products.length; i++) {
        if (IPC == products[i].IPC) {
            document.getElementById('nome').value = products[i].name;
            document.getElementById('preco').value = products[i].price;
            document.getElementById('quantidade').value = products[i].quantity;
            editing = i;
        }
    }

    await toggleVisibility()
}
async function toggleVisibility() {
    if (displaystatus) { displaystatus = false } else { displaystatus = true }

    let element = elements.find(x => x.name === 'insert')
    element = element.doc;
    element.classList.toggle("display-none");
    element.classList.toggle("display-flex");

    element = elements.find(x => x.name === 'form')
    element = element.doc;
    element.classList.toggle("display-none");
    element.classList.toggle("display-flex");

    console.debug(`Set -> [toggleVisibility: ${displaystatus}]`)
}
async function displayProducts() {
    let element = elements.find(x => x.name === 'products')
    element = element.doc;
    element.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        let qnt;
        if (parseInt(products[i].quantity) > 1) {
            qnt = 'unidades'
        } else {
            qnt = 'unidade'
        }
        element.innerHTML += `
          <tr>
            <td>${products[i].name}</td>
            <td>R$ ${products[i].price}</td>
            <td>${products[i].quantity} ${qnt}</td> 
            <td><button class="edit-product" onclick="editVisibility(${products[i].IPC})">Editar</button></td>
            <td><button class="delete-product" onclick="deleteProduct(${products[i].IPC})">Excluir</button></td>
          </tr> 
      `;
    }
}
async function notifyClient(Title, Message) {
    // verify if's not suported 
    if (!("Notification" in window)) {
        return;
    }
    if (Notification.permission === "granted") {
        const options = {
            body: Message,
            icon: "/img/logo.jpg",
        };
        new Notification(Title, options);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                notifyClient(Title, Message);
            }
        });
    }
}