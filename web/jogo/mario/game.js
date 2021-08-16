kaboom
 ({
global:true,
fullscreen:true,
scale:1,
debug:true,
clearColor: [0,0,0,1],
})

//variavel constante com a velocidade do movimento do player (mario)
const MOVE_SPEED =120
//variavel constante com a forca do pulo do mario
const JUMP_FORCE=360
//variavel constante com o maior salto que o mario vai poder dar
const BIG_JUMP_FORCE =550
//variavel com forca atual de pulo
let CURRENT_JUMP_FORCE=JUMP_FORCE
//variavel bool jump
let isJumping =true
//constante que determina a morte por queda
const FALL_DEATH =400

/*sprites (imagens)-inicio*/
/*carregamento de sprites (imagens)  site */
/*o endereco da imagem especifica ira se fundir com o endereco do site*/
loadRoot('https://i.imgur.com/')
loadSprite(
    /*nome da imagem*/    /*endereco da imagem no site */          
        'coin',           'wbKxhcd.png'
    )
  
    /*sprite do inimigo shroom*/
    loadSprite(
        'evil-shroom','KPO3fR9.png'
    )
    /*sprite tijolo*/
    loadSprite(
        'brick','pogC9x5.png'
    )
      /*sprite bloco*/
loadSprite(
    'block','M6rwarW.png'
)
    
    /*sprite mario*/
    loadSprite(
        'mario','Wb1qfhK.png'
    )
    /*sprite cogumelo*/
    loadSprite(
        'mushroom','0wMd92p.png'
    )
    /*sprite luckyblock*/
    loadSprite(
        'surprise','gesQ1KP.png'
    )
    /*sprite unboxed*/
    loadSprite(
        'unboxed','bdrLpi6.png'
    )
    /*sprite pipes*/
    loadSprite(
        'pipe-top-left','ReTPiWY.png'
    )
    loadSprite(
        'pipe-top-right','hj2GK4n.png'
    )
    loadSprite(
        'pipe-bottom-left','c1cYSbt.png'
    )
    loadSprite(
        'pipe-bottom-right','nqQ79eI.png'
    )
    /*fim dos sprites do level 1*/
    /*inicio sprites level2*/
    loadSprite(
        'blue-brick','3e5YRQd.png'
    )
    loadSprite(
        'blue-block','fVscIbn.png'
    )
    loadSprite(
        'blue-steel','gqVoI2b.png'
    )
    loadSprite(
        'blue-evil-shroom','SvV4ueD.png'
    )
    loadSprite(
        'blue-surprise','RMqCc1G.png'
    )
    /*fim sprites level2*/
    /*sprites -fim*/

