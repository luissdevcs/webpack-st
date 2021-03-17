## INTRODUCCIÓN

A medida que nuestra aplicación se vuelve más compleja, vamos a requerir dividirla en módulos o ejecutar tareas automáticas:

- Live reload
- Minimizar el código
- Ofuscarlo
- Incrementar la compatibilidad con los navegadores

## NODE JS
Correr JS en el servidor
Convertir nuestra computadora en  un desarrollador de desarrollo

Caracteristicas como Babel, para compatibilizar con NODE JS

Hay muchos paquetes que se pueden consumir, con una gran cantidad de funcionalidades ya desarrolladas por la comunidad de JS

Posiblemente lo que necesitemos ya existe como paquete y solo lo debemos consumir

### WEBPACK :
Empaquetador de módulos
Nos ayuda  a  realizar tareas de forma automática:
- Gestionar dependencias
- Montar servidores de desarrollo y pruebas
- Cargar módulos
- Convertir a diferentes formatos
- Minimizar código
- Compilar de SASS a CSS
- Compilar de TS a JS
- Nos permite trabajar con JS moderno

También tiene sus inconvenientes, pero es uno de los más populares:
- Es la configuración inicial puede ser un dolor de cabeza
- Depuración de errores

Pero la compatibilidad es su mayor fuerte.

## NODE JS - CONFIGURACIÓN INICIAL

Ubicarnos en la carpeta de trabajo y verificar la instalacion de node y npm desde terminal:
    node --version
    npm  --version

Ejecutar
    npm init // Esto creará el package.json que gestiona dependencias, como funciona la aplicacion y que debo descartar...

    Va ha preguntar el nombre la version y la descripcion... Seguir las indicaciones


## EXPOSICIÓN DEL PROBLEMA Y NECESIDAD DE WEBPACK

- Lo usan los grandes empresas
- Necesidad de un codigo modular
- No hacer tantas peticiones al servidor
- Javascript nos permite importar modulos

Hay necesidad de trabajar de manera más ordenada, usar modulos y librerias de otras personas.


## INSTALACIÓN Y CONFIGURACIÓN DE WEBPACK POR DEFECTO

Seguir las primeras indicaciones

npm init 

npm install webpack webpack-cli --save-dev

- En el package.json en la clave scripts agregamos al objeto una nueva propiedad "build" con el valor "webpack". Con esto le indicamos a la aplicación el comando build dispara webpack con su configuración webpack por defecto y busca los archivos de src y va ha unificar y comprimir los archivos de JS dejandoles listo para producción.

    npm run build

Al ejecutar este comando node nos creará la carpeta "dist" con el archivo main.js, en el cual estará estandarizado, ofuscado y minificado lo necesario para ejecutar nuestra aplicación javascript. Recordar que esta carpeta debería tener lo que yo necesito subir al servidor. Ahí pueden estar los archivos js, css, html y demás. Además las rutas deberían de ser actualizadas correctamente. Webpack nos permite hacer cosas automáticamente.

## 

- Gracias a que estamos trabajando con modulos nosotros le podemos decir a JS que cosas debemos exportar y que cosas no, algo así como propiedades privadas. Para indicarle a node que cosas queremos permitir su uso externo, entonces usamos la palabra reservada 'export', ejemplo:

    export const nombre  = 'Luis';

## ARCHIVO DE CONFIGURACIÓN DE WEBPACK

Hasta aquí cuando correos el "npm run build" se lanza un warning indicandonos que estamos en modo en **producción** por defecto y por ende se eliminan los comentarios, se simplifica y demás.

Creamos el archivo de configuración de webpack en la raíz del proyecto

    webpack.config.js

Añadimos al archivo: 

    module.exports = {
        node: 'development',
        module: {
            rules: [
                
            ]
        }

    }

