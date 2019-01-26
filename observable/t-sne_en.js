// URL: https://beta.observablehq.com/@robstelling/t-sne_en
// Title: Opening the *t*-SNE black box
// Author: Roberto Stelling (@robstelling)
// Version: 7823
// Runtime version: 1

const m0 = {
  id: "2379c50fe5f906fb@7823",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Opening the *t*-SNE black box
An in depth view of *t*-SNE, with algorithm breakdown, implementation and a toy problem playground.`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`<center><img width="800" src="https://raw.githubusercontent.com/RobStelling/miscImg/master/imagens/tSNE_1D.png"></img></center>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Topics
What are you going to see here?<br>
\`Note\`: you can click on the links below to go directly to the corresponding section
- A <a href="#tsneStart">brief discussion</a> of the high dimension data visualization problem
- <a href="#tsne">Brief *t*-SNE introduction</a>
- <a href="#normalStudent">Normal and Student *t* distributions</a>
- <a href="#tsneAlgorithm1">Description of the *t*-SNE algorithm</a> as given by the original paper<a href="#ref"><sup>2</sup></a>
- <a href="#tsneAlgorithm2">A more detailed description of *t*-SNE algorithm</a>, that was used to implement the code in this notebook
- The *t*-SNE algorithm in <a href="#babySteps">baby steps</a>
- A <a href="#tsnePlayground">*t*-SNE playground</a>, where you can:
  - Adjust the algorithm hyperparameters
  - Play with a toy problem
  - See an animation of the algorithm while it is being run`
)})
    },
    {
      name: "tsneStart",
      inputs: ["md"],
      value: (function(md){return(
md `
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

How can we reduce data from two (*x* and *y*) dimensions to one (*x*) dimension? Let's try a few alternatives (from naïve to more complex aproaches):

1. Flatten the data to the *x* axis
2. Flatten the data to the *y* axis
3. *"Figure out"* the ideal projection of the data
4. Apply a dimensionality reduction or visualization algorithm to the dataset, like SVG, PCA or *t*-SNE

In the following few examples we will see what happens when we "experiment with" 1, 2 and 3. Later we will look into *t*-SNE`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Simple examples
### Mapping *2D* data to *1D*
In the following examples, we will project the data from *2* dimensions to *1* dimension to each one of the *x* e *y* axes.`
)})
    },
    {
      name: "grafico_simples",
      inputs: ["vegalite","width","points","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,points,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  height: 400,
  data: points,
  mark: {type: "circle", size: markSize, opacity: opacity},
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
      inputs: ["vegalite","width","points","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,points,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  data: points,
  mark: {type: "circle", size: markSize, opacity: opacity},
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
      inputs: ["vegalite","width","points","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,points,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  data: points,
  mark: {type: "circle", size: markSize, opacity: opacity},
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
      inputs: ["vegalite","width","ideal_linear","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,ideal_linear,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  data: ideal_linear,
  mark: {type: "circle", size: markSize, opacity: opacity},
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
      inputs: ["vegalite","halfMoonChart"],
      value: (function(vegalite,halfMoonChart){return(
vegalite(halfMoonChart)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Projecting over the *x* axis`
)})
    },
    {
      inputs: ["vegalite","width","halfMoon","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,halfMoon,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  data: {values: halfMoon},
  mark: {type: "circle", size: markSize, opacity: opacity},
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
      inputs: ["vegalite","width","halfMoon","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,halfMoon,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  data: {values: halfMoon},
  mark: {type: "circle", size: markSize, opacity: opacity},
  encoding: {
    x: {field: "y", type: "quantitative"},
    color: {field: "label", type: "nominal", scale: {scheme: colorScheme}, title: "Cluster"},
  }
})
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
      name: "fakeCluster",
      inputs: ["halfMoon"],
      value: (function(halfMoon){return(
halfMoon.map(p => {return {x:(p.x+p.label)*(p.label+1.7), label:p.label}})
)})
    },
    {
      inputs: ["vegalite","width","fakeCluster","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,fakeCluster,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  data: {values: fakeCluster},
  mark: {type: "circle", size: markSize, opacity: opacity},
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
      inputs: ["vegalite","width","circles","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,circles,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  height : 500,
  data: {values: circles},
  mark: {type: "circle", size: markSize, opacity: opacity},
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
      name: "radialMap",
      inputs: ["circles","dist"],
      value: (function(circles,dist)
{
  var circ = circles.map((p) => ({x:dist(p, {x:0, y:0}), label:p.label}));
  return circ.map((p) => ({x: p.x-circ.reduce((sum, point) => sum + point.x,0)/circles.length,label:p.label}));
}
)
    },
    {
      inputs: ["vegalite","width","radialMap","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,radialMap,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(500, width),
  data: {values: radialMap},
  mark: {type: "circle", size: markSize, opacity: opacity},
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
      inputs: ["vegalite","width","cars","markSize","opacity","colorScheme"],
      value: (function(vegalite,width,cars,markSize,opacity,colorScheme){return(
vegalite({
  width: Math.min(400, width),
  height : 400,
  data: {values: cars},
  mark: {type: "circle", size: markSize, opacity: opacity},
  encoding: {
    x: {field: "Horsepower", type: "quantitative", title: "Horse-Power"},
    y: {field: "Miles_per_Gallon", type: "quantitative", title: "Miles/gallon"},
    color: {field: "Origin", type: "nominal", scale: {scheme: colorScheme}, title: "Origin"}
  }
})
)})
    },
    {
      name: "tsne",
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
      name: "normalStudent",
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
      inputs: ["vegalite","width","pointsNormal","var_2","mean"],
      value: (function(vegalite,width,pointsNormal,var_2,mean){return(
vegalite({
  width: Math.min(600, width),
  height: 300,
  layer: [
    {
      title: "Density curve of a normal distribution",
      data: {values: pointsNormal(-6, +10, 0.01, 1, 0)},
      mark: "line",
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title: "φ(x)"},
        color: {value:"steelblue"}
      }
    },
    {
      data: {values: pointsNormal(-6, 10, 0.01, Math.sqrt(var_2), mean)},
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
      name: "viewof mean",
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
      name: "mean",
      inputs: ["Generators","viewof mean"],
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
      inputs: ["vegalite","width","pointsStudent","interval","pointsNormal","var2"],
      value: (function(vegalite,width,pointsStudent,interval,pointsNormal,var2){return(
vegalite({
  width: Math.min(600, width),
  height: 300,
  layer: [
    {
      title: "Normal (red) and Studend-t (blue)",
      data: {values: pointsStudent(-interval, interval, 0.01, 1, 1)},
      mark: {type: "line"},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title:"φ(x)"}
      }
    },
    {
      data: {values: pointsNormal(-interval, interval, 0.01, Math.sqrt(var2), 0)},
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
      name: "viewof interval",
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
      name: "interval",
      inputs: ["Generators","viewof interval"],
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
      inputs: ["vegalite","width","pointsNormalStudent","interval","variance","degreesFreedom","colorScheme"],
      value: (function(vegalite,width,pointsNormalStudent,interval,variance,degreesFreedom,colorScheme){return(
vegalite({
  width: Math.min(600, width),
  height: 300,
  data: {values: pointsNormalStudent(-interval, interval, 0.01, Math.sqrt(variance), 0, degreesFreedom)},
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
      name: "viewof degreesFreedom",
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
      name: "degreesFreedom",
      inputs: ["Generators","viewof degreesFreedom"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof variance",
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
      name: "variance",
      inputs: ["Generators","viewof variance"],
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
      name: "tsneAlgorithm1",
      inputs: ["md","tex","gamma_eval"],
      value: (function(md,tex,gamma_eval){return(
md `# *t*-SNE Simplified Algorigthm
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
      name: "tsneAlgorithm2",
      inputs: ["md","tex","eq5","gamma_eval"],
      value: (function(md,tex,eq5,gamma_eval){return(
md `The depiction of the *t*-SNE algorithm above do not include a few important details that are clarified througout the original paper. To accomodate these details and to expose a few hidden corners of *t*-SNE, we will revisit the algorithm below.
# <center>*t*-SNE Simplified Algorithm<br>*Revised version*</center>

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
      name: "babySteps",
      inputs: ["md"],
      value: (function(md){return(
md `# <center>*t*-SNE baby steps</center>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## From distances to affinities
Lets aply *t*-SNE to the simple *2D* dataset we saw at the introduction.`
)})
    },
    {
      inputs: ["vegalite","original"],
      value: (function(vegalite,original){return(
vegalite(original)
)})
    },
    {
      inputs: ["md","tex","distances","normal"],
      value: (function(md,tex,distances,normal){return(
md`To convert distances to probabilities, we can imagine each point in the original space as a center of a distribution (Normal/Gaussian or any other of your choosing) and use the distance between the chosen point and every other point as the probability of a link between these points. In principle, the smaller the distance, the bigger the probability of a link. In a way we are *defining the neighbourhood between points*. 

For example, in the dataset above, the distance between ${tex`p_0`} and ${tex`p_1`} is given by the distance matrix, on \`distances[0][1]\` and equals ${tex`${distances[0][1]}`}. In a normal distribution, with average ${tex`0`} and variance ${tex`1`}, this distance would correspond to ${tex.block`distances[0][1] = ${distances[0][1]}\rightarrow P_{01} = ${normal(distances[0][1], 1,0)}`}
Below we can see the distances and probabilities between a few other points with a normal distribution with  ${tex`\mu = 0`} e ${tex`\sigma^2 = 1`}`
)})
    },
    {
      inputs: ["vegalite","pointsNormal","distances","normal"],
      value: (function(vegalite,pointsNormal,distances,normal){return(
vegalite({
  width: 600,
  height: 300,
  layer: [
    {
      title: "Gaussian with μ=0 and σ=1",
      data: {values: pointsNormal(-5, 5, 0.01, 1, 0)},
      mark: {type: "area", fill:"#d0d0d0", fillOpacity: 0.4},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title: "φ(x)"}
      }
    },
    {
      data: {
        "values": [
        {"x": distances[0][1], "y": 0},
        {"x": distances[0][1], "y": normal(distances[0][1],1,0)},
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
        {"x": distances[0][1], "y": normal(distances[0][1],1,0)},
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
        {"x": distances[0][2], "y": 0},
        {"x": distances[0][2], "y": normal(distances[0][2],1,0)},
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
        {"x": distances[0][2], "y": normal(distances[0][2],1,0)},
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
        {"x": distances[0][3], "y": 0},
        {"x": distances[0][3], "y": normal(distances[0][3],1,0)},
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
        {"x": distances[0][3], "y": normal(distances[0][3],1,0)},
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
        {"x": distances[0][4], "y": 0},
        {"x": distances[0][4], "y": normal(distances[0][4],1,0)},
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
        {"x": distances[0][4], "y": normal(distances[0][4],1,0)},
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
        {"x": distances[0][5], "y": 0},
        {"x": distances[0][5], "y": normal(distances[0][5],1,0)},
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
        {"x": distances[0][5], "y": normal(distances[0][5],1,0)},
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
      inputs: ["md","distances","tex","normal"],
      value: (function(md,distances,tex,normal){return(
md `
\`distances[0][1] = \` ${distances[0][1]} - ${tex`P_{01} = P(${distances[0][1]})`} = ${normal(distances[0][1], 1,0)}<br>
\`distances[0][2] = \` ${distances[0][2]} - ${tex`P_{02} = P(${distances[0][2]})`} = ${normal(distances[0][2], 1,0)}<br>
\`distances[0][3] = \` ${distances[0][3]} - ${tex`P_{03} = P(${distances[0][3]})`} = ${normal(distances[0][3], 1,0)}<br>
\`distances[0][4] = \` ${distances[0][4]} - ${tex`P_{04} = P(${distances[0][4]})`} = ${normal(distances[0][4], 1,0)}<br>
\`distances[0][5] = \` ${distances[0][5]} - ${tex`P_{05} = P(${distances[0][5]})`} = ${normal(distances[0][5], 1,0)}<br>
\`distances[5][0] = \` ${distances[5][0]} - ${tex`P_{50} = P(${distances[5][0]})`} = ${normal(distances[5][0], 1.2,0)}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`The same points from the previous example are shown below with a Student *t* distribution with  ${tex`\mu = 0`} e ${tex`\sigma^2 = 1`} and one degree of freedom.`
)})
    },
    {
      inputs: ["vegalite","pointsStudent","distances","student"],
      value: (function(vegalite,pointsStudent,distances,student){return(
vegalite({
  width: 600,
  height: 300,
  layer: [
    {
      title: "Student-t with μ=0 and σ=1, 1 degree of freedom",
      data: {values: pointsStudent(-5, 5, 0.01, 1, 0)},
      mark: {type: "area", fill:"#d0d0d0", fillOpacity: 0.4},
      encoding: {
        x: {field: "x", type: "quantitative"},
        y: {field: "y", type: "quantitative", title: "φ(x)"}
      }
    },
    {
      data: {
        "values": [
        {"x": distances[0][1], "y": 0},
        {"x": distances[0][1], "y": student(distances[0][1],1)},
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
        {"x": distances[0][1], "y": student(distances[0][1],1)},
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
        {"x": distances[0][2], "y": 0},
        {"x": distances[0][2], "y": student(distances[0][2],1)},
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
        {"x": distances[0][2], "y": student(distances[0][2],1)},
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
        {"x": distances[0][3], "y": 0},
        {"x": distances[0][3], "y": student(distances[0][3],1)},
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
        {"x": distances[0][3], "y": student(distances[0][3],1)},
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
        {"x": distances[0][4], "y": 0},
        {"x": distances[0][4], "y": student(distances[0][4],1)},
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
        {"x": distances[0][4], "y": student(distances[0][4],1)},
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
        {"x": distances[0][5], "y": 0},
        {"x": distances[0][5], "y": student(distances[0][5],1)},
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
        {"x": distances[0][5], "y": student(distances[0][5],1)},
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
      inputs: ["md","distances","tex","student"],
      value: (function(md,distances,tex,student){return(
md `
\`distances[0][1] = \` ${distances[0][1]} - ${tex`P_{01} = P(${distances[0][1]})`} = ${student(distances[0][1], 1)}<br>
\`distances[0][2] = \` ${distances[0][2]} - ${tex`P_{02} = P(${distances[0][2]})`} = ${student(distances[0][2], 1)}<br>
\`distances[0][3] = \` ${distances[0][3]} - ${tex`P_{03} = P(${distances[0][3]})`} = ${student(distances[0][3], 1)}<br>
\`distances[0][4] = \` ${distances[0][4]} - ${tex`P_{04} = P(${distances[0][4]})`} = ${student(distances[0][4], 1)}<br>
\`distances[0][5] = \` ${distances[0][5]} - ${tex`P_{05} = P(${distances[0][5]})`} = ${student(distances[0][5], 1)}<br>
\`distances[5][0] = \` ${distances[5][0]} - ${tex`P_{50} = P(${distances[5][0]})`} = ${student(distances[5][0], 1.2)}`
)})
    },
    {
      inputs: ["md","metricNameTex","metric"],
      value: (function(md,metricNameTex,metric){return(
md`## Distances matrix using ${metricNameTex(metric)} metric`
)})
    },
    {
      inputs: ["pt","math","dFlat","zero"],
      value: (function(pt,math,dFlat,zero){return(
pt(math.matrix(math.reshape(dFlat.map(y => y<=zero?0.0:+y.toFixed(3)), [16,16])), "\\footnotesize")
)})
    },
    {
      name: "viewof metric",
      inputs: ["radio","metricName"],
      value: (function(radio,metricName){return(
radio({
  title: 'Distance metric',
  description: 'Choose the distance metric',
  options: [
    { label: metricName(0), value: 0 },
    { label: metricName(1), value: 1 },
    { label: metricName(2), value: 2 },
    { label: metricName(3), value: 3 }  
  ],
  value: 0

})
)})
    },
    {
      name: "metric",
      inputs: ["Generators","viewof metric"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","metricNameTex","metric","math","pts","computeDistance"],
      value: (function(md,metricNameTex,metric,math,pts,computeDistance){return(
md`The ${metricNameTex(metric)} distance between the points ${math.matrix(pts[0])} and ${math.matrix(pts[1])} is ${computeDistance(pts[0], pts[1])}`
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
md`The Euclidean, or ${tex`L^2`}, distance between the points is computed for each pair of points on the original high dimensional space and the probability that a point ${tex`x_i`} is "close" to a point ${tex`x_j`}, denoted as ${tex`p_{j|i}`} is given by the \`[Equation 1]\` below, using a Gaussian distribution with a different variance (${tex`\sigma^2`}) for each point in space. ${tex.block`${eq1}`}`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `The denominator acts as a *"normalization"* of the probabilities around each ${tex`x_i`}. This way, bigger distances around locations not too dense are similar to smaller distances on denser locations. The value for each variance ${tex`\sigma^2_i`} is determined by a binary search using the ${tex`\log_2`} of the hyperparameter *perplexity* (\`Perp\`), given by the user. We will delve into the binary search and \`Perp\` later on the road.`
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
      inputs: ["md","metricNameTex","metric"],
      value: (function(md,metricNameTex,metric){return(
md`### Affinities matrix, same variance for all points, using ${metricNameTex(metric)} metric.`
)})
    },
    {
      inputs: ["pt","math","pFlat"],
      value: (function(pt,math,pFlat){return(
pt(math.matrix(math.reshape(pFlat.map(x => +x.toFixed(3)), [16,16])))
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
  description: "Adjust the variance for all points and see how the values change"
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
Perplexity (${tex`Perp`}) is a hyperparameter that is used to adjust the variances of the affinities around each point in the original space. We can understand preplexity as a measure of entropy of affinities (${tex`P`}) between the points on the original high dimensional space.

The mapped space, in low dimensions, will have its affinities (${tex`Q`}) computed over a Student *t* distribution with the same variance for all points, as per \`[Equation 3]\`. ${tex.block`${eq3}`}

\`Note\`: \`Perp\` is used to adjust the affinities in the high dimensional space, not in the low dimensional map.`
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
      name: "computeEntropy",
      inputs: ["zero"],
      value: (function(zero){return(
function computeEntropy(probabilities){
  // Calcula a entropia de um vetor de probabilidades
  return probabilities.reduce((sum, p) => sum - (p<=zero?0:p*Math.log2(p)), 0)
}
)})
    },
    {
      inputs: ["md","s2","tex","computeEntropy","pFlat"],
      value: (function(md,s2,tex,computeEntropy,pFlat){return(
md `On the example above, with all variances equal to ${+(s2).toFixed(3)}, we would have ${tex`entropy = ${+(computeEntropy(pFlat)/16).toFixed(4)}`} and ${tex`perplexity = ${Math.exp(computeEntropy(pFlat)/16).toFixed(4)}`}`
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
      name: "varianceBinarySearch",
      inputs: ["computePi","computeEntropy"],
      value: (function(computePi,computeEntropy){return(
function varianceBinarySearch(points, i, entropy, error=1e-6, steps=40) {
  function recursiveBinarySearch(variance, lowerBound, upperBound) {
    const probabilities = computePi(points, i, variance),
          currentEntropy = computeEntropy(probabilities);
 
    if (steps-- <= 1 || Math.abs(currentEntropy - entropy) <= error)
      return probabilities;
    if (currentEntropy > entropy)
      return recursiveBinarySearch((lowerBound+variance)/2, lowerBound, variance);
    else
      return recursiveBinarySearch((variance+upperBound)/2, variance, upperBound);
  }

  const MINVAR = 0.01,
        MAXVAR = 50;
  return recursiveBinarySearch((MINVAR+MAXVAR)/2, MINVAR, MAXVAR);
}
)})
    },
    {
      name: "adjustVariances",
      inputs: ["varianceBinarySearch"],
      value: (function(varianceBinarySearch){return(
function adjustVariances(points, entropy, error, steps) {
  let size = points.length,
      p = [];
  for (let i = 0; i < size; i++)
    p = p.concat(varianceBinarySearch(points, i, entropy, error, steps))
  var total = p.reduce((sum, current)=>sum+current,0)
  return p.map((x)=>x/total);
}
)})
    },
    {
      inputs: ["pt","math","pVariancesDisplay"],
      value: (function(pt,math,pVariancesDisplay){return(
pt(math.matrix(math.reshape(pVariancesDisplay.map(x => +x.toFixed(3)), [16,16])))
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
  description: "Adjust perplexity hyperparameter"
})
)})
    },
    {
      name: "Perp_display",
      inputs: ["Generators","viewof Perp_display"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","computeEntropy","pVariancesDisplay"],
      value: (function(md,computeEntropy,pVariancesDisplay){return(
md`Resulting entropy (computed from data) = ${computeEntropy(pVariancesDisplay)}`
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
The resulting affinities matrix is asymmetric, to make it symmetric, so that ${tex.block`P_{i|j} = P_{j|i}`} we need to compute: ${tex.block`p_{ij} = \frac{P_{j|i}+P_{i|j}}{2}`}`
)})
    },
    {
      name: "p_final_display",
      inputs: ["pVariancesDisplay","atribIJ","valorIJ"],
      value: (function(pVariancesDisplay,atribIJ,valorIJ)
{
  var length = pVariancesDisplay.length;
  var m = Math.sqrt(length);
  var result = new Array(pVariancesDisplay.length),
      probMedia;
  for (let i=0; i<m; i++) {
    atribIJ(i, i, result, 0);
    for (let j=i+1; j<m; j++) {
      probMedia = (valorIJ(i, j, pVariancesDisplay)+valorIJ(j, i, pVariancesDisplay))/2;
      atribIJ(i, j, result, probMedia);
      atribIJ(j, i, result, probMedia);
    }
  }
  return result;
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
      inputs: ["md","tex","dFlat","dimensions"],
      value: (function(md,tex,dFlat,dimensions){return(
md`# Mapping the low dimension points
With the high dimensional affinities matrix in hand (${tex`P`}), we need to generate lower dimension points, compute their affinities matrix (${tex`Q`}) and adjust the generated points with a gradient descent. The first batch of low dimensional points are *"randomically"* generated, with the desired number of dimensions. In our example we will generate ${Math.sqrt(dFlat.length)} poins in ${tex`\mathbb{R}^${dimensions}`}`
)})
    },
    {
      inputs: ["md","tex","dimensions"],
      value: (function(md,tex,dimensions){return(
md`## Initial projection from ${tex`\mathbb{R}^2`} to ${tex`\mathbb{R}^${dimensions}`}

With the affinities matrix in high dimensions, we must randomically generate the first set of low dimension points mapping ${tex`\mathbb{R}^2 \rightarrow \mathbb{R}^${dimensions}`}, as per our toy example. The paper authors recommend points distributed over a gaussian with ${tex `\mu = 0`} and ${tex`\sigma^2 = 10^{-4}`}`
)})
    },
    {
      inputs: ["vegalite","original"],
      value: (function(vegalite,original){return(
vegalite(original)
)})
    },
    {
      name: "viewof dimensions",
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
      name: "dimensions",
      inputs: ["Generators","viewof dimensions"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","tex","dimensions"],
      value: (function(md,tex,dimensions){return(
md`### Initial projection to ${tex`\mathbb{R}^${dimensions}`}`
)})
    },
    {
      inputs: ["vegalite","fr1","yDisplay","fr2","dimensions"],
      value: (function(vegalite,fr1,yDisplay,fr2,dimensions){return(
vegalite([fr1(yDisplay),fr2(yDisplay)][dimensions-1])
)})
    },
    {
      name: "viewof guessType",
      inputs: ["radio"],
      value: (function(radio){return(
radio({
  title: 'Type of the initial projection',
  description: 'Choose how to generate the initial projection points, see how the distance matrix is affected',
  options: [
    {label:'Random', value:'random'},
    {label:'Compressed random', value:'compressed'},
    {label:'"Ideal"', value:'ideal'}
  ],
  value: 'random'
})
)})
    },
    {
      name: "guessType",
      inputs: ["Generators","viewof guessType"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","metricNameTex","metric"],
      value: (function(md,metricNameTex,metric){return(
md`### ${metricNameTex(metric)} distance between generated points`
)})
    },
    {
      inputs: ["pt","math","distQ","zero","digits"],
      value: (function(pt,math,distQ,zero,digits){return(
pt(math.matrix(math.reshape(distQ.map(y=>y<=zero?0:+y.toFixed(digits)), [16,16])), "\\scriptsize")
)})
    },
    {
      name: "distQ",
      inputs: ["distancesMatrix","yFlat"],
      value: (function(distancesMatrix,yFlat){return(
distancesMatrix(yFlat)
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
      name: "computeQ",
      inputs: ["array","computeDistance"],
      value: (function(array,computeDistance){return(
function computeQ(y) {
  // Computes affinities of the points on the mapped space, with a Student t kernel
  // y: Points on the mapped space
  // N: number of points
  // Q: probabilities
  var N = y.length;
  var Q = array(N*N, 1e-100);
  var soma = 0.0;
  for(var i=0; i<N; i++) {
    for(var j=i+1; j<N; j++) {
      var dist = computeDistance(y[i], y[j]);
      if (i != j) {
        Q[i*N+j] =  Math.exp(-dist); //*/ 1/(1 + dist);
        Q[j*N+i] = Q[i*N+j];
        soma += 2*Q[i*N+j];
      }
    }
  }
  // Returns normalized Q
  return Q.map(x=>x>1e-100?x/soma:x);
}
)})
    },
    {
      inputs: ["pt","math","computeQ","yFlat"],
      value: (function(pt,math,computeQ,yFlat){return(
pt(math.matrix(math.reshape(computeQ(yFlat).map(x => +x.toFixed(4)), [16,16])), '\\footnotesize')
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
      inputs: ["md","tex","KLD","pFinal","computeQ","yFlat"],
      value: (function(md,tex,KLD,pFinal,computeQ,yFlat){return(
md`In our example, the cost of the distributions ${tex`P`} and initial guess ${tex`Q`} is: ${tex`${KLD(pFinal, computeQ(yFlat)).toFixed(5)}`}`
)})
    },
    {
      name: "KLD",
      inputs: ["KL"],
      value: (function(KL){return(
function KLD(prob1, prob2) {
  return prob1.reduce((sum, value, index) => sum + (value==0?0:KL(value, prob2[index])))
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
      name: "cost",
      inputs: ["computeQ"],
      value: (function(computeQ){return(
function cost(y, P) {
  // Cost between points and a distribution
  // y: points in the mapped space
  // P: distribution in the high dimensional space
  var Q = computeQ(y);
  const N = y.length;
  var costSum = 0;
  for (var i=0; i<N; i++) {
    for (var j=0; j<N; j++) {
      if (i != j) {
        var ij = i*N+j
        var probP = Math.max(P[ij]/Q[ij], 1e-100)
        costSum += P[ij] * Math.log(probP);
      }
    }
  }
  return costSum;
}
)})
    },
    {
      inputs: ["md","tex","eq5"],
      value: (function(md,tex,eq5){return(
md`# Gradient
The gradient of the cost function is given by \`[Equation 5]\`, that relates the probabilities on the high dimension space (${tex`p_{ij}`}) with the probabilities on the mapped space (${tex`q_{ij}`}) and the points on the the mapped space (${tex`y_i`} e ${tex`y_j`}).
  ${tex.block`${eq5}`}
During the optimization stage, ${tex`p`} is kept fixed, the points ${tex`y`} are adjusted according to the gradient and, by definition, the low dimension probabilities ${tex`q`} are recomputed after each iteration.

To speed the the optimization stage and to help find better solutions, the paper suggest the following two *"tricks"*:
1. **Initial compression**: This forces the points of the mapped space to be closer on the beginning of the optimization. The smaller the initial distances, the easier it is for the agglomerations to form, resulting on a better exploration of the solution space.
2. **Initial exageration**: Multiply all ${tex`p_{ij}`} by a fixed factor (e.g. 4) during the first steps of the optimization. This means that almost all ${tex`q_{ij}`}, that still add up to 1, are to small to model high values of ${tex`p_{ij}`}. This means that the optimization is "encouraged" to model high ${tex`p_{ij}`} to high ${tex`q_{ij}`}, this tend to separate the agglomerations in different groups in the mapped space, help the clusters to move to and fro.`
)})
    },
    {
      inputs: ["md","tex","pt","math","gradient","yFlat","pFinal"],
      value: (function(md,tex,pt,math,gradient,yFlat,pFinal){return(
md`Gradient for the first iteraction: ${tex`\frac{\delta C}{\delta y_i} =`} ${pt(math.matrix(gradient(yFlat, pFinal, 1)), '\\footnotesize')}`
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
      name: "tsnePlayground",
      inputs: ["md"],
      value: (function(md){return(
md`# *t*-SNE Playground`
)})
    },
    {
      inputs: ["vegalite","thumbnail"],
      value: (function(vegalite,thumbnail){return(
vegalite(thumbnail)
)})
    },
    {
      inputs: ["md","bind","html","viewof eta","viewof triggerMomentum","viewof stop_exaggeration","viewof exaggerationFactor","viewof Perp","viewof T"],
      value: (function(md,bind,html,$0,$1,$2,$3,$4,$5){return(
md`<b>Learning rate</b>: ${bind(html`<input type=range min="0" max="20" step="0.1" style="width:90px;">`, $0)}
${bind(html`<input type=number style="width:40px;">`, $0)}
<br><b>Momentum update rate</b>: ${bind(html`<input type=range min="1" max="500" step="1" style="width:90px;">`, $1)}
${bind(html`<input type=number style="width:40px;">`, $1)}
<br><b>Exaggeration stop</b>: ${bind(html`<input type=range min="0" max="200" step="1" style="width:90px;">`, $2)}
${bind(html`<input type=number style="width:40px;">`, $2)}
<br><b>Exaggeration factor</b>: ${bind(html`<input type=range min="0.5" max="10" step="0.5" style="width:90px;">`, $3)}
${bind(html`<input type=number style="width:40px;">`, $3)}
<br><b>Perplexity</b>: ${bind(html`<input type=range min="1" max="100" step="0.5" style="width:90px;">`, $4)}
${bind(html`<input type=number style="width:40px;">`, $4)}
<br><b>Number of Interactions</b>: ${bind(html`<input type=range min="0" max="5000" step="50" style="width:90px;">`, $5)}
${bind(html`<input type=number style="width:40px;">`, $5)}`
)})
    },
    {
      name: "viewof reset",
      inputs: ["html"],
      value: (function(html)
{
  const form = html`<form>Select the number of interactions and click <button name=button>Start`;
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
      inputs: ["md","iteractionCount","T","costRun","stop_exaggeration","exaggerationFactor","Perp","momentum","triggerMomentum","metricName","metric"],
      value: (function(md,iteractionCount,T,costRun,stop_exaggeration,exaggerationFactor,Perp,momentum,triggerMomentum,metricName,metric){return(
md`**Iteraction**: ${iteractionCount}/${T} - **Cost**: ${costRun}<br>
**Exaggeration**: ${iteractionCount<=stop_exaggeration?exaggerationFactor:"none"} (${exaggerationFactor} until interaction ${stop_exaggeration}) - 
**Perplexity**: ${Perp}<br>
**Momentum**: ${momentum[iteractionCount<triggerMomentum]} (${momentum[true]} until iteraction ${triggerMomentum}, ${momentum[false]} afterwards) - **Metric**: ${metricName(metric)}`
)})
    },
    {
      inputs: ["vegalite","fr1","pointsMap","fr2","dimensions"],
      value: (function(vegalite,fr1,pointsMap,fr2,dimensions){return(
vegalite([fr1(pointsMap), fr2(pointsMap)][+dimensions-1])
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### One gradient descent step, returns a set of points to be displayed`
)})
    },
    {
      name: "pointsMap",
      inputs: ["iteractionCount","T","yDisplay","Y","gradient","pFinal","mutable costRun","cost","mutable iteractionCount","ystep","gains","momentum","triggerMomentum","eta"],
      value: (function*(iteractionCount,T,yDisplay,Y,gradient,pFinal,$0,cost,$1,ystep,gains,momentum,triggerMomentum,eta)
{
  if (iteractionCount >= T)
    yield yDisplay.map((p, i)=>(p.y==undefined?{x:Y[i][0], 
                                                name:p.name, 
                                                Cluster:p.Cluster}:
                                               {x:Y[i][0],
                                                y:Y[i][1],
                                                name:p.name,
                                                Cluster:p.Cluster}));
  else {
    // Adapted from: https://github.com/karpathy/tsnejs
    var N = Y.length;
    var dim = Y[0].length;
    var grad = gradient(Y, pFinal, iteractionCount);
    var sign = ((p)=>p<0?-1:p>0?1:p);
    $0.value = cost(Y, pFinal);
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
        var momval = momentum[iteractionCount < triggerMomentum]; // ? 0.5 : 0.8;
        var newsid = momval * sid - eta * newgain * grad[i][d];
        ystep[i][d] = newsid; // remember the step we took

        // step!
        Y[i][d] += newsid; 
      }
    }
    yield yDisplay.map((p, i)=>(p.y==undefined?{x:Y[i][0], 
                                                name:p.name, 
                                                Cluster:p.Cluster}:
                                               {x:Y[i][0],
                                                y:Y[i][1],
                                                name:p.name,
                                                Cluster:p.Cluster}));
  }
}
)
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `# Limitations
- *t*-SNE:
  - The algorithm do not preserve distances nor densities, it preserves only, up to a certain degree, the neighbourhood.
  - The performance of *t*-SNE in general tasks of dimensionality reduction is not clearly defined.
  - There's no guarantee of convergence.
  - The value of the hyperparameter \`Perp\` can highly influence the resulting map.
- This implementation:
  - The current implementation is a bit fractioned (with pieces and bits of code throughut the notebook) and applies ontly from maps from ${tex`\mathbb{R}^M`} to ${tex`\mathbb{R}^{1|2}`}.
  - It is not difficult to include other datasets, but edition has to be manual.
  - Text and code can be downloaded from here or from <a href="#ref">Github<sup>23</sup></a>.
  - Although one can observe interesting behaviours of *t*-SNE in reductions from ${tex`\mathbb{R}^2`} to ${tex`\mathbb{R}^1`}, one should generalize the results observed in this notebook with care, given the limited dataset and minimal reduction.`
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
      inputs: ["md"],
      value: (function(md){return(
md`##### Playground inputs`
)})
    },
    {
      name: "viewof eta",
      inputs: ["View"],
      value: (function(View){return(
new View(10)
)})
    },
    {
      name: "eta",
      inputs: ["Generators","viewof eta"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof triggerMomentum",
      inputs: ["View"],
      value: (function(View){return(
new View(75)
)})
    },
    {
      name: "triggerMomentum",
      inputs: ["Generators","viewof triggerMomentum"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof stop_exaggeration",
      inputs: ["View"],
      value: (function(View){return(
new View(50)
)})
    },
    {
      name: "stop_exaggeration",
      inputs: ["Generators","viewof stop_exaggeration"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof exaggerationFactor",
      inputs: ["View"],
      value: (function(View){return(
new View(1.5)
)})
    },
    {
      name: "exaggerationFactor",
      inputs: ["Generators","viewof exaggerationFactor"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof Perp",
      inputs: ["View"],
      value: (function(View){return(
new View(10)
)})
    },
    {
      name: "Perp",
      inputs: ["Generators","viewof Perp"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof T",
      inputs: ["View"],
      value: (function(View){return(
new View(0)
)})
    },
    {
      name: "T",
      inputs: ["Generators","viewof T"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`##### Data`
)})
    },
    {
      name: "points",
      value: (function(){return(
{
    "values": [
      {x: 0.62, y: 0.5, Cluster: "a", name: "p0"},
      {x: 1, y: 0.97, Cluster: "a", name: "p1"},
      {x: 0.77, y: 1.27, Cluster: "a", name: "p2"},
      {x: 0.5, y: 1.03, Cluster: "a", name: "p3"},
      {x: 1.03, y: 2.75, Cluster: "b", name: "p4"},
      {x: 1.45, y: 2.98, Cluster: "b", name: "p5"},
      {x: 1.06, y: 3.5, Cluster: "b", name: "p6"},
      {x: 0.75, y: 2.99, Cluster: "b", name: "p7"},
      {x: 3.1, y: 3.2, Cluster: "c", name: "p8"},
      {x: 3.5, y: 3.55, Cluster: "c", name: "p9"},
      {x: 2.9, y: 3.75, Cluster: "c", name: "p10"},
      {x: 2.5, y: 3.45, Cluster: "c", name: "p11"},
      {x: 3.22, y: 0.75, Cluster: "d", name: "p12"},
      {x: 3.4, y: 1.22, Cluster: "d", name: "p13"},
      {x: 3.27, y: 1.75, Cluster: "d", name: "p14"},
      {x: 3.0, y: 1.28, Cluster: "d", name: "p15"},
    ]
  }
)})
    },
    {
      name: "pointsFlat",
      inputs: ["points"],
      value: (function(points){return(
points.values.map(p=>[p.x, p.y])
)})
    },
    {
      name: "dFlat",
      inputs: ["distancesMatrix","pointsFlat"],
      value: (function(distancesMatrix,pointsFlat){return(
distancesMatrix(pointsFlat)
)})
    },
    {
      name: "pFlat",
      inputs: ["pointsFlat","computePi","s2"],
      value: (function(pointsFlat,computePi,s2)
{
  var N = pointsFlat.length;
  var matrix = []
  for (var i=0; i<N; i++)
    matrix = matrix.concat(computePi(pointsFlat, i, s2));
  return matrix.map(p=>p/16);
}
)
    },
    {
      name: "pVariancesDisplay",
      inputs: ["adjustVariances","pointsFlat","Perp_display"],
      value: (function(adjustVariances,pointsFlat,Perp_display){return(
adjustVariances(pointsFlat, Math.log2(Perp_display), 1e-4, 50)
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
      name: "pVariances",
      inputs: ["adjustVariances","pointsFlat","entropy"],
      value: (function(adjustVariances,pointsFlat,entropy){return(
adjustVariances(pointsFlat, entropy, 1e-4, 50)
)})
    },
    {
      name: "pFinal",
      inputs: ["pVariances","atribIJ","valorIJ"],
      value: (function(pVariances,atribIJ,valorIJ)
{
  var length = pVariances.length;
  var m = Math.sqrt(length);
  var result = new Array(pVariances.length),
      meanProbability;
  for (let i=0; i<m; i++) {
    atribIJ(i, i, result, 0);
    for (let j=i+1; j<m; j++) {
      meanProbability = (valorIJ(i, j, pVariances)+valorIJ(j, i, pVariances))/2;
      atribIJ(i, j, result, meanProbability);
      atribIJ(j, i, result, meanProbability);
    }
  }
  return result;
}
)
    },
    {
      name: "guessMap",
      inputs: ["matrix","points","dimensions","gaussRandom","ideal_linear"],
      value: (function(matrix,points,dimensions,gaussRandom,ideal_linear){return(
{
  random: matrix(points.values.length, +dimensions, (()=>gaussRandom()*1e-4)),
  compressed: matrix(points.values.length, +dimensions, (()=>gaussRandom()*1e-6)),
  ideal: ideal_linear.values.map((p)=>dimensions==1?[p.x]:[p.x, p.y])
}
)})
    },
    {
      name: "yFlat",
      inputs: ["guessMap","guessType"],
      value: (function(guessMap,guessType){return(
guessMap[guessType]
)})
    },
    {
      name: "yDisplay",
      inputs: ["points","dimensions","yFlat"],
      value: (function(points,dimensions,yFlat){return(
points.values.map(function(x, i){
  if (dimensions == 1)
    return {x:yFlat[i][0], name:x.name, Cluster:x.Cluster};
  else if (dimensions == 2)
    return {x:yFlat[i][0], y: yFlat[i][1], name:x.name, Cluster:x.Cluster};
})
)})
    },
    {
      name: "initial costRun",
      value: (function(){return(
Infinity
)})
    },
    {
      name: "mutable costRun",
      inputs: ["Mutable","initial costRun"],
      value: (M, _) => new M(_)
    },
    {
      name: "costRun",
      inputs: ["mutable costRun"],
      value: _ => _.generator
    },
    {
      name: "initial iteractionCount",
      value: (function(){return(
0
)})
    },
    {
      name: "mutable iteractionCount",
      inputs: ["Mutable","initial iteractionCount"],
      value: (M, _) => new M(_)
    },
    {
      name: "iteractionCount",
      inputs: ["mutable iteractionCount"],
      value: _ => _.generator
    },
    {
      name: "digits",
      inputs: ["math","distQ"],
      value: (function(math,distQ){return(
Math.max(3, Math.abs(Math.floor(Math.log10(math.mean(distQ)))))
)})
    },
    {
      name: "original",
      inputs: ["width","points","colorScheme","markSize","opacity"],
      value: (function(width,points,colorScheme,markSize,opacity){return(
{
  width: Math.min(300, width),
  height: 300,
  data: points,
  title: "Original data",
  encoding: {
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative"},
    color: {field: "Cluster", type: "nominal", scale:{scheme: colorScheme}, title:"Cluster"},
  },
  layer: [{
      mark: {type: "circle", size: markSize, opacity: opacity},
    },{
      mark: {type: "text", dy: 17},
      encoding:{
        text:{field:"name"},
        color: {value: "black"}
      }
  }]
}
)})
    },
    {
      name: "thumbnail",
      inputs: ["original","width"],
      value: (function(original,width)
{
  var cp = JSON.parse(JSON.stringify(original));;
  cp.width = Math.min(200, width);
  cp.height = 200;
  cp.layer[0].mark.size = 50;
  return cp;
}
)
    },
    {
      name: "fr1",
      inputs: ["width","colorScheme","markSize","opacity"],
      value: (function(width,colorScheme,markSize,opacity){return(
function fr1(dados) {
  return ({
    width: Math.min(800, width),
    data: {values: dados},
    title: "Points mapped to 1D",
    encoding: {
      x: {field: "x", type: "quantitative"},
      color: {field: "Cluster", type: "nominal", scale: {scheme: colorScheme}, title: "Cluster"},
    },
    layer: [{
      mark: {type: "circle", size: markSize*2.5, opacity: opacity},
    },{
      mark: {type: "text", dy: 3},
      encoding:{
        text:{field:"name", type:"nominal"},
        color: {value: "black"}
      }
    }]
  });
}
)})
    },
    {
      name: "fr2",
      inputs: ["width","colorScheme","markSize","opacity"],
      value: (function(width,colorScheme,markSize,opacity){return(
function fr2(dados) {
  return {
    width: Math.min(300, width),
    height: 300,
    title: 'Points mapped to 2D',
    data: {values:dados},
    encoding: {
      x: {field: "x", type: "quantitative"},
      y: {field: "y", type: "quantitative"},
      color: {field: "Cluster", type: "nominal", scale:{scheme: colorScheme}, title:"Cluster"},
    },
    layer: [{
        mark: {type: "circle", size: markSize, opacity: opacity},
      },{
        mark: {type: "text", dy: 17},
        encoding:{
          text:{field:"name"},
          color: {value: "black"}
        }
    }]
  };
}
)})
    },
    {
      name: "Y",
      inputs: ["reset","mutable iteractionCount","yFlat","matrix"],
      value: (function(reset,$0,yFlat,matrix)
{
  reset;
  $0.value = 0;
  const N = yFlat.length,
        dim = yFlat[0].length;
  let g = matrix(N, dim);
  for (var i=0; i<N; i++)
    for (var d=0; d<dim; d++)
      g[i][d] = yFlat[i][d];
  return g;
}
)
    },
    {
      name: "initial gains",
      inputs: ["matrix","ystep"],
      value: (function(matrix,ystep){return(
matrix(ystep.length, ystep[0].length, 1.0)
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
md`# Auxiliary functions`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Input bind`
)})
    },
    {
      name: "bind",
      inputs: ["disposal"],
      value: (function(disposal){return(
function bind(input, view) {
  const value = ["range", "number"].includes(input.type) ? "valueAsNumber" : "value";
  const update = () => input[value] = view.value;
  input.oninput = () => view.value = input[value];
  view.addEventListener("input", update);
  disposal(input).then(() => view.removeEventListener("input", update));
  return update(), input;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Metrics`
)})
    },
    {
      name: "distancesMatrix",
      inputs: ["zeros","computeDistance"],
      value: (function(zeros,computeDistance){return(
function distancesMatrix(points, metric) {
  // points: Vector of R^N points
  // ṕontos = [[p_11, ..., p_0n], [p_21, ..., p_2n], ..., [p_k1,...,p_kn]]
  var N = points.length,          // # of points
      distanceMatrix = zeros(N*N);
  if (metric==undefined) metric = computeDistance;
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++ ) {
      var dist = metric(points[i], points[j])
      distanceMatrix[i*N+j] = dist;
      distanceMatrix[j*N+i] = dist;
    }
  }
  return distanceMatrix;
}
)})
    },
    {
      name: "computeDistance",
      inputs: ["L2","L2Q","L1","LMax","metric"],
      value: (function(L2,L2Q,L1,LMax,metric){return(
[L2, L2Q, L1, LMax][+metric]
)})
    },
    {
      name: "metricName",
      value: (function(){return(
c => ["L2", "L2 Squared", "L1", "Chebyshev"][c]
)})
    },
    {
      name: "metricNameTex",
      inputs: ["tex"],
      value: (function(tex){return(
c => [tex`L^2`, tex`L^{2^2}`, tex`L^1`, tex`D_{Chebyshev}`][c]
)})
    },
    {
      name: "L2",
      inputs: ["L2Q"],
      value: (function(L2Q){return(
function L2(p1, p2) {
  return Math.sqrt(L2Q(p1, p2));
}
)})
    },
    {
      name: "L2Q",
      value: (function(){return(
function L2Q(p1, p2) {
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
      name: "L1",
      value: (function(){return(
function L1(p1, p2) {
  // p = [P1,..,Pdim]
  var dim = p1.length,
      dist = 0;
  for (var i = 0; i < dim; i++) {
    var p1i = p1[i], p2i = p2[i];
    dist += Math.abs(p1i-p2i);
  }
  return dist;
}
)})
    },
    {
      name: "LMax",
      value: (function(){return(
function LMax(p1, p2) {
  // p = [P1,..,Pdim]
  var dim = p1.length,
      dist = 0;
  for (var i = 0; i < dim; i++) {
    var p1i = p1[i], p2i = p2[i];
    dist = Math.max(dist, Math.abs(p1i-p2i));
  }
  return dist;
}
)})
    },
    {
      name: "computePi",
      inputs: ["zeros","computeDistance"],
      value: (function(zeros,computeDistance){return(
function computePi(p, i, s2i) {
  // p: points
  // i: index of p_i
  // s2i: variance for p_i
  var N = p.length,
      N2 = N*N,
      dim = p[i].length,
      norm = 0.0,
      P = zeros(N);
  for (var j=0; j<N; j++) {
    if (i != j)
      P[j] = Math.exp(-(computeDistance(p[i], p[j]))/(2*s2i));
    norm += P[j];
  }
  return P.map(p=>p/norm);
}
)})
    },
    {
      name: "gradient",
      inputs: ["stop_exaggeration","exaggerationFactor","computeQ","zeros","computeDistance"],
      value: (function(stop_exaggeration,exaggerationFactor,computeQ,zeros,computeDistance){return(
function gradient(y, P, iter) {
  // Computes the gradient given:
  // y: points on the mapped space
  // P: probabilities on the original space
  // iter: Number of current iteration
  // dC/dy = 4 * sum((p_ij-q_ij)(y_i-y_j)(1+|y_i-y_j|^2)^-1)
  const ex = iter <= stop_exaggeration?exaggerationFactor:1,
        N = y.length,
        dim = y[0].length,
        Q = computeQ(y);
  var g = zeros(N, dim);
  for (var i=0; i<N; i++) {
    for (var j=0; j<N; j++) {
      const ij = N*i+j,
            pq = (ex*P[ij])-Q[ij],
            dist = 1+computeDistance(y[i], y[j]);
      for (var d=0; d<dim; d++)
        g[i][d] += 4*pq*(y[i][d]-y[j][d])/dist;
    }
  }
  return g;
}
)})
    },
    {
      name: "gradObsolete",
      inputs: ["stop_exaggeration","exaggerationFactor","zeros","computeDistance","ind"],
      value: (function(stop_exaggeration,exaggerationFactor,zeros,computeDistance,ind){return(
function gradObsolete(p, q, y, iter) {
  // Obsolete
  // Returns the gradient given:
  // p: affinities on the high dimensional space
  // q: affinities on the mapped space
  // y: Points on the mapped space
  // iter: Current iteraction
  const numPontos = y.length;
  const dim = y[0].length;
  const exagero = iter<stop_exaggeration?exaggerationFactor:1;
  var soma;
  var gradiente = zeros(numPontos, dim);
  for (let j, i=0; i<numPontos; i++) {
    soma = 0;
    for (j=0; j<numPontos; j++) {
      // p_ij - q_ij * (y_i - y_j) * (1 + dist(y_i, y_j))^-1
      let dist = computeDistance(y[i], y[j]), //distR1({x:y[i]}, {x:y[j]}),
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
      name: "mse",
      value: (function(){return(
function mse(p1, p2) {
  // Mean squared error
  // Used for debug
  return p1.reduce((sum, value, i)=> sum + (value - p2[i]) * (value - p2[i]) , 0)/p1.length;
}
)})
    },
    {
      name: "zeros",
      inputs: ["array","matrix"],
      value: (function(array,matrix){return(
function zeros(m, n) {
  // Returns a matrix or vector of zeroes
  if (n == undefined)
    return array(m, 0.0);
  return matrix(m, n, 0.0);
}
)})
    },
    {
      name: "array",
      inputs: ["math"],
      value: (function(math){return(
function array(n, s) {
  // Returns a vector of n items of s
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
      name: "matrix",
      inputs: ["array"],
      value: (function(array){return(
function matrix(m, n, s) {
  // Returns a mxn matrix, inicialized with s
  return [...new Array(m)].map(()=>array(n, s));
}
)})
    },
    {
      name: "zero",
      value: (function(){return(
1e-100
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
      inputs: ["points"],
      value: (function(points){return(
function ind(i, j) {
  return i * points.values.length + j;
}
)})
    },
    {
      name: "array2Ind",
      value: (function(){return(
function array2Ind(i, N) {
  return [Math.floor(i/N), i%N];
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Generate distances matrix for the probabilities discussion`
)})
    },
    {
      name: "m_d",
      inputs: ["genericDistanceMatrix","dist"],
      value: (function(genericDistanceMatrix,dist){return(
function m_d(p) {
  return genericDistanceMatrix(p, dist);
}
)})
    },
    {
      name: "dist",
      inputs: ["L2"],
      value: (function(L2){return(
function dist(pi, pj){
  // Distance for the points formatted as {x: X, y: Y}
  return L2([pi.x, pi.y], [pj.x, pj.y]);
}
)})
    },
    {
      name: "genericDistanceMatrix",
      inputs: ["zero"],
      value: (function(zero){return(
function genericDistanceMatrix(p, distanceMetric) {
  let length = p.length,
      m = new Array(length);

  for (let i = 0; i < length; i++)
    m[i] = new Array(length);
  for (let i = 0; i < length; i++) {
    m[i][i] = zero;
    for (let j = i+1; j < length; j++) {
      m[i][j] = +distanceMetric(p[i], p[j]).toFixed(3);
      m[j][i] = m[i][j];
    }
  }
  return m;
}
)})
    },
    {
      name: "distances",
      inputs: ["m_d","points"],
      value: (function(m_d,points){return(
m_d(points.values)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Gets and sets a value to an array of m points using *i,j* indexes`
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
      name: "cars",
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
      name: "h_m",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://raw.githubusercontent.com/RobStelling/miscImg/master/dados/halfMoon.json")
)})
    },
    {
      name: "halfMoon",
      inputs: ["h_m"],
      value: (function(h_m){return(
JSON.parse(h_m)
)})
    },
    {
      name: "halfMoonChart",
      inputs: ["width","halfMoon","markSize","opacity","colorScheme"],
      value: (function(width,halfMoon,markSize,opacity,colorScheme){return(
{
  width: Math.min(500, width),
  height : 250,
  data: {values: halfMoon},
  mark: {type: "circle", size: markSize, opacity: opacity},
  encoding: {
    x: {field: "x", type: "quantitative"},
    y: {field: "y", type: "quantitative"},
    color: {field: "label", type: "nominal", scale: {scheme: colorScheme}, title:"Cluster"},
  }
}
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
      name: "circles",
      inputs: ["circ"],
      value: (function(circ){return(
JSON.parse(circ)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Chart attributes`
)})
    },
    {
      name: "markSize",
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
      name: "pointsNormalStudent",
      inputs: ["normal","students"],
      value: (function(normal,students){return(
function pointsNormalStudent(min, max, step, sigma, mi, gl) {
  // Generates points for Normal and Student distributions
  // with same variance
  let vetor = [];
  for (let x = min; x < max; x+= step) {
    vetor.push({x:x, y:normal(x, sigma, mi), Curva:"Normal"});
    vetor.push({x:x, y:students(x, gl, sigma), Curva:"Student"});
  }
  return vetor;
}
)})
    },
    {
      name: "pointsNormal",
      inputs: ["normal"],
      value: (function(normal){return(
function pointsNormal(min, max, step, sigma, mi) {
  // Generates points for a normal distribution
  let vetor = [];
  for (let x = min; x < max; x+= step)
    vetor.push({x:x, y:normal(x, sigma, mi)});
  return vetor;
}
)})
    },
    {
      name: "pointsStudent",
      inputs: ["student"],
      value: (function(student){return(
function pointsStudent(min, max, step, gl) {
  let vetor = [];
  for (let x = min; x <= max; x+= step)
    vetor.push({x:x, y:student(x, gl)});
  return vetor;
}
)})
    },
    {
      name: "normal",
      value: (function(){return(
function normal(x, s, mi) {
  // Normal density function
  let y;
  y = 1/(s*Math.sqrt(2*Math.PI));
  y = y * Math.exp(-((x-mi)**2)/(2*s**2));
  return +y.toFixed(4);
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
      name: "student",
      inputs: ["students"],
      value: (function(students){return(
function student(x, df) {
  // Student t with sd = 1
  return students(x, df, 1);
}
)})
    },
    {
      name: "students",
      inputs: ["stats"],
      value: (function(stats){return(
function students(x, df, s) {
  // Student t distribution
  return +(stats.gammaFunc((df+1)/2)/((Math.sqrt(df*Math.PI)*s)*stats.gammaFunc(df/2))*(1+((x/s)**2/df))**(-(df+1)/2)).toFixed(4)
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
md `# Imported Content`
)})
    },
    {
      from: "@mbostock/lets-try-t-sne",
      name: "chart",
      remote: "chart"
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
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`#### Inputs`
)})
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
      from: "@mbostock/synchronized-views",
      name: "View",
      remote: "View"
    },
    {
      from: "@mbostock/disposal",
      name: "disposal",
      remote: "disposal"
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

const m3 = {
  id: "@mbostock/synchronized-views",
  variables: [
    {
      name: "View",
      value: (function(){return(
class View {
  constructor(value) {
    Object.defineProperties(this, {
      _list: {value: [], writable: true},
      _value: {value, writable: true}
    });
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.dispatchEvent({type: "input", value});
  }
  addEventListener(type, listener) {
    if (type != "input" || this._list.includes(listener)) return;
    this._list = [listener].concat(this._list);
  }
  removeEventListener(type, listener) {
    if (type != "input") return;
    this._list = this._list.filter(l => l !== listener);
  }
  dispatchEvent(event) {
    const p = Promise.resolve(event);
    this._list.forEach(l => p.then(l));
  }
}
)})
    }
  ]
};

const m4 = {
  id: "@mbostock/disposal",
  variables: [
    {
      name: "disposal",
      inputs: ["MutationObserver"],
      value: (function(MutationObserver){return(
function disposal(element) {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      const target = element.closest(".observablehq");
      if (!target) return resolve();
      const observer = new MutationObserver(mutations => {
        if (target.contains(element)) return;
        observer.disconnect(), resolve();
      });
      observer.observe(target, {childList: true});
    });
  });
}
)})
    }
  ]
};

const notebook = {
  id: "2379c50fe5f906fb@7823",
  modules: [m0,m1,m2,m3,m4]
};

export default notebook;
