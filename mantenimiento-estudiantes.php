<?php 
    $arraySecciones = ['alta', 'consulta', 'mantenimiento'];
    $seccion = 'consulta_estudiantes.html';
    if ($opcion = array_keys($_GET) AND in_array($opcion[0], $arraySecciones)) {
        $seccion = $opcion[0].'_estudiantes.html';
    } 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manteniment Estudiants</title>
    <link href="css/normalize.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>

<body id="mantenimiento-estudiantes">
    <header>

    </header>

    <main>
        <section>
            <div class="section-header">
                <h2>Consulta / Manteniment Estudiants</h2>
            </div>
            <div class="nav">
                <a class="nav-item" href="?consulta">Consulta</a>
                <a class="nav-item" href="?alta">Alta</a>
                <a class="nav-item inactive-link" href="?mantenimiento">Manteniment</a>
            </div>
            <div class="section-body">
                <div class="component-container">
                    <?php readfile("components/$seccion"); ?>
                </div>
            </div>
            <div class="section-footer back">
                <a href="/">Enrere</a>
            </div>
        </section>
    </main>
    <script type="module" src="js/mantenimiento-estudiantes.js"></script>
</body>

</html>