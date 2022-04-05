// We have six study modes 
// 1) spiral(color)
// 2) spiral(yaxis)
// 3) spiral(color,yaxis)
// 4) row(color)
// 5) row(yaxis)
// 6) row(color, yaxis)


var study_mode_map = {
    // 'spiral_yaxis': { 'shape': 1, 'encoding': 1 },
    // 'spiral_color': { 'shape': 1, 'encoding': 2 },
    // 'spiral_color_yaxis': { 'shape': 1, 'encoding': 3 },
    // 'row_yaxis': { 'shape': 2, 'encoding': 1 },
    // 'row_color': { 'shape': 2, 'encoding': 2 },
    // 'row_color_yaxis': { 'shape': 2, 'encoding': 3 },

    'spiral_yaxis_small': { 'shape': 1, 'encoding': 1, 'size': 'small' },
    'spiral_yaxis_medium': { 'shape': 1, 'encoding': 1, 'size': 'medium' },
    'spiral_yaxis_large': { 'shape': 1, 'encoding': 1, 'size': 'large' },

    'spiral_color_small': { 'shape': 1, 'encoding': 2, 'size': 'small' },
    'spiral_color_medium': { 'shape': 1, 'encoding': 2, 'size': 'medium' },
    'spiral_color_large': { 'shape': 1, 'encoding': 2, 'size': 'large' },

    'spiral_color_yaxis_small': { 'shape': 1, 'encoding': 3, 'size': 'small' },
    'spiral_color_yaxis_medium': { 'shape': 1, 'encoding': 3, 'size': 'medium' },
    'spiral_color_yaxis_large': { 'shape': 1, 'encoding': 3, 'size': 'large' },

    'row_yaxis_small': { 'shape': 2, 'encoding': 1, 'size': 'small' },
    'row_yaxis_medium': { 'shape': 2, 'encoding': 1, 'size': 'medium' },
    'row_yaxis_large': { 'shape': 2, 'encoding': 1, 'size': 'large' },

    'row_color_small': { 'shape': 2, 'encoding': 2, 'size': 'small' },
    'row_color_medium': { 'shape': 2, 'encoding': 2, 'size': 'medium' },
    'row_color_large': { 'shape': 2, 'encoding': 2, 'size': 'large' },

    'row_color_yaxis_small': { 'shape': 2, 'encoding': 3, size: 'small' },
    'row_color_yaxis_medium': { 'shape': 2, 'encoding': 3, size: 'medium' },
    'row_color_yaxis_large': { 'shape': 2, 'encoding': 3, size: 'large' },
};

// SET THE STUDY MODE THAT YOU WANT TO SEE HERE
// Any of the keys from study_mode_map will work here
//var study_mode = 'row_yaxis_medium'

var data_intro = {
    'MAP': 'The temperature data of different cities is represented on the map.  Hover to view the name of the city.',
    'SCATTER': 'The scatterplot displays daily COVID case information for different countries using pins positioned on the scatterplot. Each pin on the scatterplot is positioned according to its corresponding country\'s Human Development Index (x-axis) and its population in millions (y-axis). Hover to view the name of the country.',
    'MIGRATION_GRAPH': 'The global migration data of people is represented on the graph. Hover to view the migration path.'
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
    MIGRATION_GRAPH: {
        'spiral_yaxis': '',
        'spiral_color': '',
        'spiral_color_yaxis': '',
        'row_yaxis': '',
        'row_color': '',
        'row_color_yaxis': ''
    }
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
    MIGRATION_GRAPH: {
        'spiral_yaxis': '',
        'spiral_color': '',
        'spiral_color_yaxis': '',
        'row_yaxis': '',
        'row_color': '',
        'row_color_yaxis': ''
    }
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
    '1': ['MAP', 'SCATTER', 'MIGRATION_GRAPH'],
    '2': ['SCATTER', 'MIGRATION_GRAPH', 'MAP'],
    '3': ['MIGRATION_GRAPH', 'MAP', 'SCATTER'],



    // '1': ['MAP', 'SCATTER', 'MIGRATION_GRAPH'],
    // '2': ['MAP', 'MIGRATION_GRAPH', 'SCATTER'],
    // '3': ['MIGRATION_GRAPH', 'MAP', 'SCATTER'],
    // '4': ['MIGRATION_GRAPH', 'SCATTER', 'MAP'],
    // '5': ['SCATTER', 'MIGRATION_GRAPH', 'MAP'],
    // '6': ['SCATTER', 'MAP', 'MIGRATION_GRAPH']
};

