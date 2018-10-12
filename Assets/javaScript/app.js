
var intervalId;
var pauseInterval;
var targId;

var questions = [

    {
        inquiry: "Who gives Harry the gillyweed in Goblet of Fire?",
        answers: ["Severus Snape", "Hermione Granger", "Neville Longbottom", "Ron Weasley",],
        correctAns: 2,
        displayMess: "Just before the start of the second trial, Neville finds Harry asleep in the library and gives him gilliweed to help him breath underwater."
    },

    {
        inquiry: "Which of these is NOT and unforgiveable curse?",
        answers: ["Sectumsempra", "Imperius Curse", "Cruciatus Curse", "Avada Kedavra"],
        correctAns: 0,
        displayMess: "Sectumsempra is a very dark curse that causes a cut ('sectum' = 'cut') which will not heal ever ('sempra' = 'forever'). Harry used a dark curse on Malfoy (in the 6th movie). While Snape was able to fix it, Harry did use a deadly dark curse."
    },

    {
        inquiry: "How many horcruxes does Voldemort have?",
        answers: ["5", "7", "8", "9"],
        correctAns: 1,
        displayMess: "There were seven horcruxes in total, meaning Voldemort's soul got split so that it was in eight pieces. Voldemort had originally intended to make exactly six, so that his soul would be seven pieces, but unintentionally passed part of his soul into Harry as a child."
    },

    {
        inquiry: "Who guards the entrance of the Gryffindor common room?",
        answers: ["Peeves", "The Fat Friar", "The Bloody Baron", "The Fat Lady"],
        correctAns: 3,
        displayMess: "The Fat Lady is the subject of a painting on the seventh floor of Hogwarts Castle. Her portrait guards the entrance to Gryffindor Tower. Students must tell her the password that she has created to enter the Gryffindor common room."
    },

    {
        inquiry: "Who is NOT a member of the Order of the Phoenix?",
        answers: ["Cornelius Fudge", "Mad-Eye Moody", "Professor Snape", "Remus Lupin"],
        correctAns: 0,
        displayMess: "Not Cornelius. He sucks. The Order of the Phoenix was a secret society founded by Albus Dumbledore to oppose Lord Voldemort and his Death Eaters."
    },

    {
        inquiry: "A wizard who cannot do magic is known as a:",
        answers: ["Bleaker", "Muggle", "Duddle", "Squib"],
        correctAns: 3,
        displayMess: "A squib is a person of magic blood who cannot perform magic. A muggle is a person who has no magic in their family. A mudblood is a person with one magic parent and one muggle parent."
    },

    {
        inquiry: "Harry's patronus is which animal?",
        answers: ["Stag", "Eagle", "Phoenix", "Bear"],
        correctAns: 0,
        displayMess: "The shape of a corporeal Patronus is significantly influenced by the personality of the caster. Harry's is a stag; Dumbledore's is a phoenix."
    },

]

var clock = {

    resetClock: function () {
        game.time = 30;
        game.clockDisplay(game.time);
        clearInterval(pauseInterval);
    },

    start: function () {
        if (!game.clockRunning) {
            intervalId = setInterval(clock.count, 1000);
            game.clockRunning = true;
        }
    },

    stop: function () {
        clearInterval(intervalId);
        game.clockRunning = false;
    },

    count: function () {
        game.time--;
        if (game.time > -1) {
            game.clockDisplay(game.time);
        } else {
            $(":checkbox").off();
            game.checkBox(true)
            clock.stop();
            game.losses++;
            game.dispScore();
            game.toastMess("Times up!");
            pauseInterval = setInterval(game.questionReset, 5000);
        }
    }

}

var game = {

    instructions: "Welcome to Harry Potter Trivia. Your knowledge will be tested and your time limited! Choose your answers wisely. Tap the start button to begin.",
    thanks: "Thanks for playing! If you would like to improve your score, hit the button to play again.",
    wins: 0,
    losses: 0,
    i: 0,
    clockRunning: false,
    time: 30,

    gameStart: function () {
        game.startButton(),
        game.answerDiv("flex");
        game.nextQuestion();
    },

    startButton: function () {
        $(".startButton").empty();
    },

    answerDiv: function (prop) {
        $(".questionBody").css("display", prop)
    },

    nextQuestion: function () {
        $("#bc0").animate({ opacity: "1" }, 4000)
        if (game.i < questions.length) {
            let obj = questions[game.i]
            game.bodyTextDisplay(obj.inquiry);
            game.displayOptions(obj);
            game.duringQuestion();
            clock.resetClock();
            clock.start();
        } else {
            game.answerDiv("none");
            game.resetButton();
            game.bodyTextDisplay(game.thanks);
        }
    },

    bodyTextDisplay: function (text) {
        $("#bodyArea").fadeOut(300, function () {
            $(this).text(text).fadeIn(300);
        });
    },

    displayOptions: function (obj) {
        for (var j = 0; j < 4; j++) {
            var htmlLocation = "#option" + j
            $(htmlLocation).text(obj.answers[j])
        }
    },

    duringQuestion: function () {
        game.bcAnimate();
        $(":checkbox").on("click", function (event) {
            targId = parseInt(event.target.id);
            var corAns = questions[game.i].correctAns
            if (targId === corAns) {
                game.wins++;
                game.clickEvents();
                game.toastMess("Correct Answer!")
                pauseInterval = setInterval(game.questionReset, 5000);
            } else if (targId !== corAns) {
                game.losses++;
                game.clickEvents();
                game.toastMess("Wrong Answer!")
                pauseInterval = setInterval(game.questionReset, 5000);
            }
        })
    },

    clickEvents: function(){
        $(":checkbox").off();
        game.checkBox(true)
        game.dispScore();
        clock.stop();
    },

    toastMess: function(message){
        var details = JSON.stringify(questions[game.i].displayMess)
        M.toast({ html: message + "<br>" + details, displayLength: 5000 });
    },

    checkBox: function (value) {
        $(":checkbox").prop("disabled", value);
    },

    dispScore: function () {
        $("#correctScore").fadeOut(2000, function () {
            $(this).text(game.wins).fadeIn(2000);
        });
        $("#incorrectScore").fadeOut(2000, function () {
            $(this).text(game.losses).fadeIn(2000);
        });
    },

    questionReset: function () {
        game.i = game.i + 1;
        game.nextQuestion();
        game.uncheckBox(targId);
        game.checkBox(false);
        clock.resetClock();
    },

    uncheckBox: function (elem) {
        $("#" + elem).prop("checked", false);
    },

    bcAnimate: function () {
        var bcNum = game.i + 1
        $("#bc" + (bcNum)).animate({ opacity: "1" }, 4000)
    },

    gameReset: function () {
        game.i = 0;
        game.wins = 0;
        game.losses = 0;
        game.dispScore();
        game.bodyTextDisplay(game.instructions);
        $(".breadcrumb").css("opacity", "0");
        $(".resetButton").empty()
        $("#resetBut").off();
        $(".startButton").append('<a class="waves-effect waves-light btn-large" id="startBut">Start</a>').on("click", game.gameStart);
    },

    resetButton: function () {
        $(".resetButton").append('<a class="waves-effect waves-light btn-large" id="resetBut">Play Again!</a>').on("click", game.gameReset);
    },

    clockDisplay: function (time) {
        $("#time").fadeOut(500, function () {
            $(this).text(time).fadeIn(500);
        });
    }
}


$(document).ready(function () {
    $("#startBut").on("click", game.gameStart);
})
