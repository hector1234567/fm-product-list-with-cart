class CartView {
  _data;
  _parentEl = document.querySelector(".cart");

  render(data) {
    this._data = data;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }

  _generateMarkup() {
    if (this._data && this._data.length) {
      return this._generateNotEmptyCart();
    }
    return this._generateEmptyCart();
  }

  _generateEmptyCart() {
    return `<h3 class="cart__heading">
            Your Cart (<span class="cart__quantity">0</span>)
          </h3>
          <figure class="cart__empty-image">
            <img
              src="assets/images/illustration-empty-cart.svg"
              alt="Empty Cart"
            />
            <figcaption>Your added items will appear here</figcaption>
          </figure>`;
  }

  _generateNotEmptyCart() {
    return `<h3 class="cart__heading">
            Your Cart (<span class="cart__quantity">${this._data.reduce(
              (acc, el) => acc + el.quantity,
              0
            )}</span>)
          </h3>
          <ul class="cart__list">
          ${this._data
            .map((element) => this._generateCartElement(element))
            .join("")}
          </ul>
          <div class="cart__order-total">
            <span class="cart__order-total-text">OrderTotal</span>
            <span class="cart__order-total-value">$${Number(
              this._getTotalPrice()
            ).toFixed(2)}</span>
          </div>
          <div class="cart__badge">
            <img
              src="assets/images/icon-carbon-neutral.svg"
              alt="Carbon Neutral"
            />
            <span>This is a <strong>carbon-neutral</strong> delivery</span>
          </div>
          <button class="cart__button">Confirm Order</button>`;
  }

  _generateCartElement(element) {
    const { quantity, name, price, id } = element;
    return `<li class="cart-element">
              <span class="cart-element__heading">${name}</span>
              <div class="cart-element__info">
                <span class="cart-element__quantity">${quantity}x</span>
                <span class="cart-element__unit-price">@$${Number(
                  price
                ).toFixed(2)}</span>
                <span class="cart-element__total-price">$${Number(
                  price * quantity
                ).toFixed(2)}</span>
              </div>
              <button class="cart-element__remove-button" data-id="${id}">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="none"
                  viewBox="0 0 10 10"
                >
                  <path
                    d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                  />
                </svg>
              </button>
            </li>`;
  }

  _getTotalPrice() {
    return this._data.reduce((acc, el) => (acc += el.price * el.quantity), 0);
  }

  addHandlerRemoveProduct(handler) {
    this._parentEl.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".cart-element__remove-button");
      if (!btn) return;
      const productId = btn.dataset.id;
      handler(productId);
    });
  }

  addHandlerConfirmOrder(handler) {
    this._parentEl.addEventListener("click", (ev) => {
      if (ev.target.closest(".cart__button")) {
        handler();
      }
    });
  }
}

export default new CartView();