// THESE ARE THE STUDY QUESTIONS
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
        "answer": '0',
        "highlightOptions": ["Talkeeta"]
    },
    {
        "type": "multichoice",
        "label": "How many  days >25 did Wasilla experience?",
        "choices": ["0", "5", "10", "15"],
        "answer": '0',
        "highlightOptions": ["Wasilla"]
    },
    {
        "type": "multichoice",
        "label": "How many  days >25 did Wasilla experience?",
        "choices": ["0", "5", "10", "15"],
        "answer": '0',
        "highlightOptions": ["Wasilla"]
    }],
    'practice-SCATTER': [{
        "type": "click",
        "label": "Click on the country that has the lowest number of new covid cases per day in 2020?",
        "answer": 'Yes',
        "highlightOptions": []
    }, {
        "type": "multichoice",
        "label": "Which country experienced the highest number of new COVID cases per day in 2020?",
        "choices": ["United States", "India", "China", "Brazil"],
        "answer": 'United States',
        "highlightOptions": ["United States", "India", "China", "Brazil"]
    },
    {
        "type": "multichoice",
        "label": "Approximately how many days did USA have >100,000 new COVID cases?",
        "choices": ["5 days", "30 days", "60 days", "90 days"],
        "answer": '5 days',
        "highlightOptions": ["Unites States"]
    }],
    'practice-MIGRATION_GRAPH': [{
        "type": "click",
        "label": "Click on the country that has the lowest number of new covid cases per day in 2020?",
        "answer": 'Yes',
        "highlightOptions": []
    }, {
        "type": "multichoice",
        "label": "Which country experienced the highest number of new COVID cases per day in 2020?",
        "choices": ["United States", "India", "China", "Brazil"],
        "answer": 'United States',
        "highlightOptions": ["United States", "India", "China", "Brazil"]
    },
    {
        "type": "multichoice",
        "label": "Approximately how many days did the United States have >100,000 new COVID cases?",
        "choices": ["5 days", "30 days", "60 days", "90 days"],
        "answer": '5 days',
        "highlightOptions": ["United States"]
    }],

    'study-MAP': [{
        "type": "multichoice",
        "label": "Is this a map?",
        "choices": ["Yes", "No"],
        "answer": 'Yes',
        "highlightOptions": []
    }],
    'study-SCATTER': [
        {
            "type": "click",
            "label": "Which country had the highest overall number of new Covid-19 cases in 2021? Click on your choice in the scatterplot.",
            "answer": 'United States',
            "highlightOptions": []
        },
        {
            "type": "click",
            "label": "Which country had the lowest overall number of new Covid-19 cases in 2021? Click on your choice in the scatterplot.",
            "answer": 'Cambodia',
            "highlightOptions": []
        },
        {
            "type": "multichoice",
            "label": "Which of the following countries had the largest decrease in new Covid-19 cases between the middle of 2021 and the end of 2021? ",
            "choices": ["Myanmar", "Yemen"],
            "answer": 'Yemen',
            "highlightOptions": ["Myanmar", "Yemen"]
        },
        {
            "type": "multichoice",
            "label": "Which of the following countries had a lower overall number of new Covid-19 cases in 2021?",
            "choices": ["Pakistan", "Syria", "Vietnam"],
            "answer": 'Vietnam',
            "highlightOptions": ["Pakistan", "Syria", "Vietnam"]
        },
        {
            "type": "click",
            "label": "Which country had the highest number of new Covid-19 cases in January and February 2021? Click on your choice in the scatterplot.",
            "answer": 'China',
            "highlightOptions": []
        },
        {
            "type": "multichoice",
            "label": "In what months did Vietnam see a month-long spike in cases?",
            "choices": ["May-June", "June-July", "July-August", "August-September", "September-October"],
            "answer": 'July-August',
            "highlightOptions": ["Vietnam"]
        },
        {
            "type": "multichoice",
            "label": "Which of the following countries has the smallest amount of missing data?",
            "choices": ["Kazakhstan", "Philippines", "Afghanistan"],
            "answer": 'Philippines',
            "highlightOptions": ["Kazakhstan", "Philippines", "Afghanistan"]
        },
        {
            "type": "click",
            "label": "Which country had the highest number of new Covid-19 cases in August? Click on your choice in the scatterplot.",
            "answer": 'India',
            "highlightOptions": []
        },
        {
            "type": "multichoice",
            "label": "What was the approximate number of new Covid-19 cases per day in December for the United States?",
            "choices": ["0.3 million", "0.4 million", "0.5 million", "0.6 million", "0.7 million", "0.8 million", "0.9 million", "1.0 million"],
            "answer": '0.8 million',
            "highlightOptions": ["United States"]
        },
        {
            "type": "multichoice",
            "label": "What was the approximate number of new Covid-19 cases per day in July for Bangladesh?",
            "choices": ["0.3 million", "0.4 million", "0.5 million", "0.6 million", "0.7 million", "0.8 million", "0.9 million", "1.0 million"],
            "answer": '0.5 million',
            "highlightOptions": ["Bangladesh"]
        }
    ],
    'study-MIGRATION_GRAPH': [{
        "type": "multichoice",
        "label": "Is this a scatter plot?",
        "choices": ["Yes", "No"],
        "answer": 'Yes',
        "highlightOptions": []
    }],

};