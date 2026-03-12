const elements = {
  wishListBtn: document.querySelector('.wishlist_button'),
  cartBtn: document.querySelector('.cart_button'),

  size: document.querySelector('#size'),
  color: document.querySelector('#color'),
  amount: document.querySelector('#amount'),
};

elements.cartBtn.addEventListener('click', () => {
  const saveData = {
    id: new URLSearchParams(location.search).get('id') || location.pathname.split('/').slice(-1)[0].replace('.html', ''),
    size: !!elements.size ? elements.size.value : null,
    color: !!elements.color ? elements.color.value : null,
    amount: Number.parseInt(elements.amount.value),
  };

  data.cartItems.push(saveData);
  saveLocalStorage(keys.CART_LIST_KEY, data.cartItems);
});

elements.wishListBtn.addEventListener('click', () => {
  const saveData = {
    id: new URLSearchParams(location.search).get('id') || location.pathname.split('/').slice(-1)[0].replace('.html', ''),
  };

  let change = true;

  data.wishListItems.forEach((i) => {
    if (i.id === saveData.id) change = false;
  });

  if (change) {
    data.wishListItems.push(saveData);
    saveLocalStorage(keys.WISH_LIST_KEY, data.wishListItems);
  }
});
