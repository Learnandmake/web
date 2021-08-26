kaboom({
    global:true,
    // tela cheia
    fullscreen:true,
    //tela de escala
    Scale:1,
    //mensagens de debug
    debug:true
})

   loadRoot("https://i.imgur.com/")
   loadSprite('link-going-left','1Xq9biB.png')
   loadSprite('link-going-right','yZIb8O2.png')
   loadSprite('link-going-down','r377FIM.png')
   loadSprite('link-going-up','UkV0we0.png')
   loadSprite('left-wall','rfDoaa1.png')
   loadSprite('top-wall','QA257Bj.png')
   loadSprite('bottom-wall','vWJWmvb.png')
   loadSprite('right-wall','SmHhgUn.png')
   loadSprite('bottom-left-wall','awnTfNC.png')
   loadSprite('bottom-right-wall','84oyTFy.png')
   loadSprite('top-left-wall','xlpUxIm.png')
   loadSprite('top-right-wall','z0OmBd1.png')
   loadSprite('top-door','U9nre4n.png')
   loadSprite('fire-pot','I7xSp7w.png')
   loadSprite('left-door','okdJNls.png')
   loadSprite('lanterns','wiSiY09.png')
   loadSprite('slicer','c6JFi5Z.png')
   loadSprite('skeleton','Ei1VnX8.png')
   loadSprite('kaboom','o9WizfI.png')
   loadSprite('stairs','VghkL08.png')
   loadSprite('bg','u4DVsx6.png')

//variavel constante
const MOVE_SPEED=120

//instancia funcao
scene("game", ({level,score})=>{

    layers(['bg','obj','ui'], 'obj')
const maps=[
[
'ycc)cc^ccw',
'a        b',
'a      * b',
'a    (   b',
'%        b',
'a    (   b',
'a   *    b',
'a        b',
'xdd)dd)ddz',
],
[
    'yccccccccw',
    'a        b',
    ')        )',
    'a        b',
    'a        b',
    'a    $   b',
    ')   }    )',
    'a        b',
    'xddddddddz',
]

]

const levelCfg = {
    height:48,
    width:48,
    'a':[sprite('left-wall'),solid(),'wall'],
    'b':[sprite('right-wall'),solid(),'wall'],
    'c':[sprite('top-wall'),solid(),'wall'],
    'd':[sprite('bottom-wall'),solid(),'wall'],
    'w':[sprite('top-right-wall'),solid(),'wall'],
    'x':[sprite('bottom-left-wall'),solid(),'wall'],
    'y':[sprite('top-left-wall'),solid(),'wall'],
    'z':[sprite('bottom-right-wall'),solid(),'wall'],
    '%':[sprite('left-door'),solid(),'door'],
    '^':[sprite('top-door'),'next-level'],
    '$':[sprite('stairs'),'next-level'],
                                   //seta a direcao 
                                   //-1 velocidade da corrida e direcao dos slice que vai multiplicar com a base de velocidade constante  
                                   //+1 =direita, -1: esquerda
                                   //+ ou -= direcao
                                   //1=velocidade  
    '*':[sprite('slicer'),'slicer','dangerous', {dir: -1}],
    '}':[sprite('skeleton'),'dangerous','skeletor', {dir: -1, timer:0}],
    ')':[sprite('lanterns'),solid()],
    '(':[sprite('fire-pot'),solid()],
}
             //define nivel por mapa
addLevel(maps[level], levelCfg)
//adiciona o sprite bg no mapa todo|sobrepoe a camada do bg
add([sprite('bg'),                  layer('bg')])

const scoreLabel = add([
    text('0'),
    pos(400,450),
    layer('ui'),
    {
        value:score,
    },
    scale(2)
])

add([text('level ' + parseInt(level + 1)), pos(400,485),scale(2)])

const player = add([
sprite('link-going-right'),
pos(5,190),
{ 
    //define o sprite direito do link como padrão para o jogador
    dir: vec2(1,0),
}
])

//vai pro proximo nivel
      //sobrepor|id pra sprite|
player.overlaps('next-level',()=>{
//vai para o jogo
    go("game",{
        //com nivel +1
    level:(level+1)% maps.length,
    //instancia o score
    score:scoreLabel.value
})
})
player.action(()=>
{
    //fixa o link na posicao
    player.resolve()
})

keyDown('left',()=> {
    //muda o sprite do link para esquerda
    player.changeSprite('link-going-left')
    player.move(-MOVE_SPEED,0)
    player.dir=vec2(-1,0)
})

keyDown('right',()=> {
    //muda o sprite do link para direita
    player.changeSprite('link-going-right')
    player.move(MOVE_SPEED,0)
    player.dir=vec2(1,0)
})

keyDown('up',()=> {
    //muda o sprite do link para cima
    player.changeSprite('link-going-up')
              //eixo x    |eixo y
    player.move(0,-MOVE_SPEED)
    //define a direcao +1 direita, -1 esquerda
    //             eixo x|eixoy
    player.dir=vec2(0     ,-1)
})

keyDown('down',()=> {
    
    player.changeSprite('link-going-down')
    player.move(0,MOVE_SPEED)
    
    player.dir=vec2(0,1)
})
//inimigos 
const SLICER_SPEED = 100
action('slicer',(s) =>{
    //direcao do slice multiplicada pela velocidade do eixo x
    s.move(s.dir*SLICER_SPEED,0)
}) 
//colisao do inimigo na parede
          //quem colide|no que colide
collides ('slicer',    'wall',(s)=>{
//funcao que faz os inimigos voltarem quando colidir na parede
//direcao positiva recebe a direcao negativa e quando colidir denono
//a direcao negativa vai receber a direcao a positiva
s.dir=-s.dir;
})
//morte quando colidir
player.overlaps('dangerous',() => {
    go('lose',{score:scoreLabel.value})
})
//morte 
//esqueleto -inimigo
const SKELETOR_SPEED=60

action('skeletor', (s)=>{
    s.move(0,s.dir* SKELETOR_SPEED)
    
    //cria um temporizador
        //|tempo de frame do inimigo 
    s.timer -=dt()
    //se o tempo for igua a 0
    if(s.timer <= 0)
    {   
        //muda a posicao do esqueleto
        s.dir=-s.dir
        //adiciona um tempo aleatorio para o temporizador
        //escolhe um numero aleatorio de 1 ate 5
        s.timer = rand(5)
    }
})
collides('skeletor','wall',(s)=>
{
    s.dir=-s.dir
})
//spawn kaboom

function spawnkaboom(p){
    const obj = add([sprite('kaboom'),pos(p),'kaboom'])
    //wait:funcao que faz esperar por tempo
    wait(1,()=>
    {
        destroy(obj)
    })
}
//colidir com a porta
//player.collides('door',(d)=>{
//destroy(d)
//})
collides ('kaboom','skeletor',(k,s)=>{
  //xaqualha a camera
    camShake(4)
    wait(1,()=>{
        destroy(k)
    })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text=scoreLabel.value
})
collides ('kaboom','slicer',(k,a)=>{
    camShake(4)
    wait(1,()=>{
        destroy(k)
    })
    destroy(a)
    scoreLabel.value++
    scoreLabel.text=scoreLabel.value
})
keyPress('space',()=>{
    //adiciona a explosao na posicao na frente do link
    spawnkaboom(player.pos.add(player.dir.scale(48)))
})
//cena de morte
scene("lose", ({score}) => {
    //texto e altura e largura na metade
  add([text(score,32), origin('center'), pos(width()/2, height()/2)])  
})

})

start("game",{ level:0, score:0})