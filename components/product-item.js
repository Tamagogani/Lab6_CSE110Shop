// product-item.js
var localStorage = window.localStorage;

class ProductItem extends HTMLElement {
  // TODO
  constructor(title, item_price, img_src, id, state)
  {
    // default init
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});

    this.generate_item_attributes(title, item_price, img_src, id, state, shadowRoot);
  }

  generate_item_attributes(title, item_price, img_src, id, state, shadow) {

    // initialize the item wrapper
    const item = document.createElement('li');
    item.setAttribute('class', 'product');


    // initialize item attr. objects
    let img = document.createElement("img");
    let label = document.createElement("p");
    let price = document.createElement("p");
    let button = document.createElement("button");

    // set image attributes
    img.setAttribute('width', 200);
    img.setAttribute('src', img_src);
    img.setAttribute('alt', title);

    // set label attributes
    label.setAttribute('class', 'title');
    label.innerHTML = title;

    // set price attributes
    price.setAttribute('class', 'price');
    price.innerHTML = '$' + item_price;

    // set button attributes
    button.setAttribute('onclick', 'alert(\'Added to Cart!\')');
    button.innerHTML = 'Add to Cart';
    button.addEventListener('click', update_button(id));
    if(state) {
      button.innerHTML = "Remove from Cart";
    }

    // insert substructures to wrapper
    item.appendChild(img);
    item.appendChild(label);
    item.appendChild(price);
    item.appendChild(button);

    // link external stylesheet
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', './styles/styles.css');

    shadow.appendChild(linkElem);
    shadow.appendChild(item);

  }

}
function update_button(id) {
  let lambda = function () {
    // get product state
    let state_mem = JSON.parse(localStorage.getItem("state_mem"));
    let state = state_mem[id];

    // if true, item is in cart
    if(state) {
      this.innerHTML = "Add to Cart";
      document.getElementById("cart-count").innerHTML--;
      state_mem[id] = false;
    }
    else
    {
      this.innerHTML = "Remove from Cart";
      document.getElementById("cart-count").innerHTML++;
      state_mem[id] = true;
    }

    // update persistent memory
    localStorage.setItem("state_mem", JSON.stringify(state_mem));
  }
  return lambda;
}


customElements.define('product-item', ProductItem);
