(() => {
  const english = {
    nav: ['Home', 'Portfolio', 'Contact'],
    home: {
      intro: 'Here you will find a part of my world.',
      detail: 'The part of me that works with people and brands, designs logos and strategies, illustrates in Photoshop, and paints in oils. The creative, imaginative side of me—but above all, the woman passionate about leading projects with art and creativity.',
      portfolio: 'Portfolio',
      contactTitle: 'Let’s talk!',
      contactText: 'Tell me, what do you enjoy doing and how would you like to tell its story? Let’s bring creativity and color back to your projects.',
      labels: ['First name', 'Last name', 'Message'],
      send: 'Send',
      projects: ['Branding', 'Illustration', 'Social Media', 'Podcast', 'Animation', 'Web Design']
    },
    illustration: {
      title: 'Illustration',
      description: 'From imagination to reality. A selection of projects I have developed as an illustrator, transforming ideas into designs that come to life across different products.',
      captions: ['Illustration for packaging', 'Textile illustration', 'Product illustration', 'Element illustration']
    },
    projects: {
      branding: {
        title: 'Branding',
        description: 'From an idea to an identity. A selection of projects created to build brands with personality and purpose.'
      },
      'redes-sociales': {
        title: 'Social Media',
        description: 'Content that connects. A selection of projects that communicate ideas, stories, and brands in the digital universe.'
      },
      podcast: {
        title: 'Podcast',
        description: 'La vida de un millennial is a personal project created as a couple, where we talk with millennials whose stories, experiences, and lessons can inspire others. It is a space to share knowledge, laughter, reflections, and everything that connects us as a generation. I developed the entire visual identity, graphic direction, and aesthetic of the project, applied across its different digital channels.'
      },
      animaciones: {
        title: 'Animation',
        description: 'Movement that communicates. A selection of projects created to give ideas rhythm, energy, and life.'
      },
      'diseno-web': {
        title: 'Web Design',
        description: 'Intentional digital experiences. A selection of projects that combine strategy, identity, and design.'
      }
    }
  };

  const languageButton = document.querySelector('[data-language-toggle]');
  const cvLink = document.querySelector('[data-cv-link]');
  const isHome = document.querySelector('.hero');
  const projectKey = new URLSearchParams(window.location.search).get('proyecto');
  const isIllustration = document.body.classList.contains('project-page') && !projectKey;

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };

  const setAria = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute('aria-label', value);
  };

  function translateHome() {
    const navLinks = [...document.querySelectorAll('nav a')];
    navLinks.slice(0, 3).forEach((link, index) => { link.textContent = english.nav[index]; });
    const headline = document.querySelector('.hero h1');
    if (headline) headline.innerHTML = '<span>Let’s</span> <em>create</em><b>!</b>';
    setText('.hero .intro:not(.intro-detail)', english.home.intro);
    setText('.hero .intro-detail', english.home.detail);
    setText('.portfolio-heading .eyebrow', english.home.portfolio);
    document.querySelectorAll('.project-overlay p').forEach((project, index) => { project.textContent = english.home.projects[index]; });
    setText('#contact-title', english.home.contactTitle);
    setText('.contact-intro > p:last-child', english.home.contactText);
    const labels = document.querySelectorAll('form label');
    if (labels[0]) labels[0].childNodes[0].nodeValue = english.home.labels[0];
    if (labels[1]) labels[1].childNodes[0].nodeValue = english.home.labels[1];
    if (labels[3]) labels[3].childNodes[0].nodeValue = english.home.labels[2];
    setText('form button', english.home.send);
    setAria('[data-carousel-prev]', 'Previous project');
    setAria('[data-carousel-next]', 'Next project');
    setAria('.carousel', 'Portfolio projects');
    setAria('.social-icons', 'Social media');
    document.title = 'Sabrina Daniels — Creative portfolio';
  }

  function translateProject() {
    const navLinks = [...document.querySelectorAll('nav a')];
    navLinks.slice(0, 3).forEach((link, index) => { link.textContent = english.nav[index]; });
    setText('.back-link', '← Back to portfolio');
    setAria('[data-illustration-prev]', 'Previous project');
    setAria('[data-illustration-next]', 'Next project');
    setAria('.social-icons', 'Social media');

    if (isIllustration) {
      setText('#project-title', english.illustration.title);
      setText('.project-intro > p:last-child', english.illustration.description);
      document.querySelectorAll('.illustration-caption').forEach((caption, index) => { caption.textContent = english.illustration.captions[index]; });
      document.title = 'Illustration — Sabrina Daniels';
      return;
    }

    const project = english.projects[projectKey] || english.projects.branding;
    setText('#project-title', project.title);
    setText('#project-description', project.description);
    document.title = `${project.title} — Sabrina Daniels`;
    if (projectKey === 'podcast') {
      setAria('.illustration-carousel', 'Podcast projects');
      setAria('.video-cover', 'Play YouTube video');
    }
  }

  function applyLanguage(language) {
    document.documentElement.lang = language === 'en' ? 'en' : 'es';
    if (language === 'en') {
      if (isHome) translateHome();
      else translateProject();
      languageButton?.setAttribute('aria-label', 'Cambiar el sitio a español');
      languageButton?.querySelectorAll('[data-language-option]').forEach((option) => {
        option.classList.toggle('is-active', option.dataset.languageOption === 'en');
      });
      if (cvLink) cvLink.href = 'CV-Sabrina-Daniels-EN.pdf';
    } else {
      localStorage.removeItem('portfolio-language');
      window.location.reload();
      return;
    }
    localStorage.setItem('portfolio-language', language);
  }

  languageButton?.addEventListener('click', () => {
    applyLanguage(document.documentElement.lang === 'en' ? 'es' : 'en');
  });

  if (localStorage.getItem('portfolio-language') === 'en') applyLanguage('en');
})();
