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
            require 'archivos/app.php'; //llamamos a los parametros para la conexion
            $procesos = new App();
        ?>
        <main>
            <form action="" method="post">
                
                <?php
                    if (isset($_POST["enviada"])) 
                    {
                        $procesos->verificarPartida($_POST);
                    }
                    else 
                    {
                        echo
                            '<div>
                                <label> PUNTUACION </label>
                                <input type="number" value="" name="puntos"/>
                            </div>';
                    }

                    if (!isset($_POST["enviada"])) 
                    {
                        echo '<input type="submit" value="enviar" name="enviada" />';
                    }
                    
                    if (isset($_POST["enviaPar"])) 
                    {
                        $procesos->guardarPartidas($_POST);
                    }
                    if (isset($_POST["actualizarPar"])) 
                    {
                        $procesos->actualizaRanking($_POST);
                    }
                ?>
                
            </form>
        </main>
    </body>
</html>
