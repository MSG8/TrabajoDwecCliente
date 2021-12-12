
 import {Vista} from './vista.js';
 import {Bola} from './bola.js';
 import {App} from './controlador.js';

/**
 * Clase destinada a guardar los datos de la aplicacion
 */
class Modelo
{
    /**
     * Inicializamos los atributos que contendran los datos del programa (cantidad de bolas, la vida y el nivel)
     */
    constructor()
    {
        this.cantidadBolas = 8;
        this.vida = 100;
        this.nivel = 1;
    }
}
