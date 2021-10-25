
var questionId = "animalquestion"

var peopleCategory = ["people"];
var peopleSubCategory = ["aba", "yael", "mama", "kalab"];

var moneyCategory = ["money"];
var moneySubCategory = ["penny", "nickel", "dime", "quarter"];

var animalCategory = ["animal"];
var animalSubCategory = ["dog", "cat", "camel", "chick", "cow", "donkey", "goat", "hen", "horse", "mouse", "pig", "pony", "rabit", "sheep", "cheetah", "lion", "kangaroo", "fox", "elephant", "tiger", "bear", "bird", "duck", "eagle", "fish", "frog", "salamander", "snake", "tortoise", "aardvark", "alligator", "ant", "antelope", "armadillo", "baboon", "bat", "bee", "beetle", "butterfly", "crab", "deer", "dog", "dolphin", "dragon", "dragonfly", "fly", "gorilla", "hamster", "hyena", "iguana", "lizard", "monkey", "octopus", "owl", "penguin", "raccoon", "rhinoceros", "rooster", "seal", "shark", "shrimp", "slug", "spider", "squirrel", "starfish", "swan", "whale", "worm" ]; 

var bodyCategory = ["body"];
var bodySubCategory = ["ear", "eye", "nose", "teeth" ];

var mixedCategory = ["mixed"];
var mixedSubCategory = ["bathroom", "phone","burger",  "kaeywot", "rotisserie chicken", "tibs" , "chicken wings", "injera", "aba", "yael", "mama", "kalab"];//mastered ["ear",  "nose", "teeth", "eye", "teeth", "bathroom", "eat", "hungry", "laptop", "phone", "sleep", "toilet", "washhands" ];

var foodCategory = ["food"];
var foodSubCategory = ["burger", "chicken nuggets", "chicken wings", "crackers", "fish sticks", "injera", "kaeywot", "pizza", "rotisserie chicken", "tibs" ];


var category =  ["animal", "people", "furniture", "money", "body", "mixed", "food"]; //default is animal
var subCategory = animalSubCategory; // default subCategory is animalSubCategory
var IMG_COUNT = 3; //for now we are assuming only 3 images per sub category. do11, //dog2
var answer = "lion";  //default page answer. This is because we are displaying animal as the default page
var  score = 0;
var UNIQUE = true;
var muteSound = false; //by default sound is not muted
var hideImg = false; // be default image is not hidden
var usedFiles = [];
var USED_FILES_MAX_COUNT = 35;


/** mutes and unmutesSound */
function muteUnMuteSound(mute) {
    console.log('mutes sound will be set to ', mute);
    muteSound = mute;
    
    
}



function showHideImg(hide){
    console.log('is it hide image? ', hide);
    if(hide){
         document.getElementById(questionId).style.display = 'none';
            muteSound = false; //if image is hidden, sound must exist
    }else{
        console.log('questionId is ', questionId);
         document.getElementById(questionId).style.display = 'block';
    }
    //hideImg = hide;
}

/**
 Sets   1. The image src
        2. The correct answer for the image (name)
        3. A wrong answer 
Values on the image and the answer bittons
-ImgInfo is an array of image information with [0] the actual picture and [1] the image name 
**/

function changeImg(imgInfo) { 
    
    console.log("category name is ", category[0]);
    var categoryName = category[0];
    //NB - the three possible answer button ids will be named after the category name
    // for example animal1, animal2, animal3 or people1, people2, people3
    console.log('questionId found on line 56 is ', questionId);
    document.getElementById(questionId).src = imgInfo[0];
    var answerIds = [1, 2, 3];
    var answerButton = getRndInteger(1,3);
    var answerId = categoryName+answerButton;
    console.log('answerId ', answerId);
    if(answerButton === answerIds[0]){
        wrongButtonOne = answerIds[1];
        wrongButtonTwo = answerIds[2];
    }else if(answerButton === answerIds[1]){
        wrongButtonOne = answerIds[0];
        wrongButtonTwo = answerIds[2];
    }else { //answer = 3
        wrongButtonOne = answerIds[0];
        wrongButtonTwo = answerIds[1];
    }
    //var wrongButton = answerButton == 1? 2 : 1;
    var wrongIdOne = categoryName+wrongButtonOne;
    var wrongIdTwo = categoryName+wrongButtonTwo;
    console.log('image url ', imgInfo[0]);
    console.log('image name ', imgInfo[1]);
    
    document.getElementById(answerId).setAttribute("value", imgInfo[1] );
    
    var wrongSubCat2 = nextWrongSubCategory(imgInfo[1]);  //imageINfo[1] is the question imageName
    
    document.getElementById(wrongIdOne).setAttribute("value", nextWrongSubCategory(imgInfo[1]) );
    
    document.getElementById(wrongIdTwo).setAttribute("value", nextWrongSubCategory(imgInfo[1]) );
    //play the animal name
    setCurrentSoundUrl(categoryName, imgInfo[1]);
    console.log('is sound muted? ', muteSound);
    if(!muteSound) {
        playSound("currentSound");    
    }
    answer = imgInfo[1];
}

function setCurrentSoundUrl(categoryName, subCategoryName){
    //subCategoryName = "dog"; //remove this later once we have all animal sounds
    soundUrl = "sound/" + categoryName + "/" + subCategoryName + ".mp3";
    document.getElementById("currentSound").setAttribute("src", soundUrl );
}
/**
    Picks a subCategory element that is different from 'correctCategory' 
*/
function nextWrongSubCategory(correctSubCategory) {
    var rndInt, wrongSubC ;
    do {
        rndInt = getRndInteger(0, subCategory.length-1);
        wrongSubC = subCategory[rndInt];
    }while(wrongSubC === correctSubCategory )
    
    return wrongSubC;
}

