kaboom
 ({
global:true,
fullscreen:true,
scale:1,
debug:true,
clearColor: [0,0,0,1],
})

//variavel com a velocidade do movimento do player (mario)
const MOVE_SPEED =120
//varivel com a forca do pulo do mario
const JUMP_FORCE=360


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
    /*sprites -fim*/

/*camadas da cena */
scene("game", ()=>
{
//nome das camadas
layers(['bg','obj','ui'],'obj')

//mapa
const map =
[
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '   %   =*=%=                                         ',
    '                                                     ',
    '                            -+                        ',
    '                    ^   ^   ()                        ',
    '===============================   =====',
]

//instancia o level
const levelCfg =
{
    //define o tamanho de cada sprite
    width:20,
    height:20,
//define os elementos 
//elementos q vai ser substituido| instancia o sprite que vai substituir|nome do sprite|estado de posicao do sprite 
    '='                           :[sprite(                              'block'),        solid() ],
 //moeda
    '$':[sprite('coin')],
//luckyblock
'%':[sprite('surprise'), solid(), 'coin-surprise'],
//mushroom e luckyblock
'*':[sprite('surprise'), solid(), 'mushroom-surprise'],
//unboxed
'}':[sprite('unboxed'), solid()],   //determina escala do elemento
'(':[sprite('pipe-bottom-left'), solid(),scale(0.5)],
//pipe
')':[sprite('pipe-bottom-right'), solid(),scale(0.5)],
'+':[sprite('pipe-top-right'), solid(),scale(0.5)],
'-':[sprite('pipe-top-left'), solid(), scale(0.5)],
//evil-shroom
'^':[sprite('evil-shroom'), solid()],
                           //tag para especificar|adiciona gravidade para o cogumelo
'#':[sprite('mushroom'), solid(), 'mushroom',     body()    ], 
}
//instancia o level no jogo
const gameLevel= addLevel(map, levelCfg)

//instancia a pontuacao do score //adiciona a pontuacao
const scorelabel =               add([
    text('test'),
    pos(30,6),
    //instancia camada que o score está
    //para nao interferir na camada que esta
    //acontecendo o jogo
    layer('ui'),
    //determina o que vai acontecer na camada ui
    {
    //determina o score em uma variavel
    value:'test',
    }
])
//texto  |conteudo|nome|posicao
add([text('level'+'test',pos(4,6))])

//deixa o mario gigante
function big() {
    let timer=0
    let isBig=false
    return {
        update(){
            if(isBig){
                timer -=dt()
                if(timer <=0){
                    this.smallify()
                }
            }
        },
        isBig(){
            return isBig
        },
        smallify(){
            this.scale=vec2(1,1)
            timer=0
            isBig=false
        },
        biggify(time){
            this.scale=vec2(2)
            timer=time
            isBig=true
        }
    }
}

//acao|elementos com tag|cria uma variavel para o cogumelo 
action ('mushroom',      (m)=>{
//cogumelo vai se mover constantemente no eixo x| valor do movimento 
m.move                                            (10,0)
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
    scorelabel.text=scorelabel.value
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

//funcao com evendo de presionar e depois soltar a tecla
keyPress('space', ()=>  {

    //verifica se o mario esta no chao
    if(player.grounded())
    {
        //funcao que faz o player pular|regula a forca do pulo
        player.jump                    (JUMP_FORCE)
    }
 

})





//final da cena
})


//inicia o jogo
start("game")