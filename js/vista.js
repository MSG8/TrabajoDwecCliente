import {Bola} from './bola.js';
/**
 * Clase destinada a la parte visual del programa, el se encargara de mostrar o crear elementos
 */
export class Vista 
{
    /**
     * Metodo encargada de iniciar los atributos de la vista. Coloca la vida del juego y inicia el array de las bolas.
     * @param {class} controlador clase controlador, conecta la vista al controlador 
     */
    constructor(controlador)
    {
        this.controlador = controlador;
        this.elementoPuntuacion = document.getElementById('puntuacion').children[1];
        document.getElementById('numeroAside').appendChild(document.createTextNode((Math.floor(Math.random() * (10 - 2)) + 2))); //
        this.contenedor = document.getElementById('ventanaJuego');

        this.bolas = []; //array que contenga todas las bolas
    }
    /**
     * Metodo encargada de generar la cantidad de bolas y meterlas dentro de un array
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
     * Metodo encargada de generar un boton con el nodo dado y colocando un id dado
     * @param {string} nodo texto del boton
     * @param {string} id id del boton
     * @returns boton creado
     */
     generarBoton(nodo,id)
     {
        let boton = document.createElement('button');
        boton.appendChild(document.createTextNode(nodo));
        boton.id = id;
        document.getElementsByTagName('main')[0].appendChild(boton);

        return boton;
     }
    /**
     * Metodo encargada de mover la bola segun la velocidad de la misma
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
    /**
     * Metodo encargado de cambiar la clase a un elemento dado
     * @param {elemento HTML} elemento elemento a cambiar clase
     * @param {string} nombreClase nombre de la clase 
     */
    cambiarClase(elemento,nombreClase)
    {
        elemento.classList.remove('bola');
        elemento.classList.add(nombreClase);
    }
    /**
     * Metodo encargado a mostrar la vida del juego
     * @param {int} punto puntos de vida
     */
    puntuarVida(punto)
    {
        this.elementoPuntuacion.textContent = `${parseInt(this.elementoPuntuacion.textContent)+punto}`;
        this.controlador.modelo.vida = parseInt(this.elementoPuntuacion.textContent);
    }
    /**
     * Metodo encargado de crear en nodo de texto con los puntos de vida
     * @param {int} punto puntos de vida 
     */
    vida(punto)
    {
        this.elementoPuntuacion.appendChild(document.createTextNode(punto));
    }
    /**
     * Metodo encargado de explotar la bola
     * @param {div} bolaTarget div de la bola seleccionada
     */
    destruirBola(bolaTarget) 
    {
        let bola = bolaTarget // recibe la bola seleccionada
        let left = bola.style.left; //toma la posicion de la bola
        let top = bola.style.top 
        let ancho = bola.clientWidth; //toma el tamaño de la bola 
        let alto = bola.clientHeight; 
        bola.remove();

        let img = document.createElement('img'); //Crea la imagen aplicando la posicion que tenia la bola y el tamaño
        img.src = 'img/explosion1.gif';
        img.style.top=top;
        img.style.left=left;
        img.style.width = ancho*1.5 +'px'; //Le aplicamos un 1.5 del tamaño de la bola para que sea mas visual
        img.style.height = alto*1.5 +'px';
        this.contenedor.appendChild(img);

        const sonExplo = new Audio('sound/explosion.wav'); //Audio declarado
        sonExplo.play(); //Play audio
        
        setTimeout(()=>{img.remove()}, 750) //elimina la animación cuando completa un ciclo
    }
    /**
     * Metodo que muestra al usuario que gano
     */
    ganador()
    {
        this.contenedor.id='ganar'; //Cambiamos su id para cambiar su estilo a cuando gana, tambien cambiara el this.contenedor
        let mensaje = document.createElement('h2'); //Creamos el elemento del resultado
        mensaje.appendChild(document.createTextNode('GANASTE'));//Añade un text nodo del resultado
        mensaje.style.fontSize = this.contenedor.clientHeight/8 + 'px';
        this.contenedor.appendChild(mensaje);//Añade el mensaje al contenedor
        mensaje.style.top = (this.contenedor.clientHeight/2)-(mensaje.clientHeight/2) + 'px'; //Colocamos las medidas por defecto de los div en top, le restamos la mitad de su tamaño
        mensaje.style.left = (this.contenedor.clientWidth/2)-(mensaje.clientWidth/2)  + 'px';//Colocamos las medidas por defecto de los div en left, le restamos la mitad de su tamaño
    
        const sonGanar = new Audio('sound/victoria.wav'); //Audio declarado
        sonGanar.play(); //Play audio
    }
    /**
     * Metodo que muestra al usuario que perdio
     */
    perdedor()
    {
        this.contenedor.id='perder'; //Cambiamos su id para cambiar su estilo a cuando pierde, tambien cambiara el this.contenedor
        let mensaje = document.createElement('h2'); //Creamos el elemento del resultado
        mensaje.appendChild(document.createTextNode('PERDISTE'));//Añade un text nodo del resultado
        mensaje.style.fontSize = this.contenedor.clientHeight/8 + 'px';
        this.contenedor.appendChild(mensaje);//Añade el mensaje al contenedor
        mensaje.style.top = (this.contenedor.clientHeight/2)-(mensaje.clientHeight/2) + 'px'; //Colocamos las medidas por defecto de los div en top, le restamos la mitad de su tamaño
        mensaje.style.left = (this.contenedor.clientWidth/2)-(mensaje.clientWidth/2)  + 'px';//Colocamos las medidas por defecto de los div en left, le restamos la mitad de su tamaño
    
        const sonPerder = new Audio('sound/derrota.wav'); //Audio declarado
        sonPerder.play(); //Play audio
    }
}