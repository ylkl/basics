// this is used by the math tab to generate random objects. 
var maxObjects = 7;
var minObjects = 1;
var numObjectsToGenerate = 2; // when Math Tab is used as the default page and we placed 2 objects
var objectScore = 0 ;
var circ = "<span class='dot'></span>";
var sq = "<div class='square keep-in-line'></div>&nbsp;";
var oval = "<div class='oval keep-in-line'></div>&nbsp;";

function fillWithRandomObjects (answer) {
    do {
     numObjectsToGenerate = getRndInteger(minObjects, maxObjects);
        console.log(' numObjectsToGenerate ',numObjectsToGenerate );
    }while(answer == numObjectsToGenerate)
    
     document.getElementById('objects').innerHTML = generateObjects(numObjectsToGenerate);
   
}

function generateObjects (numObjectsToGenerate) {
    var objects = "";
    var i;
    var rand = getRndInteger(1, 3);
    if (rand === 1) {
        obj = circ;
    }
    if (rand === 2) {
        obj = sq;
    }
    if (rand === 3) {
        obj = oval;
    }
    
    for(i=0 ; i< numObjectsToGenerate; i++ ){
        objects = objects + "   " + obj;
    }
    return objects;
}

function objectsSubmit() {

  var y = 100;
   var ans = document.getElementById("objectsAnswer").value;
    if(numObjectsToGenerate ==  ans ) {
        playSound("successSound");
       increaseObjectsScore(); 
        fillWithRandomObjects(ans);
        document.getElementById("objectsAnswer").value = "";
        //focusObjectInputField();
    }else {
        
        decreaseObjectsScore();  //method not properly implemented
        document.getElementById("objectsAnswer").value = "";
        document.getElementById("objectsAnswer").focus();
        window.alert('X. Wrong!');
        //focusInputField();
    }
}


function increaseObjectsScore(){
    objectScore = objectScore +1;
    if(objectScore === 20 ){
        //playSound("successSound");
        
    }
    if(objectScore >200) {
        objectScore = 0;
    }
    
    
    if(objectScore >= REWARD_SCORE){
        showYoutubeModal();
        objectScore = 0;
    }
    //document.getElementById('objectScore').innerHTML = styleScore(objectScore);
}

function decreaseObjectsScore(){
    playSound("errorSound")
    if (objectScore > 0)
    objectScore = objectScore -1;
    //document.getElementById('objectScore').innerHTML = styleScore(objectScore);
}

function focusObjectInputField() {
    document.getElementById("objectsAnswer").focus();
}