- Las reglas (rules) sirven para indicarle a webpack que hacer en ciertas ocasiones con archivos
  * Por ejemplo si queremos que mueva el .html a la carpeta dist pues instalamos los siguientes paquetes

    npm i --save-dev html-loader html-webpack-plugin

    ó

    npm i -D html-loader html-webpack-plugin

   Los cuales hacen dos cosas: mover el archivo html al directorio dist y le dice a webpack que incruste automaticamente el bundle en el index

   **TEMP: webpack.config.js **

   **NOTE**: En webpack, el orden en el que aparecen los cargadores en la configuración es de gran importancia.

   // require: es una manera de node para cargar archivos de otros paquetes

const HtmlWebPackPlugin = require('html-webpack-plugin'); 

module.exports = {

    mode: 'development',
    module: {
        rules: [
            {
                // test: es la condición que webpack va ha realizar cuando este evaluando archivo por archivo. Aquí usa una expresión regular
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            // Con template le dicemos a webpack que archivo quiero tomar
            template: './src/index.html',
            //filename : Hacia donde quiero colocarlo
            filename: './index.html'       
        }),
    ]

}

* Podemos modificar el webpack para indicarle que minifique los archivos html:

    // minimize: permite eliminar comentarios y minificar el html. sí queremos hacer ciertas verificaciones lo podemos dejar en false
    options: { minimize: true }


* Instalamos un complemento para configurar un error de desarrollo, para poder usar el protocolo http en nuestros proyectos, ya que esto nos va ha permitir trabajar como en producción y nos va ha evitar errores debido a cosas que no funcionan con file://

    npm i -D webpack-dev-server

Y agregamos al webpack.config.js

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open"  // linea agregada
}

*Fuente*: Aquí tuve un error, pero ya se configuro con al ayuda de este tutorial en el comentario #15
https://stackoverflow.com/questions/59611597/error-cannot-find-module-webpack-cli-bin-config-yargs

*Note*: Podemos cambiar el puerto por defecto del servidor de desarrollo así:
    "start": "webpack serve --open --port=8081"


## IMPORTANDO ESTILOS DE FORMA DINAMICA

### Cargar estilos de forma dinámica

Realizamos la siguiente instalación:

    // css-loader: Nos permite cargar archivos css mediante "import"
    // style-loader: Carga la hoja de estilo en el DOM
    npm i -D css-loader style-loader

Creamos los css normalmente e indicar al archivo js que los requiera con el import, así:

    Ejemplo componentes.js:

        import '../css/componentes.css';


Configuramos el webpack, agregandole una nueva regla:

    {
        test: /css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    },

Sí queremos removemos la carpeta dist
Corremos el npm run build y voila

### CSS GLOBLALES
Aquí vamos a crear un archivo que este importado en el index y que en la carpeta "dist" aparezca como un archivo independiente

**Primera forma**

- Lo creamos en la raíz del source, es buena práctica hacerlo de esta manera ya que muchos frameworks indican que ahí está el archivo global de la app. Puede estar en otro lugar si se requiere
- Como actualmente esta configurado el proyecto es necesario importar en el index.js(para este caso) el css, así:

    import './style.css';

*Note*: Al hacer "npm run build" no me crea un archivo en dist, por eso vamos ha tener la segunda forma.

**Segunda forma**

Hacemos la sigueinte instalación:

    npm i -D mini-css-extract-plugin

Importamos el plugin en webpack.config.css

    const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

Cuando miremos que tenga la palabra plugin además de establecer reglas en el webpack.config.js debemos agregar configuración adicional al final de este archivo

    {
        test: /\.css$/,
        // Aquí indico que no aplique la regla a este archivo, ya que tiene la suya
        exclude: /style\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /style\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    },

Y agregamos más abajo de este archivo webpack.config.js

    new MiniCssExtractPlugin({
        // nombre que se le quiera dar al archivo, si quiero que el navegador no almacene en el cache hago lo siguiente en caso de producción
        // filename: '[name].[contentHash].css',
        filename: '[name].css',
        // Esto es para que no lance warnings
        ignoreOrder: false
    })

Y así al hacer el "npm run build" y correr el servidor de desarrollo "npm start" estaríamos viendo los cambios