/**
Returns a 2 size array of [0]=the animal name and [1] the image location relative path
The image is constructed from the following folder structure
    example: /img/animal/dog/dog1.png
             "/img/"+category+"/"+"subCategory"+"/"+"subCategory"+"1"+".png"
*/
function nextImg(unique) {
    var nextImg = [];
    var category;
    var subCategory;
    var url;
    
    var nextImgNum; 
    var loopCount = 0;
    do{
        
        var used = false;
        nextImgNum = getRndInteger(1, IMG_COUNT);
         category = nextCategory();
         subCategory = nextSubCategory();
         url = "img/"+category+"/"+subCategory+"/"+subCategory+"_"+nextImgNum+".jpg";
        console.log('url picked: ', url);
        if(unique){
            usedFiles.forEach(function (item) {
                console.log('item found in used ', item, 'and url to compare ', url);
       if (item === url){
           console.log('used and url are the same ');
           used = true;
           
       } 
    });
        }
        ++loopCount;
        if(loopCount > USED_FILES_MAX_COUNT){
        console.log('cleaning used files cache');
        usedFiles = [];
    }
        
    }while(used); 
    nextImg[0] = url;
    nextImg[1] = subCategory;
        //clear used files array if we have reached the max count
    
    usedFiles.push(url);
    console.log('used files length: ', usedFiles.length);
    console.log('next image ', nextImg);
    return nextImg;
}

function checkAnswer(value) {
    console.log('value is ', value);
    console.log('answer is ', answer);
        if(value === answer ){
            increaseScore();            
            changeImg(nextImg(UNIQUE));
        }else {
            decreaseScore()
            window.alert('X. Wrong!');
        }
    }

function increaseScore(){
    score = score +1;
    if(score === 10 ){
        playSound("successSound");
        usedFiles = []        
        //showYoutubeModal();
    }
    if(score >100) {
        score = 1;
    }
    
    if(score >= REWARD_SCORE){
        showYoutubeModal();
        score = 0;
    }
    document.getElementById('score').innerHTML = styleScore(score);
}

function decreaseScore(){
    playSound("errorSound")
    if (score > 0)
    score = score -1;
    document.getElementById('score').innerHTML = styleScore(score);
}

function styleScore(score){
    return "<span style='text-align: center; font-size: 120px;' >" + score + "</span>";
}

   
    /**
    // Returns a random category such as animal, furniture etc --this line is wrong
    */
    function nextCategory() {    
        //var rndInt = getRndInteger(0, category.length -1); 
        //return category[rndInt];   
        return category[0]; 
    }
    /**
        returns a random subCategory
    */
    function nextSubCategory() {
        console.log('subcategory at this point is ', subCategory);
        var rndInt = getRndInteger(0, subCategory.length -1); 
        return subCategory[rndInt];        
    }
    
    /**
    This JavaScript function always returns a random number between min and max (both included):
    */
    function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
    The category and subCategory are set when the tab is clicked. Otherwise the default category
    and subcategory are set;
**/
function setCategorySubCategory(categ, subCateg){
    console.log("passed to me sub category of ", subCateg);
    if(categ === "animalCategory"){
        category = animalCategory;    
    } else if (categ == "peopleCategory") {
        console.log("category of people is selected");
        category = peopleCategory;
    }  else if (categ == "moneyCategory") {
        console.log("category of money is selected");
        category = moneyCategory;
    } else if (categ == "bodyCategory") {
        console.log("category of body is selected");
        category = bodyCategory;
    }else if (categ == "mixedCategory") {
        console.log("category of mixed is selected");
        category = mixedCategory;
    }else if (categ == "foodCategory") {
        console.log("category of food is selected");
        category = foodCategory;
    }
    
    //NOTE: when modifying this class to add new code, make sure to add before this line and
    //after this line
    
    if(subCateg === "animalSubCategory") {
        subCategory = animalSubCategory;
    } else if (subCateg === "peopleSubCategory") {
        console.log('subcategory of people is selected');
        subCategory = peopleSubCategory;
    } else if (subCateg === "moneySubCategory") {
        console.log('subcategory of monye is selected');
        subCategory = moneySubCategory;
    } else if (subCateg === "bodySubCategory") {
        console.log('subcategory of body is selected');
        subCategory = bodySubCategory;
    }else if (subCateg === "mixedSubCategory") {
        console.log('subcategory of mixed is selected');
        subCategory = mixedSubCategory;
    }else if (subCateg === "foodSubCategory") {
        console.log('subcategory of food is selected');
        subCategory = foodSubCategory;
    }
    console.log('set subCategory to ', subCategory);
    
   
}

/**
This is called when a Tab is clicked. 
1. It sets the category var field which could be Animal, Family, ... etc
2. On the the img tag (id=question). it sets the src attibute with the path 
   of the image
3. 
*/
function loadImage(catg, subCtg) {
        console.log(' category is ', catg);
        console.log('sub category passed to method is ', subCtg);
        setCategorySubCategory(catg, subCtg);
        questionId = nextCategory()+"question";
         var img = nextImg(UNIQUE);
         usedFiles = [];
         changeImg(img);
         score = 0
        document.getElementById('score').innerHTML = styleScore(score);        
         //setInterval(playSound("reminder__wagna__fanfare"), 1000);
    
    }



function playSound(soundObj) {
  var sound = document.getElementById(soundObj);
  sound.play();
}

function testFun(someVal){
    console.log('you passed me ', someVal);
}
