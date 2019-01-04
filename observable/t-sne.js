// URL: https://beta.observablehq.com/@robstelling/t-sne
// Title: Visualizando dados de altas dimensões com *t*-SNE
// Author: Roberto Stelling (@robstelling)
// Version: 6630
// Runtime version: 1

const m0 = {
  id: "2331ea7cae3cdc98@6630",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Visualizando dados de altas dimensões com *t*-SNE

#### *Problema*: Dado um conjunto de pontos em altas dimensões, como podemos ter uma ideia de como os pontos estão organizados no espaço?
<p>
Representar dados de altas dimensões em *2D* ou *3D*, independente da sua organização, é um problema que não possui uma solução única e genérica. Os dados podem estar organizados de várias formas distintas em altas dimensões e cada contexto dos dados pode sugerir uma forma diferente de projetá-los em duas ou tres dimensões.


Ou seja, dependendo do *objetivo* da agregação e do seu *contexto* é muito provável que exista ***mais de uma solução*** para o mesmo conjuntos de pontos. De uma certa forma é **um problema mal definido** que não possui uma solução ótima.


Para alguns problemas pode ser possível reduzir a dimensionalidade "manualmente", sem depender de um algoritmo genérico. Por exemplo, os dígitos do [MNIST<sup>1</sup>](#ref), de 28x28 pixels, que totalizam 784 pixels - ou *784 dimensões* - podem ser visualizados em duas dimensões se criarmos dois "*features*" - ou *dimensões* - que expressam o dataset, como por exemplo: densidade e simetria[<sup>22</sup>](#ref).

Com estas duas dimensões é possível criar uma visualização planar dos dígitos 1 e 5 como no gráfico abaixo, onde os dígitos 1 estão representados com pontos brancos e os dígitos 5 com pontos pretos.
<br><img width="500" src="https://raw.githubusercontent.com/RobStelling/miscImg/master/imagens/MNIS15.png"></img><br>
Sobre estas novas dimensões utilizamos um Perceptron para gerar uma linha de corte entre os dígitos 1 e 5.
<br><img width="500" src="https://raw.githubusercontent.com/RobStelling/miscImg/master/imagens/MNIST15_corte.png"></img><br>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Por que não há uma solução ótima?
Antes de seguir adiante, é importante entender por quê não há uma solução ótima para este problema. Para mostrar a impossibilidade de encontrar uma solução única e ótima veremos algumas alternativas de redução de 2 dimensões para 1 dimensão, em datasets criados manualmente.

Como podemos reduzir dados de duas (*x* e *y*) dimensões para uma dimensão (*x*)? Vejamos algumas alternativas (desde ingênuas a outras mais complexas):

1. Considerar apenas o eixo x
2. Considerar apenas o eixo y
3. Considerar a distância euclideana entre os pontos
3. Fazer o SVD dos pontos`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Exemplos simples
### Passando de 2D para 1D
Nos casos a seguir, projetamos os dados de 2D em em 1D para cada um dos eixos: *x* e *y*`
)})
    },
    {
      name: "grafico_simples",
      inputs: ["vegalite","width","pontos","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,pontos,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  height: 400,
  data: pontos,
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative"},
    color: {field: "Cluster", type: "nominal", scale:{scheme: colorScheme}},
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Projetando os pontos no eixo X`
)})
    },
    {
      inputs: ["vegalite","width","pontos","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,pontos,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  data: pontos,
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "x", type: "quantitative"},
    color: {field: "Cluster", type: "nominal", scale: {scheme: colorScheme}}
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Os clusters *c* e *d* ficam razoavelmente separados, mas *a* e *b* se misturam.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Projetando os pontos no eixo Y`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `e transladando para a horizontal`
)})
    },
    {
      inputs: ["vegalite","width","pontos","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,pontos,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  data: pontos,
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "y", type: "quantitative"},
    color: {field: "Cluster", type: "nominal", scale: {scheme: colorScheme}}
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Ao projetar sobre o eixo **y**, os clusters *a* e *d*, e os clusters *b* e *c* se misturam`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Projeção *"ideal"*
Em um *"mundo ideal"* teríamos a redução de duas dimensões deste conjunto de pontos, para uma dimensão, projetados como algo similar ao exemplo abaixo, onde cada cluster original em 2D é "bem representado" na projeção em 1D:`
)})
    },
    {
      inputs: ["vegalite","width","ideal_linear","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,ideal_linear,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  data: ideal_linear,
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "x", type: "quantitative"},
    color: {field: "Cluster", type: "nominal", scale: {scheme: colorScheme}}
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Dataset tipo meia lua`
)})
    },
    {
      inputs: ["vegalite","width","meia_lua","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,meia_lua,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  height : 250,
  data: {values: meia_lua},
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative"},
    color: {field: "label", type: "nominal", scale: {scheme: colorScheme}, title:"Cluster"},
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Projetando sobre o eixo *x*`
)})
    },
    {
      inputs: ["vegalite","width","meia_lua","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,meia_lua,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  data: {values: meia_lua},
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "x", type: "quantitative"},
    color: {field: "label", type: "nominal", scale: {scheme: colorScheme}, title: "Cluster"},
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Projetando sobre o eixo *y*`
)})
    },
    {
      inputs: ["vegalite","width","meia_lua","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,meia_lua,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  data: {values: meia_lua},
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "y", type: "quantitative"},
    color: {field: "label", type: "nominal", scale: {scheme: colorScheme}, title: "Cluster"},
  }
})
)})
    },
    {
      name: "cluster_falso",
      inputs: ["meia_lua"],
      value: (function(meia_lua){return(
meia_lua.map(p => {return {x:(p.x+p.label)*(p.label+1.7), label:p.label}})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Projeção *"ideal"*`
)})
    },
    {
      inputs: ["vegalite","width","cluster_falso","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,cluster_falso,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  data: {values: cluster_falso},
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
   x: {field: "x", type: "quantitative"},
    color: {field: "label", type: "nominal", scale: {scheme: colorScheme}, title: "Cluster"},
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Círculos
Algoritmo *divino*: Como este dataset poderia ser projetado em 1D?`
)})
    },
    {
      inputs: ["vegalite","width","circulos","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,circulos,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  height : 500,
  data: {values: circulos},
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative"},
    color: {field: "label", type: "nominal", scale: {"scheme": colorScheme}, title: "Cluster"},
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Projetando os pontos radialmente!
Essa ideia ocorre, e funciona, porque sabemos o formato dos dados originais, mas como saber qual transformação utilizar para dados desconhecidos com 10, 100 ou 1000 dimensões?`
)})
    },
    {
      inputs: ["circulos"],
      value: (function(circulos){return(
circulos
)})
    },
    {
      name: "circulosMap",
      inputs: ["circulos","dist"],
      value: (function(circulos,dist)
{
  var circ = circulos.map((p) => ({x:dist(p, {x:0, y:0}), label:p.label}));
  return circ.map((p) => ({x: p.x-circ.reduce((soma, ponto) => soma + ponto.x,0)/circulos.length,label:p.label}));
}
)
    },
    {
      inputs: ["vegalite","width","circulosMap","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,circulosMap,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  data: {values: circulosMap},
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
   x: {field: "x", type: "quantitative"},
    color: {field: "label", type: "nominal", scale: {scheme: colorScheme}, title: "Cluster"},
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Nem sempre é possível projetar os dados separando clusters`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Por exemplo consumo, potência e país de origem no dataset [*carros*](https://vega.github.io/vega-lite/data/cars.json)
Se os dados não forem separáveis na dimensão superior, não será possível separá-los em uma dimensão inferior. Isso leva à ideia de dimensionalidade intrínseca, que é o mínimo de dimensões necessárias para representar fielmente os dados.`
)})
    },
    {
      inputs: ["vegalite","width","carros","tamanhoCirculo","opacity","colorScheme"],
      value: (function(vegalite,width,carros,tamanhoCirculo,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  height : 400,
  data: {values: carros},
  mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
  encoding: {
    x: {field: "Horsepower", type: "quantitative", title: "Potência (Cavalo-Vapor)"},
    y: {field: "Miles_per_Gallon", type: "quantitative", title: "Consumo em Milhas/galão"},
    color: {field: "Origin", type: "nominal", scale: {scheme: colorScheme}, title: "Origem"}
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Para resolver o problema de *visualização* de dados em altas dimensões, vamos analisar o:
# <center>*t*-SNE</center>
[*t*-Distributed Stochastic Neighbour Embedding<sup>2</sup>](#ref) (*t*-SNE, pronunciado ***tí-ciní***) é uma técnica de visualização em 1D, 2D ou 3D de datasets de altas dimensões.

O *t*-SNE, desenvolvido por *Laurens van der Maaten* e *Geoffrey Hinton*, é um refinamento do SNE e se diferencia deste, principalmente, pela utilização de distribuição *t* de Student para representar os dados em baixas dimensões (ou dados mapeados).

O *t*-SNE utiliza um kernel gaussiano para converter pontos em altas dimensões para probabilidades de conexões (**P**) e um kernel *t*-Student, com um grau de liberdade, para representar as probabilidades de conexões entre os pontos em baixas dimensões (**Q**), no espaço mapeado. O custo das diferenças entre as duas distribuições **P** e **Q** é modelado pela divergência de Kullbach-Leibler<sup><a href="#ref">20</a></sup>, o gradiente desta função (ver \`[Equação 5]\` abaixo) é utilizado para atualizar o mapa de pontos em baixas dimensões.

O *t*-SNE não tem garantia de convergir mas produz resultados muito bons, como por exemplo, o mapeamento das 784 dimensões do MNIST para apenas duas (ou tres, se contarmos os canais cores e marcas - que representam a mesma informação), como mostrada no gráfico abaixo, implementado com Tensorflow.js<sup><a href="#ref">17</a></sup>`
)})
    },
    {
      inputs: ["md","chart"],
      value: (function(md,chart){return(
md`${chart}<center>t-SNE sobre dígitos do MNIST (Bostock<sup><a href="#ref">21</a></sup>)</center>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Breve recordação de distribuições Normal e *t* de Student<sup><a href="#ref">18</a></sup>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Alterando parâmetros da curva de densidade de uma distribuição normal`
)})
    },
    {
      inputs: ["vegalite","width","gera_normal","var_2","media"],
      value: (function(vegalite,width,gera_normal,var_2,media){return(
vegalite({
  width: Math.min(600, width),
  height: 300,
  layer: [
    {
      title: "Curva de densidade de uma distribuição normal",
      data: {values: gera_normal(-6, +6, 0.01, 1, 0)},
      mark: "line",
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title: "φ(x)"},
        color: {value:"steelblue"}
      }
    },
    {
      data: {values: gera_normal(-6, 6, 0.01, Math.sqrt(var_2), media)},
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"},
        color: {value: "red"}
      }
    }
  ]
})
)})
    },
    {
      name: "viewof var_2",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 0.01, 
  max: 16, 
  step: 0.01,
  value: 1,
  description: "Variância de [0 a 16]"
})
)})
    },
    {
      name: "var_2",
      inputs: ["Generators","viewof var_2"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof media",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: -2, 
  max: 2, 
  step: 0.01,
  value: 0.0,
  description: "Média [-2 a 2]"
})
)})
    },
    {
      name: "media",
      inputs: ["Generators","viewof media"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Altere a variância e a média da curva normal acima.
Suponha que a curva vermelha represente a altura da população adulta (a curva em azul é mantida como referência), se você alterar a média de altura para 1.69m, por exemplo, e mantiver a variância em 1, veremos que o gráfico indica que deve ser possível encontrar indivíduos de 4m ou mais! Para que o modelo esteja mais próximo da realidade é necessário *diminuir* a variância para cerca de 0.3.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Comparando distribuições normal e *t* de Student`
)})
    },
    {
      inputs: ["vegalite","width","gera_student","intervalo","gera_normal","var2"],
      value: (function(vegalite,width,gera_student,intervalo,gera_normal,var2){return(
vegalite({
  width: Math.min(600, width),
  height: 300,
  layer: [
    {
      title: "Normal (vermelho) e Studend-t (azul)",
      data: {values: gera_student(-intervalo, intervalo, 0.01, 1, 1)},
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title:"φ(x)"}
      }
    },
    {
      data: {values: gera_normal(-intervalo, intervalo, 0.01, Math.sqrt(var2), 0)},
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"},
        color: {value: "red"}
      }
    }
  ]
})
)})
    },
    {
      name: "viewof var2",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 0.01,
  max: 9,
  value: 1,
  step: 0.01,
  description: "Ajuste da variância da curva normal"
})
)})
    },
    {
      name: "var2",
      inputs: ["Generators","viewof var2"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof intervalo",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 1,
  max: 100,
  value: 6,
  step: 1,
  description: "Intervalo"
})
)})
    },
    {
      name: "intervalo",
      inputs: ["Generators","viewof intervalo"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Uma curva de distribuição *t* de Student é "*mais baixa*" e com "*cauda mais longa*" que uma curva normal com a mesma variância. Altere a variância da curva normal e veja como ela se comporta.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Graus de liberdade e variância em normais e *t* de Student`
)})
    },
    {
      inputs: ["vegalite","width","gera_curvas","intervalo","variancia","gl","colorScheme"],
      value: (function(vegalite,width,gera_curvas,intervalo,variancia,gl,colorScheme){return(
vegalite({
  width: Math.min(600, width),
  height: 300,
  data: {values: gera_curvas(-intervalo, intervalo, 0.01, Math.sqrt(variancia), 0, gl)},
  mark: "line",
  encoding: {
    title: "Curvas normal e t-Student",
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative", title: "φ(x)"},
    color: {field: "Curva", type:"nominal", scale: {scheme: colorScheme}, title: "Distribuição"}
  }
})
)})
    },
    {
      name: "viewof gl",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 1,
  max: 100,
  value: 1,
  step: 1,
  description: "Graus de liberdade"
})
)})
    },
    {
      name: "gl",
      inputs: ["Generators","viewof gl"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof variancia",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 0.1,
  max: 9,
  value: 1,
  step: 0.1,
  description: "Variância"
})
)})
    },
    {
      name: "variancia",
      inputs: ["Generators","viewof variancia"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Uma curva *t* de Student é, na verdade, uma "*combinação*" de infinitas curvas normais. Com um grau de liberdade ela é "*mais baixa*" e possui "*cauda mais longa*" que a curva normal de mesma variância. Aumentando os graus de liberdade a curva *t* de Student converge para a curva normal correspondente, como pode ser observado alterando os parâmetros do gráfico acima.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Voltando ao *t*-SNE
Primeiro vamos revisar o algoritmo do *t*-SNE como descrito no paper original<sup><a href="#ref">2</a></sup>.`
)})
    },
    {
      inputs: ["md","tex","gamma_eval"],
      value: (function(md,tex,gamma_eval){return(
md `# Algoritmo simplificado do t-SNE
**Dados**: conjunto ${tex`X = \{x_1, x_2, \dots, x_n\}, x_i \in \mathbb{R}^M`}<br>
Parâmetros da função de custo: perplexidade ${tex`Perp`}<br>
Parâmetros de otimização: número de iterações ${tex`T`}, taxa de aprendizado ${tex`\eta`}, momentum ${tex`\alpha (t)`}.<br>
**Resultado**: representação em baixa dimensões ${tex`\gamma^{(T)} = \{y_1, y_2,\dots,y_n\}, y_i \in \mathbb{R}^{(1, 2, 3)}`}.<br>
\`begin\`<br>
&nbsp;&nbsp;Calcular afinidades par a par ${tex`p_{j|i}`} com perplexidade ${tex`Perp`} (usando \`Equação 1\`)<br>
&nbsp;&nbsp;definir ${tex`p_{ij} = \frac{p_{j|i}+p_{i|j}}{2}`}<br>
&nbsp;&nbsp;gerar amostra da solução inicial ${tex`\gamma^{(0)} = \{y_1, y_2,\dots,y_n\}`} de ${tex`\mathcal{N}(0,10^{-4}I)`}<br>
&nbsp;&nbsp;\`for\` *t=1* \`to\` *T* \`do\`<br>
&nbsp;&nbsp;&nbsp;&nbsp;Calcular afinidades em baixas dimensões ${tex`q_{ij}`} (usando \`Equação 4\`)<br>
&nbsp;&nbsp;&nbsp;&nbsp;Calcular o gradiente ${tex`\frac{\delta C}{\delta \gamma}`} (usando \`Equação 5\`)<br>
&nbsp;&nbsp;&nbsp;&nbsp;\`set\` ${tex`${gamma_eval}`}<br>
&nbsp;&nbsp;\`end\`<br>
\`end\``
)})
    },
    {
      inputs: ["md","tex","eq1","eq2","eq6","eq3","eq4","eq5"],
      value: (function(md,tex,eq1,eq2,eq6,eq3,eq4,eq5){return(
md `## Equações
[\`Equação 1\`] Similaridade no espaço em alta dimensão<br>
${tex.block`${eq1}`}
<br>[\`Equação 2\`] Função de custo de divergência de Kullback-Leibler<br>
${tex.block`${eq2}`}
que é equivalente a:<br>
${tex.block`${eq6}`}
<br>[\`Equação 3\`] Similaridade no espaço reduzido<br>
${tex.block`${eq3}`}
<br>[\`Equação 4\`] Ajuste da similaridade no espaço reduzido com distribuição *t* de Student com 1 grau de liberdade (distribuição da *Cauchy*)<br>
${tex.block`${eq4}`}
<br>[\`Equação 5\`] Gradiente da divergência de Kullback-Leibler [*Equação 2*] entre *P* e a probabilidade condicional *Q* com distribuição *t* de Student<br>
${tex.block`${eq5}`}`
)})
    },
    {
      inputs: ["md","tex","eq5","gamma_eval"],
      value: (function(md,tex,eq5,gamma_eval){return(
md `A versão acima do algoritmo omite alguns detalhes importantes, após a leitura do paper é possível reescrever o algoritmo e gerar uma versão passível de ser implementada e que facilite o entendimento do algoritmo.
# <center>Algoritmo do *t*-SNE<br>*Revisitado*</center>

1. Dado um conjunto de ${tex`N`} pontos em um espaço em altas dimensões
2. Determine um fator de entropia ${tex`Perp`}, taxa de aprendizado *${tex`\eta`}*, momentum ${tex`\alpha(t)`} e o número de iterações ${tex`T`}
3. Calcule a distâncias entre os pontos em altas dimensões, converta estas dimensões em probabilidades utilizando uma distribuição Gaussiana, com uma variância para cada ponto, de acordo com o fator de entropia ${tex`Perp`}.
  4. Faça uma busca binária para encontrar as variâncias adequadas para cada ponto, de forma tal que cada linha da matriz de probabilidades (${tex`p_{ik}\forall k`}) tenha aproximadamente a mesma entropia, em função de ${tex`Perp`}.
  5. Ajuste as probabilidades para que a matriz de probabilidades dos pontos no espaço original seja simétrica, com ${tex`p_{i|j} = \frac{p_{i|j}+p_{j|i}}{2}`}
6. Faça um chute inicial do conjunto mapeado ${tex`\gamma^{(1)} = \{y_1, \dots, y_N\}`}
7. Repita ${tex`T`} vezes, atualizando ${tex`t = 1\dots T`}:
  8. Calcule as probabilidades dos pontos no espaço mapeado, ${tex`q_{ij}`}, com distribuição *t* de Student com 1 grau de liberdade e ${tex`\sigma^2`} igual a 1
  9. Calcule o gradiente da função de custo em relação ao conjunto ${tex`\gamma^{(t)} = \{y_1, \dots, y_N\}`} de forma que: ${tex.block`${eq5}`}
  10. Ajuste os pontos ${tex`\gamma`} de forma que: ${tex.block`${gamma_eval}`}
11. O conjunto de pontos ${tex`\gamma^{(T)}`} é a saída do algoritmo`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# <center>*t*-SNE<br>Passo a passo</center>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Mapeando distâncias para probabilidades
Vamos começar com um dos conjuntos de pontos que vimos na introdução.`
)})
    },
    {
      inputs: ["vegalite","original"],
      value: (function(vegalite,original){return(
vegalite(original)
)})
    },
    {
      inputs: ["md","tex","distancias","normal"],
      value: (function(md,tex,distancias,normal){return(
md`A ideia, para transformarmos distâncias em probabilidades, é que podemos imaginar cada ponto como o centro de uma distribuição (que pode ser normal/gaussiana ou qualquer outra) e usar a distância entre este ponto e os outros como a probabilidade de ocorrência daquela distância dentro da distribuição escolhida. Quanto menor a distância entre os pontos, maior a probabilidade. *De uma certa forma, estamos determinando a vizinhança entre os pontos*.

Por exemplo, nos pontos acima, a distância entre ${tex`p_0`} e ${tex`p_1`} é dado pela matriz de distâncias, na posição \`distancias[0][1]\` e é igual a ${tex`${distancias[0][1]}`}. Em uma distribuição normal, com média ${tex`0`} e variância ${tex`1`}, esta distância corresponderia a ${tex.block`distancias[0][1] = ${distancias[0][1]}\rightarrow P_{01} = ${normal(distancias[0][1], 1,0)}`}
Abaixo vemos as distâncias e probabilidades para alguns pontos usando uma distribuição normal com ${tex`\mu = 0`} e ${tex`\sigma^2 = 1`}`
)})
    },
    {
      inputs: ["vegalite","gera_normal","distancias","normal"],
      value: (function(vegalite,gera_normal,distancias,normal){return(
vegalite({
  width: 600,
  height: 300,
  layer: [
    {
      title: "Normal com μ=0 e σ=1",
      data: {values: gera_normal(-5, 5, 0.01, 1, 0)},
      mark: {type: "area", fill:"#d0d0d0", fillOpacity: 0.4},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title: "φ(x)"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][1], "y": 0},
        {"x": distancias[0][1], "y": normal(distancias[0][1],1,0)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][1], "y": normal(distancias[0][1],1,0)},
        ]
      },
      mark: {type: "text", baseline: "top", dx: 52, dy: -109},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][2], "y": 0},
        {"x": distancias[0][2], "y": normal(distancias[0][2],1,0)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][2], "y": normal(distancias[0][2],1,0)},
        ]
      },
      mark: {type: "text", dx: 61, dy: -73},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][3], "y": 0},
        {"x": distancias[0][3], "y": normal(distancias[0][3],1,0)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][3], "y": normal(distancias[0][3],1,0)},
        ]
      },
      mark: {type: "text", dx: 47, dy: -112},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][4], "y": 0},
        {"x": distancias[0][4], "y": normal(distancias[0][4],1,0)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][4], "y": normal(distancias[0][4],1,0)},
        ]
      },
      mark: {type: "text", dx: 152, dy: 126},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][5], "y": 0},
        {"x": distancias[0][5], "y": normal(distancias[0][5],1,0)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][5], "y": normal(distancias[0][5],1,0)},
        ]
      },
      mark: {type: "text", dx: 171, dy: 136},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
  ]
})
)})
    },
    {
      inputs: ["md","distancias","tex","normal"],
      value: (function(md,distancias,tex,normal){return(
md `
\`distancias[0][1] = \` ${distancias[0][1]} - ${tex`P_{01} = P(${distancias[0][1]})`} = ${normal(distancias[0][1], 1,0)}<br>
\`distancias[0][2] = \` ${distancias[0][2]} - ${tex`P_{02} = P(${distancias[0][2]})`} = ${normal(distancias[0][2], 1,0)}<br>
\`distancias[0][3] = \` ${distancias[0][3]} - ${tex`P_{03} = P(${distancias[0][3]})`} = ${normal(distancias[0][3], 1,0)}<br>
\`distancias[0][4] = \` ${distancias[0][4]} - ${tex`P_{04} = P(${distancias[0][4]})`} = ${normal(distancias[0][4], 1,0)}<br>
\`distancias[0][5] = \` ${distancias[0][5]} - ${tex`P_{05} = P(${distancias[0][5]})`} = ${normal(distancias[0][5], 1,0)}<br>
\`distancias[5][0] = \` ${distancias[5][0]} - ${tex`P_{50} = P(${distancias[5][0]})`} = ${normal(distancias[5][0], 1.2,0)}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`Os mesmos pontos do exemplo anterior são mostrados abaixo para uma distribuição *t* de Student com ${tex`\mu = 0`}, ${tex`\sigma^2 = 1`} e um grau de liberdade.`
)})
    },
    {
      inputs: ["vegalite","gera_student","distancias","student"],
      value: (function(vegalite,gera_student,distancias,student){return(
vegalite({
  width: 600,
  height: 300,
  layer: [
    {
      title: "Student-t com μ=0 e σ=1, 1 grau de liberdade",
      data: {values: gera_student(-5, 5, 0.01, 1, 0)},
      mark: {type: "area", fill:"#d0d0d0", fillOpacity: 0.4},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title: "φ(x)"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][1], "y": 0},
        {"x": distancias[0][1], "y": student(distancias[0][1],1)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][1], "y": student(distancias[0][1],1)},
        ]
      },
      mark: {type: "text", baseline: "top", dx: 52, dy: -61},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][2], "y": 0},
        {"x": distancias[0][2], "y": student(distancias[0][2],1)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][2], "y": student(distancias[0][2],1)},
        ]
      },
      mark: {type: "text", dx: 61, dy: -23},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][3], "y": 0},
        {"x": distancias[0][3], "y": student(distancias[0][3],1)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][3], "y": student(distancias[0][3],1)},
        ]
      },
      mark: {type: "text", dx: 47, dy: -63},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][4], "y": 0},
        {"x": distancias[0][4], "y": student(distancias[0][4],1)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][4], "y": student(distancias[0][4],1)},
        ]
      },
      mark: {type: "text", dx: 150, dy: 102},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][5], "y": 0},
        {"x": distancias[0][5], "y": student(distancias[0][5],1)},
        ]
      },
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative"}
      }
    },
    {
      data: {
        "values": [
        {"x": distancias[0][5], "y": student(distancias[0][5],1)},
        ]
      },
      mark: {type: "text", dx: 171, dy: 112},
      encoding: {
        text: {field: "y", type: "quantitative"},
      }
    },
  ]
})
)})
    },
    {
      inputs: ["md","distancias","tex","student"],
      value: (function(md,distancias,tex,student){return(
md `
\`distancias[0][1] = \` ${distancias[0][1]} - ${tex`P_{01} = P(${distancias[0][1]})`} = ${student(distancias[0][1], 1)}<br>
\`distancias[0][2] = \` ${distancias[0][2]} - ${tex`P_{02} = P(${distancias[0][2]})`} = ${student(distancias[0][2], 1)}<br>
\`distancias[0][3] = \` ${distancias[0][3]} - ${tex`P_{03} = P(${distancias[0][3]})`} = ${student(distancias[0][3], 1)}<br>
\`distancias[0][4] = \` ${distancias[0][4]} - ${tex`P_{04} = P(${distancias[0][4]})`} = ${student(distancias[0][4], 1)}<br>
\`distancias[0][5] = \` ${distancias[0][5]} - ${tex`P_{05} = P(${distancias[0][5]})`} = ${student(distancias[0][5], 1)}<br>
\`distancias[5][0] = \` ${distancias[5][0]} - ${tex`P_{50} = P(${distancias[5][0]})`} = ${student(distancias[5][0], 1.2)}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Matriz de distâncias`
)})
    },
    {
      inputs: ["pt","math","d_flat","zero"],
      value: (function(pt,math,d_flat,zero){return(
pt(math.matrix(math.reshape(d_flat.map(y => y<=zero?0.0:+y.toFixed(3)), [16,16])), "\\footnotesize")
)})
    },
    {
      name: "viewof cDistancia",
      inputs: ["radio"],
      value: (function(radio){return(
radio({
  title: 'Métrica de distância',
  description: 'Escolha a métrica de distância a usar',
  options: [
    { label: 'Euclidiana', value: 0 },
    { label: 'L2', value: 1 },
  ],
  value: 1

})
)})
    },
    {
      name: "cDistancia",
      inputs: ["Generators","viewof cDistancia"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","cDistancia","math","pts","calcDistancia"],
      value: (function(md,cDistancia,math,pts,calcDistancia){return(
md`A distância ${["euclidiana","L2"][cDistancia]} entre os pontos ${math.matrix(pts[0])} e ${math.matrix(pts[1])} é ${calcDistancia(pts[0], pts[1])}`
)})
    },
    {
      name: "pts",
      value: (function(){return(
[[0, 0], [-1, -1]]
)})
    },
    {
      inputs: ["md","tex","eq1"],
      value: (function(md,tex,eq1){return(
md`A distância euclidiana ou L2 entre os pontos é calculada para todo par de pontos e a probabilidade que um ponto *x<sub>j</sub>* esteja próximo de um ponto *x<sub>i</sub>*, *p<sub>j|i</sub>*, é dada pela equação abaixo, sobre uma distribuição Gaussiana com variância distinta para cada um dos pontos no espaço.
${tex.block`${eq1}`}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `O denominador age como uma *"normalização"* das probabilidades, em função da densidade ao redor do ponto x<sub>i</sub>. Assim distâncias ligeiramente maiores ao redor de pontos em locais poucos densos, são equivalentes a distâncias menores ao redor de pontos em locais mais densos. O valor de cada variância é determinado por uma busca binária utilizando o ${tex`\log_2`} do hiperparâmetro *perplexidade* (\`Perp\`) determinado pelo usuário.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## De distâncias para probabilidades, com distribuições e variância`
)})
    },
    {
      inputs: ["vegalite","original"],
      value: (function(vegalite,original){return(
vegalite(original)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Matriz de probabilidades, com mesma variância para todos os pontos.`
)})
    },
    {
      inputs: ["pt","math","p_flat"],
      value: (function(pt,math,p_flat){return(
pt(math.matrix(math.reshape(p_flat.map(x => +x.toFixed(3)), [16,16])))
)})
    },
    {
      name: "viewof s2",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Variância',
  min: 0.1,
  max: 9,
  step: 0.1,
  value: 1,
  description: "Altere a variância para todos os pontos"
})
)})
    },
    {
      name: "s2",
      inputs: ["Generators","viewof s2"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","tex","eq3"],
      value: (function(md,tex,eq3){return(
md`# Perplexidade
A perplexidade (${tex`Perp`}) é um hiper-parâmetro que ajusta a variância das distribuições escolhidas para cada ponto do espaço original (${tex`P`}). Como falamos antes, podemos entender a perplexidade como um fator de ajuste das diversas variâncias dos pontos no espaço original e, ao mesmo tempo, uma medida da densidade ao redor dos pontos, por isso cada ponto tem uma variância própria. No espaço projetado, (${tex`Q`}), todos os pontos possuem a mesma variância, portanto as similaridade entre dois pontos i e j, no espaço projetado, é calculada, pela \`[Equação 3]\`, como: ${tex.block`${eq3}`}
`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`A perplexidade é uma medida relacionada à dispersão ao redor dos pontos, ou sua entropia. A intuição é que a perplexidade indicaria o número real de vizinhos de um ponto e seu logarítmo corresponde à medida de entropia. Então, definimos perplexidade de cada ponto como:
${tex.block`\log_2(Perp(p_i)) = entropia(p_i) = \sum_{j\ne i} -p_{j|i} \log_2(p_{j|i})`}`
)})
    },
    {
      inputs: ["md","Perp_display","tex"],
      value: (function(md,Perp_display,tex){return(
md`#### Entropia
A entropia desejada é definida pela perplexidade [\`Perp\` = ${Perp_display}]: ${tex.block`entropia = \log_2(Perp) = ${+Math.log2(Perp_display).toFixed(4)}`}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md``
)})
    },
    {
      name: "calcEntropia",
      inputs: ["zero"],
      value: (function(zero){return(
function calcEntropia(probabilidades){
  // Calcula a entropia de um vetor de probabilidades
  return probabilidades.reduce((soma, p) => soma - (p<=zero?0:p*Math.log2(p)), 0)
}
)})
    },
    {
      inputs: ["md","s2","tex","calcEntropia","p_flat"],
      value: (function(md,s2,tex,calcEntropia,p_flat){return(
md `No nosso exemplo, com todas as variâncias iguais a ${+(s2).toFixed(3)}, corresponde a ${tex`entropia = ${+(calcEntropia(p_flat)/16).toFixed(4)}`} e ${tex`perplexidade = ${Math.exp(calcEntropia(p_flat)/16).toFixed(4)}`}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Para encontrar a melhor variância para cada ponto fazemos uma busca binária, ponto a ponto, procurando por um valor de variância que leve a entropia do dataset o mais perto possível da entropia desejada, em função do parâmetro \`Perp\`.

`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Busca binária de variâncias em alta dimensão`
)})
    },
    {
      name: "bbVar",
      inputs: ["calcPi","calcEntropia"],
      value: (function(calcPi,calcEntropia){return(
function bbVar(pontos, i, entropia, erro=1e-6, passos=40) {
  function bbVarRec(variancia, limiteInf, limiteSup) {
    const probabilidades = calcPi(pontos, i, variancia),
          entropiaAtual = calcEntropia(probabilidades);
 
    if (passos-- <= 1 || Math.abs(entropiaAtual - entropia) <= erro)
      return probabilidades;
    if (entropiaAtual > entropia)
      return bbVarRec((limiteInf+variancia)/2, limiteInf, variancia);
    else
      return bbVarRec((variancia+limiteSup)/2, variancia, limiteSup);
  }

  const MINVAR = 0.01,
        MAXVAR = 50;
  return bbVarRec((MINVAR+MAXVAR)/2, MINVAR, MAXVAR);
}
)})
    },
    {
      name: "ajustaVariancias",
      inputs: ["bbVar"],
      value: (function(bbVar){return(
function ajustaVariancias(pontos, entropia, erro, passos) {
  let tamanho = pontos.length,
      p = [];
  for (let i = 0; i < tamanho; i++)
    p = p.concat(bbVar(pontos, i, entropia, erro, passos))
  var total = p.reduce((soma, atual)=>soma+atual,0)
  return p.map((x)=>x/total);
}
)})
    },
    {
      inputs: ["pt","math","p_variancias_display"],
      value: (function(pt,math,p_variancias_display){return(
pt(math.matrix(math.reshape(p_variancias_display.map(x => +x.toFixed(3)), [16,16])))
)})
    },
    {
      name: "viewof Perp_display",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Perplexidade',
  min: 1,
  max: 100,
  step: 0.5,
  value: 10,
  description: "Ajuste o valor do hiperparâmetro perplexidade"
})
)})
    },
    {
      name: "Perp_display",
      inputs: ["Generators","viewof Perp_display"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","calcEntropia","p_variancias_display"],
      value: (function(md,calcEntropia,p_variancias_display){return(
md`Entropia resultante = ${calcEntropia(p_variancias_display)}`
)})
    },
    {
      inputs: ["md","tex","Perp_display"],
      value: (function(md,tex,Perp_display){return(
md`${tex`entropia = \log_2(Perp) = ${Math.log2(Perp_display)}`}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`# Tornando a matriz de probabilidades simétrica
Para tornar a matriz simétrica, ou seja com ${tex`P_{i|j} = P_{j|i}`}, calculamos: ${tex.block`p_{ij} = \frac{p_{j|i}+p_{i|j}}{2}`}`
)})
    },
    {
      name: "p_final_display",
      inputs: ["p_variancias_display","p_variancias","atribIJ","valorIJ"],
      value: (function(p_variancias_display,p_variancias,atribIJ,valorIJ)
{
  var tamanho = p_variancias_display.length;
  var tamanho_linha = Math.sqrt(tamanho);
  var m_a = new Array(p_variancias.length),
      probMedia;
  for (let i=0; i<tamanho_linha; i++) {
    atribIJ(i, i, m_a, 0);
    for (let j=i+1; j<tamanho_linha; j++) {
      probMedia = (valorIJ(i, j, p_variancias_display)+valorIJ(j, i, p_variancias_display))/2;
      atribIJ(i, j, m_a, probMedia);
      atribIJ(j, i, m_a, probMedia);
    }
  }
  return m_a;
}
)
    },
    {
      inputs: ["pt","math","p_final_display"],
      value: (function(pt,math,p_final_display){return(
pt(math.matrix(math.reshape(p_final_display.map(x => +x.toFixed(3)), [16,16])))
)})
    },
    {
      inputs: ["md","d_flat","tex","dimensoes"],
      value: (function(md,d_flat,tex,dimensoes){return(
md`# Mapeando os pontos para baixa dimensão
Nesse ponto, terminamos de tratar os dados em alta dimensão e já temos a matriz de probabilidades com as características desejadas. Agora é necessário aproximar os pontos em baixa dimensão, definir uma função de custo para a aproximação e encontrar o melhor conjunto de pontos utilizando gradiente descendente.
A geração inicial dos pontos é randômica, com o número de dimensões desejado. No nosso caso vamos gerar ${Math.sqrt(d_flat.length)} pontos em ${tex`\mathbb{R}^${dimensoes}`}`
)})
    },
    {
      inputs: ["md","tex","dimensoes"],
      value: (function(md,tex,dimensoes){return(
md`## Projeção inicial dos pontos do ${tex`\mathbb{R}^2`} para ${tex`\mathbb{R}^${dimensoes}`}
Depois de gerar as probabilidades em alta dimensão, gera-se, randomicamente, os pontos em baixa dimensão, no espaço mapeado, no nosso caso: ${tex`\mathbb{R}^2 \rightarrow \mathbb{R}^${dimensoes}`}. Os autores recomendam que os pontos gerados inicialmente estejam distribuidos com ${tex `\mu = 0`} e ${tex`\sigma^2 = 10^{-4}`}`
)})
    },
    {
      inputs: ["vegalite","original"],
      value: (function(vegalite,original){return(
vegalite(original)
)})
    },
    {
      name: "viewof dimensoes",
      inputs: ["radio"],
      value: (function(radio){return(
radio({
  title: 'Dimensões do mapa',
  description: 'Escolha em quantas dimensões projetar os pontos',
  options: [
    {label:'Uma', value:1},
    {label:'Duas', value:2}
  ],
  value: 1
})
)})
    },
    {
      name: "dimensoes",
      inputs: ["Generators","viewof dimensoes"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","tex","dimensoes"],
      value: (function(md,tex,dimensoes){return(
md`### Projeção inicial no ${tex`\mathbb{R}^${dimensoes}`}`
)})
    },
    {
      inputs: ["vegalite","fr1","yDisplay","fr2","dimensoes"],
      value: (function(vegalite,fr1,yDisplay,fr2,dimensoes){return(
vegalite([fr1(yDisplay),fr2(yDisplay)][dimensoes-1])
)})
    },
    {
      name: "viewof tipo_projecao",
      inputs: ["radio"],
      value: (function(radio){return(
radio({
  title: 'Projeção inicial',
  description: 'Escolha a forma de projetar os pontos',
  options: [
    {label:'Randômico', value:'randomico'},
    {label:'Comprimido', value:'comprimido'},
    {label:'"Ideal"', value:'ideal'}
  ],
  value: 'randomico'
})
)})
    },
    {
      name: "tipo_projecao",
      inputs: ["Generators","viewof tipo_projecao"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Cálculo das distâncias entre pontos gerados`
)})
    },
    {
      inputs: ["pt","math","distQ","zero","digitos"],
      value: (function(pt,math,distQ,zero,digitos){return(
pt(math.matrix(math.reshape(distQ.map(y=>y<=zero?0:+y.toFixed(digitos)), [16,16])), "\\scriptsize")
)})
    },
    {
      name: "distQ",
      inputs: ["matrizDistancias","y_flat"],
      value: (function(matrizDistancias,y_flat){return(
matrizDistancias(y_flat)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## E cálculo das probabilidades
As probabilidades em baixa dimensão são calculadas sobre uma distribuição *t* de Student, com 1 grau de liberdade e variância 1.`
)})
    },
    {
      inputs: ["tex","eq3"],
      value: (function(tex,eq3){return(
tex.block`${eq3}`
)})
    },
    {
      name: "calcQ",
      inputs: ["vetor","L2"],
      value: (function(vetor,L2){return(
function calcQ(y) {
  // Calcula probabilidades dos pontos no espaço mapeado, com kernel t-student
  // y: pontos no espaço mapeado
  // N: número de pontos
  // Q: probabilidades
  var N = y.length;
  var Q = vetor(N*N, 1e-100);
  var soma = 0.0;
  for(var i=0; i<N; i++) {
    for(var j=i+1; j<N; j++) {
      var dist = L2(y[i], y[j]);
      if (i != j) {
        Q[i*N+j] =  Math.exp(-dist); //*/ 1/(1 + dist);
        Q[j*N+i] = Q[i*N+j];
        soma += 2*Q[i*N+j];
      }
    }
  }
  // Retorna Q normalizado
  return Q.map(x=>x>1e-100?x/soma:x);
}
)})
    },
    {
      inputs: ["pt","math","calcQ","y_flat"],
      value: (function(pt,math,calcQ,y_flat){return(
pt(math.matrix(math.reshape(calcQ(y_flat).map(x => +x.toFixed(4)), [16,16])), '\\footnotesize')
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Função de custo
A função de custo deve mensurar o erro, ou divergência, entre as probabilidades no espaço em altas dimensões e as probabilidades no espaço mapeado. Para comparar as entropias relativas entre as probabilidades é utilizada a **Divergência de Kullback-Leibler** (KL). Quanto maior o valor da divergência KL, maior a diferença entre as distribuições de probabilidade. Se a divergência for 0, as duas distribuições são idênticas.`
)})
    },
    {
      inputs: ["md","tex","eq2"],
      value: (function(md,tex,eq2){return(
md `## Divergência de Kullback-Leibler
A divergência de Kullback-Leibler é dada pela \`[Equação 2]\` ${tex.block`${eq2}`}`
)})
    },
    {
      inputs: ["md","tex","KLD","p_final","calcQ","y_flat"],
      value: (function(md,tex,KLD,p_final,calcQ,y_flat){return(
md`No nosso exemplo, a custo inicial das distribuições ${tex`P`} e ${tex`Q`} é: ${tex`${KLD(p_final, calcQ(y_flat)).toFixed(5)}`}`
)})
    },
    {
      name: "KLD",
      inputs: ["KL"],
      value: (function(KL){return(
function KLD(prob1, prob2) {
  return prob1.reduce((soma, valor, indice) => soma + (valor==0?0:KL(valor, prob2[indice])))
}
)})
    },
    {
      name: "KL",
      value: (function(){return(
function KL(p, q){
  return p == 0 ? 0 : q == 0 ? Infinity : p * Math.log(p/q)
}
)})
    },
    {
      name: "custo",
      inputs: ["calcQ"],
      value: (function(calcQ){return(
function custo(y, P) {
  // Custo entre pontos e uma distribuição
  // Entradas:
  // y: pontos no espaço mapeado
  // P: distribuição no espaço em altas dimensões
  var Q = calcQ(y);
  const N = y.length;
  var somaCusto = 0;
  for (var i=0; i<N; i++) {
    for (var j=0; j<N; j++) {
      if (i != j) {
        var ij = i*N+j
        var probP = Math.max(P[ij]/Q[ij], 1e-100)
        somaCusto += P[ij] * Math.log(probP);
      }
    }
  }
  return somaCusto;
}
)})
    },
    {
      inputs: ["md","tex","eq5"],
      value: (function(md,tex,eq5){return(
md`# Gradiente
O gradiente da função de custo é dado pela \`[Equação 5]\`, que relaciona as probabilidades no espaço em altas dimensões (${tex`p_{ij}`}), com as probabilidades no espaço mapeado (${tex`q_{ij}`}) e os pontos no espaço mapeado (${tex`y_i`} e ${tex`y_j`}).
  ${tex.block`${eq5}`}
Durante a otimização, ${tex`p`} é mantido fixo, os pontos ${tex`y`} são ajustados em função do gradiente e, por definição, as probabilidades ${tex`q`} são recalculadas a cada iteração.

Para acelerar o processo de otimização e permitir encontrar soluções melhores, o paper sugere a adoção de um dos dois *"truques"* a seguir:
1. **Compressão inicial**: Forçar os pontos do mapa (em menor dimensão) a ficarem próximos entre si no início da otimização. Quando a distância entre os pontos é pequena, é fácil para os aglomerados conseguir mover entre si, de um lado para o outro, explorando melhor o espaço de soluções das possíveis organizações dos dados.
2. **Exagero inicial**: Multiplicar todos os ${tex`p_{ij}`} por um fator, como por exemplo 4, nos estágios iniciais da otimização. Isso significa que quase todos os ${tex`q_{ij}`}, que ainda somam 1, são muito pequenos para modelar os valores altos dos ${tex`p_{ij}`}. Como resultado, a otimização é encorajada a focar na modelagem de grantes ${tex`p_{ij}`} para grandes ${tex`q_{ij}`}. O efeito final é que os aglomerados entre os dados tendem a formar grupos separados no mapa, o que facilita aos clusters se moverem de um lado para o outro.`
)})
    },
    {
      inputs: ["md","tex","pt","math","gradiente","y_flat","p_final"],
      value: (function(md,tex,pt,math,gradiente,y_flat,p_final){return(
md`Cálculo do gradiente na primeira iteração: ${tex`\frac{\delta C}{\delta y_i} =`} ${pt(math.matrix(gradiente(y_flat, p_final, 1)), '\\footnotesize')}`
)})
    },
    {
      inputs: ["md","tex","gamma_eval"],
      value: (function(md,tex,gamma_eval){return(
md`## Ajuste dos pontos mapeados
Após o cálculo do gradiente os pontos devem ser ajustados, para a próxima iteração, da seguinte forma: ${tex.block`${gamma_eval}`}
O valor dos novos pontos mapeados corresponde aos pontos anteriores, somados ao gradiente por um fator de aprendizado e somados à diferença entre as duas últimas predições por um fator ${tex`\alpha(t)`} (momentum). O paper sugere que o momentum tenha valor 0.5 nas primeiras 250 iterações e 0.8 a partir daí.`
)})
    },
    {
      name: "valores_momentum",
      value: (function(){return(
{true:0.5, false:0.8}
)})
    },
    {
      name: "viewof eta",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Taxa de aprendizado',
  min: 0,
  max: 20,
  value: 10,
  step: 0.1,
  description: 'Valor da taxa de aprendizado do gradiente descendente'
})
)})
    },
    {
      name: "eta",
      inputs: ["Generators","viewof eta"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof gatilho_momentum",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Alteração do momentum',
  min: 1,
  max: 500,
  step: 1,
  value: 100,
  description: 'Passo em que o valor do momentum será alterado'
})
)})
    },
    {
      name: "gatilho_momentum",
      inputs: ["Generators","viewof gatilho_momentum"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof it_exagero",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Número de iterações com exagero',
  min: 0,
  max: 200,
  step: 1,
  value:100,
  description: 'Número de iterações em que será aplicado o fator de exagero'
})
)})
    },
    {
      name: "it_exagero",
      inputs: ["Generators","viewof it_exagero"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof valor_exagero",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Exagero',
  min: 0.5,
  max: 10,
  step: 0.5,
  value: 1.5,
  description: 'Multiplicador das probabilidades do espaço original'
})
)})
    },
    {
      name: "valor_exagero",
      inputs: ["Generators","viewof valor_exagero"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof Perp",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Perplexidade',
  min: 1,
  max: 100,
  step: 0.5,
  value: 10,
  description: "Entre com o valor do parâmetro perplexidade"
})
)})
    },
    {
      name: "Perp",
      inputs: ["Generators","viewof Perp"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["vegalite","copiaPequeno"],
      value: (function(vegalite,copiaPequeno){return(
vegalite(copiaPequeno)
)})
    },
    {
      inputs: ["md","iteracao","T","custoRun","it_exagero","valor_exagero","Perp","valores_momentum","gatilho_momentum"],
      value: (function(md,iteracao,T,custoRun,it_exagero,valor_exagero,Perp,valores_momentum,gatilho_momentum){return(
md`**Iteração**: ${iteracao}/${T} - **Custo**: ${custoRun}<br>
**Exagero**: ${iteracao<=it_exagero?valor_exagero:"nenhum"} (${valor_exagero} até iteração ${it_exagero}) - 
**Perplexidade**: ${Perp}<br>
**Momentum**: ${valores_momentum[iteracao<gatilho_momentum]} (${valores_momentum[true]} até iteração ${gatilho_momentum}, ${valores_momentum[false]} depois)`
)})
    },
    {
      inputs: ["vegalite","fr1","pontosMapa","fr2","dimensoes"],
      value: (function(vegalite,fr1,pontosMapa,fr2,dimensoes){return(
vegalite([fr1(pontosMapa), fr2(pontosMapa)][+dimensoes-1])
)})
    },
    {
      name: "viewof reset",
      inputs: ["html"],
      value: (function(html)
{
  const form = html`<form><button name=button>Iniciar`;
  form.button.onclick = event => {
    event.preventDefault(); // Don’t submit the form.
    form.dispatchEvent(new CustomEvent("input"));
  };
  return form;
}
)
    },
    {
      name: "reset",
      inputs: ["Generators","viewof reset"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof T",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Número de iterações',
  min: 0,
  max: 5000,
  step: 50,
  value: 0,
  description: 'Número de iterações do gradiente descendente do t-SNE'
})
)})
    },
    {
      name: "T",
      inputs: ["Generators","viewof T"],
      value: (G, _) => G.input(_)
    },
    {
      name: "pontosMapa",
      inputs: ["iteracao","T","yDisplay","Y","gradiente","p_final","mutable custoRun","custo","mutable iteracao","ystep","gains","valores_momentum","gatilho_momentum","eta"],
      value: (function*(iteracao,T,yDisplay,Y,gradiente,p_final,$0,custo,$1,ystep,gains,valores_momentum,gatilho_momentum,eta)
{
  if (iteracao >= T)
    yield yDisplay.map((p, i)=>(p.y==undefined?{x:Y[i][0], 
                                                nome:p.nome, 
                                                Cluster:p.Cluster}:
                                               {x:Y[i][0],
                                                y:Y[i][1],
                                                nome:p.nome,
                                                Cluster:p.Cluster}));
  else {
    // Adaptado de: https://github.com/karpathy/tsnejs
    var N = Y.length;
    var dim = Y[0].length;
    var grad = gradiente(Y, p_final, iteracao);
    var sign = ((p)=>p<0?-1:p>0?1:p);
    $0.value = custo(Y, p_final);
    $1.value++;    
    // perform gradient step
    for(var i=0;i<N;i++) {
      for(var d=0;d<dim;d++) {
        var gid = grad[i][d];
        var sid = ystep[i][d];
        var gainid = gains[i][d];

        // compute gain update
        var newgain = sign(gid) === sign(sid) ? gainid * 0.8 : gainid + 0.2;
        if(gainid < 0.01) gainid = 0.01; // clamp
        gains[i][d] = newgain; // store for next turn

        // compute momentum step direction
        var momval = valores_momentum[iteracao < gatilho_momentum]; // ? 0.5 : 0.8;
        var newsid = momval * sid - eta * newgain * grad[i][d];
        ystep[i][d] = newsid; // remember the step we took

        // step!
        Y[i][d] += newsid; 
      }
    }
    yield yDisplay.map((p, i)=>(p.y==undefined?{x:Y[i][0], 
                                                nome:p.nome, 
                                                Cluster:p.Cluster}:
                                               {x:Y[i][0],
                                                y:Y[i][1],
                                                nome:p.nome,
                                                Cluster:p.Cluster}));
  }
}
)
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `# Limitações
* Do *t*-SNE:
  * O algoritmo não preserva distâncias nem densidades. Preserva apenas, até um certo grau, a vizinhança. A diferença é sutil mas importante.
  * A performace do t-SNE em tarefas gerais de redução de dimensionalidade não é claramente definida.
  * Não há garantia de convergência para a ótima global da sua função de custo.
* Da implementação:
  * A implementação atual se aplica apenas à reduções do ${tex`\mathbb{R}^M`} para o ${tex`\mathbb{R}^{1|2}`}.
  * Não é difícil incluir outros dados para redução, mas requer edição manual.
  * Algortimo do t-SNE completo porém implementado em partes. <a href="#ref">Texto e código<sup>23</sup></a>
  * Embora seja possĩvel observar comportamentos interessantes do algoritmo em reduções do ${tex`\mathbb{R}^2`} para ${tex`\mathbb{R}^1`}, é preciso ter cuidado ao generalizar conclusões sobre *t*-SNE baseadas apenas nesta redução de uma dimensão.`
)})
    },
    {
      name: "ref",
      inputs: ["md"],
      value: (function(md){return(
md`# Referências
### BibTeX do artigo
\`\`\`
@article{maaten2008visualizing,
  title={Visualizing data using t-SNE},
  author={Maaten, Laurens van der and Hinton, Geoffrey},
  journal={Journal of machine learning research},
  volume={9},
  number={Nov},
  pages={2579--2605},
  year={2008}
}
\`\`\`

### Links
1. [MNIST](http://yann.lecun.com/exdb/mnist/)
2. [Paper: Visualizing data using t-SNE](http://www.jmlr.org/papers/volume9/vandermaaten08a/vandermaaten08a.pdf)
3. [Site do t-SNE - Laurens van der Maaten](https://lvdmaaten.github.io/tsne/)
4. [Wikipedia: t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding)
5. [Paper: Linear t-SNE optimization for the web](https://arxiv.org/pdf/1805.10817.pdf)
6. [How to use t-SNE effectively](https://distill.pub/2016/misread-tsne/)
7. [Introduction to t-SNE with Python](https://towardsdatascience.com/an-introduction-to-t-sne-with-python-example-5a3a293108d1)
8. [t-SNE implementado em R e Python](https://www.analyticsvidhya.com/blog/2017/01/t-sne-implementation-r-python/)
9. [Visualizing datasets with PCA and t-SNE in Python](https://medium.com/@luckylwk/visualising-high-dimensional-datasets-using-pca-and-t-sne-in-python-8ef87e7915b)
10. [t-SNE Guide with Python and R](https://www.analyticsvidhya.com/blog/2017/01/t-sne-implementation-r-python/)
11. [Real time t-SNE Visualizations with TensorFlow.js](https://ai.googleblog.com/2018/06/realtime-tsne-visualizations-with.html)
12. [Implementação do t-SNE em JavaScript - Karpathy](https://github.com/karpathy/tsnejs)
13. [O porque de momentum realmente funcionar](https://distill.pub/2017/momentum/)
14. [GoogleBlog: TensorFlow Embedding Projector](https://ai.googleblog.com/2016/12/open-sourcing-embedding-projector-tool.html)
15. [TensorFlow Embedding Projector](http://projector.tensorflow.org/)
16. [Tensorflow: Embeddings](https://www.tensorflow.org/guide/embedding)
17. [Tensorflow.js](https://js.tensorflow.org/)
18. [Student's *t*-distribution](https://en.wikipedia.org/wiki/Student%27s_t-distribution)
19. [Função Gamma](https://github.com/substack/gamma.js/blob/master/index.js)
20. [Divergência de Kullback-Leibler](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence)
21. [Mike Bostock - Let's try t-SNE](https://beta.observablehq.com/@mbostock/lets-try-t-sne)
22. [Yasser S. Abu-Mostafa - Caltech](https://work.caltech.edu/)
23. [Repositório github](https://github.com/RobStelling/tsne)`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Dados e funções auxiliares`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Variáveis de apoio`
)})
    },
    {
      name: "pontos",
      value: (function(){return(
{
    "values": [
      {x: 0.62, y: 0.5, Cluster: "a", nome: "p0"},
      {x: 1, y: 0.97, Cluster: "a", nome: "p1"},
      {x: 0.77, y: 1.27, Cluster: "a", nome: "p2"},
      {x: 0.5, y: 1.03, Cluster: "a", nome: "p3"},
      {x: 1.03, y: 2.75, Cluster: "b", nome: "p4"},
      {x: 1.45, y: 2.98, Cluster: "b", nome: "p5"},
      {x: 1.06, y: 3.5, Cluster: "b", nome: "p6"},
      {x: 0.75, y: 2.99, Cluster: "b", nome: "p7"},
      {x: 3.1, y: 3.2, Cluster: "c", nome: "p8"},
      {x: 3.5, y: 3.55, Cluster: "c", nome: "p9"},
      {x: 2.9, y: 3.75, Cluster: "c", nome: "p10"},
      {x: 2.5, y: 3.45, Cluster: "c", nome: "p11"},
      {x: 3.22, y: 0.75, Cluster: "d", nome: "p12"},
      {x: 3.4, y: 1.22, Cluster: "d", nome: "p13"},
      {x: 3.27, y: 1.75, Cluster: "d", nome: "p14"},
      {x: 3.0, y: 1.28, Cluster: "d", nome: "p15"},
    ]
  }
)})
    },
    {
      name: "pontos_flat",
      inputs: ["pontos"],
      value: (function(pontos){return(
pontos.values.map(p=>[p.x, p.y])
)})
    },
    {
      name: "d_flat",
      inputs: ["matrizDistancias","pontos_flat"],
      value: (function(matrizDistancias,pontos_flat){return(
matrizDistancias(pontos_flat)
)})
    },
    {
      name: "p_flat",
      inputs: ["pontos_flat","calcPi","s2"],
      value: (function(pontos_flat,calcPi,s2)
{
  var N = pontos_flat.length;
  var matriz = []
  for (var i=0; i<N; i++)
    matriz = matriz.concat(calcPi(pontos_flat, i, s2));
  return matriz.map(p=>p/16);
}
)
    },
    {
      name: "p_variancias_display",
      inputs: ["ajustaVariancias","pontos_flat","Perp_display"],
      value: (function(ajustaVariancias,pontos_flat,Perp_display){return(
ajustaVariancias(pontos_flat, Math.log2(Perp_display), 1e-4, 50)
)})
    },
    {
      name: "entropia",
      inputs: ["Perp"],
      value: (function(Perp){return(
Math.log2(Perp)
)})
    },
    {
      name: "p_variancias",
      inputs: ["ajustaVariancias","pontos_flat","entropia"],
      value: (function(ajustaVariancias,pontos_flat,entropia){return(
ajustaVariancias(pontos_flat, entropia, 1e-4, 50)
)})
    },
    {
      name: "p_final",
      inputs: ["p_variancias","atribIJ","valorIJ"],
      value: (function(p_variancias,atribIJ,valorIJ)
{
  var tamanho = p_variancias.length;
  var tamanho_linha = Math.sqrt(tamanho);
  var m_a = new Array(p_variancias.length),
      probMedia;
  for (let i=0; i<tamanho_linha; i++) {
    atribIJ(i, i, m_a, 0);
    for (let j=i+1; j<tamanho_linha; j++) {
      probMedia = (valorIJ(i, j, p_variancias)+valorIJ(j, i, p_variancias))/2;
      atribIJ(i, j, m_a, probMedia);
      atribIJ(j, i, m_a, probMedia);
    }
  }
  return m_a;
}
)
    },
    {
      name: "dMapa",
      inputs: ["matriz","pontos","dimensoes","gaussRandom","ideal_linear"],
      value: (function(matriz,pontos,dimensoes,gaussRandom,ideal_linear){return(
{
  randomico: matriz(pontos.values.length, +dimensoes, (()=>gaussRandom()*1e-4)),
  comprimido: matriz(pontos.values.length, +dimensoes, (()=>gaussRandom()*1e-6)),
  ideal: ideal_linear.values.map((p)=>dimensoes==1?[p.x]:[p.x, p.y])
}
)})
    },
    {
      name: "y_flat",
      inputs: ["dMapa","tipo_projecao"],
      value: (function(dMapa,tipo_projecao){return(
dMapa[tipo_projecao]
)})
    },
    {
      name: "yDisplay",
      inputs: ["pontos","dimensoes","y_flat"],
      value: (function(pontos,dimensoes,y_flat){return(
pontos.values.map(function(x, i){
  if (dimensoes == 1)
    return {x:y_flat[i][0], nome:x.nome, Cluster:x.Cluster};
  else if (dimensoes == 2)
    return {x:y_flat[i][0], y: y_flat[i][1], nome:x.nome, Cluster:x.Cluster};
})
)})
    },
    {
      name: "initial custoRun",
      value: (function(){return(
Infinity
)})
    },
    {
      name: "mutable custoRun",
      inputs: ["Mutable","initial custoRun"],
      value: (M, _) => new M(_)
    },
    {
      name: "custoRun",
      inputs: ["mutable custoRun"],
      value: _ => _.generator
    },
    {
      name: "initial iteracao",
      value: (function(){return(
0
)})
    },
    {
      name: "mutable iteracao",
      inputs: ["Mutable","initial iteracao"],
      value: (M, _) => new M(_)
    },
    {
      name: "iteracao",
      inputs: ["mutable iteracao"],
      value: _ => _.generator
    },
    {
      name: "digitos",
      inputs: ["math","distQ"],
      value: (function(math,distQ){return(
Math.max(3, Math.abs(Math.floor(Math.log10(math.mean(distQ)))))
)})
    },
    {
      name: "original",
      inputs: ["width","pontos","colorScheme","tamanhoCirculo","opacity"],
      value: (function(width,pontos,colorScheme,tamanhoCirculo,opacity){return(
{
  width: Math.min(300, width),
  height: 300,
  data: pontos,
  title: "Dados originais",
  encoding: {
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative"},
    color: {field: "Cluster", type: "nominal", scale:{scheme: colorScheme}, title:"Cluster"},
  },
  layer: [{
      mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
    },{
      mark: {type: "text", dy: 17},
      encoding:{
        text:{field:"nome"},
        color: {value: "black"}
      }
  }]
}
)})
    },
    {
      name: "copiaPequeno",
      inputs: ["original","width"],
      value: (function(original,width)
{
  var cp = JSON.parse(JSON.stringify(original));;
  cp.width = Math.min(200, width);
  cp.height = 200;
  cp.layer[0].mark.size = 50;
  cp.title = "Dados originais";
  return cp;
}
)
    },
    {
      name: "fr1",
      inputs: ["width","colorScheme","tamanhoCirculo","opacity"],
      value: (function(width,colorScheme,tamanhoCirculo,opacity){return(
function fr1(dados) {
  return ({
    width: Math.min(800, width),
    data: {values: dados},
    //title: "Projeção inicial dos pontos",
    encoding: {
      x: {field: "x", type: "quantitative"},
      color: {field: "Cluster", type: "nominal", scale: {scheme: colorScheme}, title: "Cluster"},
    },
    layer: [{
      mark: {type: "circle", size: tamanhoCirculo*2.5, opacity: opacity},
    },{
      mark: {type: "text", dy: 3},
      encoding:{
        text:{field:"nome", type:"nominal"},
        color: {value: "black"}
      }
    }]
  });
}
)})
    },
    {
      name: "fr2",
      inputs: ["width","colorScheme","tamanhoCirculo","opacity"],
      value: (function(width,colorScheme,tamanhoCirculo,opacity){return(
function fr2(dados) {
  return {
    width: Math.min(300, width),
    height: 300,
    data: {values:dados},
    encoding: {
      x: {field: "x", type: "quantitative"},
      y: {field: "y", type: "quantitative"},
      color: {field: "Cluster", type: "nominal", scale:{scheme: colorScheme}, title:"Cluster"},
    },
    layer: [{
        mark: {type: "circle", size: tamanhoCirculo, opacity: opacity},
      },{
        mark: {type: "text", dy: 17},
        encoding:{
          text:{field:"nome"},
          color: {value: "black"}
        }
    }]
  };
}
)})
    },
    {
      name: "Y",
      inputs: ["reset","mutable iteracao","y_flat","matriz"],
      value: (function(reset,$0,y_flat,matriz)
{
  reset;
  $0.value = 0;
  const N = y_flat.length,
        dim = y_flat[0].length;
  let g = matriz(N, dim);
  for (var i=0; i<N; i++)
    for (var d=0; d<dim; d++)
      g[i][d] = y_flat[i][d];
  return g;
}
)
    },
    {
      name: "initial gains",
      inputs: ["matriz","ystep"],
      value: (function(matriz,ystep){return(
matriz(ystep.length, ystep[0].length, 1.0)
)})
    },
    {
      name: "mutable gains",
      inputs: ["Mutable","initial gains"],
      value: (M, _) => new M(_)
    },
    {
      name: "gains",
      inputs: ["mutable gains"],
      value: _ => _.generator
    },
    {
      name: "initial ystep",
      inputs: ["zeros","Y"],
      value: (function(zeros,Y){return(
zeros(Y.length, Y[0].length)
)})
    },
    {
      name: "mutable ystep",
      inputs: ["Mutable","initial ystep"],
      value: (M, _) => new M(_)
    },
    {
      name: "ystep",
      inputs: ["mutable ystep"],
      value: _ => _.generator
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Funções de apoio`
)})
    },
    {
      name: "matrizDistancias",
      inputs: ["zeros","calcDistancia"],
      value: (function(zeros,calcDistancia){return(
function matrizDistancias(pontos, metrica) {
  // pontos: Vetor de pontos em R^N
  // ṕontos = [[p_11, ..., p_0n], [p_21, ..., p_2n], ..., [p_k1,...,p_kn]]
  var N = pontos.length,          // Quantidade de pontos
      dist = zeros(N*N);
  if (metrica===undefined) metrica = calcDistancia;
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++ ) {
      var distancia = metrica(pontos[i], pontos[j])
      dist[i*N+j] = distancia;
      dist[j*N+i] = distancia;
    }
  }
  return dist;
}
)})
    },
    {
      name: "calcDistancia",
      inputs: ["euclidiana","L2","cDistancia"],
      value: (function(euclidiana,L2,cDistancia){return(
[euclidiana, L2][cDistancia]
)})
    },
    {
      name: "euclidiana",
      inputs: ["L2"],
      value: (function(L2){return(
function euclidiana(p1, p2) {
  // Distância euclidiana 
  return Math.sqrt(L2(p1, p2));
}
)})
    },
    {
      name: "L2",
      value: (function(){return(
function L2(p1, p2) {
  // p = [P1,..,Pdim]
  var dim = p1.length,
      dist = 0;
  for (var i = 0; i < dim; i++) {
    var p1i = p1[i], p2i = p2[i];
    dist += (p1i-p2i)*(p1i-p2i);
  }
  return dist;
}
)})
    },
    {
      name: "calcPi",
      inputs: ["matrizDistancias","euclidiana","zeros","L2"],
      value: (function(matrizDistancias,euclidiana,zeros,L2){return(
function calcPi(p, i, s2i) {
  var N = p.length,
      N2 = N*N,
      dim = p[i].length,
      norma = 0.0,
      D = matrizDistancias(p, euclidiana),
      P = zeros(N);
  for (var j=0; j<N; j++) {
    if (i != j)
      P[j] = Math.exp(-(L2(p[i], p[j]))/(2*s2i));
    norma += P[j];
  }
  return P.map(p=>p/norma);
}
)})
    },
    {
      name: "gradiente",
      inputs: ["it_exagero","valor_exagero","calcQ","zeros","L2"],
      value: (function(it_exagero,valor_exagero,calcQ,zeros,L2){return(
function gradiente(y, P, iter) {
  // Retorna o gradiente dados:
  // y: pontos no espaço mapeado
  // P: Probabilidades no espaço original
  // iter: Número da iteração atual
  // dC/dy = 4 * sum((p_ij-q_ij)(y_i-y_j)(1+|y_i-y_j|^2)^-1)
  const ex = iter <= it_exagero?valor_exagero:1,
        N = y.length,
        dim = y[0].length,
        Q = calcQ(y);
  var g = zeros(N, dim);
  for (var i=0; i<N; i++) {
    for (var j=0; j<N; j++) {
      const ij = N*i+j,
            pq = (ex*P[ij])-Q[ij],
            dist = 1+L2(y[i], y[j]);
      for (var d=0; d<dim; d++)
        g[i][d] += 4*pq*(y[i][d]-y[j][d])/dist;
    }
  }
  return g;
}
)})
    },
    {
      name: "grad",
      inputs: ["it_exagero","valor_exagero","zeros","L2","ind"],
      value: (function(it_exagero,valor_exagero,zeros,L2,ind){return(
function grad(p, q, y, iter) {
  /*
   * Retorna o gradiente dados:
   * p: Probabilidades dos pontos no espaço original
   * q: Probabilidades dos pontos no espaço mapeado
   * y: Pontos no espaço mapeado
   * iter: Iteração atual
   */
  const numPontos = y.length;
  const dim = y[0].length;
  const exagero = iter<it_exagero?valor_exagero:1;
  var soma;
  var gradiente = zeros(numPontos, dim);
  for (let j, i=0; i<numPontos; i++) {
    soma = 0;
    for (j=0; j<numPontos; j++) {
      // p_ij - q_ij * (y_i - y_j) * (1 + dist(y_i, y_j))^-1
      let dist = L2(y[i], y[j]), //distR1({x:y[i]}, {x:y[j]}),
          ij = ind(i,j);
      for (var d=0; d<dim; d++)
        gradiente[i][d] += 4*(exagero * p[ij] - q[ij]) *
                 (y[i][d] - y[j][d]) /
                 (1+dist)
    } 
  }
  return gradiente;
}
)})
    },
    {
      name: "erro",
      value: (function(){return(
function erro(p1, p2) {
  return p1.reduce((soma, valor, i)=> soma + Math.abs(valor - p2[i]) , 0)/p1.length;
}
)})
    },
    {
      name: "emq",
      value: (function(){return(
function emq(p1, p2) {
  return p1.reduce((soma, valor, i)=> soma + (valor - p2[i]) * (valor - p2[i]) , 0)/p1.length;
}
)})
    },
    {
      name: "zeros",
      inputs: ["vetor","matriz"],
      value: (function(vetor,matriz){return(
function zeros(m, n) {
  // Retorna um vetor ou matriz de zeros
  if (n == undefined)
    return vetor(m, 0.0);
  return matriz(m, n, 0.0);
}
)})
    },
    {
      name: "vetor",
      inputs: ["math"],
      value: (function(math){return(
function vetor(n, s) {
  // Retorna um vetor de n itens de formato s
  // Se s for uma função, chama a funcão a cada vez
  // Se s for indefinido, inicializa com tgRand
  if (typeof(n) === 'undefined' || isNaN(n))
    return [];
  if (typeof(n) === 'number')
    if (typeof(s) == 'number')
      return [...new Float64Array(n)].map(()=>s);
    else if (typeof(s) == 'function') // Idealmente, funcao retornará um numero
      return [...new Float64Array(n)].map(()=>s());
    else if (typeof(s) == 'undefined') // Retorna tgRand
      return [...new Float64Array(n)].map(()=>math.random());
  return [...new Array(n)].map(()=>s);
}
)})
    },
    {
      name: "matriz",
      inputs: ["vetor"],
      value: (function(vetor){return(
function matriz(m, n, s) {
  // Retorna uma matriz mxn inicializada com s
  // Se s não for definido, inicializa com tgRand (ver vetor)
  return [...new Array(m)].map(()=>vetor(n, s));
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Gera vetor de distâncias
Mais econõmico em espaço que matriz`
)})
    },
    {
      name: "v_d",
      inputs: ["zero","dist"],
      value: (function(zero,dist){return(
function v_d(p) {
  let tamanho = p.length,
      v = new Array(),
      d;
  for (let i = 0; i < tamanho; i++) {
    v.push({source: i, target: i, distance: zero});
    for (let j = i+1 ; j < tamanho; j++) {
      d = +dist(p[i], p[j]).toFixed(3);
      v.push({source: i, target: j, distance: d});
    }
  }
  return v;
}
)})
    },
    {
      name: "zero",
      value: (function(){return(
0
)})
    },
    {
      name: "d_p",
      inputs: ["v_d","pontos"],
      value: (function(v_d,pontos){return(
v_d(pontos.values)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Gera o índice no vetor de distâncias a partir de i,j e o tamanho k`
)})
    },
    {
      name: "ind",
      inputs: ["pontos"],
      value: (function(pontos){return(
function ind(i, j) {
  return i * pontos.values.length + j;
}
)})
    },
    {
      name: "indT",
      value: (function(){return(
function indT(i, j, k) {
  function triangular(i) {
    return (i * (i + 1)) / 2;
  }
  
  let menor = Math.min(i, j), maior = Math.max(i, j);
  return triangular(k) - triangular(k-menor) + maior - menor;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Gera matriz de distâncias`
)})
    },
    {
      name: "m_dR1",
      inputs: ["md_generica","distR1"],
      value: (function(md_generica,distR1){return(
function m_dR1(p) {
  return md_generica(p, distR1);
}
)})
    },
    {
      name: "distR1",
      inputs: ["distR1_g"],
      value: (function(distR1_g){return(
function distR1(pi, pj){
  // Função de distância para pontos no formato {x: X}
  return distR1_g(pi.x, pj.x);
}
)})
    },
    {
      name: "distR1_g",
      value: (function(){return(
function distR1_g(pi, pj){
  // Função de distância para pontos no formato {x: X}
  return Math.sqrt((pi-pj)**2);
}
)})
    },
    {
      name: "m_d",
      inputs: ["md_generica","dist"],
      value: (function(md_generica,dist){return(
function m_d(p) {
  return md_generica(p, dist);
}
)})
    },
    {
      name: "dist",
      value: (function(){return(
function dist(pi, pj){
  // Função de distância para pontos no formato {x: X, y: Y}
  return Math.sqrt((pi.x-pj.x)**2+(pi.y-pj.y)**2);
}
)})
    },
    {
      name: "md_generica",
      inputs: ["zero"],
      value: (function(zero){return(
function md_generica(p, funcaoDistancia) {
  let tamanho = p.length,
      m = new Array(tamanho);

  for (let i = 0; i < tamanho; i++)
    m[i] = new Array(tamanho);
  for (let i = 0; i < tamanho; i++) {
    m[i][i] = zero;
    for (let j = i+1; j < tamanho; j++) {
      m[i][j] = +funcaoDistancia(p[i], p[j]).toFixed(3);
      m[j][i] = m[i][j];
    }
  }
  return m;
}
)})
    },
    {
      name: "distancias",
      inputs: ["m_d","pontos"],
      value: (function(m_d,pontos){return(
m_d(pontos.values)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Matrizes de distâncias e probabilidades "achatadas"`
)})
    },
    {
      name: "valorIJ",
      value: (function(){return(
function valorIJ(i, j, m) {
  // Posição [i][j] de uma matrix m kxk
  return m[Math.sqrt(m.length)*i+j];
}
)})
    },
    {
      name: "atribIJ",
      value: (function(){return(
function atribIJ(i, j, m, valor) {
  // Posição [i][j] de uma matrix m kxk
  m[Math.sqrt(m.length)*i+j] = valor;
}
)})
    },
    {
      inputs: ["valorIJ","m_p"],
      value: (function(valorIJ,m_p){return(
valorIJ(0,1,m_p)
)})
    },
    {
      name: "m_p",
      inputs: ["d_flat","zero","student"],
      value: (function(d_flat,zero,student){return(
d_flat.map(y=>y<=zero?0.0:student(y, 1))
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Dados artificiais para projeção idealizada dos 16 pontos`
)})
    },
    {
      name: "ideal_linear",
      value: (function(){return(
{
    "values": [
      {"x": 0.72, "y": 1, "Cluster": "a"},
      {"x": 0.82, "y": 1.47, "Cluster": "a"},
      {"x": 0.92, "y": 2, "Cluster": "a"},
      {"x": 1.02, "y": 1.53, "Cluster": "a"},
      {"x": 1.53, "y": 3.25, "Cluster": "b"},
      {"x": 1.63, "y": 3.73, "Cluster": "b"},
      {"x": 1.73, "y": 4.25, "Cluster": "b"},
      {"x": 1.83, "y": 3.74, "Cluster": "b"},
      {"x": 3.23, "y": 3, "Cluster": "c"},
      {"x": 3.33, "y": 3.55, "Cluster": "c"},
      {"x": 3.43, "y": 4, "Cluster": "c"},
      {"x": 3.53, "y": 3.45, "Cluster": "c"},
      {"x": 2.53, "y": 0.75, "Cluster": "d"},
      {"x": 2.63, "y": 1.22, "Cluster": "d"},
      {"x": 2.73, "y": 1.75, "Cluster": "d"},
      {"x": 2.83, "y": 1.28, "Cluster": "d"},
    ]
  }
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Dataset carros`
)})
    },
    {
      name: "carros",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://vega.github.io/vega-lite/data/cars.json")
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `#### Dataset meia lua`
)})
    },
    {
      name: "m_l",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://raw.githubusercontent.com/RobStelling/miscImg/master/dados/halfMoon.json")
)})
    },
    {
      name: "meia_lua",
      inputs: ["m_l"],
      value: (function(m_l){return(
JSON.parse(m_l)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Dataset círculos`
)})
    },
    {
      name: "circ",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://raw.githubusercontent.com/RobStelling/miscImg/master/dados/2circulos.json")
)})
    },
    {
      name: "circulos",
      inputs: ["circ"],
      value: (function(circ){return(
JSON.parse(circ)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Atributos de gráficos`
)})
    },
    {
      name: "tamanhoCirculo",
      value: (function(){return(
150
)})
    },
    {
      name: "opacity",
      value: (function(){return(
0.45
)})
    },
    {
      name: "colorScheme",
      value: (function(){return(
"set1"
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `#### Curvas normal e *t* de Student`
)})
    },
    {
      name: "gaussRandom",
      value: (function(){return(
(function() {
  // return_v: Tells if there is a cached value
  // v_val: Cached value
  var return_v = false;
  var v_val = 0.0;
  return function gauss() {
    // Generates a gauss distributed random with mean 0.0
    // and sigma 1
    // Based on https://github.com/karpathy/tsnejs
    if(return_v) { 
        return_v = false;
        return v_val; 
    }
    var u = 2*Math.random()-1;
    var v = 2*Math.random()-1;
    var r = u*u + v*v;
    if(r == 0 || r > 1)
      return gauss();
    var c = Math.sqrt(-2*Math.log(r)/r);
    v_val = v*c;
    return_v = true;
    return u*c;
  };
})()
)})
    },
    {
      name: "gera_curvas",
      inputs: ["normal","students"],
      value: (function(normal,students){return(
function gera_curvas(minimo, maximo, step, sigma, mi, gl) {
  // Gera pontos para distribuições Normal e Student com mesma variância
  let vetor = [];
  for (let x = minimo; x < maximo; x+= step) {
    vetor.push({x:x, y:normal(x, sigma, mi), Curva:"Normal"});
    vetor.push({x:x, y:students(x, gl, sigma), Curva:"Student"});
  }
  return vetor;
}
)})
    },
    {
      name: "gera_normal",
      inputs: ["normal"],
      value: (function(normal){return(
function gera_normal(minimo, maximo, step, sigma, mi) {
  let vetor = [];
  for (let x = minimo; x < maximo; x+= step)
    vetor.push({x:x, y:normal(x, sigma, mi)});
  return vetor;
}
)})
    },
    {
      name: "normal",
      value: (function(){return(
function normal(x, s, mi) {
  let y;
  y = 1/(s*Math.sqrt(2*Math.PI));
  y = y * Math.exp(-((x-mi)**2)/(2*s**2));
  return +y.toFixed(4);
}
)})
    },
    {
      name: "gera_student",
      inputs: ["student"],
      value: (function(student){return(
function gera_student(minimo, maximo, step, gl) {
  let vetor = [];
  for (let x = minimo; x <= maximo; x+= step)
    vetor.push({x:x, y:student(x, gl)});
  return vetor;
}
)})
    },
    {
      name: "student",
      inputs: ["students"],
      value: (function(students){return(
function student(x, gl) {
  // t de Student com desvio padrão 1
  return students(x, gl, 1);
}
)})
    },
    {
      name: "students",
      inputs: ["stats"],
      value: (function(stats){return(
function students(x, gl, s) {
  return +(stats.gammaFunc((gl+1)/2)/((Math.sqrt(gl*Math.PI)*s)*stats.gammaFunc(gl/2))*(1+((x/s)**2/gl))**(-(gl+1)/2)).toFixed(4)
}
)})
    },
    {
      name: "cauchy",
      value: (function(){return(
function cauchy(x) {
  return 1/(Math.PI*(1+x*x))
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`##### Função gamma`
)})
    },
    {
      name: "p",
      value: (function(){return(
[
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
]
)})
    },
    {
      name: "g_ln",
      value: (function(){return(
607/128
)})
    },
    {
      name: "p_ln",
      value: (function(){return(
[
    0.99999999999999709182,
    57.156235665862923517,
    -59.597960355475491248,
    14.136097974741747174,
    -0.49191381609762019978,
    0.33994649984811888699e-4,
    0.46523628927048575665e-4,
    -0.98374475304879564677e-4,
    0.15808870322491248884e-3,
    -0.21026444172410488319e-3,
    0.21743961811521264320e-3,
    -0.16431810653676389022e-3,
    0.84418223983852743293e-4,
    -0.26190838401581408670e-4,
    0.36899182659531622704e-5
]
)})
    },
    {
      name: "logGamma",
      value: (function(){return(
function logGamma(Z) {
  var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
  var LG=(Z-.5)*Math.log(Z+4.5)-(Z+4.5)+Math.log(S*2.50662827465);
	return LG;
}
)})
    },
    {
      name: "lngamma",
      inputs: ["p_ln","g_ln"],
      value: (function(p_ln,g_ln){return(
function lngamma(z) {
    if(z < 0) return Number('0/0');
    var x = p_ln[0];
    for(var i = p_ln.length - 1; i > 0; --i) x += p_ln[i] / (z + i);
    var t = z + g_ln + 0.5;
    return .5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(x)-Math.log(z);
}
)})
    },
    {
      name: "gamma",
      inputs: ["lngamma","p"],
      value: (function(lngamma,p){return(
function gamma (z) {
  var g = 7;
  if (z < 0.5) {
      return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  }
  else if(z > 100) return Math.exp(lngamma(z));
  else {
    z -= 1;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
        x += p[i] / (z + i);
    }
    var t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI)
        * Math.pow(t, z + 0.5)
        * Math.exp(-t)
        * x;
  }
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Matriz de dados em *TeX*`
)})
    },
    {
      name: "pt",
      inputs: ["tex"],
      value: (function(tex){return(
(matrix, size) => {
  if (size == undefined)
    size = "\\small";
  const data = matrix.toArray().map(row => row.join(' & ')).join(' \\\\ ')
  const el = tex`${size}
\left(\begin{matrix}
${data}
\end{matrix}\right)
`
  el.value = matrix
  return el
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `#### Equações em *TeX*`
)})
    },
    {
      name: "eq1",
      value: (function(){return(
String.raw`p_{j|i} = \frac{\exp(-\|x_i-x_j\|^2/2\sigma^2_i)}{\sum_{k\neq i}\exp(-\|x_i-x_k\|^2/2\sigma^2_i)}`
)})
    },
    {
      name: "eq2",
      value: (function(){return(
String.raw`C = \sum_i KL(P_i\|Q_i) = \sum_i\sum_j p_{j|i} \log\frac{p_{j|i}}{q_{j|i}}`
)})
    },
    {
      name: "eq3",
      value: (function(){return(
String.raw`q_{ij} = \frac{\exp(-\|y_i-y_j\|^2)}{\sum_{k\neq l}\exp(-\|y_k-y_l\|^2)}`
)})
    },
    {
      name: "eq4",
      value: (function(){return(
String.raw`q_{ij} = \frac{(1+\|y_i-y_j\|^2)^{-1}}{\sum_{k\neq l}(1+\|y_k-y_l\|^2)^{-1}}`
)})
    },
    {
      name: "eq5",
      value: (function(){return(
String.raw`\frac{\delta C}{\delta y_i} = 4\sum_j(p_{ij}-q_{ij})(y_i-y_j)(1+\|y_i-y_j\|^2)^{-1}`
)})
    },
    {
      name: "eq6",
      value: (function(){return(
String.raw`\sum_i\sum_j p_{ij} \log p_{ij}-p_{ij}\log q_{ij}`
)})
    },
    {
      name: "gamma_eval",
      value: (function(){return(
String.raw`\gamma^{(t)} = \gamma^{(t-1)} + \eta\frac{\delta C}{\delta \gamma} + \alpha(t)(\gamma^{(t-1)} - \gamma^{(t-2)})`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Conteúdo importado`
)})
    },
    {
      from: "@mbostock/lets-try-t-sne",
      name: "chart",
      remote: "chart"
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
    },
    {
      from: "@jashkenas/inputs",
      name: "radio",
      remote: "radio"
    },
    {
      name: "vegalite",
      inputs: ["require"],
      value: (function(require){return(
require("@observablehq/vega-lite")
)})
    },
    {
      name: "math",
      inputs: ["require"],
      value: (function(require){return(
require('https://unpkg.com/mathjs@5.0.1/dist/math.min.js')
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3-fetch@1")
)})
    },
    {
      name: "stats",
      inputs: ["require"],
      value: (function(require){return(
require('statdists')
)})
    }
  ]
};

const m1 = {
  id: "@mbostock/lets-try-t-sne",
  variables: [
    {
      name: "chart",
      inputs: ["restart","html","width","DOM","tsne","data","NUM_POINTS","colors","labels"],
      value: (async function*(restart,html,width,DOM,tsne,data,NUM_POINTS,colors,labels)
{
  if (!restart) {
    yield html`<img src=https://user-images.githubusercontent.com/230541/50366746-76ba4a00-0530-11e9-8c23-9fbed27d9280.png>`;
    return;
  }
  const height = width;
  const context = DOM.context2d(width, height);
  for await (const coordinates of tsne(data)) {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < NUM_POINTS; ++i) {
      const x = coordinates[(i << 1) + 0];
      const y = coordinates[(i << 1) + 1];
      context.fillStyle = colors[labels[i]];
      context.fillText(labels[i], x * width, y * height);
    }
    yield context.canvas;
  }
}
)
    },
    {
      name: "viewof restart",
      inputs: ["html"],
      value: (function(html)
{
  const form = html`<form><button name=button>Restart`;
  form.value = 0;
  form.button.onclick = event => {
    ++form.value;
    form.dispatchEvent(new CustomEvent("input"));
    event.preventDefault();
  };
  return form;
}
)
    },
    {
      name: "restart",
      inputs: ["Generators","viewof restart"],
      value: (G, _) => G.input(_)
    },
    {
      name: "tsne",
      inputs: ["tf","NUM_KNN_ITERATIONS","NUM_ITERATIONS"],
      value: (function(tf,NUM_KNN_ITERATIONS,NUM_ITERATIONS){return(
async function* tsne(data) {
  const tsne = tf.tsne.tsne(data);
  await tsne.iterateKnn(NUM_KNN_ITERATIONS);
  for (let i = 0; i < NUM_ITERATIONS; ++i) {
    await tsne.iterate();
    yield await tsne.coordinates().data();
  }
}
)})
    },
    {
      name: "data",
      inputs: ["tidy","tf","datasetImages","NUM_POINTS","SPRITE_SIZE","NEW_SIZE"],
      value: (function(tidy,tf,datasetImages,NUM_POINTS,SPRITE_SIZE,NEW_SIZE){return(
tidy(() => tf
  .tensor4d(datasetImages, [NUM_POINTS, SPRITE_SIZE, SPRITE_SIZE, 1])
  .resizeBilinear([NEW_SIZE, NEW_SIZE])
  .reshape([NUM_POINTS, NEW_SIZE * NEW_SIZE]))
)})
    },
    {
      name: "NUM_POINTS",
      value: (function(){return(
10000
)})
    },
    {
      name: "colors",
      value: (function(){return(
["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
)})
    },
    {
      name: "labels",
      inputs: ["tidy","tf","datasetLabels","NUM_POINTS","NUM_CLASSES"],
      value: (function(tidy,tf,datasetLabels,NUM_POINTS,NUM_CLASSES){return(
tidy(() => tf
  .tensor2d(datasetLabels, [NUM_POINTS, NUM_CLASSES])
  .argMax(1)
  .dataSync())
)})
    },
    {
      name: "tf",
      inputs: ["require"],
      value: (async function(require)
{
  const r = require.alias({
    "@tensorflow/tfjs-core": "@tensorflow/tfjs-core@0.14",
    "@tensorflow/tfjs-tsne": "@tensorflow/tfjs-tsne@0.2"
  });
  const [tf, tsne] = await Promise.all([
    r("@tensorflow/tfjs-core"),
    r("@tensorflow/tfjs-tsne")
  ]);
  tf.tsne = tsne;
  return tf;
}
)
    },
    {
      name: "NUM_KNN_ITERATIONS",
      value: (function(){return(
500
)})
    },
    {
      name: "NUM_ITERATIONS",
      value: (function(){return(
1000
)})
    },
    {
      name: "tidy",
      inputs: ["Generators","tf"],
      value: (function(Generators,tf){return(
f => Generators.disposable(tf.tidy(f), x => x && x.dispose && x.dispose())
)})
    },
    {
      name: "datasetImages",
      inputs: ["NUM_POINTS","IMAGE_WIDTH","DOM","CHUNK_SIZE","sprites"],
      value: (function(NUM_POINTS,IMAGE_WIDTH,DOM,CHUNK_SIZE,sprites)
{
  const array = new Float32Array(NUM_POINTS * IMAGE_WIDTH);
  const context = DOM.context2d(IMAGE_WIDTH, CHUNK_SIZE, 1);
  for (let i = 0; i < NUM_POINTS; i += CHUNK_SIZE) {
    context.drawImage(
      sprites,
      0, i, IMAGE_WIDTH, CHUNK_SIZE,
      0, 0, IMAGE_WIDTH, CHUNK_SIZE
    );
    const {data} = context.getImageData(0, 0, IMAGE_WIDTH, CHUNK_SIZE);
    const offset = i * IMAGE_WIDTH;
    for (let j = 0; j < data.length; j += 4) {
      array[offset + (j >> 2)] = data[j] / 255; // Grayscale, so just read the red channel.
    }
  }
  return array;
}
)
    },
    {
      name: "SPRITE_SIZE",
      inputs: ["IMAGE_WIDTH"],
      value: (function(IMAGE_WIDTH){return(
Math.sqrt(IMAGE_WIDTH)
)})
    },
    {
      name: "NEW_SIZE",
      value: (function(){return(
10
)})
    },
    {
      name: "datasetLabels",
      inputs: ["NUM_CLASSES","NUM_POINTS"],
      value: (function(NUM_CLASSES,NUM_POINTS){return(
fetch("https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8")
  .then(response => response.arrayBuffer())
  .then(buffer => new Uint8Array(buffer, 0, NUM_CLASSES * NUM_POINTS))
)})
    },
    {
      name: "NUM_CLASSES",
      value: (function(){return(
10
)})
    },
    {
      name: "IMAGE_WIDTH",
      inputs: ["sprites"],
      value: (function(sprites){return(
sprites.naturalWidth
)})
    },
    {
      name: "CHUNK_SIZE",
      value: (function(){return(
1000
)})
    },
    {
      name: "sprites",
      value: (function(){return(
new Promise((resolve, reject) => {
  const image = new Image;
  image.width = 33;
  image.height = 33;
  image.style.imageRendering = "pixelated";
  image.crossOrigin = "anonymous";
  image.src = "https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png";
  image.onload = () => resolve(image);
  image.onerror = reject;
})
)})
    }
  ]
};

