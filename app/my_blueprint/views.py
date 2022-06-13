import datetime
from flask import Blueprint, render_template
from BOFS.util import *
from BOFS.globals import db
from BOFS.admin.util import verify_admin

# The name of this variable must match the folder's name.
my_blueprint = Blueprint('my_blueprint', __name__,
                         static_url_path='/my_blueprint',
                         template_folder='templates',
                         static_folder='static')

@my_blueprint.route("/ishihara", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def color_test():
    incorrect = None

    if request.method == 'POST':
        log = db.visionTest()
        log.participantID = session['participantID']
        log.vision = request.form['vision']
        log.vissioncomment = request.form['vissioncomment']
        log.deficiency = request.form['deficiency']
        log.deficiencyText = request.form['deficiencyText']
        log.response07 = request.form['response07']
        log.response01 = request.form['response01']
        log.response08 = request.form['response08']
        log.response06 = request.form['response06']
        log.response10 = request.form['response10']


        db.session.add(log)
        db.session.commit()

        if log.response01.lower() != "12":
            incorrect = True
            return render_template("eligibility.html", example="This is example text.")
        else:
            return redirect("/redirect_next_page")


    return render_template("ishihara.html", example="This is example text.", incorrect=incorrect)


@my_blueprint.route("/intro_1", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def intro_1():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'example'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("intro_1.html", example="This is example text.")

@my_blueprint.route("/intro_2", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def intro_2():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'example'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("intro_2.html", example="This is example text.")

@my_blueprint.route("/intro_3", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def intro_3():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'example'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("intro_3.html", example="This is example text.")


# practice page
@my_blueprint.route("/practice_1", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def practice_1_results():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'practice'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("practice_1.html", example="This is example text.")

# practice page
@my_blueprint.route("/practice_2", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def practice_2_results():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'practice'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("practice_2.html", example="This is example text.")

# practice page
@my_blueprint.route("/practice_3", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def practice_3_results():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'practice'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("practice_3.html", example="This is example text.")

# study page
@my_blueprint.route("/study_1", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def study_1_results():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'study'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("study_1.html", example="This is example text.")


# study page
@my_blueprint.route("/study_2", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def study_2_results():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'study'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("study_2.html", example="This is example text.")

# study page
@my_blueprint.route("/study_3", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def study_3_results():
    if request.method == 'POST':
        log = db.timemap()
        log.participantID = session['participantID']
        log.trialStart = request.form['trialStart']
        log.trialEnd = request.form['trialEnd']
        log.trialTime = request.form['trialTime']
        log.mode = 'study'
        log.view = request.form['view']
        log.shape = request.form['shape']
        log.encoding = request.form['encoding']
        log.size = request.form['size']
        log.Condition = request.form['Condition']
        log.QuestionType = request.form['questionType']
        log.ErrorCount = request.form['ErrorCount']
        log.selectItems = request.form['selectItems']
        log.hoverCount = request.form['hoverCount']
        log.hoverItems = request.form['hoverItems']
        log.zoomLevel = request.form['zoomLevel']
        log.perceptualTask = request.form['perceptualTask']
        log.decisionTask = request.form['decisionTask']
        log.comparisonBasis = request.form['comparisonBasis']
        log.questionNumber=request.form['questionNumber']
        # log.fullscreenLog = request.form['fullscreenLog']
        log.exitFullscreenCount = request.form['exitFullscreenCount']
        log.escKeyCount = request.form['escKeyCount']
        db.session.add(log)
        db.session.commit()
    return render_template("study_3.html", example="This is example text.")


# debrief
@my_blueprint.route("/debrief", methods=['POST', 'GET'])
@verify_correct_page
@verify_session_valid
def debrief():
    return render_template("debrief.html", example="This is example text.")

# route to view the database records and export them
@my_blueprint.route("/analysis")
@verify_admin
def analysis():
    results = db.session.query( db.Participant.participantID,
            db.func.count(db.MyTable.ID).label('tries')).\
        join(db.MyTable, db.MyTable.participantID == db.Participant.participantID).\
        filter(db.Participant.finished).\
        group_by(db.MyTable.participantID)

    return render_template("analysis.html", results=results)
