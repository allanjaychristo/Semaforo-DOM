document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  const vermelhoBt = document.querySelector('.app__card-button--vermelho');
  const amareloBt = document.querySelector('.app__card-button--amarelo');
  const verdeBt = document.querySelector('.app__card-button--verde');
  const comecarBt = document.querySelector('.app__card-button--comecar');
  const pararBt = document.querySelector('.app__card-button--parar');
  const botoes = [vermelhoBt, amareloBt, verdeBt];

  const comecarPararBtn = document.getElementById('comecar-parar');

  const cores = ['vermelho', 'amarelo', 'verde'];
  const duracoes = {
    'vermelho': 3,
    'amarelo': 2,
    'verde': 3
  };

  let contextoAtual = 'vermelho';
  let restante = duracoes[contextoAtual];
  let intervalo = null;
  let rodando = false;

  const circulos = {
    'vermelho': document.querySelector('.semaforo__circulo--vermelho'),
    'amarelo': document.querySelector('.semaforo__circulo--amarelo'),
    'verde': document.querySelector('.semaforo__circulo--verde')
  };

  const render = () => {
    for (let cor in circulos) {
      if (cor === contextoAtual) circulos[cor].classList.add('active');
      else circulos[cor].classList.remove('active');
    }
  };

  const pausar = () => {
    rodando = false;
    clearInterval(intervalo);
    intervalo = null;
    comecarPararBtn.textContent = 'Começar';
  };

  const tick = () => {
    restante -= 1;
    if (restante <= 0) {
      let index = cores.indexOf(contextoAtual);
      index = (index + 1) % cores.length;
      contextoAtual = cores[index];
      restante = duracoes[contextoAtual];
      render();
    }
  };

  const iniciar = () => {
    if (rodando) return;
    rodando = true;
    comecarPararBtn.textContent = 'Parar';
    render();
    intervalo = setInterval(tick, 1000);
  };

  const setContexto = (novo) => {
    pausar();
    contextoAtual = novo;
    restante = duracoes[novo];
    render();
  };

  vermelhoBt.addEventListener('click', () => setContexto('vermelho'));
  amareloBt.addEventListener('click', () => setContexto('amarelo'));
  verdeBt.addEventListener('click', () => setContexto('verde'));

  comecarBt.addEventListener('click', iniciar);
  pararBt.addEventListener('click', pausar);
  comecarPararBtn.addEventListener('click', () => {
    if (rodando) pausar();
    else iniciar();
  });

  render();
});
