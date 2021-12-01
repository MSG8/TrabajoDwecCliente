<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/stylesheet.css">
        <title>Crazy Balls</title>
    </head>
    <body>
        <?php
            require 'php/app.php'; //llamamos a los parametros para la conexion
            $controlador = new App();
        ?>
        <audio autoplay loop>
            <source src="sound/fondo.mp3" type="audio/ogg">
        </audio>
        <header>
            <div class="cajaLateral"><img src="img/logo.png" alt="Fundación Loyola" id="logo"></div>
            <div id="titulo"><span>CRAZY BALLS</span></div>
            <div class="cajaLateral" id="puntuacion"><span>VIDA: </span><span></span></div>
        </header>
        <main>
            <select name="niveles" id="niveles">
                <option value="1" selected="selected" hidden="hidden" > ELIGE SU NIVEL </option>
                <option value="1"> NIVEL 1</option>
                <option value="2"> NIVEL 2</option>
                <option value="3"> NIVEL 3</option>
                <option value="4"> NIVEL 4</option>
                <option value="5"> NIVEL 5</option>
            </select>
            <div id="numeroAside"></div>
            <div id="ventanaJuego">
                <button id="juego"> JUGAR </button>
            </div>
            <button id="acabarJuego" name="acabar">ACABAR JUEGO</button>
        </main>
        <script src="js/app.js" type="module"></script>
    </body>
</html>
