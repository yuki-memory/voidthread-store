const favoriteContainer = document.querySelector('.favorite_container');

data.wishListItems.forEach((d) => {
  products.forEach((p) => {
    if (d.id === p.id) {
      const wrap = create('div');
      wrap.classList.add('favorite_wrap');
      const a = create('a');
      a.classList.add('favorite_img');
      const img = create('img');
      img.src = p.img;
      const content = create('div');
      content.classList.add('favorite_content');
      const name = create('h2');
      name.innerHTML = p.name;
      const price = create('p');
      price.innerHTML = `&#165;${p.price}`;
      const deleteBtn = create('button');
      deleteBtn.classList.add('delete_btn');
      deleteBtn.innerHTML = '削除';

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
