
function updateClass() {
    const element = document.getElementById('change-class-header');
    if (window.innerWidth < 820) {
      element.classList.add('order-1');
    } else {
      element.classList.remove('order-1');
    }
  }

  window.addEventListener('resize', updateClass);

  updateClass();

  

function updateClass2() {
    const element = document.getElementById('change-class-header-2');
    if (window.innerWidth < 820) {
      element.classList.add('order-1');
    } else {
      element.classList.remove('order-1');
    }
  }

  window.addEventListener('resize', updateClass);

  updateClass2();

