document.querySelectorAll('.dish-card button').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Added to cart!');
  });
});
