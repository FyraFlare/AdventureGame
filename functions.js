<script>
	//Name: 
	//Discription:
	var main;
	var stats;
	var lvl;
	var exp;
	var hp;
	var story;

	function setDoc(documentM, documentS){
		main = documentM;
		stats = documentS;
	}

	function goPlace(place){
		if(place == 'Town'){
			main.innerHTML = "<p>Welcome to town.</p><br>";
			main.innerHTML += '<button class="button" onclick="">Save</button>';
			main.innerHTML += '<button class="button" onclick="go("Shop")">Go to shop.</button>';
			main.innerHTML += '<button class="button" onclick="go("Forest")">Go to forest.</button>';
		}
		else if(place == 'Shop'){
			main.innerHTML = "<p>This is a shop.</p><br>";
			main.innerHTML += '<button class="button" onclick="Town">Leave</button>';
		}
		else if(place == 'Shop'){
			main.innerHTML = "<p>The dark and scary forest looms around you.</p><br>";
			main.innerHTML += '<button class="button" onclick="Town">Return to town.</button>';
		}
		else{
			main.innerHTML = "<p>There is a problem here.</p>";
		}
	}

	function setStats(l, e, h, s){
		lvl = l;
		exp = e;
		hp = h;
		story = s;
		dispStats();
	}

	function dispStats(){
		stats.innerHTML = "<ul><li>LVL: " + lvl + "</li>";
		stats.innerHTML += "<li>HP: " + hp + "</li>";
		stats.innerHTML += "<li>EXP: " + exp + "</li></ul>";
	}
</script>