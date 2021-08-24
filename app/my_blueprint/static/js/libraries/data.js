// We have six study modes 
// 1) spiral(color)
// 2) spiral(yaxis)
// 3) spiral(color,yaxis)
// 4) row(color)
// 5) row(yaxis)
// 6) row(color, yaxis)

var study_mode = 'row_color';

var study_mode_map = {
    'spiral_yaxis': { 'shape': 1, 'encoding': 1 },
    'spiral_color': { 'shape': 1, 'encoding': 2 },
    'spiral_color_yaxis': { 'shape': 1, 'encoding': 3 },
    'row_yaxis': { 'shape': 2, 'encoding': 1 },
    'row_color': { 'shape': 2, 'encoding': 2 },
    'row_color_yaxis': { 'shape': 2, 'encoding': 3 }
};


var data_intro = {
    'MAP': 'This is a map based visualization showing temperature data.',
    'SCATTER': 'This is a scatter plot style visualization showing COVID data.'
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