import { state, loadProducts } from "./model.js";

import productListView from "./views/productListView.js";
import { ProductView } from "./views/productView.js";

async function init() {
  try {
    await loadProducts();
    productListView.render(state.productList);
    state.productList.forEach((product) => {
      const productView = new ProductView(product.id);
      productView.render(product);
    });
  } catch (e) {
    console.error(e.message);
  }
}

init();
