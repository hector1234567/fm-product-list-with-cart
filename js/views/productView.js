class ProductView {
  _data;
  _parentEl;

  constructor(id) {
    this._parentEl = document.getElementById("article--" + id);
  }

  render(data) {
    console.log(this);
    this._data = data;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }

  _generateMarkup() {
    const { name, category, price, image, quantity } = this._data;
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
          ${
            quantity > 0
              ? `<div class="article__quantity-buttons">
            <button class="article__quantity-button--sub">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <span class="article__quantity">${quantity}</span>
            <button class="article__quantity-button--add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>`
              : `<button class="article__add-to-cart-button">
            <img src="assets/images/icon-add-to-cart.svg" alt="Add to cart" />
            <span>Add to Cart</span>
          </button>`
          }
          
          <div class="article__content">
            <span class="article__section">${category}</span>
            <h2 class="article__name">${name}</h2>
            <span class="article__price">$${price}</span>
          </div>
        `;
    return html;
  }

  addHandlerUpdateProductQty(handler) {
    this._parentEl.addEventListener("click", function (ev) {
      if (ev.target.closest(".article__add-to-cart-button")) {
        handler(1);
      } else if (ev.target.closest(".article__quantity-button--sub")) {
        handler(-1);
      } else if (ev.target.closest(".article__quantity-button--add")) {
        handler(1);
      }
    });
  }
}

export { ProductView };