/*camadas da cena |intancia o level(nesse caso o 0)|instancia o score    */
scene("game", ({   level,                           score}) =>
{
//nome das camadas
layers(['bg','obj','ui'],'obj')

//mapa
const maps =[
    //mapa level1
[
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '   %   =*=%=                                         ',
    '                                                     ',
    '                            -+                       ',
    '                    ^   ^   ()                       ',
    '===============================   =====              ',
],
[
    '£                                                     £',
    '£                                                     £',
    '£                                                     £',
    '£                                                     £',
    '£                                                     £',
    '£                                                     £',
    '£     @@@@@@@@@                     x x               £',
    '£                                 x x x               £',
    '£                               x x x x   x         -+£',
    '£                    z   z    x x x x x   x         ()£',
    '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
]
]
//instancia o level
const levelCfg =
{
    //define o tamanho de cada sprite
    width:20,
    height:20,
//define os elementos 
//elementos q vai ser substituido| instancia o sprite que vai substituir|nome do sprite|estado de posicao do sprite 
  //level1
'='                           :[sprite(                              'block'),        solid() ],
 //moeda
    '$':[sprite('coin'),'coin'],
//luckyblock
'%':[sprite('surprise'), solid(), 'coin-surprise'],
//mushroom e luckyblock
'*':[sprite('surprise'), solid(), 'mushroom-surprise'],
//unboxed
'}':[sprite('unboxed'), solid()],   //determina escala do elemento
'(':[sprite('pipe-bottom-left'), solid(),scale(0.5)],
//pipe
')':[sprite('pipe-bottom-right'), solid(),scale(0.5)],
'+':[sprite('pipe-top-right'), solid(),scale(0.5),'pipes'],
'-':[sprite('pipe-top-left'), solid(), scale(0.5),'pipes'],
//evil-shroom
'^':[sprite('evil-shroom'), solid(),'dangerous'],
                           //tag para especificar|adiciona gravidade para o cogumelo
'#':[sprite('mushroom'), solid(), 'mushroom',     body()    ], 
//level2
'!':[sprite('blue-block'), solid(),scale(0.5) ], 
'£':[sprite('blue-brick'), solid(),scale(0.5) ],
'z':[sprite('blue-evil-shroom'), solid(),scale(0.5),'dangerous' ],
'@':[sprite('blue-surprise'), solid(),scale(0.5),'coin-surprise' ],
'x':[sprite('blue-steel'), solid(),scale(0.5) ],
}
//instancia o level no jogo
const gameLevel= addLevel(maps[level], levelCfg)

//instancia a pontuacao do score //adiciona a pontuacao
const scorelabel =               add([
    //instancia o score
    text ('score'+' '+score),
    pos(30,6),
    //instancia camada que o score está
    //para nao interferir na camada que esta
    //acontecendo o jogo
    layer('ui'),
    //determina o que vai acontecer na camada ui
    {
    //determina o score em uma variavel
    value:score,
    }
])
//adiciona|texto|    nivel            |posicao de texto
add([text('level'+ parseInt(level+1)) ,pos(100,6)])

//deixa o mario gigante
function big() {
    //tempo
    let timer=0
    //deixa a funcao isBig false
    let isBig=false
    //retorna uma atualizacao
    return {
        //atualiza o retorno
        update(){
           
             //chama a funcao isBig que vai entregar a variabel bool isBig
            //se a variavel isbig for verdadeira 
            if(isBig){
                //forca de pulo quando o mario ficar gigante
                CURRENT_JUMP_FORCE=BIG_JUMP_FORCE
                //tempo|delta time é uma funcao propria de temporizador
                //kaboom.js
                //o temporizador vai diminuindo
                timer -=dt()
                //se o tempo for menor ou igual a 0
                //chama a funcao smallify
                if(timer <=0){
                    //o mario volta a ser pequeno
                    this.smallify()
                }
            }
        },
        //isbig retorna a variavel isbig
        isBig(){
            return isBig
        },
       //funcao de tornar o mario pequeno denovo
        smallify(){
             //smallify fica com a escala 1,1 
            this.scale=vec2(1,1)
            //forca de pulo no estado normal(pequeno)
             CURRENT_JUMP_FORCE=JUMP_FORCE
            //tempo fica com valor 0
            timer=0
            //variavel isBig esta falsa
            isBig=false
        },
        //funcao que deixa o mario gigante
        //its big pede 0 tempo que o mario ficara gigante
        biggify(time){
          
            //escala aumenta 2x
            this.scale=vec2(2)
            //o temporizador vai receber o tempo 
            timer=time
            // a variavel isbig vai ser verdadeira o que vai ativar o temporizador
            isBig=true
        }
    }
}

//acao|elementos com tag|cria uma variavel para o cogumelo 
action ('mushroom',      (m)=>{
//cogumelo vai se mover constantemente no eixo x| valor do movimento 
m.move                                            (20,0)
})

//constante com o movimento dos inimigos
const ENEMY_SPEED=20

//acao dos inimigos
action('dangerous',(d) =>{
d.move(-ENEMY_SPEED,0)
})



//instancia o player(mario)
const player = add([
sprite('mario'),solid(),
//posicao do player(mario)
pos(30,0),
//instancia a gravidade
body(),
//possibilita deixar o mario gigante
big(),
origin('bot')

])

//


//instancia a cabecada em objetos
player.on("headbump",(obj) => {

//se o objeto for o coin-surprise
//instancia o objeto "coin-surprise"
if(obj.is('coin-surprise'))
{
//nivel  |spawna|moeda|posiciona a moeda acima|valor da posicao
gameLevel.spawn  ('$', obj.gridPos.sub         (0,1))

//substitui a caixa de surpresa por uma caixa simples
//nivel|spawna|caixa simples|aumenta a posicao|valor da posicao "0" indica que vai ficar na mesma posicao que a caixa de surpresa 
gameLevel.spawn  ('}',       obj.gridPos.sub         (0,0))
destroy(obj)
}
if(obj.is('mushroom-surprise'))
{
//nivel  |spawna|mushroom|posiciona a moeda acima|valor da posicao
gameLevel.spawn  ('#', obj.gridPos.sub         (0,1))

//substitui a caixa de surpresa por uma caixa simples
//nivel|spawna|caixa simples|aumenta a posicao|valor da posicao "0" indica que vai ficar na mesma posicao que a caixa de surpresa 
gameLevel.spawn  ('}',       obj.gridPos.sub         (0,0))
destroy(obj)
}
})
//instancia a colizao com o cogumelo
//player(mario)|evento de colizao|id do objeto|variavel do objeto
player         .collides          ('mushroom' ,(m) =>{
    destroy(m)
    player.biggify(6)
} )

player.collides('coin',(c) => 
{
    destroy(c)
    scorelabel.value++
   scorelabel.text=  'score'+' ' +scorelabel.value
})

//acao de entrar pelo cano 
//quando o mario colidir com o cano
player.collides ('pipes',()=> {
//pressionar o botao seta pra baixo
keyPress('down', () =>{
//vai para tela 'game'
    go('game',{
     //level|acrescenta mais um nivel|determina um loop com limite numero de mapas
     level:(level+1)  %              maps.length,
     //instancia o score
     score:scorelabel.value
})
})
})

//acao de morte por queda
player.action(() => {
    //loca a camera no frame que o player está
    camPos(player.pos)
   //se a posicao do frame for maior ou igual a constante de morte por queda
     //pega a posicao de frame da camera
   if (player.pos.y >= FALL_DEATH)
   {
    //vai para cena de perda 
    go('lose', {score:scorelabel.value})
   }
})

//mario colidir com inimigos
player.collides('dangerous', (d)=>{
    //se o player estiver pulando
    if(isJumping)
    {
        destroy(d)
    }
    //senao 
    else
    {
    //vai para cena de perda 
    go('lose', {score:scorelabel.value})
    }
   
})
//controle teclado
//evento com o evento de precionar e manter precionado a tecla
//metodo do kaboom|tecla|         | funcao do evento
keyDown(           'left'         , ()=>  {
//instancia o player|funcao para mover o player|velocidade do movimento
player               .move                      (-MOVE_SPEED,0)
})
//mover para direita
keyDown('right', ()=>  {

    player.move(MOVE_SPEED,0)
    })

    player.action(() =>{
        if(player.grounded())
        {
            isJumping =false
        }
    })
//funcao com evento de presionar e depois soltar a tecla
keyPress('space', ()=>  {

    //verifica se o mario esta no chao
    if(player.grounded())
    {
        //determina que o player esta pulando
        isJumping = true
        //funcao que faz o player pular|regula a forca do pulo
        player.jump                    (CURRENT_JUMP_FORCE)
    }
 

})





//final da cena
})

//cena de perda //score
scene('lose', ({score}) => {
    //adiciona|texto  | centraliza o texto| pega a posicao e altura e divide o tamanho por 2
    add([text(score,32),origin('center'),pos(width()/2,height()/2)])
})
//inicia o jogo|instancia o level|instancia o score
start("game",{  level:0,          score:0})