/**
 * Clase principal de la aplicacion
 * archivo: app.js
 * Licencia: GPL3
 * Esta clase es el controlador de nuestra aplicacion
 */
class App
{
    /**
     * Llamamos a iniciar e inicamos las clases y atributos necesarios
     */
    constructor()
    {
        this.vista = new Vista(); // Clase referente a todo el apartado visual de la aplicacion
        this.modelo = new Modelo(); // Clase referente a todos los datos de la aplicacion
        this.animador = null;
        window.onload= this.iniciar.bind(this); //Tomamos el objeto este y busca el metodo iniciar
    }
    iniciar()
    {
        this.vista.generarBolas(this.modelo.cantidadBolas); //Llamamos a generar las bolas, podriamos llamarlo si clica algun boton
        this.animador = window.setInterval(this.vista.moverBolas.bind(this.vista), 200); // nuestra animador llamara cada cierto intervalo de tiempo a la funcion de movimiento, el animador pertenece al controlador y verlas moviendose a la vista
    }

}
/**
 * Clase destinada a la parte visual del programa, el se encargara de mostrar o crear elementos
 */
class Vista
{
    constructor()
    {
        this.contenedor = document.getElementsByTagName('main')[0];
        this.bolas = []; //array que contenga todas las bolas
    }
    /**
     * Crearemos la cantidad de bolas que queremos
     */
    generarBolas(cantidadBolas)
    {
        for (let indice = 0; indice < cantidadBolas; indice++) //creamo tanto objeto Bola como nos diga el modelo
        {
            let bola = new Bola() //creamos el objeto
            this.bolas.push(bola) //añadimos al array de bolas cada objeto bola
            this.contenedor.appendChild(bola.div); //le añadimos la bola al contenedor
        }
    }
    /**
     * Moveremos la bola cada intervalo pedido por el controlador
     */
    moverBolas()
    {
        for (let indice = 0; indice < bolas.length; indice++) 
        {
            let bola = this.bolas[indice]; //tomamos cada objeto bola que contenrra su estructura y velocidad
            let elemento = bola.div; //tomamos el elemento
            let top = elemento.style.top; //tomamos el top del elemento
            let left = elemento.style.left; //tomamos el left del elemento
            if (top >= 275 || top >= -275 ) //vamos a colocar un limite de bordes, de -300 a 300 de alto y de -200 a 200 de ancho segun donde sale las bolas
            {
                this.bolas[indice].velocidady = -this.bolas[indice].velocidady //modificamos el signo de la velocidad si tocan los bordes
            }
            if (left >= 175 || left >= -175 ) //vamos a colocar un limite de bordes, de -300 a 300 de alto y de -200 a 200 de ancho segun donde sale las bolas
            {
                this.bolas[indice].velocidadx = -this.bolas[indice].velocidadx //modificamos el signo de la velocidad si tocan los bordes
            }
            //una vez cambiamos los signos de velocidas le aplicamos la velocidad
            this.bolas[indice].div.style.top = this.bolas[indice].div.style.top+this.bolas[indice].velocidady;
            this.bolas[indice].div.style.left = this.bolas[indice].div.style.left+this.bolas[indice].velocidadx;
        }
    }
}
/**
 * Clase destinada a guardar los datos de la aplicacion
 */
class Modelo
{
    /**
     * Inicializamos los atributos que contendran los datos del programa
     */
    constructor()
    {
        this.cantidadBolas = 4;
    }
}
class Bola
{
    constructor()
    {
        this.velocidadx =  Math.floor (Math.random () * 51) -25;
        this.velocidady =  Math.floor (Math.random () * 51) -25;
        this.div = document.createElement('div');
        cambiarClase('bola');
    }
    cambiarClase(nombreClase)
    {
        this.div.classList.add(nombreClase);
    }
}
let controlador = new App();