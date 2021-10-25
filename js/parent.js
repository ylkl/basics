var curVid =  null;
const RELOAD_MILSEC = 6*60*1000;
var REWARD_SCORE = 20; //after x correct answers - show youtube modal. limit to 9 because there is
//logic that resets the scores when it is equal to 10
$(document).ready(function(){
    
    
    /* to stop the you tube playing in the background when the modal is closed, 
    the only solution i found so far is to reload the whole page */
    $("#youtube-modal").on('hide.bs.modal', function(){
        
        location.reload();
        
    });
    
    /* do nothing for now */
    $("#youtube-modal").on('show.bs.modal', function(){
        //this is not duing anyting for now
    });
    
    //show the current reward threshold
    document.getElementById("currentRewardThreshold").innerHTML = REWARD_SCORE;
});

function showYoutubeModal (){
    
    console.log('youtube modal should show next');
    $('#youtube-modal').modal('show');
    
    setTimeout(function() {
    $('#youtube-modal').modal('hide');        
  }, RELOAD_MILSEC);
}

function setRewardThreshold(){
    if(document.getElementById("rewardThreshold").value) {
  REWARD_SCORE =  document.getElementById("rewardThreshold").value ;
    document.getElementById("rewardThreshold").value = "";
    document.getElementById("currentRewardThreshold").innerHTML = REWARD_SCORE;
    }
}