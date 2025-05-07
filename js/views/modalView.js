class ModalView {
  _data;
  _parentEl = document.querySelector(".modal");
  _overlay = document.querySelector(".overlay");

  render(data) {
    this._data = data;
    this._parentEl.innerHTML = this._generateMarkup();
  }

  _generateMarkup() {
    return `<header class="modal__header">
        <figure class="modal__check-icon">
          <img src="assets/images/icon-order-confirmed.svg" alt="Confirmed" />
        </figure>
        <h2 class="modal__heading">Order Confirmed</h2>
        <p class="modal__text">We hope you enjoy your food!</p>
      </header>
      <div class="modal__content">
        <ul class="modal__list">
        ${this._data.list.map(this._generateMarkupElement).join("")}
        </ul>
        <div class="modal__order-total">
          <span class="modal__order-total-text">Order Total</span>
          <span class="modal__order-total-value">$${Number(
            this._data.totalPrice
          ).toFixed(2)}</span>
        </div>
      </div>
      <button class="modal__button">Start New Order</button>`;
  }

  _generateMarkupElement(element) {
    const { image, name, quantity, price } = element;
    return `<li class="order-element">
            <figure class="order-element__image">
              <img
                src="${image.thumbnail}"
                alt="${name}"
              />
            </figure>
            <div class="order-element__container">
              <span class="order-element__heading">${name}</span>
              <div class="order-element__info">
                <span class="order-element__quantity">${quantity}x</span>
                <span class="order-element__unit-price">@$${Number(
                  price
                ).toFixed(2)}</span>
              </div>
            </div>
            <span class="order-element__total-price">$${Number(
              price * quantity
            ).toFixed(2)}</span>
          </li>`;
  }

  renderSpinner() {
    this._parentEl.innerHTML = `<div class="spinner"></div>`;
  }

  showModal() {
    this._overlay.classList.remove("hidden");
    this._parentEl.classList.remove("hidden");
  }

  hideModal() {
    this._overlay.classList.add("hidden");
    this._parentEl.classList.add("hidden");
  }

  addHandlerStartNewOrder(handler) {
    this._parentEl.addEventListener("click", (ev) => {
      if (ev.target.closest(".modal__button")) {
        handler();
      }
    });
  }
}

export default new ModalView();
