/**
 * Clase principal de la aplicacion
 * archivo: app.js
 * Licencia: GPL3
 * Esta clase es el controlador de nuestra aplicacion
 * Autores: Manuel Solís Gómez(masogo008@gmail.com), Daniel Nuñez Santiago, Genaro Salas Galindo y Julio Ramos Gago
 */
class App
{
    /**
     * Llamamos a iniciar e inicamos las clases y atributos necesarios
     */
    constructor()
    {
        this.vista = new Vista(this); // Clase referente a todo el apartado visual de la aplicacion
        this.modelo = new Modelo(); // Clase referente a todos los datos de la aplicacion
        this.animador = null;
        window.onload= this.iniciar.bind(this); //Tomamos el objeto este y busca el metodo iniciar
    }
    iniciar()
    {
        this.vista.puntuacion(this.modelo.puntuacion);
        this.vista.generarBolas(this.modelo.cantidadBolas); //Llamamos a generar las bolas, podriamos llamarlo si clica algun boton
        this.animador = window.setInterval(this.vista.moverBolas.bind(this.vista), 200); // nuestra animador llamara cada cierto intervalo de tiempo a la funcion de movimiento, el animador pertenece al controlador y verlas moviendose a la vista
    }
    verificar(evento)
    {
        let bola = evento.target //tomamos el elemento bola buscado
        let textoBola = bola.childNodes[0].nodeValue; //Saca el nodo de texto de la bola, es decir el numero a coparar si el multiplo
        let multiplo = document.getElementById('numeroAside'); //tomamos el elemento numeroAside que tiene el multiplo
        let textMultiplo = multiplo.childNodes[0].nodeValue; //Saca el nodo de texto de multiplo

        if (textoBola % textMultiplo == 0)
        {
            this.vista.cambiarClase(bola,'bolaAcertada');
            this.vista.puntuar(+1);
        }
        else
        {
            this.vista.cambiarClase(bola,'bolaError');
            this.vista.puntuar(-1);
        }
    }
}
/**
 * Clase destinada a la parte visual del programa, el se encargara de mostrar o crear elementos
 */
class Vista
{
    constructor(controlador)
    {
        this.controlador = controlador;
        this.elementoPuntuacion = document.getElementById('puntuacion').children[1];
        document.getElementById('numeroAside').appendChild(document.createTextNode((Math.floor(Math.random() * (10 - 2)) + 2))); //
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
            let bola = new Bola(this.contenedor,this.controlador) //creamos el objeto
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
            let bola = this.bolas[indice]; //tomamos cada objeto bola que contenrra su estructura y velocidad
            let top = parseFloat(bola.div.style.top.substr(0,(bola.div.style.top.length-2))); // tomamos el top del elemento, ademas de quitarle de su cadena px y pasarlo a numero
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
            this.bolas[indice].div.style.top = (top+this.bolas[indice].velocidady) +'px'; // bolatop = 240 + 13 + 'px'   bolatop = '253px'
            this.bolas[indice].div.style.left = (left+this.bolas[indice].velocidadx) +'px';
        }
    }
    cambiarClase(elemento,nombreClase)
    {
        elemento.classList.remove('quitar_esta_clase');
        elemento.classList.add(nombreClase);
    }
    puntuar(punto)
    {
      this.elementoPuntuacion.textContent = `${parseInt(this.elementoPuntuacion.textContent)+punto}`;
        this.controlador.modelo.puntuacion = parseInt(this.elementoPuntuacion.textContent);
    }
    puntuacion(punto)
    {
        this.elementoPuntuacion.appendChild(document.createTextNode(punto));

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
        this.cantidadBolas = 6;
        this.puntuacion = 0;
    }
}
class Bola
{
    constructor(contenedor,controlador)
    {
        this.controlador=controlador;
        this.velocidadx =  Math.floor (Math.random () * 51) -25;
        this.velocidady =  Math.floor (Math.random () * 51) -25;
        this.div = document.createElement('div');
        this.div.appendChild(document.createTextNode((Math.floor(Math.random() * (App.limiteNumero - 2)) + 2)));
        this.cambiarClase('bola');
        //Cada vez que se cree una bola se generara en el centro
        this.div.style.top = (contenedor.clientHeight/2) + 'px'; //Colocamos las medidas por defecto de los div en top
        this.div.style.left = (contenedor.clientWidth/2) + 'px';//Colocamos las medidas por defecto de los div en left
        this.div.onclick = this.controlador.verificar.bind(this.controlador); // this.pulsar.bind(this)
    }

    cambiarClase(nombreClase)
    {
        this.div.classList.add(nombreClase);
    }
}
App.limiteNumero = 50; //atributo estatico
let controlador = new App();
