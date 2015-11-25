<?php
	//Name: Carly Cappagli
	//Discription: interacts with database
	$db = 'mysql:dbname=adventure;host=127.0.0.1';
	$user = 'root';
	$password = '';

	try {
		$conn = new PDO ( $db, $user, $password );
	}catch ( PDOException $e ) {
		echo $e->getMessage ();
	}

	function register($name, $pass){
		global $conn;
		$name = htmlspecialchars($name);
		$pass = htmlspecialchars($pass);
		$hash = password_hash($pass, PASSWORD_DEFAULT);
		$check = $conn->query ("SELECT * FROM users WHERE username='".$name."';");
		$count = 0;
		foreach($check as $row){
			$count++;
		}
		if($count < 1){
			$com = "INSERT INTO users VALUES ('".$name."', 1, 0, 100, 0, '".$hash."');";
			$conn->query($com);
			header("Location: login.html");
		}
		else{
			header("Location: register.html");
		}
	}

	function login($name, $pass){
		global $conn;
		$name = htmlspecialchars($name);
		$pass = htmlspecialchars($pass);
		$hash = password_hash($pass, PASSWORD_DEFAULT);
		$check = $conn->query ("SELECT * FROM users WHERE username='".$name."';");
		foreach($check as $row){
			$psw = $row['password'];
		}
		if(password_verify($pass, $psw){
			session_start()
			$_SESSION['user'] = $name;
			//go to main
		}
		else{
			header("Location: login.html");
		}
	}

	function logout(){
		unset($_SESSION['user']);
		setcookie('PHPSESSID', null, -1, '/');
	}
?>