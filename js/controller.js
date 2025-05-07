import { state, loadProducts, updateProductQuantity } from "./model.js";

import productListView from "./views/productListView.js";
import { ProductView } from "./views/productView.js";

function createProductList(productList) {
  productList.forEach((product) => {
    const productView = new ProductView(product.id);
    productView.render(product);
    productView.addHandlerUpdateProductQty((qty) => {
      updateProductQuantity(product.id, qty);
      productView.render(product);
    });
  });
}

async function init() {
  try {
    await loadProducts();
    productListView.render(state.productList);
    createProductList(state.productList);
  } catch (e) {
    console.error(e.message);
  }
}
init();
