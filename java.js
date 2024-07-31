document.addEventListener("DOMContentLoaded", function () {
  // Function to update the total price displayed
  function updateTotalPrice() {
    const totalPriceElement = document.querySelector(".total");

    let totalPrice = 0;

    document.querySelectorAll(".card").forEach((card) => {
      const quantity = parseInt(card.querySelector(".quantity").textContent);
      const unitPrice = parseInt(
        card.querySelector(".unit-price").textContent.replace(" $", "")
      );
      totalPrice += quantity * unitPrice;
    });

    totalPriceElement.textContent = `${totalPrice} $`;
  }

  // Function to handle quantity adjustments
  function adjustQuantity(card, increment) {
    const quantitySpan = card.querySelector(".quantity");
    let quantity = parseInt(quantitySpan.textContent);
    const unitPrice = parseInt(
      card.querySelector(".unit-price").textContent.replace(" $", "")
    );

    if (increment) {
      quantity++;
    } else if (quantity > 0) {
      quantity--;
    }

    quantitySpan.textContent = quantity;
    updateTotalPrice();
  }

  // Function to handle item deletion
  function handleDelete(card) {
    card.remove();
    updateTotalPrice();
  }

  // Function to handle item liking
  function handleLike(likeButton) {
    likeButton.classList.toggle("liked");
  }

  // Attach event listeners to all cards
  document.querySelectorAll(".card").forEach((card) => {
    // Quantity buttons
    const plusButton = card.querySelector(".fa-plus-circle");
    const minusButton = card.querySelector(".fa-minus-circle");
    const deleteButton = card.querySelector(".fa-trash-alt");
    const likeButton = card.querySelector(".fa-heart");

    plusButton.addEventListener("click", () => adjustQuantity(card, true));
    minusButton.addEventListener("click", () => adjustQuantity(card, false));
    deleteButton.addEventListener("click", () => handleDelete(card));
    likeButton.addEventListener("click", () => handleLike(likeButton));
  });

  // Initial update of the total price
  updateTotalPrice();
});
