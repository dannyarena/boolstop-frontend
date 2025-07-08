export function addToCart(game) {
  if (!game) return 0;
  const discount = game.discount_percentage || 0;
  const priceWithDiscount = game.original_price;
  const price = Number(
    (game.original_price - (game.original_price * discount) / 100).toFixed(2)
  );

  const ItemToAdd = {
    videogame_id: game.id,
    name: game.name,
    original_price: game.original_price,
    priceWithDiscount,
    price,
    discount_percentage: discount,
    image: game.image,
    amount: 1,
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cart.findIndex(
    (item) => item.videogame_id === ItemToAdd.videogame_id
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].amount += 1;
  } else {
    cart.push(ItemToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart.find((item) => item.videogame_id === game.id)?.amount || 0;
}

export function removeFromCart(game) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cart.findIndex(
    (item) => item.videogame_id === game.id
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].amount -= 1;
    if (cart[existingItemIndex].amount === 0) {
      cart.splice(existingItemIndex, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart.find((item) => item.videogame_id === game.id)?.amount || 0;
}
