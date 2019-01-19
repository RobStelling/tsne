// URL: https://beta.observablehq.com/@robstelling/t-sne_en
// Title: t-SNE
// Author: Roberto Stelling (@robstelling)
// Version: 7105
// Runtime version: 1

const m0 = {
  id: "2379c50fe5f906fb@7105",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# t-SNE`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Visualizing high dimension data with *t*-SNE

#### *Problem*: Given a dataset of points in high dimensions, how can we have an idea of how the points are organized in the original space?
<p>
Representing data from high dimensions in *3D* or *2D* (or in *1D*!), independent of their original organization in space, is a problem that do not have a unique and generic solution. Data can be organized in many ways in the original dimensions and different data contexts and usages can suggest or imply different projections in two or three dimensions.

Depending on the *objective* of the aggregation and its *context* it is very likely that there is ***more than one solution*** to visualize the same high dimension dataset in *2D* or *3D*. In a way, it is a **poorly defined problem** that do not have an optimal solution.

In some cases it may be possible to "manually" reduce dimensions, without the usage of an algorithm. For example, the [MNIST<sup>1</sup>](#ref) dataset, with 28x28 pixels data, totaling 784 pixels - or dimentions, can be visualized in two dimenstions if we create two "*features*" that represent the same dataset, for example: density and symmetry[<sup>22</sup>](#ref) of the original images.

With these two dimensions it is possible to create a planar visualization of the digits 1 and 5, as in the the graph below, where 1s are represented with white dots and 5s with black dots.
<br><img width="500" src="https://raw.githubusercontent.com/RobStelling/miscImg/master/imagens/MNIS15.png"></img><br>
Over these two new dimenstions we used a simple Perceptron to generate a cut line between digits 1 and 5 from the dataset.
<br><img width="500" src="https://raw.githubusercontent.com/RobStelling/miscImg/master/imagens/MNIST15_corte.png"></img><br>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Is there an *optimal solution* to visualize high dimensional data?
Before we move on, it is important to understand that there isn't an optimal solution to this problem. To develop this intuition, let's investigate a few alternatives to reduce a couple of artificial datasets from 2 dimensions to 1 dimension.

How can we reduce data from two (*x* and *y*) dimensions to one (*x*) dimension? Let's try a few alternatives (from naïve to complex aproaches):

1. Flatten the data to the *x* axis
2. Flatten the data to the *y* axis
3. *"Figure out"* the ideal projection of the data
3. Apply a dimensionality reduction or visualization algorithm to the dataset, like SVG, PCA or *t*-SNE`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Simple examples
### Mapping *2D* data to *1D*
In the following examples, we will project the data from *2* dimensions to *1* dimension for each one of *x* e *y* axes.`
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
md`# Projecting the points to the *X* axis`
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
md `Clusters *c* and *d* are reasonably, but not optimally, separated but *a* e *b* are mixed up.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Projecting the points to the *Y* axis`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `and rotating to the horizontal`
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
md `The projected points to the **y** axis are mixed up in two new clusters formed by, clusters *a* e *d* and clusters *b* and *c*`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# *"Ideal"* projection
In an *"ideal world"* we would like to see the original points reduced from two dimensions to one dimension in a projection similiar to the one below, where each one of the original clusters are properly represented in 1D:`
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
md `# Half moon dataset`
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
md `## Projecting over the *x* axis`
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
md `## Projecting over the *y* axis`
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
md `## *"Ideal"* projection
To map *these particular datapoints* from *2D* to *1D* we can shift all red points a bit to the left, all blue points a bit to the right and then project them on the *x* axis`
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
md `## Circles
*Divine* algorithm: How to project a circular dataset to 1D?`
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
md`### Radial projection!
In each of the previous examples there was a simple and suggestive way to map the points from *2D* to *1D* in a way that they would be separable, but the methods worked because *we knew* how the data was organized on the original *2D* space.

But how would we choose what transformation to apply on unknown data with 10, 100 or 1000 dimensions?`
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
md `# Also, it is not allways possible to map the points to a lower space and separate data clusters`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### For example, miles per gallon, power and country of origin on the [*cars*](https://vega.github.io/vega-lite/data/cars.json) dataset
If the clusters are not separable on the high dimensions, they won't be separable on inferior dimensions (although the can be separable in dimensions higher than the original!). This points to the idea of intrinsic dimensionality, meaning the mininum dimensions necessary to *"portrait"* the data and separate in the intended clusters. If the data intrinsic dimension is higher than *2D* or *3D*, no mapping will fully express its content.`
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
    x: {field: "Horsepower", type: "quantitative", title: "Horse-Power"},
    y: {field: "Miles_per_Gallon", type: "quantitative", title: "Miles/gallon"},
    color: {field: "Origin", type: "nominal", scale: {scheme: colorScheme}, title: "Origin"}
  }
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`To visualize data from high dimensions we can use
# <center>*t*-SNE</center>


[*t*-Distributed Stochastic Neighbour Embedding<sup>2</sup>](#ref) (*t*-SNE, or ***tees-nee***, as most people call it) is a technique used to visualize data from high dimensions in *1D*, *2D* or *3D*.

*t*-SNE, was developed by *Laurens van der Maaten* e *Geoffrey Hinton*, and it is a refinement of a previous method,  SNE.  The main diference between SNE and *t*-SNE is that the latter uses a Student *t* distribution to map the data on the lower dimensions.

Essentially, *t*-SNE uses a gaussian kernel to convert the points on the original space to connection probabilities (**P**) and a Student *t* kernel, with one degree of freedom, to map the connection probabilities in the lower dimensions (**Q**). The cost of the diference between these two distribuitions **P** and **Q** is modeled by the asymmetric Kullbach-Leibler<sup><a href="#ref">20</a></sup> divergence. The gradient of this function (see \`[Equation 5]\` bellow) is used to update the connection probabilities in the mapped (lower dimension) space.

*t*-SNE is not garanteed to converge but still produces very good results as, for example, the mapping of the MNIST dataset from 784 dimensions to just 2 (or 3, if we include the color and mark channels - that represent the same information: the digit label) dimensions. The graph below was generated with Tensorflow.js<sup><a href="#ref">17</a></sup>`
)})
    },
    {
      inputs: ["md","chart"],
      value: (function(md,chart){return(
md`${chart}<center>t-SNE applied to the MNIST dataset (Bostock<sup><a href="#ref">21</a></sup>)</center>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## A brief review of Normal and Student *t*<sup><a href="#ref">18</a></sup> distributions`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Playing with the parameters of normal density curve`
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
      title: "Density curve of a normal distribution",
      data: {values: gera_normal(-6, +10, 0.01, 1, 0)},
      mark: "line",
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title: "φ(x)"},
        color: {value:"steelblue"}
      }
    },
    {
      data: {values: gera_normal(-6, 10, 0.01, Math.sqrt(var_2), media)},
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
  description: "Variance [0.1 to 16]"
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
  min: -6, 
  max: 10, 
  step: 0.01,
  value: 0.0,
  description: "Mean [-6 to 10]"
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
md `Change the variance and mean of the curve above.

Suppose that the red curve represents the hight of the the adult population (a blue curve will be kept as a reference). If you change the mean to 6 (meaning, for example, that the adult population is, in average, 6 ft. tall) and you keep the variance as 1, then the resulting curve suggests that we can find lots of people over 7, 8 and 9 ft. tall! To correct that we need to *reduce* the variance to around 0.15, then the curve will be closer to a real represetation of an adult population averaging 6 ft. tall.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Comparing normal and Student *t* distrubutions`
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
      title: "Normal (red) and Studend-t (blue)",
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
  description: "Normal distribution variance"
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
  description: "Interval"
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
md`A Student *t* distribution is "*shorter*" and have a "*longer tail*" than a normal distribution with the same variance. Change the variance of the normal curve above to see how it compares with the Student *t* distribution.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Degrees of freedom and on a Student *t* distribution`
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
  title: "Normal and Student t distributions",
  encoding: {
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative", title: "φ(x)"},
    color: {field: "Curva", type:"nominal", scale: {scheme: colorScheme}, title: "Distribution"}
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
  description: "Degrees of freedom"
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
  description: "Variance"
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
md`A Student *t* distribution is actually a "*combination*" of infinite normal curves. With one degree of liberty it is shorter and has a longer tail than a normal curve with the same variance. If you increase the degrees of freedom of a Student *t* distribution it converges to the corresponding normal distribution, as you can observe changing the parameters of the graph above.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Looking back at *t*-SNE
First, lets review the *t*-SNE algorithm as described in the original paper<sup><a href="#ref">2</a></sup>.`
)})
    },
    {
      inputs: ["md","tex","gamma_eval"],
      value: (function(md,tex,gamma_eval){return(
md `# *t*-SNE simplified algorigthm
**Data**: data set ${tex`X = \{x_1, x_2, \dots, x_n\}, x_i \in \mathbb{R}^M`}<br>
Cost function parameters: perplexity ${tex`Perp`}<br>
Optimization parameteres: number of interactions ${tex`T`}, learning rate ${tex`\eta`}, momentum ${tex`\alpha (t)`}.<br>
**Result**: low-dimensional data representation ${tex`\gamma^{(T)} = \{y_1, y_2,\dots,y_n\}, y_i \in \mathbb{R}^{(1, 2, 3)}`}.<br>
\`begin\`<br>
&nbsp;&nbsp;Compute pairwise affinities ${tex`p_{j|i}`} with perplexity ${tex`Perp`} (using \`Equation 1\`)<br>
&nbsp;&nbsp;set ${tex`p_{ij} = \frac{p_{j|i}+p_{i|j}}{2}`}<br>
&nbsp;&nbsp;sample initial solution ${tex`\gamma^{(0)} = \{y_1, y_2,\dots,y_n\}`} from ${tex`\mathcal{N}(0,10^{-4}I)`}<br>
&nbsp;&nbsp;\`for\` *t=1* \`to\` *T* \`do\`<br>
&nbsp;&nbsp;&nbsp;&nbsp;Compute low-dimensional affinities ${tex`q_{ij}`} (using \`Equation 4\`)<br>
&nbsp;&nbsp;&nbsp;&nbsp;Compute gradient ${tex`\frac{\delta C}{\delta \gamma}`} (using \`Equation 5\`)<br>
&nbsp;&nbsp;&nbsp;&nbsp;\`set\` ${tex`${gamma_eval}`}<br>
&nbsp;&nbsp;\`end\`<br>
\`end\``
)})
    },
    {
      inputs: ["md","tex","eq1","eq2","eq6","eq3","eq4","eq5"],
      value: (function(md,tex,eq1,eq2,eq6,eq3,eq4,eq5){return(
md `## Equations
[\`Equation 1\`] High dimension affinities<br>
${tex.block`${eq1}`}
<br>[\`Equation 2\`] Kullback-Leibler divergence<br>
${tex.block`${eq2}`}
equivalent to:<br>
${tex.block`${eq6}`}
<br>[\`Equation 3\`] Low-dimension affitities<br>
${tex.block`${eq3}`}
<br>[\`Equation 4\`] Low dimension adjustment with Student *t* distribution with 1 degree of freedom(*Cauchy* distribution)<br>
${tex.block`${eq4}`}
<br>[\`Equation 5\`] Gradient of the Kullback-Leibler divergence [\`Equation 2\`] between high dimension affinities *P* and low dimension affinities *Q*<br>
${tex.block`${eq5}`}`
)})
    },
    {
      inputs: ["md","tex","eq5","gamma_eval"],
      value: (function(md,tex,eq5,gamma_eval){return(
md `The depiction of the *t*-SNE algorithm above do not include a few important details that are clarified througout the original paper. To accomodate these details and to expose a few hidden corners of *t*-SNE, we revisit the algorithm below.
# <center>*t*-SNE Algorithm<br>*Revised version*</center>

1. Given a set of ${tex`N`} points in a high dimensional space
2. Define an entropy factor ${tex`Perp`}, learning rate ${tex`\eta`}, momentum ${tex`\alpha(t)`} and number of interactions ${tex`T`}
3. Compute the distancse between the points in high dimension, convert these distances to probabilities/affinities using a Gaussian kernel. Finding the correct variance for each point, so that it matches the entropy factor ${tex`Perp`}
  4. Perform a binary search to determine the correct variance for each point, so that each line of the affinities matrix (${tex`p_{ik}\forall k`}) will have approximately the same entropy
  5. Make the resulting matrix symmetric with ${tex`p_{i|j} = \frac{p_{i|j}+p_{j|i}}{2}`}
6. Gess an initial response set in the low-dimensional space ${tex`\gamma^{(1)} = \{y_1, \dots, y_N\}`}
7. Repeat ${tex`T`} times, updating ${tex`t = 1\dots T`}:
  8. Compute the affinities on the mapped (low-dimensional) space, ${tex`q_{ij}`}, with a Student *t* distribution with one degree of freedom and ${tex`\sigma^2 = 1`}
  9. Compute the grandient of the cost function ${tex`\gamma^{(t)} = \{y_1, \dots, y_N\}`} so that ${tex.block`${eq5}`}
  10. Update the points on the low-dimension space so that: ${tex.block`${gamma_eval}`}
11. The set of points ${tex`\gamma^{(T)}`} is the algorithm output`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# <center>*t*-SNE baby steps</center>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## From distances to affinities
Lets aply *t*-SNE to the simple *2D* dataset we saw on the introduction.`
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
md`To convert distances to probabilities, we can imagine each point in the original space as a center of a distribution (Normal/Gaussian or any other of your choosing) and use the distance between the chosen point and every other point as the probability of a link between these points. In principle, the smaller the distance, the bigger the probability of a link. In a way we are *defining the neighbourhood between the points*. 

For example, in the dataset above, the distance between ${tex`p_0`} and ${tex`p_1`} is given by the distance matrix, on \`distances[0][1]\` and equals ${tex`${distancias[0][1]}`}. In a normal distribution, with average ${tex`0`} and variance ${tex`1`}, this distance would correspond to ${tex.block`distances[0][1] = ${distancias[0][1]}\rightarrow P_{01} = ${normal(distancias[0][1], 1,0)}`}
Below we can see the distances and probabilities between a few other points with a normal distribution with  ${tex`\mu = 0`} e ${tex`\sigma^2 = 1`}`
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
      title: "Gaussian with μ=0 and σ=1",
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
\`distances[0][1] = \` ${distancias[0][1]} - ${tex`P_{01} = P(${distancias[0][1]})`} = ${normal(distancias[0][1], 1,0)}<br>
\`distances[0][2] = \` ${distancias[0][2]} - ${tex`P_{02} = P(${distancias[0][2]})`} = ${normal(distancias[0][2], 1,0)}<br>
\`distances[0][3] = \` ${distancias[0][3]} - ${tex`P_{03} = P(${distancias[0][3]})`} = ${normal(distancias[0][3], 1,0)}<br>
\`distances[0][4] = \` ${distancias[0][4]} - ${tex`P_{04} = P(${distancias[0][4]})`} = ${normal(distancias[0][4], 1,0)}<br>
\`distances[0][5] = \` ${distancias[0][5]} - ${tex`P_{05} = P(${distancias[0][5]})`} = ${normal(distancias[0][5], 1,0)}<br>
\`distances[5][0] = \` ${distancias[5][0]} - ${tex`P_{50} = P(${distancias[5][0]})`} = ${normal(distancias[5][0], 1.2,0)}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`The same points from the previous example are shown below with a Student *t* distribution with  ${tex`\mu = 0`} e ${tex`\sigma^2 = 1`} and one degree of freedom.`
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
      title: "Student-t with μ=0 and σ=1, 1 degree of freedom",
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
\`distances[0][1] = \` ${distancias[0][1]} - ${tex`P_{01} = P(${distancias[0][1]})`} = ${student(distancias[0][1], 1)}<br>
\`distances[0][2] = \` ${distancias[0][2]} - ${tex`P_{02} = P(${distancias[0][2]})`} = ${student(distancias[0][2], 1)}<br>
\`distances[0][3] = \` ${distancias[0][3]} - ${tex`P_{03} = P(${distancias[0][3]})`} = ${student(distancias[0][3], 1)}<br>
\`distances[0][4] = \` ${distancias[0][4]} - ${tex`P_{04} = P(${distancias[0][4]})`} = ${student(distancias[0][4], 1)}<br>
\`distances[0][5] = \` ${distancias[0][5]} - ${tex`P_{05} = P(${distancias[0][5]})`} = ${student(distancias[0][5], 1)}<br>
\`distances[5][0] = \` ${distancias[5][0]} - ${tex`P_{50} = P(${distancias[5][0]})`} = ${student(distancias[5][0], 1.2)}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Distances matrix`
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
  title: 'Distance metric',
  description: 'Choose the distance metric',
  options: [
    { label: 'Euclidean', value: 0 },
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
md`The ${["euclidean","L2"][cDistancia]} distance between the points ${math.matrix(pts[0])} and ${math.matrix(pts[1])} is ${calcDistancia(pts[0], pts[1])}`
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
md`The euclidean or L2 distance between the points is computed for each pair of points on the original high dimensional space and the probability that a point ${tex`x_i`} is "close" to a point ${tex`x_j`}, denoted as ${tex`p_{j|i}`} is given by the \`[Equation 1]\` below, using a Gaussian distribution with a different variance (${tex`\sigma^2`}) for each point in space. ${tex.block`${eq1}`}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `The denominator acts as a *"normalization"* of the probabilities around each ${tex`x_i`}. This way, bigger distances around locations not too dense are similar to smaller distances on denser locations. The value for each variance ${tex`\sigma^2_i`} is determined by a binary search using the ${tex`\log_2`} of the hyperparameter *perplexity* (\`Perp\`), given by the user.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## From distances to probabilities, with distributions and variances`
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
md`### Affinities matrix, with the same variance for all points.`
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
  title: 'Variance',
  min: 0.1,
  max: 9,
  step: 0.1,
  value: 1,
  description: "Adjust the variance for all points"
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
md`# Perplexity
Perplexity (${tex`Perp`}) is a hyperparameter that is used to adjust the variances of the affinities around each point in the original space. We can understand preplexity as a measure of entropy of affinities (${tex`P`}) between the points on the original high dimensional space. The mapped space will have its affinities (${tex`Q`}) canculated over a Student *t* distribution with the same variance for all points, as per \`[Equation 3]\`. ${tex.block`${eq3}`}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`The perplexity on each point is calculated as
${tex.block`\log_2(Perp(p_i)) = entropy(p_i) = \sum_{j\ne i} -p_{j|i} \log_2(p_{j|i})`}`
)})
    },
    {
      inputs: ["md","Perp_display","tex"],
      value: (function(md,Perp_display,tex){return(
md`#### Entropy
The desired entropy is defined by the hyperparameter perplexity [\`Perp\` = ${Perp_display}]: ${tex.block`entropy = \log_2(Perp) = ${+Math.log2(Perp_display).toFixed(4)}`}`
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
md `On the example above, with all variances equal to ${+(s2).toFixed(3)}, we would have ${tex`entropy = ${+(calcEntropia(p_flat)/16).toFixed(4)}`} and ${tex`perplexity = ${Math.exp(calcEntropia(p_flat)/16).toFixed(4)}`}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`To find the right variance on each point we have to perform a binary search, looking for a variance value that will be as close as possible to the desired entropy, according to the hyperparameter \`Perp\`.

`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Binary search of high dimension variances`
)})
    },
    {
      name: "bbVar",
      inputs: ["calcPi","calcEntropia"],
      value: (function(calcPi,calcEntropia){return(
function bbVar(points, i, entropy, error=1e-6, steps=40) {
  function bbVarRec(variance, lowerBound, upperBound) {
    const probabilities = calcPi(points, i, variance),
          currentEntropy = calcEntropia(probabilities);
 
    if (steps-- <= 1 || Math.abs(currentEntropy - entropy) <= error)
      return probabilities;
    if (currentEntropy > entropy)
      return bbVarRec((lowerBound+variance)/2, lowerBound, variance);
    else
      return bbVarRec((variance+upperBound)/2, variance, upperBound);
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
function ajustaVariancias(points, entropy, error, steps) {
  let size = points.length,
      p = [];
  for (let i = 0; i < size; i++)
    p = p.concat(bbVar(points, i, entropy, error, steps))
  var total = p.reduce((sum, current)=>sum+current,0)
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
  title: 'Perplexity',
  min: 1,
  max: 100,
  step: 0.5,
  value: 10,
  description: "Adjust the hyperparameter perplexity"
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
md`${tex`entropy = \log_2(Perp) = ${Math.log2(Perp_display)}`}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`# Making the affinities matrix symmetric
The resulting affinities matrix is asymmetric, to make it symmetric, so that ${tex`P_{i|j} = P_{j|i}`}, we need to compute: ${tex.block`p_{ij} = \frac{p_{j|i}+p_{i|j}}{2}`}`
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
      inputs: ["md","tex","d_flat","dimensoes"],
      value: (function(md,tex,d_flat,dimensoes){return(
md`# Mapping the low dimension points
With the high dimensional affinities matrix in hand (${tex`P`}), we need to generate lower dimension points, compute their affinities matrix (${tex`Q`}) and adjust the generated points with a gradient descent. The first iteration low dimensional points are randomically generated, with the desired number of dimensions. We will generate ${Math.sqrt(d_flat.length)} poins in ${tex`\mathbb{R}^${dimensoes}`}`
)})
    },
    {
      inputs: ["md","tex","dimensoes"],
      value: (function(md,tex,dimensoes){return(
md`## Initial projection from ${tex`\mathbb{R}^2`} to ${tex`\mathbb{R}^${dimensoes}`}

With the affinities matrix in high dimensions, we must randomically generate the first set of low dimension points mapping ${tex`\mathbb{R}^2 \rightarrow \mathbb{R}^${dimensoes}`}, in our toy example. The paper authors recommend points distributed over a gaussian with ${tex `\mu = 0`} and ${tex`\sigma^2 = 10^{-4}`}`
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
  title: 'Map dimensions',
  description: 'Choose the number of dimensions to map the points, the graph below should change accordingly',
  options: [
    {label:'One', value:1},
    {label:'Two', value:2}
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
md`### Initial projection on ${tex`\mathbb{R}^${dimensoes}`}`
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
  title: 'Type of the initial projection',
  description: 'Choose how to generate the initial guess, see how the distance matrix is affected',
  options: [
    {label:'Random', value:'randomico'},
    {label:'Compressed random', value:'comprimido'},
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
md`### Distance between generated points`
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
md`## Computing low dimension affinities
The low dimension affinities are computed over a Student *t* distribution, with 1 degree of freedom and variance equal to 1.`
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
md`# Cost function
The cost function should measure the error, or divergence, between the affinities in high dimensions and the affinities in low dimensions. To compare the relative entropies between the probabilities the algorithm uses the asymmetric **Kullback-Leibler Divergence** (KL). The bigger the divergence, the bigger the difference between the probabilities. If the divergence is 0, the probabilities are identical.`
)})
    },
    {
      inputs: ["md","tex","eq2"],
      value: (function(md,tex,eq2){return(
md `## Kullback-Leibler Divergence
The Kullback-Leibler Divergence is given by \`[Equation 2]\` ${tex.block`${eq2}`}`
)})
    },
    {
      inputs: ["md","tex","KLD","p_final","calcQ","y_flat"],
      value: (function(md,tex,KLD,p_final,calcQ,y_flat){return(
md`In our example, the initial cost of the distributions ${tex`P`} and ${tex`Q`} is: ${tex`${KLD(p_final, calcQ(y_flat)).toFixed(5)}`}`
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
md`# Gradient
The gradient of the cost function is given by \`[Equation 5]\`, that relates the probabilities on the high dimension space (${tex`p_{ij}`}) with the probabilities on the mapped space (${tex`q_{ij}`}) and the points on the the mapped space (${tex`y_i`} e ${tex`y_j`}).
  ${tex.block`${eq5}`}
During the optimization stathe, ${tex`p`} is kept fixed, the points ${tex`y`} are adjusted according to the gradient and, by definition, the low dimension probabilities ${tex`q`} are recomputed after each iteration.

To speed the the optimization stage and to help find better solutions, the paper suggest the following two *"tricks"*:
1. **Initial compression**: This forces the points of the mapped space to be closer on the beginning of the optimization. The smaller the initial distances, the easier it is for the agglomerations to form, resulting on a better exploration of the solution space.
2. **Initial exageration**: Multiply all ${tex`p_{ij}`} by a fixed factor (e.g. 4) during the first steps of the optimization. This means that almost all ${tex`q_{ij}`}, that still add up to 1, are to small to model high values of ${tex`p_{ij}`}. This means that the optimization is "encouraged" to model high ${tex`p_{ij}`} to high ${tex`q_{ij}`}, this tend to separate the agglomerations in different groups in the mapped space, help the clusters to move to and fro.`
)})
    },
    {
      inputs: ["md","tex","pt","math","gradiente","y_flat","p_final"],
      value: (function(md,tex,pt,math,gradiente,y_flat,p_final){return(
md`Gradient for the first iteraction: ${tex`\frac{\delta C}{\delta y_i} =`} ${pt(math.matrix(gradiente(y_flat, p_final, 1)), '\\footnotesize')}`
)})
    },
    {
      inputs: ["md","tex","gamma_eval"],
      value: (function(md,tex,gamma_eval){return(
md`## Adjusting the mapped points
After the computation of the gradient, the mapped points must be adjusted, for the next iteration as follows:
${tex.block`${gamma_eval}`}
The value of the new mapped points correspond to the previous points, added up to the gradient multiplied by a learning factor and added to the difference between the last two predictions multiplied by a factor ${tex`\alpha(t)`} (momentum). The paper suggests a momentum of 0.5 for the first 250 iteractions and 0.8 afterwards.`
)})
    },
    {
      name: "momentum",
      value: (function(){return(
{true:0.5, false:0.8}
)})
    },
    {
      name: "viewof eta",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  title: 'Learning rate',
  min: 0,
  max: 20,
  value: 10,
  step: 0.1,
  description: 'Learning rate for gradient descent'
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
  title: 'Momentum update',
  min: 1,
  max: 500,
  step: 1,
  value: 100,
  description: 'Inform when momentum will be updated'
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
  title: 'Number of interactions with exaggeration',
  min: 0,
  max: 200,
  step: 1,
  value:100,
  description: 'Number of interactions to apply the exaggeration factor'
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
  title: 'Exaggeration',
  min: 0.5,
  max: 10,
  step: 0.5,
  value: 1.5,
  description: 'Exaggeration factor'
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
  title: 'Perplexity',
  min: 1,
  max: 100,
  step: 0.5,
  value: 10,
  description: "Perplexity hyperparameter value"
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
      inputs: ["md","iteracao","T","custoRun","it_exagero","valor_exagero","Perp","momentum","gatilho_momentum"],
      value: (function(md,iteracao,T,custoRun,it_exagero,valor_exagero,Perp,momentum,gatilho_momentum){return(
md`**Iteraction**: ${iteracao}/${T} - **Cost**: ${custoRun}<br>
**Exaggeration**: ${iteracao<=it_exagero?valor_exagero:"none"} (${valor_exagero} until interaction ${it_exagero}) - 
**Perplexity**: ${Perp}<br>
**Momentum**: ${momentum[iteracao<gatilho_momentum]} (${momentum[true]} until iteraction ${gatilho_momentum}, ${momentum[false]} afterwards)`
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
  const form = html`<form><button name=button>Start`;
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
  title: 'Number of iteractions',
  min: 0,
  max: 5000,
  step: 50,
  value: 0,
  description: 'Inform the number of interactions for the gradient descent and click on Start'
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
      inputs: ["iteracao","T","yDisplay","Y","gradiente","p_final","mutable custoRun","custo","mutable iteracao","ystep","gains","momentum","gatilho_momentum","eta"],
      value: (function*(iteracao,T,yDisplay,Y,gradiente,p_final,$0,custo,$1,ystep,gains,momentum,gatilho_momentum,eta)
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
    // Adapted from: https://github.com/karpathy/tsnejs
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
        var momval = momentum[iteracao < gatilho_momentum]; // ? 0.5 : 0.8;
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
md `# Limitations
* t*-SNE:
  * The algorithm do not preserve distances nor densities, it preserves only, up to a certain degree, the neighbourhood.
  * The performance of *t*-SNE in general tasks of dimensionality reduction is not clearly defined.
  * There's no guarantee of convergence.
  * The value of the hyperparameter \`Perp\` can highly influence the resulting map.
* This implementation:
  * The current implementation is a bit fractioned (with pieces and bits of code throughut the notebook) and applies ontly from maps from ${tex`\mathbb{R}^M`} to ${tex`\mathbb{R}^{1|2}`}.
  * It is not difficult to include other datasets, but edition has to be manual.
  * Text and code can be downloaded from here or from <a href="#ref">Github<sup>23</sup></a>.
  * Although one can observe interesting behaviours of *t*-SNE in reductions from ${tex`\mathbb{R}^2`} to ${tex`\mathbb{R}^1`}, one should generalize these results with care given the limited dataset and minimal reduction.`
)})
    },
    {
      name: "ref",
      inputs: ["md"],
      value: (function(md){return(
md`# References
### Paper's BibTeX
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
3. [*t*-SNE site - Laurens van der Maaten](https://lvdmaaten.github.io/tsne/)
4. [Wikipedia: t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding)
5. [Paper: Linear t-SNE optimization for the web](https://arxiv.org/pdf/1805.10817.pdf)
6. [How to use t-SNE effectively](https://distill.pub/2016/misread-tsne/)
7. [Introduction to t-SNE with Python](https://towardsdatascience.com/an-introduction-to-t-sne-with-python-example-5a3a293108d1)
8. [t-SNE implemented in R and Python](https://www.analyticsvidhya.com/blog/2017/01/t-sne-implementation-r-python/)
9. [Visualizing datasets with PCA and t-SNE in Python](https://medium.com/@luckylwk/visualising-high-dimensional-datasets-using-pca-and-t-sne-in-python-8ef87e7915b)
10. [t-SNE Guide with Python and R](https://www.analyticsvidhya.com/blog/2017/01/t-sne-implementation-r-python/)
11. [Real time t-SNE Visualizations with TensorFlow.js](https://ai.googleblog.com/2018/06/realtime-tsne-visualizations-with.html)
12. [t-SNE implementation in JavaScript - Karpathy](https://github.com/karpathy/tsnejs)
13. [Why momentum works](https://distill.pub/2017/momentum/)
14. [GoogleBlog: TensorFlow Embedding Projector](https://ai.googleblog.com/2016/12/open-sourcing-embedding-projector-tool.html)
15. [TensorFlow Embedding Projector](http://projector.tensorflow.org/)
16. [Tensorflow: Embeddings](https://www.tensorflow.org/guide/embedding)
17. [Tensorflow.js](https://js.tensorflow.org/)
18. [Student's *t*-distribution](https://en.wikipedia.org/wiki/Student%27s_t-distribution)
19. [Gamma Function](https://github.com/substack/gamma.js/blob/master/index.js)
20. [Wikipedia: Kullback-Leibler](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence)
21. [Mike Bostock - Let's try t-SNE](https://beta.observablehq.com/@mbostock/lets-try-t-sne)
22. [Yasser S. Abu-Mostafa - Caltech](https://work.caltech.edu/)
23. [Github repository](https://github.com/RobStelling/tsne)`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Data and auxiliary functions`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Variables and functions`
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
      name: "entropy",
      inputs: ["Perp"],
      value: (function(Perp){return(
Math.log2(Perp)
)})
    },
    {
      name: "p_variancias",
      inputs: ["ajustaVariancias","pontos_flat","entropy"],
      value: (function(ajustaVariancias,pontos_flat,entropy){return(
ajustaVariancias(pontos_flat, entropy, 1e-4, 50)
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
  title: "Original data",
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
md`#### Distance vector
More economic than a matrix`
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
md`Generates the indexes on the distance vector from i, j and size k`
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
md`#### Generates distance matrix`
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
md`#### Flattened distance and affinities matrices`
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
md`Artificial data for the idealized projection of the data points`
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
md`#### Cars dataset`
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
md `#### Half moon dataset`
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
md`#### Circles dataset`
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
md`#### Graph attributes`
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
md `#### Normal and Student *t* density curves`
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
md`##### Gamma function`
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
md`#### Data matrix in*TeX*`
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
md `#### Equations in *TeX*`
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
  id: "2379c50fe5f906fb@7105",
  modules: [m0,m1,m2]
};

export default notebook;
