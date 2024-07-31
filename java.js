document.addEventListener("DOMContentLoaded", () => {
  // ensures the js runs after the document is ready
  function updatePrice() {
    //Defines a function named updatePrice that will calculate and update the total price of the items in the cart.

    const items = document.querySelectorAll(".cart-item");
    //Selects all elements with the class cart-item (representing each item in the cart) and stores them in the items
    let totalPrice = 0;
    //Initializes a variable named totalPrice to 0, which will be used to store the total

    items.forEach((item) => {
      //Loops through each item in the cart

      const price = parseFloat(item.querySelector(".item-price").textContent);
      //Selects the price of the current item and converts it to a float (to allow for
      // decimal numbers)
      //element with the class item-price within the current item, gets its text content, and converts it to a floating-point number using parseFloat
      const quantity = parseInt(item.querySelector(".item-quantity").value);
      //Selects the quantity of the current item and converts it to an integer (to allow for
      // whole numbers)
      totalPrice += price * quantity;
      //Adds the price of the current item multiplied by its quantity to the total price
    });

    document.querySelector("#total-price").textContent = `$${totalPrice.toFixed(
      2
    )};
      
      
   
      
    )}`;

    //Updates the total price in the cart summary with the calculated total price, rounded to 2
    // decimal places using the toFixed method
    //Selects the element with the ID total-price and sets its text content to
    //the total price formatted as a currency string with two decimal places using toFixed(2).
  }

  //  set up interactions for a cart item
  function CartItem(item) {
    //Defines a function named CartItem that will handle interactions for a single cart item
    const increaseBtn = item.querySelector(".increase");
    //Selects the increase button for the current item
    const decreaseBtn = item.querySelector(".decrease");
    //Selects the decrease button for the current item

    const deleteBtn = item.querySelector(".delete");
    //Selects the delete button for the current item

    const likeBtn = item.querySelector(".like-heart");
    //Selects the like button for the current item

    const quantityInput = item.querySelector(".item-quantity");
    //Selects the quantity input for the current item

    // Increase quantity
    increaseBtn.addEventListener("click", () => {
      //Adds an event listener to the increase button that will be triggered when the button is clicked
      quantityInput.value = parseInt(quantityInput.value) + 1;
      //Increases the quantity of the current item by 1
      updatePrice();
      //Updates the total price in the cart summary
    });

    // Decrease quantity
    decreaseBtn.addEventListener("click", () => {
      //Adds an event listener to the decrease button that will be triggered when the button is clicked
      if (quantityInput.value > 0) {
        //Checks if the current quantity is greater than 0 to prevent going into negative quantities.

        quantityInput.value = parseInt(quantityInput.value) - 1;
        //Decreases the quantity of the current item by 1
        updatePrice();
        //Updates the total price in the cart summary
      }
    });

    // Delete item
    deleteBtn.addEventListener("click", () => {
      //Adds an event listener to the delete button that will be triggered when the button is clicked
      item.remove();
      //Removes the current item from the cart
      updatePrice();
      //Updates the total price in the cart summary
    });

    // Toggle like status
    likeBtn.addEventListener("click", () => {
      //Adds an event listener to the like button that will be triggered when the button is clicked

      likeBtn.classList.toggle("liked");
      //Toggles the 'liked' class on the like button to change its appearance

      if (likeBtn.classList.contains("liked")) {
        //Checks if the like button has the 'liked' class

        likeBtn.style.color = "red";
        //Changes the color of the like button to red to indicate that the item is liked
      } else {
        //If the item is not liked,

        likeBtn.style.color = "gray";
        //Changes the color of the like button to gray to indicate that the item is not liked
      }
    });
  }

  // Set up event listeners for all existing cart items

  document.querySelectorAll(".cart-item").forEach(CartItem);

  // Initial update of total price
  updatePrice();

  // Update price when quantity changes
  document.querySelectorAll(".item-quantity").forEach((quantityInput) => {
    quantityInput.addEventListener("input", updatePrice);
  });
});
