const favoriteContainer = document.querySelector('.favorite_container');

data.wishListItems = sanitizeStoredItems(keys.WISH_LIST_KEY, data.wishListItems);

data.wishListItems.forEach((d) => {
  products.forEach((p) => {
    if (d.id === p.id) {
      const wrap = create('div');
      wrap.classList.add('favorite_wrap');
      const a = create('a');
      a.classList.add('favorite_img');
      a.href = `${pagePath('products/detail.html')}?id=${encodeURIComponent(p.id)}`;
      const img = create('img');
      img.src = safeImagePath(p.img);
      img.alt = p.alt || p.name || 'product image';
      const content = create('div');
      content.classList.add('favorite_content');
      const name = create('h2');
      name.textContent = p.name;
      const price = create('p');
      price.textContent = `¥${p.price}`;
      const deleteBtn = create('button');
      deleteBtn.classList.add('delete_btn');
      deleteBtn.textContent = '削除';

      a.appendChild(img);

      content.appendChild(name);
      content.appendChild(price);
      content.appendChild(deleteBtn);

      wrap.appendChild(a);
      wrap.appendChild(content);

      favoriteContainer.appendChild(wrap);

      deleteBtn.addEventListener('click', () => {
        data.wishListItems.forEach((i, n) => {
          if (i.id === p.id) {
            data.wishListItems = data.wishListItems.filter(
              (d) => d.id !== p.id
            );

            saveLocalStorage(keys.WISH_LIST_KEY, data.wishListItems);
          }
        });
      });
    }
  });
});
