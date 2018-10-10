
var questions = [

    ques1: {
        inquiry: "Who gives Harry the gilliweed in Goblet of Fire?",
        answer0: "Severus Snape",
        answer1: "Hermione Granger",
        answer2: "Neville Longbottom",
        answer3: "Ronald Weasley",
        correctAns: "Neville Longbottom", //potentially answer[2]
        displayMess: "Just before the start of the second trial, Neville finds Harry asleep in the library and gives him gilliweed to help him breath underwater."
    },

    ques2: {
        inquiry: "How many horcrux does Voldemort have?",
        answer0: "3",
        answer1: "5",
        answer2: "7",
        answer3: "9",
        correctAns: "7", //potentially answer[2]
    }

    //etc. etc.
]

var game= {

    quesCorrect: 0,
    quesIncorrect: 0,
    time= 0,

    gameSetup: function(){
        
    }


}

$(document).ready(function(){
    gameSetup();
})