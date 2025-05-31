// Initialization class Producto: properties
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year; 
    }
}

// Initialisation class UI: methods
class UI {
    resetForm(){
        document.getElementById('productForm').reset();
    };
    addProduct(product){
        const productList = document.getElementById('productList');
        const li = document.createElement('li');
              li.innerHTML = `
                <span>
                    - Product name: <b>${product.name}</b> | 
                    Prix: <b>${product.price}</b> € | 
                    Year: <b>${product.year}</b>
                </span>
                <span>
                    <!-- <a><i class='bx bx-edit'></i></a> -->
                    <a name="delete" title="Delete Product"><i class='bx bxs-trash-alt' ></i></a>
                </span>              `
        productList.appendChild(li);
    };
    deleteProduct(element){
        if(element.parentElement.name === 'delete'){
            element = element.parentElement.parentElement.parentElement;
            element.remove();
        }
    };
    showMessage(messageText, messageStyle){
        let icon = '';
        if(messageStyle === "success" || messageStyle === 'info') {icon = "bx bx-check-double"}
        else {icon = "bx bxs-message-square-error"}
        const formContainer = document.querySelector('#formContainer'); 
        const msg = document.createElement('div');
              msg.className = "message";
        const success = document.createElement('div');
              success.className = `${messageStyle}`;
              msg.appendChild(success);
        const spanText = document.createElement('span');
              spanText.textContent = `${messageText}`
        const spanIcon = document.createElement('span');
              success.appendChild(spanText);
              success.appendChild(spanIcon);
        const btn = document.createElement('i');
              btn.className = `${icon}`;
              spanIcon.appendChild(btn);
              formContainer.appendChild(msg);
              setTimeout(function(){
                document.querySelector('.message').remove();
              }, 3000);
    };
}

// DOM event: click submit form
const productForm = document.getElementById('productForm');
      productForm.addEventListener('submit', function(e){
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        const product = new Product(name, price, year); 
        const ui = new UI();
        if(name === '' || price === '' || year === ''){
            ui.showMessage('Complete Fields Please', 'warning');
            e.preventDefault();
        }else{
            ui.addProduct(product);
            ui.showMessage('Product Added Successfully!','info');
            ui.resetForm();
            e.preventDefault();
        }
      });

// DOM event: click delete btn
const list = document.getElementById('productList');
      list.addEventListener('click', function(e){
          const ui = new UI();
                ui.deleteProduct(e.target);
                ui.showMessage('Product deleted successfully!','success');

      });