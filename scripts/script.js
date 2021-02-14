// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // let df = get_data();
  // console.log(df);
  // localStorage.setItem('df', df)
  init();
});

async function init() {
  init_state_memory();
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

async function init_state_memory() {
  // if no state memory exists add emptystate memory
  if(localStorage.getItem("state_mem") === null) {
    let empty_json = {};
    localStorage.setItem("state_mem",  JSON.stringify(empty_json));
  }
  // else read state memory and update cart count
  // TODO
  let state_mem = JSON.parse(localStorage.getItem("state_mem"));
  for (let key of Object.keys(state_mem)){
    console.log(key + " -> " + state_mem[key]);
    if(state_mem[key]){
      document.getElementById("cart-count").innerHTML++;
    }
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

  // read localStorage and add item state 0 if it doesnt exist
  let state = false;
  state_mem = JSON.parse(localStorage.getItem("state_mem"));
  if(state_mem.hasOwnProperty(item_json.id)){
    state = state_mem[item_json.id];
  }
  else {
    state_mem[item_json.id] = false;
    // update persistent memory
    localStorage.setItem("state_mem", JSON.stringify(state_mem));
  }

  // initialize new item through ctor
  let item = new ProductItem(
    item_json.title,
    item_json.price,
    item_json.image,
    item_json.id,
    state);

  // add item to catalogue
  catalogue.appendChild(item);



}