const m2 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "slider",
      inputs: ["input"],
      value: (function(input){return(
function slider(config = {}) {
  let {value, min = 0, max = 1, step = "any", precision = 2, title, description, getValue, format, display, submit} = config;
  if (typeof config == "number") value = config;
  if (value == null) value = (max + min) / 2;
  precision = Math.pow(10, precision);
  if (!getValue) getValue = input => Math.round(input.valueAsNumber * precision) / precision;
  return input({
    type: "range", title, description, submit, format, display,
    attributes: {min, max, step, value},
    getValue
  });
}
)})
    },
    {
      name: "radio",
      inputs: ["input","html"],
      value: (function(input,html){return(
function radio(config = {}) {
  let { value: formValue, title, description, submit, options } = config;
  if (Array.isArray(config)) options = config;
  options = options.map(
    o => (typeof o === "string" ? { value: o, label: o } : o)
  );
  const form = input({
    type: "radio",
    title,
    description,
    submit,
    getValue: input => {
      const checked = Array.prototype.find.call(input, radio => radio.checked);
      return checked ? checked.value : undefined;
    },
    form: html`
      <form>
        ${options.map(({ value, label }) => {
          const input = html`<input type=radio name=input ${
            value === formValue ? "checked" : ""
          } style="vertical-align: baseline;" />`;
          input.setAttribute("value", value);
          const tag = html`
          <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;">
           ${input}
           ${label}
          </label>`;
          return tag;
        })}
      </form>
    `
  });
  form.output.remove();
  return form;
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
        ? "onclick"
        : type == "checkbox" || type == "radio"
          ? "onchange"
          : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output)
        form.output.value = display
          ? display(value)
          : format
            ? format(value)
            : value;
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format")
)})
    }
  ]
};

const notebook = {
  id: "2331ea7cae3cdc98@6630",
  modules: [m0,m1,m2]
};

export default notebook;
