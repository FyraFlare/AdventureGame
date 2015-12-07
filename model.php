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
		$stmt -> prepare("SELECT * FROM users WHERE username='".$name."';");
		$check = $stmt ->execute();
		$count = 0;
		foreach($check as $row){
			$count++;
		}
		if($count < 1){
			$com = "INSERT INTO users VALUES ('".$name."', 1, 0, 100, 0, '".$hash."');";
			$stmt -> prepare($com);
			$check = $stmt ->execute();
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
		$stmt -> prepare("SELECT * FROM users WHERE username='".$name."';");
		$check = $stmt ->execute();
		foreach($check as $row){
			$psw = $row['password'];
		}
		if(password_verify($pass, $psw)){
			session_start();
			$_SESSION['user'] = $name;
			$stmt -> prepare("SELECT * FROM users WHERE username='".$name."';");
			$check = $stmt ->execute();
			foreach($check as $row){
				$_SESSION['lvl'] = $row['level'];
				$_SESSION['exp'] = $row['exp'];
				$_SESSION['hp'] = $row['health'];
				$_SESSION['story'] = $row['story'];
			}
			header("Location: main.html");
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
		$com = "UPDATE users SET level='".$_SESSION['lvl']."', exp='".
			$_SESSION['exp']."'health='".$_SESSION['hp']."', story='".
			$_SESSION['story']."' WHERE username='".$name."';";
		$stmt -> prepare($com);
		$check = $stmt ->execute();
	}

	function getMonster($loc){
		$stmt -> prepare("SELECT * FROM monsters WHERE location='".$loc."';");
		$check = $stmt ->execute();
		$array = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$cont = count($array);
		print_r($array);
		//$chosen = rand(0, $count-1);
		//$check = $conn->query ("SELECT * FROM monsters WHERE location='".$loc."';");
		//$counter = 0;
		//foreach($check as $row){
		//	if($counter == $chosen){
		//		return $row['name'];
		//	}
		//	$counter++;
		//}
	}

	function getAtackText($mons, $strength){
		$stmt -> prepare("SELECT ".$strength." FROM monsters WHERE name='".$mons."';");
		$check = $stmt ->execute();
		foreach($check as $row){
			$atk = $row[$strength];
		}
		$stmt -> prepare("SELECT text FROM atacks WHERE atack='".$atk."';");
		$check = $stmt ->execute();
		foreach($check as $row){
			return $row['text'];
		}
	}
?>