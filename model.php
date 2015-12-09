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
		$stmt = $conn -> prepare("SELECT * FROM users WHERE username='".$name."';");
		$stmt ->execute();
		$result = $stmt->fetchAll();
		$count = 0;
		foreach($check as $row){
			$count++;
		}
		if($count < 1){
			$com = "INSERT INTO users VALUES ('".$name."', 1, 0, 100, 0, '".$hash."');";
			$stmt -> prepare($com);
			$check = $stmt ->execute();
			echo 'good';
		}
		else{
			echo 'Username taken';
		}
	}

	function login($name, $pass){
		global $conn;
		$name = htmlspecialchars($name);
		$pass = htmlspecialchars($pass);
		$stmt = $conn -> prepare("SELECT password FROM users WHERE username='".$name."';");
		$stmt ->execute();
		$result = $stmt->fetchAll();
		if(count($result) == 1){
			foreach($result as $row){
				$psw = $row['password'];
			}
			if(password_verify($pass, $psw)){
				session_start();
				$_SESSION['user'] = $name;
				$stmt = $conn -> prepare("SELECT * FROM users WHERE username='".$name."';");
				$check = $stmt ->execute();
				$result = $stmt->fetchAll();
				foreach($result as $row){
					$_SESSION['lvl'] = $row['level'];
					$_SESSION['exp'] = $row['exp'];
					$_SESSION['hp'] = $row['health'];
					$_SESSION['story'] = $row['story'];
				}
				echo 'good';
			}
			else{
				echo 'Invalid username or password';
			}
		}
		else{
			echo 'Invalid username or password';
		}
	}

	function logout(){
		unset($_SESSION['user']);
		unset($_SESSION['lvl']);
		unset($_SESSION['exp']);
		unset($_SESSION['hp']);
		unset($_SESSION['story']);
		setcookie('PHPSESSID', null, -1, '/');
	}

	function storeStats(){
		global $conn;
		$com = "UPDATE users SET level='".$_SESSION['lvl']."', exp='".
			$_SESSION['exp']."'health='".$_SESSION['hp']."', story='".
			$_SESSION['story']."' WHERE username='".$name."';";
		$stmt -> prepare($com);
		$stmt ->execute();
	}

	function getMonster($loc){
		$stmt = $conn -> prepare("SELECT * FROM monsters WHERE location='".$loc."';");
		$stmt ->execute();
		$result = $stmt->fetchAll();
		$c = count($result);
		$chosen = rand(0, $c-1);
		$counter = 0;
		foreach($result as $row){
			if($counter == $chosen){
				return $row['name'];
			}
			$counter++;
		}
	}

	function getAtackText($mons, $strength){
		$stmt = $conn -> prepare("SELECT * FROM monsters WHERE name='".$mons."';");
		$stmt ->execute();
		$result = $stmt->fetchAll();
		foreach($result as $row){
			$atk = $row[$strength];
		}
		$stmt = $conn -> prepare("SELECT * FROM atacks WHERE atack='".$atk."';");
		$stmt ->execute();
		$result = $stmt->fetchAll();
		foreach($result as $row){
			return $row['text'];
		}
	}
?>