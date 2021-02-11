// Script.js
var localStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
  // let df = get_data();
  // console.log(df);
  // localStorage.setItem('df', df)
  init();
});

async function init() {
  await get_data();
  await list_items();
}

async function get_data() {
  let url = 'https://fakestoreapi.com/products';
  try {
    // wait for response and wait for json parse
    let response = await fetch(url);
    let df = JSON.stringify(await response.json());
    // console.log(df);
    // write to local storage
    localStorage.setItem('df', df);
  }
  catch (error) {
    console.log(error);
  }
}

async function list_items() {
  var dataframe = JSON.parse(localStorage.getItem("df"));
  dataframe.forEach(create_item);
}

function create_item(item_json) {
  // console.log(item_json);
  // access the catalogue wrapper
  let catalogue = document.getElementById("product-list");

  // initialize new item through ctor
  let item = new ProductItem(
    item_json.title,
    item_json.price,
    item_json.image,
    item_json.id,
    true);

  // add item to catalogue
  catalogue.appendChild(item);
}
