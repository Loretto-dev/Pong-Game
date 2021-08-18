//Jogo PONG

//variaveis: tamanho e posição da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 18;
let raio = dBolinha / 2

//variaveis: velocidade da bolinha
let velocidadeXbolinha = 2;
let velocidadeybolinha = 2;

//variaveis: posições raquete1
let xRaquete1 = 5;
let yRaquete1 = 150;
let cRaquete1 = 10;
let aRaquete1 = 90;

//variaveis: posições raquete2
let xRaquete2 = 585;
let yRaquete2 = 150;
let velocidadeYRaquete2;


//variavel: coludir dentro da função draw
let colidiu = false

//variavel: Placar do Jogo
let meusPontos = 0;
let pontosOponente = 0;

//variaveis: sons do jogo
let raquetada;
let ponto;
let trilha;

//variavel: oponente errar
let chanceDeErrar = 0;

//função para pré-carregar os sons do jogo
function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//função: quadro do jogo tamanho
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//função: chamar as outras funções
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  raquete1(xRaquete1, yRaquete1);
  raquete1(xRaquete2, yRaquete2);
  movimentoRaquete();
  verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete1, yRaquete1);
  movimentaRaquete2();
  colisaoRaqueteBiblioteca(xRaquete2, yRaquete2);
  incluiPlacar();
  marcaPonto();
}

//função: mostrar a bolinha na tela
function mostraBolinha(){
    circle(xBolinha,yBolinha,dBolinha);
}

//função: movimentar a bolinha
function movimentaBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeybolinha;
}

//fução: verificar a colisão da bolinha com a borda
function verificaColisaoBorda(){
    
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXbolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeybolinha *= -1;
  }
}

//função: mostrar raquetes, criando um retangulo com: rect
function raquete1 (x, y){
    rect(x, y, cRaquete1, aRaquete1);
}

//função para movimentar a raquete do jogador
function movimentoRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete1 -= 10
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete1 += 10
  }
}

//fução: verificar a colisão da bolinha com a raquete
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete1 + cRaquete1 && yBolinha - raio < yRaquete1 + aRaquete1 && yBolinha + raio > yRaquete1){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}
//função: foi coletado/importado o código de outra pessoa para realizar a função de colisão entre objetos em 2d, em outro arquivo, qual chama: "p5.collide2d.js"
function colisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x,y, cRaquete1, aRaquete1, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}
//função para movimentar a raquete do oponente
function movimentaRaquete2(){
  velocidadeYRaquete2 = yBolinha - yRaquete2 - cRaquete1 / 2 - 30;
  yRaquete2 += velocidadeYRaquete2 + chanceDeErrar
  calculaChanceDeErrar()
}

//função para calcular chance de erro
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 49
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

//função para incluir o placar 
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26)
}

//função para marcar o ponto no placar
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}







