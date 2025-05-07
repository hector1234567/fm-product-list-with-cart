class ProductView {
  _data;
  _parentEl;

  constructor(id) {
    this._parentEl = document.getElementById("article--" + id);
  }

  render(data) {
    console.log(data);
    this._data = data;
    this._parentEl.html = "";
    this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }

  _generateMarkup() {
    const { name, category, price, image } = this._data;
    const html = `
          <figure class="article__image">
            <img
              src="${image.desktop}"
              alt="${name}"
              srcset="
                ${image.mobile}  654w,
                ${image.tablet}  424w,
                ${image.desktop} 480w
              "
              sizes="
            (max-width: 442px) 95vw,
            (max-width: 890px) 213px,
            250px"
            />
          </figure>
          <button class="article__add-to-cart-button">
            <img src="assets/images/icon-add-to-cart.svg" alt="Add to cart" />
            <span>Add to Cart</span>
          </button>
          <div class="article__content">
            <span class="article__section">${category}</span>
            <h2 class="article__name">${name}</h2>
            <span class="article__price">$${price}</span>
          </div>
        `;
    return html;
  }
}

export { ProductView };
