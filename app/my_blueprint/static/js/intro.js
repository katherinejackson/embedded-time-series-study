var trialStartTime;
// First get the condition 
var condition = getCond();
// Then get the block 
var block = getBlock();

var study_options = Object.keys(study_mode_map)
// shift id back so ID starts at 0
var sel = (getParticipant() - 1) % study_options.length
var study_mode = study_options[sel]

console.log("study mode (practice): ", study_mode)

// Then get the corresponding map based on the condition
//var condition_set_value = condition_map[1][2];
// var condition_set_value = condition_map[condition][+block - 1];
var condition_set_value = condition_map[1][+block - 1];
// Populate the study chart conditions
window.options = {
    view: condition_set_value,
    shape: study_mode_map[study_mode].shape,
    encoding: study_mode_map[study_mode].encoding,
    size: study_mode_map[study_mode].size,
    practice: true,
};



// Create a question set based on the condition 
// var question_map = studyQuestions['practice-' + condition_set_value];
var question_map = studyQuestions['intro-MAP'];

// Set the Question Iterator to zero
var question_index = 0;
// Count wrong answer attempts
var wrong_count = 0;
// Items that were selected
var selectedItems = [];
// Count hover activity
var hover_count = 0;
// Items that were hovered on
var hovered_items = [];
// store zoom level
var zoom_level = 0;
// Button click status - If button is already clicked dont do anything wait for the logging response from server
var button_clicked = false;
// Record the question type from Carl's criteria
var perceptual_task = "";
var decision_task = "";
var comparison_basis = "";

// prevent changing zoom level with keys or the mouse wheel
$(document).keydown(function(event) {
    if ((event.ctrlKey==true || event.metaKey ==true) && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
            event.preventDefault();
         }
    });
    
document.addEventListener('wheel', function(event) {
    if (event.ctrlKey == true || event.metaKey==true) {
        event.preventDefault();
        console.log("hit")
    }
    else {
        console.log("test")
    }
}, {passive: false})

//DOMMouseScroll


// Study intro is shown by default so wait for the user to click next 
$('#example-button').click(() => {
    // Hide study intro and then based on the user condition either show the chord intro or the sankey intro 
    $('#study-intro').hide();
    $('#shape-description').hide();
    intializeChart();
    // showQuestion();
    // showShapeDescription();
});

// // Study intro is shown by default so wait for the user to click next 
// $('#start-practice').click(() => {
//     // Hide study intro and then based on the user condition either show the chord intro or the sankey intro 
//     $('#shape-description').hide();
//     intializeChart();
// });

function intializeChart() {
    console.log("init chart")
    // make the chart visible
    $('#chart-container').css({ 'visibility': 'visible' });
    $('#description').html('Shown below is an example of a visualization that you will see. There are multiple small charts that display data over time. The charts that are mentioned in the question will be highlighted with a green border. You can hover over a chart to increase its size and view its label.');
    $('#prompt').html('Click the button below to complete the example question.')
    // Study intro is shown by default so wait for the user to click next 
    // When the next button is clicked after reading the chart intro 
    // hide the chart intro and then start showing the questions 
    $('#chart-container button.next').click(() => {
        //    hide the trigger button
        $('#chart-container button.next').hide();
        $('#prompt').hide();
        showQuestion();
    });
}



function showQuestion() {
    // Based on the chartType of the user condition get the question set 
    let question = question_map[question_index];

    console.log("show q")

    // Show the questionBox 
    $('#question-box').show();
    $('#start-question').show();

    $('#answer-box').hide();
    $('#root').css({ 'visibility': 'hidden' });

    // Set the question in the label 
    $('#question-label').text('Question: ' + question.label);
    // Get the choices for the question 

    $('#start-question').unbind('click').click((event) => {
        // prevent form from submitting
        event.preventDefault();
        startQuestion();
    });
}

