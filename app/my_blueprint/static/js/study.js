var trialStartTime;
// First get the condition 
var condition = getCond();
// Then get the block 
var block = getBlock();
// Then get the corresponding map based on the condition 
var condition_set_value = condition_map[condition][+block - 1];
// Populate the study chart conditions
window.options = {
    view: condition_set_value,
    shape: study_mode_map[study_mode].shape,
    encoding: study_mode_map[study_mode].encoding,
    size: study_mode_map[study_mode].size
};

// Create a question set based on the condition 
var question_map = studyQuestions['study-' + condition_set_value];

// Set the Question Iterator to zero
var question_index = 0;
// Count wrong answer attempts
var wrong_count = 0;
// Count hover activity
var hover_count = 0;
// store zoom level
var zoom_level = 0;
// Button click status - If button is already clicked dont do anything wait for the logging response from server
var button_clicked = false;

intializeChart();

function intializeChart() {
    // make the chart visible
    $('#chart-container').css({ 'visibility': 'visible' });
    $('#description').html('You will now begin the study round. You will be asked 10 questions. Please try to answer them as quickly and accurately as possible. Click the button below to start.');
    // Study intro is shown by default so wait for the user to click next 
    // When the next button is clicked after reading the chart intro 
    // hide the chart intro and then start showing the questions 
    $('#chart-container button.next').click(() => {
        //    hide the trigger button
        $('#chart-container button.next').hide();
        showQuestion();
    });
}


function showQuestion() {
    // Based on the chartType of the user condition get the question set 
    let question = question_map[question_index];

    // Show the questionBox 
    $('#question-box').show();
    // Set the question in the label 
    $('#question-label').text('Question: ' + question.label);
    // Get the choices for the question 
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
        $('#question-box .btn').show();
    }


    // start loggin time , reset, wrong count and button clicked status
    trialStartTime = new Date();
    wrong_count = 0;
    zoom_level = 0;
    hover_count = 0;
    button_clicked = false;


    $('#question-box button.next').unbind('click').click((event) => {
        // prevent form from submitting
        event.preventDefault();
        // debouncing button
        if (!button_clicked) {
            // validate the answer by getting the question set
            let question = question_map[question_index];

            let correct_answer = question.answer,
                user_answer = $('input[name="answer-radio"]:checked').val();

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
        size: window.options.encoding,
        Condition: condition,
        questionType: question_type,
        ErrorCount: wrong_count,
        hoverCount: hover_count,
        zoomLevel: zoom_level,
    };

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
            if (block == 1) {
                alert('The first part of the study is now complete. You will now be asked some questions about your experience during this part.');
                // go to next phase on the study
                window.location.href = "/redirect_next_page";
            }
            else if (block == 2) {
                alert('The second part of the study is now complete. You will now be asked some questions about your experience during this part.');
                // go to next phase on the study
                window.location.href = "/redirect_next_page";
            }
            else {
                alert('The third part of the study is now complete. You will now be asked some questions about your experience during this part.');
                // go to next phase on the study
                window.location.href = "/redirect_next_page";
            }
        }
    })
};

