<?php
	//Name: Carly Cappagli
	//Discription: 
	require_once('model.php');# Now can call functions inside model.php
	if($submit == "Login"){
		login($_POST["username"], $_POST["pass"]);
	}
	elseif($submit == "Register"){
		register($_POST["username"], $_POST["pass"]);
	}
?>