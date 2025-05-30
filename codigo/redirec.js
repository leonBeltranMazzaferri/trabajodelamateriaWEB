
  // Verificamos si ya visitó antes
  if (!localStorage.getItem('hasVisited')) {
    // Marca como visitado
    localStorage.setItem('hasVisited', 'true');
    // Redirige a login.html
    window.location.href = 'login.html';

    localStorage.removeItem('hasVisited');

  }
