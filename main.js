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
var progress;

function login(){
	var user = document.getElementById('username').value;
	var pass = document.getElementById('pass').value;
	var args = {submit: 'Login', username: user, pass: pass};
	$http.post("login.php", args).then(function(data){
		if(data == 'good'){
			window.location.assign("http://localhost/AdventureGame/main.html");
		}
		else{
			document.getElementById('error').innerHTML = data;
		}
	});
}

function logout(){
	var args = {want: 'logout'};
	$http.post("wanted.php", args).then(function(data){});
	window.location.assign("http://localhost/AdventureGame/login.html");
}

function register(){
	var pass1 = document.getElementById('pass1').value;
	var pass2 = document.getElementById('pass2').value;
	if(pass1 != pass2){
		document.getElementById('error').innerHTML = 'Passwords do not match';
		return;
	}
	var args = {submit: 'Register', username: document.getElementById('username').value, pass: pass1};
	$http.post("login.php", args).then(function(data){
		if(data == 'good'){
			window.location.assign("http://localhost/AdventureGame/login.html");
		}
		else{
			document.getElementById('error').innerHTML = data;
		}
	});
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
		main.innerHTML = "<p>Welcome to the town of Shadows.</p><br>";
		dispStory();
		options.innerHTML = '<button class="button" onclick="saveData()">Save</button>';
		options.innerHTML += '<button class="button" onclick="goPlace('+"'Healer'"+')">Visit the healer.</button>';
		//options.innerHTML += '<button class="button" onclick="goPlace('+"'Shop'"+')">Go to shop.</button>';
		options.innerHTML += '<button class="button" onclick="goPlace('+"'Forest'"+')">Go to forest.</button>';
	}
	else if(place == 'Healer'){
		heal();
		main.innerHTML = "<p>The healer patches you up and wishes you luck on your adventures.</p><br>";
		options.innerHTML = '<button class="button" onclick="goPlace('+"'Town'"+')">Leave</button>';
	}
	else if(place == 'Shop'){
		main.innerHTML = "<p>This is a shop. Nothin to buy yet.</p><br>";
		options.innerHTML = '<button class="button" onclick="goPlace('+"'Town'"+')">Leave</button>';
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
	options.innerHTML = '<button class="button" onclick="atack()">Attack</button>';
	options.innerHTML += '<button class="button" onclick="defend()">Defend</button>';
}

function endEncounter(){
	battle.innerHTML = '';
	options.innerHTML = '<button class="button" onclick="goPlace('+"'Town'"+')">Return to town.</button>';
	options.innerHTML += '<button class="button" onclick="encounter()">Keep exploring.</button>';
}

function atack(){
	takeDamage('e', atackPow('p'));
	var dmg = atackPow('e', ' and hits.<br>');
	if(ehp > 0){
		takeDamage('p', dmg);
	}
}

function defend(){
	var hit = Math.floor((Math.random()*2));
	if(hit < 1){
		var dmg = Math.floor(atackPow('e', ' but barely hits.<br>')/2);
		takeDamage('p', dmg);
	}
	else{
		var dmg = atackPow('e', ' but it cuts itself on your sword.<br>');
		takeDamage('e', dmg);
	}
}

function atackPow(t, r){
	var hit = Math.floor((Math.random()*2))+1;
	if(t == 'p'){
		l = lvl;
		battle.innerHTML += 'You slash into the '+monster+' with your sword.<br>';
	}
	else{
		l = elvl;
		var args = {want: 'atack', str: hit, mons: monster};
		$http.post("wanted.php", args).then(function(data){
			battle.innerHTML += 'The '+monster+' '+data+r;
		});
	}
	hit = hit*l+5;
	return hit;
}

function takeDamage(t, d){
	if(t == 'p'){
		//battle.innerHTML += 'You took '+d+' damage.<br>';
		hp -= d;
		h = hp;
		dispStats();
	}
	else{
		ehp -= d;
		h = ehp;
	}
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
	options.innerHTML = '<button class="button" onclick="loadData()">Continue</button>';
}

function kill(){
	var gain = (elvl + 2) * 5;
	gainXP(gain);
	battle.innerHTML += 'You killed the '+monster+'.<br>';
	options.innerHTML = '<button class="button" onclick="endEncounter()">Continue</button>';
	if(story == 0){
		counter++;
	}
	else if(story == 1 && monster == 'Ghost'){
		counter++;
	}
	else if(story == 2 && monster == 'Witch'){
		counter++;
	}
}

function gainXP(g){
	exp += g;
	battle.innerHTML += 'You gained '+g+' exp.<br>';
	if(exp >= lvl*100){
		exp -= lvl*100;
		lvl++;
		battle.innerHTML += 'You have reached level '+lvl+'!<br>';
	}
	dispStats();
}

