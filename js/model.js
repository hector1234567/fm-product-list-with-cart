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
