import {
  state,
  loadProducts,
  updateProductQuantity,
  getSelectedProducts,
  removeProductFromSelection,
  getProductById,
  submitOrder,
  clearSelected,
} from "./model.js";

import productListView from "./views/productListView.js";
import { ProductView } from "./views/productView.js";
import cartView from "./views/cartView.js";
import modalView from "./views/modalView.js";

// Cart

function updateCart() {
  cartView.render(getSelectedProducts());
}

function handlerStartNewOrder() {
  clearSelected();
  updateProductList();
  updateCart();
  modalView.hideModal();
}

async function handlerConfirmOrder() {
  try {
    modalView.showModal();
    modalView.renderSpinner();
    const response = await submitOrder();
    modalView.render(response);
    modalView.addHandlerStartNewOrder(handlerStartNewOrder);
  } catch (e) {
    console.error(e);
    alert(e.message);
    modalView.hideModal();
  }
}

// Product List

const productViews = [];

function createProductList() {
  state.productList.forEach((product, id) => {
    const productView = new ProductView(id);
    productView.render(product);

    productView.addHandlerUpdateProductQty((qty) => {
      updateProductQuantity(product.id, qty);
      productView.render(product);
      updateCart();
    });
    productViews.push(productView);
  });
}

function updateProductList() {
  productViews.forEach(updateProduct);
}

// Product

function updateProduct(productView, id) {
  productView.render(getProductById(id));
}

function handlerRemoveProductFromCart(productId) {
  removeProductFromSelection(productId);
  updateProductList();
  updateCart();
}

//////////////////////////////////

async function init() {
  try {
    await loadProducts();
    productListView.render(state.productList);
    createProductList();
    updateProductList();

    cartView.render();
    cartView.addHandlerRemoveProduct(handlerRemoveProductFromCart);
    cartView.addHandlerConfirmOrder(handlerConfirmOrder);
  } catch (e) {
    console.error(e);
  }
}
init();
