var maxNumber = 12;
var minNumber = 0;
var generatedNumber;
var typingScore = 0 ;
function fillWithRandomNumbers (event) {
     generatedNumber = getRndInteger(minNumber, maxNumber)
     document.getElementById('randNumbers').innerHTML = styleScore(generatedNumber);
   
}

function typingAnswer() {

  var y = 100;
   var x = document.getElementById("randQuestion").value;
     //alert('sdfas ' + x);
    if(generatedNumber ==  x ) {
       increaseTypingScore();
        fillWithRandomNumbers();
        document.getElementById("randQuestion").value = "";
        focusInputField();
    }else {
        
        decreaseTypingScore();
        document.getElementById("randQuestion").value = "";
        window.alert('X. Wrong!');
        focusInputField();
    }
}


function increaseTypingScore(){
    typingScore = typingScore +1;
    if(typingScore === 20 ){
        playSound("successSound");
        
    }
    if(typingScore >200) {
        typingScore = 0;
    }
    
    if(typingScore >= REWARD_SCORE){
        showYoutubeModal();
        typingScore = 0;
    }
    //document.getElementById('typingScore').innerHTML = styleScore(typingScore);
}

function decreaseTypingScore(){
    playSound("errorSound")
    if (typingScore > 0)
    typingScore = typingScore -1;
    //document.getElementById('typingScore').innerHTML = styleScore(typingScore);
}

function focusInputField() {
    document.getElementById("randQuestion").focus();
}