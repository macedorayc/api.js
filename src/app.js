import express from "express";

const servidor = express();
servidor.use(express.json());

servidor.post('/treino/leituraLivro', (req, resp) => {
    let nome = req.body.livro
    let pagina = req.body.pagina
    let tempo = req.body.tempo

    let tpp = (pagina * tempo) / 3600

    resp.send({
        entrada: {
            nome: nome,
            pagina: pagina,
            tempo: tempo
        },
        tempoPorPagina: Number(tpp.toFixed(2))
    })

});

servidor.get('/treino/combinacaoCores', (req, resp) => {

    let cor1 = req.query.cor1
    let cor2 = req.query.cor2
    let resposta = ""

    if (cor1 == "amarelo" && cor2 == "vermelho" || cor2 == "amarelo" && cor1 == "vermelho") {
        resposta = "laranja"
    }

    else if (cor1 == "azul" && cor2 == "vermelho" || cor2 == "azul" && cor1 == "vermelho") {
        resposta = "roxo"
    }

    else if (cor1 == "amarelo" && cor2 == "azul" || cor2 == "amarelo" && cor1 == "azul") {
        resposta = "verde"
    }

    resp.send({
        corResultante: resposta

    })

});

servidor.post('/treino/cinema/validacao', (req, resp) => {

    let id1 = req.body.idade1
    let id2 = req.body.idade2
    let c = req.body.classificacao

    let sim = false

    if (id1 >= c && id2 >= c || c == 'livre') {
        sim = true
    }

    resp.send({
        podemAssistir: sim

    })

});

servidor.get('/treino/tabuada/:n', (req, resp) => {

    let numero = req.params.n
    let vezes = 1
    let carimbo = []


    while (vezes <= 10) {
        carimbo.push( `${numero} X ${vezes} = ${numero * (vezes++)}` )

    }
    resp.send({
        Tabuada:
            carimbo

    })
})

servidor.post('/treino/ordenacao', (req, resp) => {
   
    let itens = req.body.itens
    let ordem = ""

    for(let i = 0; i < itens.length - 1; i++  ){

       
        if(itens[0] > itens[i] ){
          ordem = "decrescente"
        }
        else if(itens[itens.length - 1] > itens[i] ){
            ordem = "crescente"
          }
        else{
            ordem = "desordenado"
        }
    }

    resp.send({
      ordem:ordem
    })
  
});


servidor.post('/treino/analiseNotas', (req, resp) => { 
    
    let [n1, n2, n3] = req.body.notas;

    let soma = n1 + n2 + n3;
    let tot = soma / 3;

    let maior = Math.max(n1, n2, n3);
    let menor = Math.min(n1, n2, n3);

    resp.send({
        entrada: {
            n1: n1,
            n2: n2,
            n3: n3
        },
        Nota: Number(tot.toFixed(2)),
        maior: maior,
        menor: menor
    })

});



servidor.listen(
    5001,
    () => console.log(`API subida com sucesso na porta 5001`));