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
var question_map = studyQuestions['intro-' + condition_set_value];


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
var zoom_level = [];
var fullscreen_log = [];
// Button click status - If button is already clicked dont do anything wait for the logging response from server
var button_clicked = false;
// Record the question type from Carl's criteria
var perceptual_task = "";
var decision_task = "";
var comparison_basis = "";
var exit_fullscreen = 0;
var esc_key_count = 0

// prevent changing zoom level with keys or the mouse wheel
$(document).keydown(function(event) {
    if ((event.ctrlKey==true || event.metaKey ==true) && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
            event.preventDefault();
    }
    else if (event.which == '27' || event.which == '122' ) {
        esc_key_count += 1
        //event.preventDefault();
    }
});

if (document.addEventListener)
{
 document.addEventListener('fullscreenchange', exitHandler, false);
 document.addEventListener('mozfullscreenchange', exitHandler, false);
 document.addEventListener('MSFullscreenChange', exitHandler, false);
 document.addEventListener('webkitfullscreenchange', exitHandler, false);
}

function exitHandler()
{
 if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
 {
  exit_fullscreen += 1
 }
}
    
document.addEventListener('wheel', function(event) {
    if (event.ctrlKey == true || event.metaKey==true) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('fullscreenchange', event => {
    if (document.fullscreenElement) {
        fullscreen_log.push("enter fullscreen")
    }
    else {
        fullscreen_log.push("exit fullscreen")
    }
}) 

function activateFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();        // W3C spec
    }
    else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();     // Firefox
    }
    else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();  // Safari
    }
    else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();      // IE/Edge
    }
};

function deactivateFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
};

window.addEventListener('resize', () => {
    const browserZoomLevel = window.devicePixelRatio;
    zoom_level.push(Math.round(browserZoomLevel * 100) / 100)
})

// Study intro is shown by default so wait for the user to click next 
$('#example-button').click(() => {
    //activateFullscreen(document.documentElement);
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
    // make the chart visible
    $('#chart-container').css({ 'visibility': 'visible' });
    $('#description').html('Shown below is an example of a visualization that you will see. There are multiple small charts that display data over time. The charts that are mentioned in the question will be highlighted with a green border. You can hover over a chart to increase its size and view its label.');
    $('#prompt').html('Click the button below to complete the example question.')
    // Study intro is shown by default so wait for the user to click next 
    // When the next button is clicked after reading the chart intro 
    // hide the chart intro and then start showing the questions 
    $('#chart-container button.next').click(() => {
        activateFullscreen(document.documentElement);
        //    hide the trigger button
        $('#chart-container button.next').hide();
        $('#prompt').hide();
        showQuestion();
    });
}



function showQuestion() {
    // Based on the chartType of the user condition get the question set 
    let question = question_map[question_index];

    // Show the questionBox 
    $('#question-box').show();
    $('#start-question').show();

    $('#answer-box').hide();
    $('#root').css({ 'visibility': 'hidden' });

    // Set the question in the label 
    $('#question-label').text('Question: ' + question.label);
    // Get the choices for the question 

    $('#start-question').unbind('click').click((event) => {
        activateFullscreen(document.documentElement);
        // prevent form from submitting
        event.preventDefault();
        startQuestion();
    });

    zoom_level = [];
}

function startQuestion() {
    // Based on the chartType of the user condition get the question set 
    let question = question_map[question_index];

    $('#answer-box').show();
    $('#root').css({ 'visibility': 'visible' });
    $('#chart-container').css({ 'visibility': 'visible' });
    $('#start-question').hide();
    $('#question-submit').show();

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
    hover_count = 0;
    hovered_items = [];
    selectedItems = [];
    //fullscreen_log = [];
    button_clicked = false;
    perceptual_task = "";
    decision_task = "";
    comparison_basis = "";
    exit_fullscreen = 0;
    esc_key_count = 0;


    $('#question-box button.next').unbind('click').click((event) => {
        activateFullscreen(document.documentElement);
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
                Swal.fire({
                    title: 'Incorrect answer',
                    text: 'Sorry, that was the wrong answer. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                //alert('Sorry, that was the wrong answer. Please try again.');
            }
        }
    });

    window.itemHovered = (value) => {
        hovered_items.push(value)
        hover_count = hover_count + 1;
    }

    if (question.type == 'click') {
        window.itemClicked = (value) => {
            // prevent form from submitting
            event.preventDefault();
            // activateFullscreen(document.documentElement);
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
                    Swal.fire({
                        title: 'Incorrect answer',
                        text: 'Sorry, that was the wrong answer. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    //alert('Sorry, that was the wrong answer. Please try again.');
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
        zoomLevel: zoom_level.join(", "),
        perceptualTask: perceptual_task,
        decisionTask: decision_task,
        comparisonBasis: comparison_basis,
        exitFullscreenCount: exit_fullscreen,
        escKeyCount: esc_key_count
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
         
            alert('The example question is now complete. You will now start the study round');
            // go to next phase on the study
            
            window.location.href = "/redirect_next_page";
        }
    })
};


