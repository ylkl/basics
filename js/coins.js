 var objects = ["penny", "nickel", "dime", "quarter"]; 
var coinsSubCategry = ["penny", "nickel", "dime", "quarter"]; 
 var lesson = "money"; //default lesson is about money
var target = "" // the particular object selected for question
var detractors = []  // two objects used as detactors - not same as target
var coinsScore = 0;
//peopleSubCategory

/**
fieldCount =  how many fields or choices the question will have
**/


function displayRandomObjects(defaultDisplay = false, fieldCount = 3, target = "quarter"){
    //set the target as a hidden input element
    console.log('----------------  you clicked displayRandomObjects ');
    document.getElementById("target").setAttribute("value",target);
    var excludes = [];
    
    //defaultDisplay - by default quarter is the target and 
    if(defaultDisplay){
        lesson = "money";
        console.log('Is defalut display ', defaultDisplay);
        document.getElementById("object0").src = "img/"+"money/penny"+"/penny_1.jpg";
        document.getElementById("object0").alt = "penny"; 
        document.getElementById("object1").src = "img/"+"money/nickel"+"/nickel_1.jpg";
        document.getElementById("object1").alt = "nickel"; 
        document.getElementById("object2").src = "img/"+"money/quarter"+"/quarter_1.jpg";
        document.getElementById("object2").alt = "quarter"; 
    }else {
        
        //display 3 objects randomly from folder
        for (i = 0 ; i <= fieldCount -1 ; i++) {
        var indx = getUniqueRndInteger(0, objects.length-1, excludes );
        let folder = objects[indx]; //example is animal object which at the same time is animal folder
            //file structure is img/animal/folder/folder_1.jpg
        let fileName = folder + "_" + getRndInteger(1,3) + ".jpg";
        let url = "img/"+ lesson + "/" +folder +"/" +fileName;    
        console.log('i: ', i ,'random index value: ', indx, 'object to display : ', objects[indx]);
        //var url = "img/"+lesson+"/"+objects[indx]+".jpg";
        console.log('the ur is: ', url);
        excludes.push(indx);
        document.getElementById("object"+i).src = url;
        document.getElementById("object"+i).alt = objects[indx];     
        
        //one of the random objects has to be the target (meaning question)
        var randIndx = getRndInteger(0,2);
        var targetIndex = excludes[randIndx]; 
        console.log('target Index: ', targetIndex);
        var targetObject = objects[targetIndex];
        console.log('target object: ', targetObject);
        document.getElementById("target").setAttribute("value",targetObject);
            
    }
    }
    
    excludes = [];
    
    //setCurrentSoundUrl(categoryName, imgInfo[1]);
    setCurrentSoundUrl(lesson, document.getElementById("target").getAttribute("value"));
    console.log('is sound muted? ', muteSound);
    if(!muteSound) {
        playSound("currentSound");    
    }
}



/**
Genarates a random integer between min and max (min and max included).  The random number returned is not in the excludes array. It will loop (max - min + 1) times only. This avoids infinite looping for cases where no random numbers could be generated that are not in the excludes arrary. When this situation happens, it return -1 
**/
function getUniqueRndInteger(min, max, excludes) {
    console.log("min:",min, " max:",max, " excludes:",excludes );
    var rand;
    var i = 0;
    do {
        rand =getRndInteger(min, max); 
        console.log('I found a random number: ', rand);
    }while(excludes.includes(rand) && ++i < max-min+1 );
    if(rand == null){
        console.log('couldnt find a unique random number. returning -1 ', rand);
        return -1;
    }
    return rand;
}

function checkObjectAnswer(answer) {
    console.log('you answered element: ', answer);
    console.log('you answered alt value: ', answer.firstChild.getAttribute('alt'));
    console.log('the question was ', document.getElementById("target").getAttribute('value'));
    var qn = document.getElementById("target").getAttribute('value');
    var ans = answer.firstChild.getAttribute('alt');
    if(qn === ans){
        ++coinsScore;
        playSound("successSound");
        displayRandomObjects(false, 3)
    } else{
        --coinsScore;
        playSound("errorSound")
        alert('you answered wrong. try again');
    }
    if(coinsScore >= REWARD_SCORE){
        showYoutubeModal();
        coinsScore = 0;
    }
    return false; //return false will disable the default behaviour of <a link from whihc checkObjectAnswer()
    //is triggered from. The default behaviour is to take the link to home page
}

function selectLesson(value){
    console.log('selected value is ', value);
 lesson = value;

    if(value === "money"){
        objects = moneySubCategory;
        displayRandomObjects(false, 3, "quarter");    
    }
    if(value === "people" ){
        objects = peopleSubCategory
        displayRandomObjects(false, 3, "aba");    
    }
    if(value === "animal"){
        objects = animalSubCategory;
        displayRandomObjects(false, 3, "dog");
    }  if(value === "body"){
        objects = bodySubCategory;
        displayRandomObjects(false, 3, "body");
    } 
    if(value === "mixed"){
        objects = mixedSubCategory;
        displayRandomObjects(false, 3, "mixed");
    }
    if(value === "food"){
        objects = foodSubCategory;
        displayRandomObjects(false, 3, "food");
    }

}