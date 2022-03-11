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
        log.hoverCount = request.form['hoverCount']
        log.zoomLevel = request.form['zoomLevel']
        log.questionNumber=request.form['questionNumber']
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
        log.hoverCount = request.form['hoverCount']
        log.zoomLevel = request.form['zoomLevel']
        log.questionNumber=request.form['questionNumber']
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
        log.hoverCount = request.form['hoverCount']
        log.zoomLevel = request.form['zoomLevel']
        log.questionNumber=request.form['questionNumber']
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
        log.hoverCount = request.form['hoverCount']
        log.zoomLevel = request.form['zoomLevel']
        log.questionNumber=request.form['questionNumber']
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
        log.hoverCount = request.form['hoverCount']
        log.zoomLevel = request.form['zoomLevel']
        log.questionNumber=request.form['questionNumber']
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
        log.hoverCount = request.form['hoverCount']
        log.zoomLevel = request.form['zoomLevel']
        log.questionNumber=request.form['questionNumber']
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
