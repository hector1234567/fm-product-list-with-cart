export const state = {
  productList: [],
  productSelection: [],
};

export async function loadProducts() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    state.productList = data.map((product, id) => {
      return { ...product, id };
    });
  } catch (e) {
    throw new Error("Error loading product list.");
  }
}
