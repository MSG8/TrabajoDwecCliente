<?php
    /**
     * Controlador de la aplicacion, se encarga de dirigir los procesos
     */
    class App
    {
        public $modelo; //Declaro clase modelo
        public $vista; //Declaro clase vista
        public $operaciones; //Declaro clase operaciones, encargada de las operaciones con la base de datos
        function __construct()
        {
            $this->modelo = new Modelo();
            $this->vista = new Vista();
            require 'operacionesBd.php'; //llamamos a los parametros para la conexion
            $this->operaciones = new Operaciones();
        }
        public function verificarPartida()
        {
            if ($this->operaciones->countPartidas() < 10) 
            {
                $this->vista->nick();
            }
            else 
            {
                $this->vista->bajaPuntuacion();
            }
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
        public function nick()
        {
            echo'
                <div>
                    <label> NICK </label>
                    <input type="text" value="" name="nick" />
                </div>';
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