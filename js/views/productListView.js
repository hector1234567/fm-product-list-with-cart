class ProductListView {
  _data = [];
  _parentEl = document.querySelector(".articles");

  render(data) {
    this._data = data;
    this._parentEl.html = "";
    this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }

  _generateMarkup() {
    const html = this._data
      .map(
        (product) =>
          `<article class="article" id="article--${product.id}"></article>`
      )
      .join("");
    return html;
  }
}

export default new ProductListView();
