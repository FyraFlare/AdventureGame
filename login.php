<?php
	//Name: Carly Cappagli
	//Discription: 
	require_once('model.php');# Now can call functions inside model.php
	$lorr = $_POST["submit"];
	if($lorr == "Login"){
		echo "trying to login";
		login($_POST["username"], $_POST["pass"]);
	}
	elseif($lorr == "Register"){
		echo "trying to register";
		register($_POST["username"], $_POST["pass"]);
	}
	else{
		echo "not working";
	}
?>