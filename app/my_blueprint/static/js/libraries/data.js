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

// **********************************************************************************************************
// **********************************************************************************************************
// **********************************************************************************************************
// SET THE STUDY MODE THAT YOU WANT TO SEE HERE
// Any of the keys from study_mode_map will work here
//var study_mode = 'spiral_color_large'
// **********************************************************************************************************
// **********************************************************************************************************
// **********************************************************************************************************

var data_intro = {
    'MAP': 'The temperature data of different cities is represented on the map.  Hover to view the name of the city.',
    'SCATTER': 'The scatterplot displays daily COVID case information for different countries using pins positioned on the scatterplot. Each pin on the scatterplot is positioned according to its corresponding country\'s Human Development Index (x-axis) and its population in millions (y-axis). Hover to view the name of the country.',
    'MIGRATION_GRAPH': 'The global migration data of people is represented on the graph. Hover to view the migration data.'
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
    'practice-MAP': [
	{
            "type": "multichoice",
            "label": "What was the approximate average temperature for Whitehorse in February 2020?",
            "choices": ["-25", "-15", "0", "+10"],
            "answer": '-15',
            "highlightOptions": ["Whitehorse"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Which city (Faro or Dawson City) had more days above +25 in 2020?",
            "choices": ["Faro", "Dawson City"],
            "answer": 'Dawson City',
            "highlightOptions": ["Faro", "Dawson City"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "Approximately how many days were below -20 in Whitehorse in 2020?",
            "choices": ["0", "10", "20", "30"],
            "answer": '12',
            "highlightOptions": ["Whitehorse"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "None",
            "comparison_basis": "None"
	}],
    'practice-SCATTER': [
	{
            "type": "multichoice",
            "label": "What was the approximate average daily case rate for France in December 2021?",
            "choices": ["10K", "75K", "150K", "400K", "450K"],
            "answer": '75K',
            "highlightOptions": ["France"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Which country (Italy or United Kingdom) had a higher Covid rate in July 2021?",
            "choices": ["Italy", "United Kingdom"],
            "answer": 'United Kingdom',
            "highlightOptions": ["Italy", "United Kingdom"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "Was Germany's Covid rate higher in March 2020 or March 2021?",
            "choices": ["March 2020", "March 2021"],
            "answer": 'March 2021',
            "highlightOptions": ["Germany"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Compare",
            "comparison_basis": "Within"
	}],
    'practice-MIGRATION_GRAPH': [
	{
            "type": "multichoice",
            "label": "Which had higher overall movement 2000-2014: Italy to France, or Romania to Germany?",
            "choices": ["Italy to France", "Romania to Germany"],
            "answer": 'Italy to France',
            "highlightOptions": ["Italy>France", "Romania>Germany"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "What was the approximate immigration level for Romania to Germany in 1996?",
            "choices": ["500", "5K", "50K", "500K"],
            "answer": '5K',
            "highlightOptions": ["Romania>Germany"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Which connection has the most missing data?",
            "choices": ["Romania to Germany", "Italy to France", "Bulgaria to Turkey"],
            "answer": 'Bulgaria to Turkey',
            "highlightOptions": ["Romania>Germany", "Italy>France", "Bulgaria>Turkey"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	}],
    'study-MAP': [
	{
            "type": "multichoice",
            "label": "For the city of Kodiak, in what year were the months January-March colder: 2020 or 2021?",
            "choices": ["2020", "2021"],
            "answer": '2021',
            "highlightOptions": ["Kodiak"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Compare",
            "comparison_basis": "Within"
	},
	{
            "type": "multichoice",
            "label": "What was the approximate average temperature for Fairbanks in July 2021?",
            "choices": ["22", "18", "14", "10", "6"],
            "answer": '10',
            "highlightOptions": ["Fairbanks"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Which city (Haines, Healy, Kodiak, or Homer) had the most consistent temperature between September and December 2020?",
            "choices": ["Haines", "Healy", "Kodiak", "Homer"],
            "answer": 'Healy',
            "highlightOptions": ["Haines", "Healy", "Kodiak", "Homer"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "Which city (Bethel, Talkeetna, Barrow, or Juneau) had a 2020 summer (June-August) that was substantially colder than in 2021?",
            "choices": ["Bethel", "Talkeetna", "Barrow", "Juneau"],
            "answer": 'Talkeetna',
            "highlightOptions": ["Bethel", "Talkeetna", "Barrow", "Juneau"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "What was the approximate minimum temperature in 2021 for Kotzebue?",
            "choices": ["-34", "-27", "-22", "-17"],
            "answer": '-34',
            "highlightOptions": ["Kotzebue"],
            "perceptual_task": "FindExtremum",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Rank cities Bethel, Nome, and Healy from warmest to coldest for August 2021",
            "choices": ["Bethel, Nome, Healy", "Healy, Nome, Bethel", "Nome, Bethel, Healy",
			"Bethel, Healy, Nome"],
            "answer": 'Healy, Nome, Bethel',
            "highlightOptions": ["Healy", "Nome", "Bethel"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Sort",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "What range of temperatures were seen in Fairbanks in 2021?",
            "choices": ["-25 to +5", "-15 to +10", "-30 to +15", "-20 to +25", "-25 to +25"],
            "answer": '-30 to +15',
            "highlightOptions": ["Fairbanks"],
            "perceptual_task": "DetermineRange",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Which city had a higher temperature in March 2020, Unalaska or Bethel?",
            "choices": ["Unalaska", "Bethel"],
            "answer": 'Unalaska',
            "highlightOptions": ["Unalaska", "Bethel"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	}],
    'study-SCATTER': [
	{
            "type": "multichoice",
            "label": "In the United States, in what year did the months August-September have more Covid cases: 2020 or 2021?",
            "choices": ["2020", "2021"],
            "answer": '2021',
            "highlightOptions": ["United States"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Compare",
            "comparison_basis": "Within"
	},
	{
            "type": "multichoice",
            "label": "What was the approximate average Covid case rate for Uzbekistan in April 2020?",
            "choices": ["5", "50", "500"],
            "answer": '50',
            "highlightOptions": ["Uzbekistan"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Which country (India, the United States, or Yemen) had the most consistent case rate September-December 2021?",
            "choices": ["United States", "Yemen", "India"],
            "answer": 'India',
            "highlightOptions": ["United States", "Yemen", "India"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "Which country (Philippines, Yemen, or Nepal) had more cases in June-August of 2021?",
            "choices": ["Philippines", "Yemen", "Nepal"],
            "answer": 'Philippines',
            "highlightOptions": ["Philippines", "Yemen", "Nepal"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
        {
            "type": "multichoice",
            "label": "Which of the following countries had a lower overall number of new Covid-19 cases in December 2021?",
            "choices": ["Pakistan", "Syria", "Vietnam"],
            "answer": 'Syria',
            "highlightOptions": ["Pakistan", "Syria", "Vietnam"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
        },
	{
            "type": "multichoice",
            "label": "What was the approximate minimum case rate in 2021 for Azerbaijan?",
            "choices": ["10", "100", "1000"],
            "answer": '10',
            "highlightOptions": ["Azerbaijan"],
            "perceptual_task": "FindExtremum",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Rank countries Syria, India, and Vietnam in terms of average case rate, from lowest to highest, for July 2021",
            "choices": ["India, Syria, Vietnam", "Vietnam, Syria, India", "Syria, Vietnam, India"],
            "answer": 'Syria, Vietnam, India',
            "highlightOptions": ["Vietnam", "Syria", "India"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Sort",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "What range of case rates were seen in Cambodia in 2021?",
            "choices": ["1 to 10K", "10K to 100K", "100 to 100K", "1 to 1M"],
            "answer": '1 to 10K',
            "highlightOptions": ["Cambodia"],
            "perceptual_task": "DetermineRange",
            "decision_task": "None",
            "comparison_basis": "None"
	}],
    'study-MIGRATION_GRAPH': [
	{
            "type": "multichoice",
            "label": "For immigration from France to Spain, was the level higher in 1994 or 2008?",
            "choices": ["1994", "2008"],
            "answer": '2008',
            "highlightOptions": ["France>Spain"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Compare",
            "comparison_basis": "Within"
	},
	{
            "type": "multichoice",
            "label": "What was the approximate level of immigration from Germany to Austria in 2003?",
            "choices": ["1K", "7K", "15K", "100K", "150K", "500K"],
            "answer": '15K',
            "highlightOptions": ["Germany>Austria"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Which of the following pairs saw the largest increase in immigration from 1995 to 2005?",
            "choices": ["Germany to France", "Bulgaria to Germany", "India to Canada", "Romania to Spain"],
            "answer": 'Romania to Spain',
            "highlightOptions": ["Germany>France", "Bulgaria>Germany", "India>Canada", "Romania>Spain"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "Which connection has the lowest overall level of immigration across the years 1980-2010?",
            "choices": ["New Zealand to Australia", "Romania to Italy", "France to Spain", "Germany to Italy"],
            "answer": 'Romania to Italy',
            "highlightOptions": ["New_Zealand>Australia", "Romania>Italy", "France>Spain", "Germany>Italy"],
            "perceptual_task": "ComputeDerivedValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "What was the maximum immigration level from Colombia to Spain in any year before 2005?",
            "choices": ["10K", "80K", "120K", "500K"],
            "answer": '80K',
            "highlightOptions": ["Colombia>Spain"],
            "perceptual_task": "FindExtremum",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Rank the connections (Tajikistan to Russia, Germany to Poland, Romania to Italy) from most to least immigration, for year 2000",
            "choices": ["Tajikistan to Russia; Germany to Poland; Romania to Italy", "Germany to Poland; Tajikistan to Russia; Romania to Italy", "Romania to Italy; Germany to Poland; Tajikistan to Russia"],
            "answer": "Germany to Poland; Tajikistan to Russia; Romania to Italy",
            "highlightOptions": ["Germany>Poland", "Tajikistan>Russia", "Romania>Italy"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Sort",
            "comparison_basis": "Between"
	},
	{
            "type": "multichoice",
            "label": "What range of immigration levels were seen for China to Canada from 1980 to 2020?",
            "choices": ["1K to 50M", "1K to 1M", "500 to 500K", "10K to 1M"],
            "answer": '1K to 1M',
            "highlightOptions": ["China>Canada"],
            "perceptual_task": "DetermineRange",
            "decision_task": "None",
            "comparison_basis": "None"
	},
	{
            "type": "multichoice",
            "label": "Which connection had a higher immigration level in 1987?",
            "choices": ["Philippines to Australia", "Pakistan to Canada"],
            "answer": 'Philippines to Australia',
            "highlightOptions": ["Philippines>Australia", "Pakistan>Canada"],
            "perceptual_task": "RetrieveValue",
            "decision_task": "Compare",
            "comparison_basis": "Between"
	}],
    };
