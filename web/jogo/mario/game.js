kaboom
 ({
global:true,
fullscreen:true,
scale:1,
debug:true,
clearColor: [0,0,0,1],
})
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
'*':[sprite('surprise'), solid(), 'mushroom-surprise'],
'}':[sprite('unboxed'), solid()],       //determina escala do elemento
'(':[sprite('pipe-bottom-left'), solid(),scale(0.5)],
')':[sprite('pipe-bottom-right'), solid(),scale(0.5)],
'+':[sprite('pipe-top-right'), solid(),scale(0.5)],
'-':[sprite('pipe-top-left'), solid(), scale(0.5)],
'^':[sprite('evil-shroom'), solid()],
'#':[sprite('mushroom'), solid(), scale(0.5)],
}

const gameLevel= addLevel(map, levelCfg)
})



start("game")