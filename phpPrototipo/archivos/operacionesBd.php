<?php
  /**
   * Esta clase se usara para emplear los metodos necesarios en un crud: buscamos, eleminamos, modificamos, añadimos y vemos una lista
   */
  class Operaciones
  {
    public $conexion;
    public $resultado;

    function __construct()
    {
      require 'config.php'; //llamamos a los parametros para la conexion
      $this->conexion = new mysqli(SERVIDOR, USUARIO, CONTRASENIA, BASEDATOS);
    }

    public function hacerConsulta($consulta) //metodo usado por si se modifica el objeto que trabaja con bases de datos
    {
      return $this->conexion->query($consulta);
    }

    public function countPartidas() //Consulta encargada de contar las partidas
    {
      $consulta = "SELECT COUNT(*) AS numPartidas FROM partida WHERE idMinijuego = 1 ;"; //Colocamos la instruccion para traer los datos de nombre, correo y id(solo funcional) de todos los empleados
      $this->resultado= $this->hacerConsulta($consulta); //Enviamos la consulta al metodo query del objeto conexion (mysqli) y devolvera el array con la fila pedida
      return $this->resultado;
    }

    public function partida($formulario) //Consulta encargada de guardar una partida
    {
      $consulta = "INSERT INTO Partida (idMinijuego, nick, puntuacion) VALUES (1, '".$formulario['nick']."',".$formulario['puntos'].");"; //Colocamos la instruccion para traer los datos de nombre, correo y id(solo funcional) de todos los empleados
      $this->resultado= $this->hacerConsulta($consulta); //Enviamos la consulta al metodo query del objeto conexion (mysqli) y devolvera el array con la fila pedida
      return $this->resultado;
    }

    public function puntosMenor() //Consulta encargada de ver la puntuacion minima del ranking
    {
      $consulta = "SELECT MIN(puntuacion) as puntos FROM partida WHERE idMinijuego = 1 ;"; //Colocamos la instruccion para traer los datos de nombre, correo y id(solo funcional) de todos los empleados
      $this->resultado= $this->hacerConsulta($consulta); //Enviamos la consulta al metodo query del objeto conexion (mysqli) y devolvera el array con la fila pedida
      return $this->resultado;
    }

    public function actualizarPartida($formulario) //Consulta encargada de guardar una partida
    {
      $consulta = "UPDATE partida SET nick='".$formulario['nick']."', puntuacion=".$formulario['puntos'].", fechaHora=NOW() WHERE idPartida = (SELECT idPartida FROM partida WHERE idMinijuego = 1 AND puntuacion = (SELECT MIN(puntuacion) FROM partida WHERE idMinijuego = 1) LIMIT 1);"; //Colocamos la instruccion para traer los datos de nombre, correo y id(solo funcional) de todos los empleados
      $this->resultado= $this->hacerConsulta($consulta); //Enviamos la consulta al metodo query del objeto conexion (mysqli) y devolvera el array con la fila pedida
      return $this->resultado;
    }

    public function idMenor() //Consulta encargada de sacar el id de la puntuacion menor
    {
      $consulta = "SELECT idPartida FROM partida WHERE idMinijuego = 1 AND puntuacion = (SELECT MIN(puntuacion) FROM partida WHERE idMinijuego = 1) LIMIT 1;"; //Colocamos la instruccion para traer los datos de nombre, correo y id(solo funcional) de todos los empleados
      $this->resultado= $this->hacerConsulta($consulta); //Enviamos la consulta al metodo query del objeto conexion (mysqli) y devolvera el array con la fila pedida
      return $this->resultado;
    }

    public function vaciar($valor) //Metodo para colocar si algun cambio esta vacio, como null
    {
      if (empty($valor)) 
      {
        return 'null'; // envio una concatenacion poruqe si no no lo entiende php
      }
      else
      {
        return "'".$valor."'";//si el valor es diferente a vacio pues introduce el valor que metimos por formulario
      }
    }
    
    public function informacionError() //La llamamos para ver una descripcion del error de la consulta
    {
      return $this->conexion->error;
    }

    public function numeroError() //La llamamos para ver el numero de error correspondiente por la consulta
    {
      return $this->conexion->errno;
    }

    public function filasResultado() //La llamamos para ver el numero de filas del resultado
    {
      return $this->resultado->num_rows;
    }

    public function cerrar() //La llamamos para cerrar la conexion con la  base de datos
    {
      $this->conexion->close();
    }
  }

?>
