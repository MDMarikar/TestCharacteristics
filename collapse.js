// JavaScript for collapsible functionality
const collapsibles = document.querySelectorAll('.collapsible');

collapsibles.forEach((item) => {
  item.addEventListener('click', function () {
    this.classList.toggle('active');
    const content = this.querySelector('.content');
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
