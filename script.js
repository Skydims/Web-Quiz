/* Created and coded by Abhilash Narayan */ 
/* Quiz source: w3schools.com */ 

var quiz = {
    "JS": [
        {
            "id": 1,
            "question": "Inside which HTML element do we put the JavaScript?",
            "options": {
                "a": "<script>",
                "b": "<javascript>",
                "c": "<scripting>",
                "d": "<js>"
            },
            "answer": "<script>",
            "score": 0,
            "status": ""
        },
        {
            "id": 2,
            "question": "Where is the correct place to insert a JavaScript?",
            "options": {
                "a": "The <head> section",
                "b": "The <body> section",
                "c": "Both the <head> section and the <body> section are correct"
            },
            "answer": "Both the <head> section and the <body> section are correct",
            "score": 0,
            "status": ""
        },
        // Additional questions are omitted for brevity...
    ]
};

function QuizApp() {
    this.score = 0;
    this.qno = 1;
    this.currentque = 0;
    var totalque = quiz.JS.length;

    this.displayQuiz = function (cque) {
        this.currentque = cque;

        if (this.currentque < totalque) {
            $("#tque").html(totalque);
            $("#previous").attr("disabled", this.currentque <= 0);
            $("#next").attr("disabled", false);

            $("#qid").html(quiz.JS[this.currentque].id + '.');
            $("#question").html(quiz.JS[this.currentque].question);
            $("#question-options").html("");

            for (var key in quiz.JS[this.currentque].options) {
                if (quiz.JS[this.currentque].options.hasOwnProperty(key)) {
                    $("#question-options").append(
                        `<div class='form-check option-block'>
                            <label class='form-check-label'>
                                <input type='radio' class='form-check-input' name='option' id='q${key}' value='${quiz.JS[this.currentque].options[key]}'>
                                <span id='optionval'>${quiz.JS[this.currentque].options[key]}</span>
                            </label>
                        </div>`
                    );
                }
            }
        } else {
            $('#next').attr('disabled', true);
            for (var i = 0; i < totalque; i++) {
                this.score += quiz.JS[i].score;
            }
            this.showResult(this.score);
        }
    };

    this.showResult = function (scr) {
        $("#result").addClass('result');
        $("#result").html(`<h1 class='res-header'>Total Score: ${scr}/${totalque}</h1>`);

        quiz.JS.forEach(q => {
            const res = q.score === 0
                ? `<span class="wrong">${q.score}</span><i class="fa fa-remove c-wrong"></i>`
                : `<span class="correct">${q.score}</span><i class="fa fa-check c-correct"></i>`;

            $("#result").append(
                `<div class="result-question">
                    <span>Q ${q.id}</span> ${q.question}
                </div>
                <div><b>Correct answer:</b> ${q.answer}</div>
                <div class="last-row"><b>Score:</b> ${res}</div>`
            );
        });
    };

    this.checkAnswer = function (option) {
        const answer = quiz.JS[this.currentque].answer;
        option = option.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

        if (option === answer) {
            if (quiz.JS[this.currentque].score === 0) {
                quiz.JS[this.currentque].score = 1;
                quiz.JS[this.currentque].status = "correct";
            }
        } else {
            quiz.JS[this.currentque].status = "wrong";
        }
    };

    this.changeQuestion = function (cque) {
        this.currentque += cque;
        this.displayQuiz(this.currentque);
    };
}

$(document).ready(function () {
    const jsq = new QuizApp();
    jsq.displayQuiz(0);

    $('#question-options').on('change', 'input[type=radio][name=option]', function () {
        $(this).prop("checked", true);
        selectedopt = $(this).val();
    });

    $('#next').click(function (e) {
        e.preventDefault();
        if (selectedopt) {
            jsq.checkAnswer(selectedopt);
        }
        jsq.changeQuestion(1);
    });

    $('#previous').click(function (e) {
        e.preventDefault();
        if (selectedopt) {
            jsq.checkAnswer(selectedopt);
        }
        jsq.changeQuestion(-1);
    });
});
