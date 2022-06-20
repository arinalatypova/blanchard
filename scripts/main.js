document.addEventListener('DOMContentLoaded', function(){
  // Dropdown
  const params = {
    btnClassName: "js-header-dropdown-btn", // menu btn
    dropClassName: "js-header-drop", // menu dropdown
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function delRotate(e) {
    document.body.addEventListener('click', ()=> {
      if (!e.classList.contains('is-active')){
        e.classList.remove('rotate');
      };
    });
  };

  function rotateFunc() {
    let headerMenuActiveEffect = document.querySelectorAll('.item__btn');

    for (let btn of headerMenuActiveEffect) {
      btn.addEventListener('click', ()=>{
        btn.classList.add('rotate');
        delRotate(btn);
      });

    };
  };

  function setMenuListener() {
    rotateFunc();
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  };

  setMenuListener();
  
  // Burger 
  function burgerMenuOpen(){
    let body = document.querySelector('body');
    let html = document.querySelector('html');
    let burgerBtn = document.querySelector('.header__burger-btn');
    let burgerMenu = document.querySelector('.header__burger-menu');
    let burgerMenuClose = document.querySelector('.burger-menu__close-btn');

    burgerBtn.addEventListener('click', ()=>{
      burgerMenu.classList.add('burger-menu--is-open');
      body.classList.add('overflow--lock');
      html.classList.add('overflow--lock');
    });

    burgerMenuClose.addEventListener('click', ()=> {
      burgerMenu.classList.remove('burger-menu--is-open');
      body.classList.remove('overflow--lock');
      html.classList.remove('overflow--lock');
    });
  };

  // Search
  function searchOpen(){
    let searchBtn = document.querySelector('.header__search-btn-1024');
    let searchForm = document.querySelector('.header__search-container-1024');
    let searchFormClose = document.querySelector('.header__search-form-btn-close-1024');

    searchBtn.addEventListener('click', () =>{
      searchForm.classList.add('header__search--is-open');
    })


    searchFormClose.addEventListener('click', ()=>{
      searchForm.classList.remove('header__search--is-open');
    });
  };

  // Scroll
  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', function(event){
      event.preventDefault();

      let burgerMenu = document.querySelector('.header__burger-menu');
      let body = document.querySelector('body');
      let html = document.querySelector('html');

      if (burgerMenu.classList.contains('burger-menu--is-open')){
        burgerMenu.classList.remove('burger-menu--is-open');
        body.classList.remove('overflow--lock');
        html.classList.remove('overflow--lock');
      };

      const blockID = anchor.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    });
  }


  burgerMenuOpen();
  searchOpen();

  // Gallery 
  // Slider 

  const gallerySlider = new Swiper(".gallery__swiper-container", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    grid: {
      rows: 1,
      fill: "row"
    },

    pagination: {
      el: ".gallery .swiper__counter",
      type: "fraction"
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-previous"
    },

    breakpoints: {
      300: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      650: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20
      },

      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38
      },

      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34
      },

      1501: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });

  // Catalog

  // Tabs
  document.querySelectorAll('.step-link').forEach(function(tabsBtn){
    tabsBtn.addEventListener('click',function(event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content').forEach(function(tabContent){
        tabContent.classList.remove('tab-content-active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
    });
  });

  const tabLinks = document.querySelectorAll('.step-link');

  tabLinks.forEach(item =>{
    item.addEventListener('click', (e) =>{
      tabLinks.forEach(el => {
        el.classList.remove('tab-active');
      });
      item.classList.add('tab-active')
    });
  });

  // Events 
  // Slider
  const eventsSlider = new Swiper('.events__cards-container', {
    slidesPerView: 1,
    slidesPerGroup: 3,
    spaceBetween: 50,

    pagination: {
      el: '.swiper-events-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.events__btn-next-slide',
      prevEl: '.events__btn-prev-slide',
    },

   breakpoints: {
      300: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      570: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 27,
      },

      1501: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",
  });

  // Project

  // Slider 

  const projectsSlider = new Swiper(".partners__container", {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 2,

    grid: {
      rows: 1,
      fill: "row"
    },
    navigation: {
      nextEl: ".partners__swiper-btn--next",
      prevEl: ".partners__swiper-btn--prev"
    },

    breakpoints: {
      300: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      700: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 34
      },

      1024: {
        slidesPerView: 2,
        spaceBetween: 50
      },

      1501: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });

  // Contact 

  var selector = document.querySelector("input[type='tel']");
    var im = new Inputmask("+7 (999)-999-99-99");

    im.mask(selector);

    new JustValidate('.callback__validate-form', {
      colorWrong: '#D11616',

      messages: {
        name: {
          required: 'Укажите имя',
        },

        phone: {
          required: 'Укажите ваш телефон'
        },
      },

      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLength: 30,
        },

        phone: {
          required:true,
          function: (name, value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Number(phone) && phone.length === 10
          }
        },
      },
    });
});