function loadData(){
	var args = {want: 'stat', stat: 'lvl'};
	$http.post("wanted.php", args).then(function(data){
		lvl = parseInt(data);
		var args = {want: 'stat', stat: 'hp'};
		$http.post("wanted.php", args).then(function(data){
			hp = parseInt(data);
			var args = {want: 'stat', stat: 'exp'};
			$http.post("wanted.php", args).then(function(data){
				exp = parseInt(data);
				dispStats();
			});
		});
	});
	counter = 0;
	var args = {want: 'stat', stat: 'story'};
	$http.post("wanted.php", args).then(function(data){
		story = parseInt(data);
		goPlace('Town');
	});
	battle.innerHTML = '';
}

function saveData(){
	battle.innerHTML += 'Saving data...<br>';
	var args = {want: 'save', level: lvl, health: hp, xp: exp, sty: story};
	$http.post("wanted.php", args).then(function(data){
		battle.innerHTML += 'Your data has been saved.<br>';
	});
}

function dispStory(){
	var text;
	if(story == 0){
		text = 'You enter the town of Shadows. It is a small town, with only a handful of residents. One of them approaches you and says "Oh great adventurer! Please save us! '
		+ 'Our town is surrounded by a dark forest which has been taken over by many beasts and monsters! The townspeople are too weak to fight. You must help us! However, the forest '
		+ 'is cursed. If you try to leave before defeating a group of monsters, they will contact others in their group, and will be reinforced when you return. You must defeat them '
		+ 'in one trip!"<br>'
		+ 'Your goal: Defeat 4 monsters.';
		if(counter >= 4){
			story++;
			counter = 0;
		}
	}
	if(story == 1){
		text = 'You return to Shadows. The resident, Harold, was waiting for you. "Oh thank you! You defeated the monsters! I know there are still more lurking out there, but we have '
		+ 'another bigger problem. Our town is currently cut off from all trade because of a group of dark ghosts terrorizing traders. Please, great adventurer, defeat these ghosts!"<br>'
		+ 'Your goal: Defeat 6 ghosts.';
		if(counter >= 6){
			story++;
			counter = 0;
		}
	}
	if(story == 2){
		text = 'After defeating the meddlesome ghosts, you return to Shadows. Harold, again, is waiting for you. Probably with another quest. You approach him. '
		+ '"Oh! Great adventurer! You have saved us once again, thank you so much! But, oh, great adventurer, we need your assistance again! You see, the other residents of Shadows '
		+ 'are ill. While you were out killing the ghosts, disease struck the town. "the cause?" you ask? Monsters! Out in the forest, near the path to the village are two very '
		+ 'strong witches. They have cursed us with disease. Please kill them and cure our people!"<br> '
		+ 'Your goal: Kill 2 witches.';
		if(counter >= 2){
			story++;
			counter = 0;
		}
	}
	if(story > 2){
		text = '"Oh great adventurer!" exclaimed Harold. "You have saved our entire village! Thank you so much! We name you our hero, and will construct '
		+ 'a statue in your honor, as gratitude for saving us all from these terrible beasts!" <br>'
		+ 'Congratulations, you have won Adventure Game!!!!!!';
	}
	main.innerHTML += text;
	counter = 0;
}


//Moved from other file

var $http = (function (){
    'use strict';

    function ajax(method, uri, args){
        var promise = new Promise(function(resolve, reject){
            var req = new XMLHttpRequest();
            var url =  uri;
            var parameters = '';
            req.open(method, url);

            if(args && (method === 'POST' || method === 'PUT')){
                req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                if(args && typeof args === 'object'){
                    for(var k in args){
                        parameters+= k + '=' + args[k] + '&';
                    }
                }
            }
            req.send(parameters);
            req.onload = function (){
                if(req.status >= 200 && req.status < 300){
                    resolve(req.response);
                }
                else{
                    reject(req.statusText);
                }
            };
            req.onerror = function(){
                reject(req.statusText);
            };
        });
        return promise;
    }

    return {
        get : function(uri, args, callback){
            if (args && typeof args === 'function'){
                callback = args;
            }
            if(callback && typeof callback === 'function'){
                return ajax('GET', uri, args).then(callback)
            }
            return ajax('GET', uri, args);
        },
        post : function(uri, args, callback){
            if (args && typeof args === 'function'){
                callback = args;
            }
            if(callback && typeof callback === 'function'){
                return ajax('POST', uri, args).then(callback)
            }
            return ajax('POST', uri, args);
        },
    };
}());
