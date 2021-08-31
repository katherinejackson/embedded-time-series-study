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
    practice: true,
};

// Create a question set based on the condition 
var question_map = studyQuestions['practice-' + condition_set_value];

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


// Study intro is shown by default so wait for the user to click next 
$('#begin-button').click(() => {
    // Hide study intro and then based on the user condition either show the chord intro or the sankey intro 
    $('#study-intro').hide();
    // intializeChart();
    showShapeDescription();
});

// Study intro is shown by default so wait for the user to click next 
$('#start-practice').click(() => {
    // Hide study intro and then based on the user condition either show the chord intro or the sankey intro 
    $('#shape-description').hide();
    intializeChart();
});


function intializeChart() {
    // make the chart visible
    $('#chart-container').css({ 'visibility': 'visible' });
    $('#description').html(data_intro[condition_set_value] + '\n\n' + '\n\n' + ' You will now be asked 4 questions that you have to answer using the visualization. Please try to answer them as quickly and accurately as possible. Click the button below to start.');
    // Study intro is shown by default so wait for the user to click next 
    // When the next button is clicked after reading the chart intro 
    // hide the chart intro and then start showing the questions 
    $('#chart-container button.next').click(() => {
        //    hide the trigger button
        $('#chart-container button.next').hide();
        showQuestion();
    });
}

function showShapeDescription() {
    $('#shape-description').css({ 'visibility': 'visible' });
    $('#example-description').html('The above image is an example of the type of visualizations you will be looking at. ' + getShapeDescription(condition_set_value, study_mode));
    $('#legend-description').html( getLegendDescription(condition_set_value) + ' You will be able to refer back to these legends while completing the activity.');
    document.getElementById('example-image').src = `/my_blueprint/timemap/images/example-${condition_set_value}-${study_mode}.png`
    document.getElementById('legend-image').src = `/my_blueprint/timemap/images/legend-${condition_set_value}-${study_mode}.png`
}

function getShapeDescription(view, glyph) {
    const encodings = {
            'spiral_yaxis': 'distance from the dot to the center of the spiral',
            'spiral_color': 'color of the line',
            'spiral_color_yaxis': 'colour of the dot and the distance from the dot from the zero line',
            'row_yaxis': 'height of the dot',
            'row_color': 'colour of the line',
            'row_color_yaxis': 'colour and height of the dot'

    }
    const data = view === 'MAP' ? 'average temperature of' : 'number of new cases of COVID documented'
    const shape = glyph === 'spiral_color' || glyph === 'row_color' ? 'line' : 'dot'

    let string = `Every ${shape} represents a different day in the year, and the ${data} that day is represented by the ${encodings[glyph]}.`

    if (glyph.includes('spiral')) {
        string += ' The year reads like a clock, with January beginning at the top and the year progressing clockwise.'
    }

    if (glyph.includes('row') || glyph === 'spiral_color') {
        string += ' Missing or no data is represented using a grey line.'
    }


    return string
}

function getLegendDescription(view) {
    const data = view === 'MAP' ? 'temperature range of the city' : 'range in number of new COVID cases documented that day in the specified country'

    let string = `The legend shows which parts of the shape correspond to which months, and the ${data}.`

    return string
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
            alert('The practice round is now complete. You will now start the study round');
            // go to next phase on the study
            window.location.href = "/redirect_next_page";
        }
    })
};

