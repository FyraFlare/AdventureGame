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
		echo register($_POST["mons"], $str);
	}
	elseif($want == "stat"){
		echo $_POST[$_POST['stat']];
	}
	elseif($want == "session"){
		if(session_status() == PHP_SESSION_NONE){
			echo 'good';
		}
		else{
			echo 'bad';
		}
	}
	elseif($want == "stat"){
		$_SESSION['lvl'] = $_POST["level"];
		$_SESSION['exp'] = $_POST["xp"];
		$_SESSION['hp'] =$_POST["health"];
		$_SESSION['story'] = $_POST["sty"];
		storeStats();
	}
	elseif($want == "logout"){
		logout();
	}
	else{
		echo "not working";
	}
?>