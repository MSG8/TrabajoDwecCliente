/**
 * Clase principal de la aplicacion
 * archivo: app.js
 * Licencia: GPL3
 * Esta clase es el controlador de nuestra aplicacion
 * Autores: Manuel Solís Gómez(masogo008@gmail.com), Daniel Nuñez, Genaro Salas y Julio
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
        this.animador = window.setInterval(this.vista.moverBolas.bind(this.vista), 50); // nuestra animador llamara cada cierto intervalo de tiempo a la funcion de movimiento, el animador pertenece al controlador y verlas moviendose a la vista
    }
}
/**
 * Clase destinada a la parte visual del programa, el se encargara de mostrar o crear elementos
 */
class Vista
{
    constructor()
    {
        this.contenedor = document.getElementById('ventanaJuego');
        this.bolas = []; //array que contenga todas las bolas
    }
    /**
     * Crearemos la cantidad de bolas que queremos
     */
    generarBolas(cantidadBolas)
    {
        for (let indice = 0; indice < cantidadBolas; indice++) //creamo tanto objeto Bola como nos diga el modelo
        {
            let bola = new Bola(this.contenedor) //creamos el objeto
            this.bolas.push(bola) //añadimos al array de bolas cada objeto bola
            this.contenedor.appendChild(bola.div); //le añadimos la bola al contenedor
        }
    }
    /**
     * Moveremos la bola cada intervalo pedido por el controlador
     */
    moverBolas()
    {
        for (let indice = 0; indice < this.bolas.length; indice++) 
        { 
            let anchoBola = 60;
            let bola = this.bolas[indice]; //tomamos cada objeto bola que contenrra su estructura y velocidad
            let top = parseFloat(bola.div.style.top.substr(0,(bola.div.style.top.length-2))); //tomamos el top del elemento, ademas de quitarle de su cadena px y pasarlo a numero
            let left = parseFloat(bola.div.style.left.substr(0,(bola.div.style.left.length-2))); //tomamos el left del elemento, ademas de quitarle de su cadena px y pasarlo a numero
            //Si llega a los bordes se aplica algunos de estos if
            if (top <= 0 || top >= this.contenedor.clientHeight -bola.div.clientHeight ) //le restamos el tamaño de la bola para que coincida con el tamaño del contenedor
            {
                this.bolas[indice].velocidady = -this.bolas[indice].velocidady //modificamos el signo de la velocidad si tocan los bordes
            }
            if (left <= 0 || left >= this.contenedor.clientWidth -bola.div.clientWidth ) //le restamos el tamaño de la bola para que coincida con el tamaño del contenedor
            {
                this.bolas[indice].velocidadx = -this.bolas[indice].velocidadx //modificamos el signo de la velocidad si tocan los bordes
            }
            //una vez cambiamos los signos de velocidas le aplicamos la velocidad, tenemos que cambiar directamente los valores del objeto bola
            this.bolas[indice].div.style.top = (top+this.bolas[indice].velocidady) +'px';
            this.bolas[indice].div.style.left = (left+this.bolas[indice].velocidadx) +'px';
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
    constructor(contenedor)
    {
        this.velocidadx =  Math.floor (Math.random () * 51) -25;
        this.velocidady =  Math.floor (Math.random () * 51) -25;
        this.div = document.createElement('div');
        this.div.appendChild(document.createTextNode(1));
        this.cambiarClase('bola');
        //Cada vez que se cree una bola se generara en el centro
        this.div.style.top = (contenedor.clientHeight/2) + 'px'; //Colocamos las medidas por defecto de los div en top
        this.div.style.left = (contenedor.clientWidth/2) + 'px';//Colocamos las medidas por defecto de los div en left
    }

    cambiarClase(nombreClase)
    {
        this.div.classList.add(nombreClase);
    }
}
let controlador = new App();