document.querySelectorAll('.product-link').forEach(function(product) {
    product.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      window.location.href = '/product/' + productId;
    });
  });