<?php
    /**
     * Controlador de la aplicacion, se encarga de dirigir los procesos
     */
    class App
    {
        public $operaciones; //Declaro clase operaciones, encargada de las operaciones con la base de datos
        function __construct()
        {
            require 'operacionesBd.php'; //llamamos a los parametros para la conexion
            $this->operaciones = new Operaciones();
        }
        public function verificarPartida($formulario)
        {
            if ($this->operaciones->countPartidas()->fetch_assoc()['numPartidas'] < 10) 
            {
                $this->vista->nick($formulario);
                $this->vista->enviarPar();
            }
            else 
            {
                if ($formulario['puntos'] >= $this->operaciones->puntosMenor()->fetch_assoc()['puntos']) //si aunque este el ranking completo los puntos son mayor a la puntuacion minima del ranking
                {
                    $this->vista->nick($formulario);
                    $this->vista->actualizarPar();
                }
                else 
                {
                    $this->vista->bajaPuntuacion();
                }
                
            }
        }
        public function guardarPartidas($formulario)
        {
            $this->operaciones->partida($formulario);
        }
        public function actualizaRanking($formulario)
        {
            $this->operaciones->actualizarPartida($formulario);
        }

    }
    /**
     * Clase destinada a visualizar nuestra aplicacion
     */
    class Vista
    {
        /**
         * Visualiza el campo del nick si la puntuacion es mayor al minimo de las existentes
         */
        public function nick($formulario)
        {
            echo'
                <div>
                    <label> PUNTUACION </label>
                    <input type="number" value="'.$formulario['puntos'].'" name="puntos"/>
                </div>
                <div>
                    <label> NICK </label>
                    <input type="text" value="" name="nick" />
                </div>'; 
        }
        /**
         * Visualiza el input submit para agregar la partida
         */
        public function enviarPar()
        {
            echo'
                <input type="submit" value="Enviar Partida" name="enviaPar" />'; //crearemos otro input submit para agregar al usuario
        }
        /**
         * Visualiza el input submit para actualizar el partida
         */
        public function actualizarPar()
        {
            echo'
                <input type="submit" value="Enviar Partida up" name="actualizarPar" />'; //crearemos otro input submit para agregar al usuario
        }
        /**
         * Visualiza que no saco una puntuacion mayor a la del ranking
         */
        public function bajaPuntuacion()
        {
            echo'
                <div>
                    <p>
                        SU PUNTUACION ES INFERIOR A LA DEL RANKING, MEJORA
                    </p>
                    <a href="index.php">  INTENTAR DE NUEVO </a>
                </div>';
        }
    }
    /**
     * Clase destinada a guardar la informacion de nuestra aplicacion
     * $puntuacion es la puntuacion de la partida
     * $nick es el nombre del jugador
     */
    class Modelo
    {
        public $puntuacion; 
        public $nick;
        function __construct()
        {
            $this->puntuacion = 0;
            $this->nick = '';
        }
    }
?>