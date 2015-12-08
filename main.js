//Name: 
//Discription:
var main;
var stats;
var battle;
var options;
var lvl;
var exp;
var hp;
var loc;
var story;
var monster;
var ehp;
var elvl;

function login(user, pass1){
	var args = {submit: 'Login', username: user, pass: pass1};
	$http.post("login.php", args).then(function(data){});
}

function register(user, pass1, pass2){
	var args = {submit: 'Register', username: user, pass: pass1};
	if(pass1 != pass2){
		document.getElementById('error').innerHTML = 'Passwords do not match';
	}
	$http.post("login.php", args).then(function(data){});
}

function setDoc(documentM, documentS, documentB, documentO){
	main = documentM;
	stats = documentS;
	battle = documentB;
	options = documentO;
}

function goPlace(place){
	loc = place;
	if(place == 'Town'){
		main.innerHTML = "<p>Welcome to town.</p><br>";
		options.innerHTML = '<button class="button" onclick="saveData()">Save</button>';
		options.innerHTML += '<button class="button" onclick="go("Healer")">Visit the healer.</button>';
		//options.innerHTML += '<button class="button" onclick="go("Shop")">Go to shop.</button>';
		options.innerHTML += '<button class="button" onclick="go("Forest")">Go to forest.</button>';
	}
	else if(place == 'Healer'){
		heal();
		main.innerHTML = "<p>The healer patches you up and wishes you luck on your adventures.</p><br>";
		options.innerHTML = '<button class="button" onclick="go("Town")">Leave</button>';
	}
	else if(place == 'Shop'){
		main.innerHTML = "<p>This is a shop. Nothin to buy yet.</p><br>";
		options.innerHTML = '<button class="button" onclick="go("Town")">Leave</button>';
	}
	else if(place == 'Forest'){
		main.innerHTML = "<p>The dark and scary forest looms around you.</p><br>";
		encounter();
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

function heal(){
	hp = lvl * 100;
	dispStats();
}

function encounter(){
	elvl = lvl + (Math.floor((Math.random()*3) - 1));
	if(elvl < 1){
		elvl = 1;
	}
	ehp = elvl*20;
	var args = {want: 'monster', place: loc};
	$http.post("wanted.php", args).then(function(data){
		monster = data;
		battle.innerHTML = 'You encountered a '+monster+' in the '+loc+'.<br>';
	});
	options.innerHTML = '<button class="button" onclick="atack()">Atack</button>';
	options.innerHTML += '<button class="button" onclick="defend()">Defend</button>';
}

function endEncounter(){
	battle.innerHTML = '';
	options.innerHTML = '<button class="button" onclick="go("Town")">Return to town.</button>';
	options.innerHTML += '<button class="button" onclick="encounter()">Keep exploring.</button>';
}

function atack(){
	takeDamage('e', atackPow('p'));
	battle.innerHTML += ' and hits.<br>';
	takeDamage('p', atackPow('e'));
}

function defend(){
	var hit = Math.floor((Math.random()*2));
	if(hit < 1){
		takeDamage('p', Math.floor(atackPow('e')/2));
	}
	else{
		takeDamage('e', atackPow('e'));
	}
}

function atackPow(t){
	var hit = Math.floor((Math.random()*2))+1;
	if(t == 'p'){
		l = lvl;
		battle.innerHTML += 'You slash into the '+monster+' with your sword.<br>';
	}
	else{
		l = elvl;
		var args = {want: 'atack', place: loc};
		$http.post("wanted.php", args).then(function(data){
			var disc = data;
		});
		battle.innerHTML += 'The '+monster+disc;
	}
	hit = hit*l+5;
	return hit;
}

function takeDamage(t, d){
	if(t == 'p'){
		h = hp;
	}
	else{
		h = ehp;
	}
	h -= d;
	if(h < 1){
		if(t == 'p'){
			die();
		}
		else{
			kill();
		}
	};
}

function die(){
	battle.innerHTML += 'The '+monster+' killed you.<br>';
	options.innerHTML = '<button class="button" onclick="loadData()">Contine</button>';
}

function kill(){
	var gain = (elvl - lvl + 2) * 5;
	gainXP(gain);
	battle.innerHTML += 'You killed the '+monster+'.<br>';
	options.innerHTML = '<button class="button" onclick="endEncounter()">Contine</button>';
}

function gainXP(g){
	exp += g;
	if(exp >= lvl*100){
		exp -= lvl*100;
		lvl++;
		battle.innerHTML += 'You have reached level '+lvl+'!<br>';
	}
}

function loadData(){
	var args = {want: 'stat', stat: 'lvl'};
	$http.post("wanted.php", args).then(function(data){
		lvl = data;
		var args = {want: 'stat', stat: 'hp'};
		$http.post("wanted.php", args).then(function(data){
			hp = data;
			var args = {want: 'stat', stat: 'exp'};
			$http.post("wanted.php", args).then(function(data){
				exp = data;
				dispStats();
			});
		});
	});
	var args = {want: 'stat', stat: 'story'};
	$http.post("wanted.php", args).then(function(data){
		story = data;
	});
	goPlace('Town');
}

function saveData(){
	var args = {want: 'save', level: lvl, health: hp, xp: exp, sty: story};
	$http.post("wanted.php", args).then(function(data){});
}

function dispStory(){
	var text;
	if(story == 0){
		text = 'Begining story/quest info';
	}
	else(){
		text = 'finished story stuff'
	}
	main.innerHTML += text;
}