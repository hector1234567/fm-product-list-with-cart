export const state = {
  productList: [],
};

export async function loadProducts() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    state.productList = data.map((product, id) => {
      return { ...product, id, quantity: 0 };
    });
  } catch (e) {
    throw new Error("Error loading product list.");
  }
}

export function updateProductQuantity(id, qty) {
  state.productList.forEach((element) => {
    if (element.id === id) {
      element.quantity += qty;
    }
  });
}

export function getSelectedProducts() {
  return state.productList.filter((el) => el.quantity > 0);
}

export function removeProductFromSelection(productId) {
  state.productList[productId].quantity = 0;
}

export function getProductById(id) {
  return state.productList.filter((el) => el.id === id)[0];
}

export async function submitOrder() {
  try {
    return await fakeSubmit(getSelectedProducts());
  } catch (e) {
    throw new Error(e);
  }
}

async function fakeSubmit(data) {
  return new Promise((resolve, reject) => {
    const error = Math.random() < 0.3;
    setTimeout(() => {
      if (error) {
        reject("There was an error confirming your order. Please try again!");
      } else {
        resolve({
          list: data,
          totalPrice: data.reduce(
            (acc, el) => (acc += el.price * el.quantity),
            0
          ),
        });
      }
    }, 3000);
  });
}

export function clearSelected() {
  state.productList.forEach((el) => (el.quantity = 0));
}