function startQuestion() {
    // Based on the chartType of the user condition get the question set 
    let question = question_map[question_index];
    console.log("in start q")

    $('#answer-box').show();
    $('#root').css({ 'visibility': 'visible' });
    $('#chart-container').css({ 'visibility': 'visible' });
    $('#start-question').hide();
    $('#question-submit').show();

    console.log($('#chart-container').is(":visible"))

    // highlight the pins specified in the question
    let highlightOptions = question.highlightOptions || []
    window.triggerHighlight && window.triggerHighlight(highlightOptions);

    let answer_choices = question.choices;
    // Clear answer choice box 
    $('#choice-box').empty();

    if (question.type == 'click') {
        $('#choice-box').append(
            `<p>Please click on the answer item in the visualization.</p>`
        );
        $('#question-box .btn').hide();
    }
    else {
        // Add these choices to the form
        answer_choices.map((choice, choiceIndex) => {
            $('#choice-box').append(
                `<div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="radio-${choiceIndex}" name="answer-radio" 
                    value="${choice}">
                <label class="form-check-label" for="radio-${choiceIndex}">${choice}</label>
            </div>`
            );
        });
    }


    // start loggin time , reset, wrong count and button clicked status
    trialStartTime = new Date();
    wrong_count = 0;
    zoom_level = 0;
    hover_count = 0;
    hovered_items = [];
    selectedItems = [];
    button_clicked = false;
    perceptual_task = "";
    decision_task = "";
    comparison_basis = "";


    $('#question-box button.next').unbind('click').click((event) => {
        // prevent form from submitting
        event.preventDefault();
        // debouncing button
        if (!button_clicked) {
            // validate the answer by getting the question set
            let question = question_map[question_index];

            let correct_answer = question.answer,
                user_answer = $('input[name="answer-radio"]:checked').val();

            perceptual_task = question.perceptual_task;
            decision_task = question.decision_task;
            comparison_basis = question.comparison_basis;

            selectedItems.push(user_answer);

            if (correct_answer == user_answer) {
                button_clicked = true;
                logResponse(question.type);
            }
            else {
                wrong_count += 1;
                alert('Sorry, that was the wrong answer. Please try again.');
            }
        }
    });

    window.itemHovered = (value) => {
        console.log("Hovered ", value)
        hovered_items.push(value)
        hover_count = hover_count + 1;
    }

    window.onZoom = (value) => {
        zoom_level = value;
    }

    if (question.type == 'click') {
        window.itemClicked = (value) => {
            // prevent form from submitting
            event.preventDefault();
            // debouncing button
            if (!button_clicked) {
                // validate the answer by getting the question set
                let question = question_map[question_index];

                if (value) {
                    button_clicked = true;
                    logResponse(question.type);
                }
                else {
                    wrong_count += 1;
                    alert('Sorry, that was the wrong answer. Please try again.');
                }
            }
        }
    }
    else {
        window.itemClicked = () => { };
    }

}

function logResponse(question_type = '') {

    var endTime = new Date();

    // formulate json to store in DB.
    var trialResult = {
        trialStart: trialStartTime,
        trialEnd: endTime,
        trialTime: endTime - trialStartTime,
        questionNumber: question_index + 1,
        view: window.options.view,
        shape: window.options.shape,
        encoding: window.options.encoding,
        size: window.options.size,
        Condition: condition,
        questionType: question_type,
        ErrorCount: wrong_count,
        selectItems: selectedItems.join(", "),
        hoverCount: hover_count,
        hoverItems: hovered_items.join(", "),
        zoomLevel: zoom_level,
        perceptualTask: perceptual_task,
        decisionTask: decision_task,
        comparisonBasis: comparison_basis
    };

    // alert('The example question is now complete. You will now start the practice round');
    // // go to next phase on the study
    // window.location.href = "/redirect_next_page";

    $.post("#", trialResult).then(function () {
        // reset
        wrong_count = 0;
        button_clicked = false;
        // then go to next question
        if (question_index < question_map.length - 1) {
            // increment question index
            question_index += 1;
            showQuestion();
        }
        else {
            alert('The example question is now complete. You will now start the practice round');
            // go to next phase on the study
            window.location.href = "/redirect_next_page";
        }
    })
};

