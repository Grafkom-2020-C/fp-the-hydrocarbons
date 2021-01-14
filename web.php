<?php
    // Define your location project directory in htdocs (EX THE FULL PATH: D:\xampp\htdocs\x-kang\simple-routing-with-php)
    $project_location = "/FP_Production";
    $project_location = "/fp-the-hydrocarbons";
    $me = $project_location;

    // For get URL PATH
    $request = $_SERVER['REQUEST_URI'];
    $nama = array("metana","etana","propana","butana");
    $ix = rand(0,3);
    $vis = '/fp-the-hydrocarbons/visualize';
    $hydro_name = "-";
    if (strpos($request,$vis) !== false and $request != $vis) {
        $hydro_name = substr($request,strlen($vis));
    }
    // echo $hydro_name;

    if ($hydro_name != "-") {
        require "views/Visualize/".$hydro_name.".html";
    }

    switch ($request) {
        case $me.'/home' :
            // echo "yo";
            require "views/index.html";
            break;
        case $me.'/visualize' :
            require "views/Visualize/metana.html";
            break;
        case $me.'/trivia' :
            require "views/Trivia/metana.html";
            break;
        case $me.'/contact' :
            require "views/contact.php";
            break;
    }