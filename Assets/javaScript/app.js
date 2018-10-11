
var questions = [

    {
        type: "question",
        number: 1,
        inquiry: "Who gives Harry the gilliweed in Goblet of Fire?",
        answers: ["Severus Snape", "Hermione Granger", "Neville Longbottom", "Ronald Weasley",],
        correctAns: 2,
        displayMess: "Just before the start of the second trial, Neville finds Harry asleep in the library and gives him gilliweed to help him breath underwater."
    },

    {
        type: "question",
        number: 2,
        inquiry: "How many horcrux does Voldemort have?",
        answers: ["3", "5", "7", "9"],
        correctAns: 2,
        correctAns: "7", //potentially answer[2]
    }

    //etc. etc.
]

var game = {

    instructions: "Welcome to Harry Potter Trivia. Your knowledge will be tested and your time limited! Choose your answers wisely. Tap the start button to begin.",
    gameState: 0,
    quesCorrect: 0,
    quesIncorrect: 0,
    time: 0,
    i: 0,

    //all game reset

    gameReset: function () {
        this.resetButton("none");
        this.startButton("flex")
        // this.answerDiv("none");
        this.breadcrumbReset();
        this.correctScore(0);
        this.incorrectScore(0);
        this.bodyTextDisplay(this.instructions);
    },

    resetButton: function (prop) {
        $("#resetBut").css("display", prop)
    },

    startButton: function (prop) {
        $("#startBut").css("display", prop)
    },

    answerDiv: function (prop) {
        $(".questionBody").css("display", prop)
    },

    breadcrumbReset: function () {
        for (i = 1; i > 8; i++) {
            $("#bc" + i).animate("opacity", "0")
        }
    },

    correctScore: function (num) {
        this.quesCorrect = num;
        $("#correctScore").text(this.quesCorrect);
    },

    incorrectScore: function (num) {
        this.quesIncorrect = num;
        $("#incorrectScore").text(this.quesIncorrect);
    },

    bodyTextDisplay: function (text) {
        $("#bodyArea").text(text)
    },

    //all game reset^^^

    gameStart: function () {
        game.startButton("none");
        game.answerDiv("flex");
        if (game.i < questions.length) {
            let obj = questions[game.i]
            game.bodyTextDisplay(obj.inquiry);
            game.displayOptions(obj);
        }
        //else end game
    },

    displayOptions: function (obj) {
        for (var j = 0; j < 4; j++) {
            var htmlLocation = "#option" + j
            $(htmlLocation).text(obj.answers[j])
        }
    },
    //loops to displays the possible answers stored in the question object

    checkAnswer: function (event) {
        let obj = questions[game.i]
        if (parseInt(event.target.id) === obj.correctAns) {
            game.quesCorrect = game.quesCorrect++;
            game.correctScore(game.quesCorrect);
            //stop timer
            //add a crumb
            M.toast({html: "Correct Answer!" + "<br>" + obj.displayMess, displayLength: 5000});
            // , completeCallback: game.gameStart()
            game.i = game.i + 1;
            game.gameStart();
            console.log(game.i)
            return game.i;
        }else if(parseInt(event.target.id) !== obj.correctAns){
            game.quesIncorrect = game.quesIncorrect++;
            game.correctScore(game.quesIncorrect);
            //stop timer
            //add a crumb
            M.toast({html: "Wrong Answer" + "<br>" + obj.displayMess, displayLength: 5000, completeCallback: function(){alert('Your toast was dismissed')}});
            game.i = game.i++;
        }
        //else if time = 0
        
    }
}


$(document).ready(function () {
    $("#startBut").on("click", game.gameStart);
    $(":checkbox").on("click", game.checkAnswer);
})