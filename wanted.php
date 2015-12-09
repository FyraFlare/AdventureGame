<?php
	//Name: Carly Cappagli
	//Discription: 
	require_once('model.php');# Now can call functions inside model.php
	$want = $_POST["want"];
	if($want == "monster"){
		echo getMonster($_POST["place"]);
	}
	elseif($want == "atack"){
		if($_POST["str"] == 1){
			$str = 'weak';
		}
		else{
			$str = 'strong';
		}
		echo getAtackText($_POST["mons"], $str);
	}
	elseif($want == "stat"){
		session_start();
		echo $_SESSION[$_POST['stat']];
	}
	elseif($want == "session"){
		session_start();
		if($_SESSION['user'] != null){
			echo 'good';
		}
		else{
			echo 'bad';
		}
	}
	elseif($want == "save"){
		session_start();
		$_SESSION['lvl'] = $_POST["level"];
		$_SESSION['exp'] = $_POST["xp"];
		$_SESSION['hp'] = $_POST["health"];
		$_SESSION['story'] = $_POST["sty"];
		storeStats();
	}
	elseif($want == "logout"){
		logout();
		echo 'loged out';
	}
	else{
		echo "not working";
	}
?>