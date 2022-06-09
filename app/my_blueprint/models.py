def create(db):
    class timemap(db.Model):
        __tablename__ = "timemapV01"
        ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
        participantID = db.Column(db.Integer, db.ForeignKey('participant.participantID'))
        answeredOn = db.Column(db.DateTime, nullable=False, default=db.func.now())
        trialStart = db.Column(db.String)
        trialEnd = db.Column(db.String)
        trialTime = db.Column(db.String)
        mode = db.Column(db.String)
        view = db.Column(db.String)
        shape = db.Column(db.String)
        encoding = db.Column(db.String)
        size = db.Column(db.String)
        Condition = db.Column(db.String)
        QuestionType = db.Column(db.String)
        ErrorCount = db.Column(db.String)
        selectItems = db.Column(db.String)
        hoverCount = db.Column(db.String)
        hoverItems = db.Column(db.String)
        zoomLevel = db.Column(db.String)
        questionNumber = db.Column(db.String)
        perceptualTask = db.Column(db.String)
        decisionTask = db.Column(db.String)
        comparisonBasis = db.Column(db.String)
        fullscreenLog = db.Column(db.String)
        #color = db.Column(db.String)

    class visionTest(db.Model):
        __tablename__ = "visionTestLog"
        ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
        participantID = db.Column(db.Integer, db.ForeignKey('participant.participantID'))
        answeredOn = db.Column(db.DateTime, nullable=False, default=db.func.now())
        vissioncomment = db.Column(db.String)
        deficiency = db.Column(db.String)
        deficiencyText = db.Column(db.String)
    
    return timemap, visionTest

    
