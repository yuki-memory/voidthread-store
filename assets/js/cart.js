const wrapper = document.querySelector('.cart_wrap');

let totalPrice = 0;

data.cartItems = sanitizeStoredItems(keys.CART_LIST_KEY, data.cartItems);

data.cartItems.forEach((d, i) => {
  products.forEach((p) => {
    if (d.id === p.id) {
      const item = create('div');
      item.classList.add('cart_item');
      const imgLink = create('a');
      imgLink.classList.add('cart_img');
      imgLink.href = `${pagePath('products/detail.html')}?id=${encodeURIComponent(p.id)}`;
      const img = create('img');
      img.src = safeImagePath(p.img);
      img.alt = p.alt || p.name || 'product image';
      const cont = create('div');
      cont.classList.add('cart_cont');
      const name = create('h1');
      name.classList.add('name');
      name.textContent = p.name;
      const contBottom = create('div');
      contBottom.classList.add('cart_cont_bottom');
      const contLeft = create('div');
      contLeft.classList.add('cart_cont_bottom_left');
      const size = create('p');
      size.textContent = `サイズ：${d.size || '-'}`;
      const color = create('p');
      color.textContent = `色：${d.color || '-'}`;
      const contRight = create('div');
      contRight.classList.add('cart_cont_bottom_right');
      const amount = create('p');
      amount.textContent = `数量：${d.amount}`;
      const price = create('p');
      price.textContent = `¥${p.price * d.amount}`;
      totalPrice += p.price * d.amount;
      const deleteE = create('div');
      deleteE.classList.add('delete');
      const deleteBtn = create('button');
      deleteBtn.classList.add('delete_btn');
      deleteBtn.textContent = '削除';
      contRight.appendChild(amount);
      contRight.appendChild(price);
      contLeft.appendChild(size);
      contLeft.appendChild(color);
      cont.appendChild(name);
      cont.appendChild(contBottom);
      deleteE.appendChild(deleteBtn);
      contBottom.appendChild(contLeft);
      contBottom.appendChild(contRight);
      imgLink.appendChild(img);
      item.appendChild(imgLink);
      item.appendChild(cont);
      item.appendChild(deleteE);
      wrapper.appendChild(item);
      deleteBtn.addEventListener('click', () => {
        data.cartItems = data.cartItems.filter((v, j) => i !== j);
        saveLocalStorage(keys.CART_LIST_KEY, data.cartItems);
      });
    }
  });
});

const priceElement = document.querySelector('.price');
const total = create('p');
total.textContent = `${totalPrice}円`;
if (priceElement) priceElement.appendChild(total);

const orderButton = document.querySelector('.order');
if (orderButton) {
  orderButton.addEventListener('click', () => {
    alert('注文ありがとうございました！');

    data.cartItems = [];
    saveLocalStorage(keys.CART_LIST_KEY, data.cartItems);
  });
}