* Pero sí además queremos que minifique el archivo, entonces:
    - cambiamos en el archivo webpack.config.js de "development" a production
    - Instalamos lo siguiente:

        npm i -D optimize-css-assets-webpack-plugin

        // OJO sino instala por la versión, entonces buscar en google el plugin y verificar como se instala para otros requerimientos, en este caso:

        npm i -D optimize-css-assets-webpack-plugin@4.0.0
    
    - Lo importamos al webpack.config.css

        const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

    - Agregamos una nueva propiedad llamada "optimization". Por defecto realizara lo que necesitamos

        optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin()]
        },

    - Ahora solo correr "npm run build" y "npm start"
    *Note*: Los comentarios se habilitan en mode "development"



## MANEJO DE IMÁGENES

Ademas de agregar el archivo img en el html. Puede que nos genere algún error con webpack, pero para esto hacemos lo siguiente:

**NOTE**: Es posible que ya no sea necesio este plugin

- instalamos:

    npm i -D file-loader

*Note*: Antes de la versión 6 funcionaba bien el file-loader con la configuración siguiente en webpack.config.js

    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    esModule: false
                }
            }
        ] 
    }

- Ahora debemos instalar un paquete adicional para lograr este cometido.

    npm i -D copy-webpack-plugin

- En el archivo webpack.config.js importamos el paquete

    npm i -D copy-webpack-plugin

  ** BP: Siempre verifiquemos la versión y la documentación oficial **

- Para esta versión agregue al archivo webpack.config.js

    new CopyWebpackPlugin({
        patterns: [
            { from: './src/assets', to: 'assets/'}
        ]
    })

- Ejecutamos "npm run build && npm start"

## WEBPACK PRODUCTION MODE

Diferenciar cuando estamos en desarrollo o en producción

Es buena practica tener un archivo de configuración especial para el modo de desarrollo y producción. En este caso crearemos el webpack.prod.js

**Pasos**:

- Crearnos un archivo duplicado con un nombre de preferencia, para este caso webpack.prod.js
- Cambiar "developmnent" a "production"
- Agregar output al webpack.prod.js:

    output: {
        filename: 'name.abc.js'  // nombre a preferencia
    },

- En el package.json en scripts - build agregar:

    antes:
        "build": "webpack",

    después
        "build": "webpack --config webpack.prod.js",

  // Ejecutamos el comando "npm run build"


**NOTA IMPORTANTE**: Sino queremos perder la configuración podemos crear otro comando para ejecutar el archivo de configuración de desarrollo, pre-producción(como lo llamemos) o producción. Podemos dejar el de producción como el estandar "npm run build"

- Vamos a package.js y en scripts - build(comando) justo abajo agregamos por ejemplo:

    "build:dev": "webpack --config webpack.config.js", // webpack.config.js es un ejemplo


**AGREGAR HASH AL ARCHIVO DE PRODUCCIÓN**
Esto es una gran ventaja dado que así es posible forzar al navegador a actualizar el archivo almancenado en cache del cliente.
Lo podemos hacer desde el webpack.custom.js así:

    output: {
        filename: 'name.[contenthash].js'
    },

Al ejecutar el "npm run build" se creará el archivo con hash

También podemos agregarle el hash al main css en el webpack.custom.js, así:

    filename: '[name].[contenthash].css',


## INSTALACIÓN Y CONFIGURACIÓN DE BABEL

Con Babel podemos hacer compatible nuestro codigo con programas que trabajen con versiones anteriores de javascript

- Instación:
  *Fuente*: https://babeljs.io/setup#installation


- Instalar Babel Preset Minify

*Fuente*: https://babeljs.io/docs/en/babel-preset-minify

- Hasta aquí podemos ver el codigo ofuscado, pero no minificado, para esto debemos realizar la siguiente instalación de babel-minify-webpack-plugin

*Fuente*: https://www.npmjs.com/package/babel-minify-webpack-plugin

*NOTE*: Sí nos genera error, verificar la información de la terminal o del log y mirar sí instalando otra versión los solucionamos

- Instalar el babel-preset-env

*Fuente*: https://babeljs.io/docs/en/babel-preset-env



**LIMPIANDO LA CARPETA DIST** 
clean up dist folder en la página oficial de webpack

    npm i -D clean-webpack-plugin




