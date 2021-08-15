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
    'block','bdrLpi6.png'
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
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '                                                     ',
    '=================================   =================',
]

//determina o level
const levelCfg =
{
    //define o tamanho de cada sprite
    width:20,
    height:20,
    //define os elementos 
//elementos q vai ser substituido| sprite que vai substituir 
    '='                           :[sprite('block',solid()) ]   
}

const gameLevel= addLevel(map, levelCfg)
})



start("game")