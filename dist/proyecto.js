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
      description: 'Ideas que se escuchan. Una selección de proyectos donde el concepto, la identidad y la conversación toman forma.'
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
  document.title = `${project.title} — Sabrina Daniels`;
  document.querySelector('#project-title').textContent = project.title;
  document.querySelector('#project-description').textContent = project.description;
})();
