(() => {
  const projects = {
    branding: {
      title: 'Branding',
      description: 'De la idea a una identidad. Una selección de proyectos creados para construir marcas con personalidad y propósito.'
    },
    'redes-sociales': {
      title: 'Redes Sociales',
      description: 'Contenido que conecta. Una selección de proyectos para comunicar ideas, historias y marcas en el universo digital.'
    },
    podcast: {
      title: 'Podcast',
      description: 'La vida de un millennial es un proyecto personal creado en pareja, donde conversamos con millennials cuyas historias, experiencias y aprendizajes pueden inspirar a otros. Un espacio para compartir conocimiento, risas, reflexiones y todo aquello que nos conecta como generación. Toda la identidad visual, dirección gráfica y estética del proyecto fue desarrollada por mí y puede verse aplicada en sus diferentes canales digitales.'
    },
    animaciones: {
      title: 'Animaciones',
      description: 'Movimiento que comunica. Una selección de proyectos creados para dar ritmo, energía y vida a las ideas.'
    },
    'diseno-web': {
      title: 'Diseño Web',
      description: 'Experiencias digitales con intención. Una selección de proyectos que combinan estrategia, identidad y diseño.'
    }
  };

  const key = new URLSearchParams(window.location.search).get('proyecto');
  const project = projects[key] || projects.branding;
  document.body.classList.toggle('project-page--podcast', key === 'podcast');
  document.body.classList.toggle('project-page--diseno-web', key === 'diseno-web');
  document.title = `${project.title} — Sabrina Daniels`;
  document.querySelector('#project-title').textContent = project.title;
  document.querySelector('#project-description').textContent = project.description;

  if (key === 'podcast') {
    const slides = document.querySelectorAll('.illustration-slide');
    const coverSlide = slides[0];
    const videoSlide = slides[1];
    if (!coverSlide || !videoSlide) return;

    slides.forEach((slide, index) => {
      if (index > 1) slide.remove();
    });

    coverSlide.className = 'illustration-slide podcast-cover-slide';
    coverSlide.removeAttribute('aria-hidden');
    coverSlide.innerHTML = '<img src="images/lvdm.png" alt="La Vida de un Millennial: identidad del podcast y sus redes sociales" />';

    videoSlide.className = 'illustration-slide video-slide';
    videoSlide.removeAttribute('aria-hidden');
    videoSlide.setAttribute('aria-label', 'Reproducir video de podcast');
    videoSlide.innerHTML = `
      <button class="video-cover" type="button" aria-label="Reproducir video de YouTube">
        <img src="https://i.ytimg.com/vi/aZukhCix7Ko/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/aZukhCix7Ko/sddefault.jpg'" alt="Miniatura del video del podcast" />
        <span class="video-play" aria-hidden="true">▶</span>
      </button>`;

    videoSlide.querySelector('.video-cover').addEventListener('click', () => {
      videoSlide.innerHTML = `
        <iframe
          src="https://www.youtube-nocookie.com/embed/aZukhCix7Ko?autoplay=1&rel=0"
          title="Video de Podcast"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>`;
    }, { once: true });
  }

  if (key === 'diseno-web') {
    const webDesignSlides = document.querySelectorAll('.illustration-slide');
    const webDesignSlide = webDesignSlides[0];
    const websitePromoSlide = webDesignSlides[1];
    if (!webDesignSlide || !websitePromoSlide) return;

    webDesignSlides[3]?.remove();

    webDesignSlide.className = 'illustration-slide project-video-slide';
    webDesignSlide.removeAttribute('aria-hidden');
    webDesignSlide.innerHTML = `
      <video controls playsinline preload="metadata" poster="images/djebess-video-cover.png" aria-label="Video promocional de diseño web">
        <source src="videos/promo-website.mp4" type="video/mp4" />
        Tu navegador no admite este video.
      </video>`;

    websitePromoSlide.className = 'illustration-slide project-video-slide';
    websitePromoSlide.removeAttribute('aria-hidden');
    websitePromoSlide.innerHTML = `
      <video controls playsinline preload="metadata" poster="images/trinet-video-cover.png" aria-label="Video promocional de sitio web">
        <source src="videos/website-promo.m4v" type="video/mp4" />
        Tu navegador no admite este video.
      </video>`;
  }

  if (key === 'animaciones') {
    const animationSlides = document.querySelectorAll('.illustration-slide');
    const animationSlide = animationSlides[0];
    const motionGraphicsSlide = animationSlides[1];
    if (!animationSlide || !motionGraphicsSlide) return;

    animationSlide.className = 'illustration-slide project-video-slide';
    animationSlide.removeAttribute('aria-hidden');
    animationSlide.innerHTML = `
      <video controls playsinline preload="metadata" aria-label="Video de animación">
        <source src="videos/animaciones.mp4" type="video/mp4" />
        Tu navegador no admite este video.
      </video>`;

    motionGraphicsSlide.className = 'illustration-slide project-video-slide';
    motionGraphicsSlide.removeAttribute('aria-hidden');
    motionGraphicsSlide.innerHTML = `
      <video controls playsinline preload="metadata" poster="images/motion-graphics-poster.png" aria-label="Video de motion graphics">
        <source src="videos/motion-graphics-web.m4v" type="video/mp4" />
        Tu navegador no admite este video.
      </video>`;
  }
})();
