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
        Condition = db.Column(db.String)
        QuestionType = db.Column(db.String)
        ErrorCount = db.Column(db.String)
        hoverCount = db.Column(db.String)
        zoomLevel = db.Column(db.String)
        questionNumber = db.Column(db.String)
    return timemap
