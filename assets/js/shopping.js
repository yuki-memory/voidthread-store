const elements = {
  wishListBtn: document.querySelector('.wishlist_button'),
  cartBtn: document.querySelector('.cart_button'),

  size: document.querySelector('#size'),
  color: document.querySelector('#color'),
  amount: document.querySelector('#amount'),
};

function currentProductId() {
  const id =
    new URLSearchParams(location.search).get('id') ||
    location.pathname.split('/').slice(-1)[0].replace('.html', '');
  return isKnownProductId(id) ? id : null;
}

if (elements.cartBtn) elements.cartBtn.addEventListener('click', () => {
  const id = currentProductId();
  if (!id) {
    alert('商品が不正です。');
    return;
  }

  const saveData = {
    id,
    size:
      elements.size && security.SIZE_ALLOWLIST.has(elements.size.value)
        ? elements.size.value
        : null,
    color:
      elements.color && security.COLOR_ALLOWLIST.has(elements.color.value)
        ? elements.color.value
        : null,
    amount: elements.amount ? Number.parseInt(elements.amount.value, 10) : 1,
  };

  const sanitized = sanitizeCartItem(saveData);
  if (!sanitized) return;

  data.cartItems.push(sanitized);
  saveLocalStorage(keys.CART_LIST_KEY, data.cartItems);
});

if (elements.wishListBtn) elements.wishListBtn.addEventListener('click', () => {
  const id = currentProductId();
  if (!id) {
    alert('商品が不正です。');
    return;
  }

  const saveData = {
    id,
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
