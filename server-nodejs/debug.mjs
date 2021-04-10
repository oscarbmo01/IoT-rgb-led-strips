// youtubers: la cocina del codigo, joacog programa, betta tech, derivando
// aprender: desestructuracion, ...rest, ...spread, map, filter, reduce
// aprender: async, await, primese.all, const, ()=>
//https://www.typing.com/

// Html
// - ¿Que es html?
// - Qué son los tags semánticos (article,title, sidebar, navbar) y para qué sirven?

// Css
// - ¿Que es Css? 
// - Qué formas hay de aplicar estilos?
// - Diferencias entre clase y id?
// - ¿Cómo hago para que una columna de divs o imágenes se vean en forma de fila? (ver flexbox)
// - Como hago animaciones (ver keyframes)?
// - ¿Cómo hago para que un rectángulo aumente de tamaño cuando paso el mouse por arriba?
// - Qué son las pseudoclases?
// - Como usar media queries?
// - ¿Qué es un preprocesador de css y para que sirve?

// Javascript
// - ¿Qué es un scope?
// - ¿Diferencia entre var, let y const? 
// - ¿Qué es el Hosting?
// - ¿Diferencia entre "== vs ==="?
// - ¿Es JavaScript single thread?
// - ¿Qué significa single threaded? 
// - ¿Qué es una IIFE?
// - ¿Diferencias entre arrow functions y regular functions?
// - ¿Que es una clase ?
// - ¿Qué es el Event Loop? O Cómo maneja Javascript el asincronismo
// - ¿Cuales son las consideraciones al usar el “this”?
// - ¿Qué son los Closures?
// - ¿Cómo funciona la herencia en JS?

// React
// - ¿Que es React?
// - Que es DOM?
// - ¿Qué es el Virtual DOM? ¿Para que es usado?
// - ¿Diferencias entre Stateful y Stateless Components?
// - Listar los Lifecycle Methods (métodos de ciclo de vida): 
// - Explicar qué son los Hooks 
// - Que es Redux y para qué sirve
// - Usaste Angular?

// POO (programación orientada a objetos)
// - ¿Que es la programación orientada a objetos?
// - Patrones de diseño en POO

// Unit Testing
// - Que es y para que sirve el testing
// - Que es TDD, alguna vez lo usaste?
// - Que es integration testing
 
// Metodologias Agiles
// - Que son las metodologías ágiles? Conoces alguna? Explicala

// Inglés
// - Una simulación de Daily. What are you going to do today?
// - Una pregunta más abstracta. What do you like about being a developer?

// Ejercicio sin escribir
// -Tenes un string de nombres separados por una coma, como haces para separarlos y pasarlos a una array
// -Ahora tienes el array con los nombres, pero hay algunos que están repetidos. Como haces para sacar los nombres repetidos 





function jake({...param}) {
    console.log(param);
    console.log(param.b);
}

jake({b:6, c:7});

for (let index = 0; index < 5000000; index++) {
    console.log('NOP');
}
