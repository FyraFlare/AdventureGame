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
			$check = $conn->query ("SELECT * FROM users WHERE username='".$name."';");
			foreach($check as $row){
				$_SESSION['lvl'] = $row['level'];
				$_SESSION['exp'] = $row['exp'];
				$_SESSION['hp'] = $row['health'];
				$_SESSION['story'] = $row['story'];
			}
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

	function storeStats(){
		global $conn;
		foreach($check as $row){
			$_SESSION['lvl'] = $row['level'];
			$_SESSION['exp'] = $row['exp'];
			$_SESSION['hp'] = $row['health'];
			$_SESSION['story'] = $row['story'];
		}
		$com = "UPDATE users SET level='".$_SESSION['lvl']."', exp='".
			$_SESSION['exp']."'health='".$_SESSION['hp']."', story='".
			$_SESSION['story']."' WHERE username='".$name."';");
		$check = $conn->query ($com);
	}
?>