<?php
    /**
     * Clase encargado de controlar si se muestra el campo a guardar el nick o no
     */
    class Control
    {
        public $operaciones; //Declaro clase operaciones, encargada de las operaciones con la base de datos
        /**
         * Constructor encargado de llamar a las operaciones para la base de datos
         */
        function __construct()
        {
            require 'operacionesBd.php'; //llamamos a los parametros para la conexion
            $this->operaciones = new Operaciones();
        }
        /**
         * Metodo enccargado de comprobar si mostrar el nick o no
         */
        public function comprobar()
        {
            if ($this->operaciones->countPartidas()->fetch_assoc()['numPartidas'] < 10) 
            {
                echo 'añadir nick';
            }
            else 
            {
                if ($_COOKIE['puntuacion'] >= $this->operaciones->puntosMenor()->fetch_assoc()['puntos']) //si aunque este el ranking completo los puntos son mayor a la puntuacion minima del ranking
                {
                    echo 'enviar actualizacion';
                }
                else 
                {
                    echo 'no enviar nick';
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
?>