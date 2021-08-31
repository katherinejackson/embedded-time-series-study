// We have six study modes 
// 1) spiral(color)
// 2) spiral(yaxis)
// 3) spiral(color,yaxis)
// 4) row(color)
// 5) row(yaxis)
// 6) row(color, yaxis)

var study_mode = 'spiral_color';

var study_mode_map = {
    'spiral_yaxis': { 'shape': 1, 'encoding': 1 },
    'spiral_color': { 'shape': 1, 'encoding': 2 },
    'spiral_color_yaxis': { 'shape': 1, 'encoding': 3 },
    'row_yaxis': { 'shape': 2, 'encoding': 1 },
    'row_color': { 'shape': 2, 'encoding': 2 },
    'row_color_yaxis': { 'shape': 2, 'encoding': 3 }
};


var data_intro = {
    'MAP': 'The temperature data of different cities is represnted on the map.  Hover to view the name of the city.',
    'SCATTER': 'This daily cases of COVID are represented on the scatter plot.  Hover to view the name of the country.'
};

var shape_description = {
    MAP: {
        'spiral_yaxis': ['dot', 'average temperature of', 'distance from the dot to the center of the spiral'],
        'spiral_color': 'Every dot represents a different day in the year, and the average temperature of that day is represented by the colour of the dot and the distance from the dot to the center of the spiral.  The year reads like a clock, with January beginning at the top, and the year progresses clockwise until December is once again at the top.',
        'spiral_color_yaxis': 'Every line represents a different day in the year, and the average temperature of that day is represented by the colour of the line.  The year reads like a clock, with January beginning at the top, and the year progresses clockwise until December is once again at the top.',
        'row_yaxis': 'Every dot represents a different day in the year, and the average temperature of that day is represented by the height of the dot.',
        'row_color': 'Every line represents a different day in the year, and the average temperature of that day is represented by the colour of the line.',
        'row_color_yaxis': 'Every dot represents a different day in the year, and the average temperature of that day is represented by the colour and height of the dot.'
    },
    SCATTER: {
        'spiral_yaxis': '',
        'spiral_color': '',
        'spiral_color_yaxis': '',
        'row_yaxis': '',
        'row_color': 'The above image is an example of the type of visualizations you will be looking at. Every line represents a different day in the year, and the average temperature of that day is represented by the colour of the line.',
        'row_color_yaxis': ''
    },
};

var legend_description = {
    MAP: {
        'spiral_yaxis': '',
        'spiral_color': '',
        'spiral_color_yaxis': '',
        'row_yaxis': '',
        'row_color': 'The first legend shows which parts of the shape correspond to which months.  The second legend shows the temperature range.  You will be able to refer back to these legends while completing the activity.',
        'row_color_yaxis': ''
    },
    SCATTER: {
        'spiral_yaxis': '',
        'spiral_color': '',
        'spiral_color_yaxis': '',
        'row_yaxis': '',
        'row_color': 'The above image is an example of the type of visualizations you will be looking at. Every line represents a different day in the year, and the average temperature of that day is represented by the colour of the line.',
        'row_color_yaxis': ''
    },
};

var study_map_intro = {
    'spiral_yaxis': 'Each individual visualization here is a circular sparkline, you can hover over it to to see the name of the corresponding datapoint.',
    'spiral_color': 'Each individual visualization here is a circular plot that uses a color map to distinugish patterns in the dataset, you can hover over it to to see the name of the corresponding datapoint.',
    'spiral_color_yaxis': 'Each individual visualization here is a circular plot that uses both a color map and yaxis position to highlight patterns in the dataset, you can hover over it to to see the name of the corresponding datapoint.',
    'row_yaxis': 'Each individual visualization here is a a horizontal sparkline, you can hover over it to to see the name of the corresponding datapoint.',
    'row_color': 'Each individual visualization here is a horizontal plot that uses a color map to distinugish patterns in the dataset, you can hover over it to to see the name of the corresponding datapoint.',
    'row_color_yaxis': 'Each individual visualization here is a horizontal plot that uses both a color map and yaxis positions to highlight patterns in the dataset, you can hover over it to to see the name of the corresponding datapoint.'
};

var condition_map = {
    '1': ['MAP', 'SCATTER'],
    '2': ['SCATTER', 'MAP']
};

var studyQuestions = {
    'practice-MAP': [{
        "type": "multichoice",
        "label": "Is this a map?",
        "choices": ["Yes", "No"],
        "answer": 'Yes'
    },
    {
        "type": "click",
        "label": "Click on the city that has the most extreme temperature in the summer?",
        "answer": 'Yes'
    },
    {
        "type": "multichoice",
        "label": "How many days below < -30 degrees C did Talkeeta experience?",
        "choices": ["0", "<5", "<10", "10+"],
        "answer": '0'
    },
    {
        "type": "multichoice",
        "label": "How many  days >25 did Wasilla experience?",
        "choices": ["0", "5", "10", "15"],
        "answer": '0'
    },
    {
        "type": "multichoice",
        "label": "How many  days >25 did Wasilla experience?",
        "choices": ["0", "5", "10", "15"],
        "answer": '0'
    }],
    'practice-SCATTER': [{
        "type": "click",
        "label": "Click on the country that has the lowest number of new covid cases per day in 2020?",
        "answer": 'Yes'
    }, {
        "type": "multichoice",
        "label": "Which country experienced the highest number of new COVID cases per day in 2020?",
        "choices": ["USA", "India", "China", "Brazil"],
        "answer": 'USA'
    },
    {
        "type": "multichoice",
        "label": "Approximately how many days did USA have >100,000 new COVID cases?",
        "choices": ["5 days", "30 days", "60 days", "90 days"],
        "answer": '5 days'
    }],
    'study-MAP': [{
        "type": "multichoice",
        "label": "Is this a map?",
        "choices": ["Yes", "No"],
        "answer": 'Yes'
    }],
    'study-SCATTER': [{
        "type": "multichoice",
        "label": "Is this a scatter plot?",
        "choices": ["Yes", "No"],
        "answer": 'Yes'
    }],
};