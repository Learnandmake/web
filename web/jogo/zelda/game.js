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
    'a':[sprite('left-wall'),solid()],
    'b':[sprite('right-wall'),solid()],
    'c':[sprite('top-wall'),solid()],
    'd':[sprite('bottom-wall'),solid()],
    'w':[sprite('top-right-wall'),solid()],
    'x':[sprite('bottom-left-wall'),solid()],
    'y':[sprite('top-left-wall'),solid()],
    'z':[sprite('bottom-right-wall'),solid()],
    '%':[sprite('left-door'),solid()],
    '^':[sprite('top-door'),'next-level'],
    '$':[sprite('stairs'),'next-level'],
    '*':[sprite('slicer')],
    '}':[sprite('skeleton')],
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

})

start("game",{ level:0, score:0})