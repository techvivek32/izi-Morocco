import mongoose from 'mongoose';


const QuestionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    required: true,
    trim: true
  },


  questionDescription:{
    type:Object ,
  } ,

  answerType: {
    type: String,
    required: true,
    trim: true,
    enum: ["text", "mcq", "number", "multiple", "no_answer", "puzzle"],
    default: "text"
  },

  options: [
    {
      text: String,
      isCorrect: { type: Boolean }
    }
  ],

  correctAnswers: { 
    type: [mongoose.Schema.Types.Mixed], 
    required: function() {
      return this.answerType !== 'no_answer' && this.answerType !== 'puzzle';
    },
    default: []
  },

  puzzle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Puzzles",
    required: function() {
      return this.answerType === 'puzzle';
    }
  },

  points: { type: Number, required: true },

  tags: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags"
      }
    ],
    default: []
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  collection: "Questions",
  timestamps: true,
  versionKey: false
});


QuestionSchema.pre('save', function(next) {
  if (this.answerType === 'no_answer') {
    this.correctAnswers = [];
    this.puzzle = undefined;
  }
  
  if (this.answerType === 'puzzle') {
    this.correctAnswers = [];
  }
  
  if (this.answerType !== 'puzzle') {
    this.puzzle = undefined;
  }
  
  next();
});


export default mongoose.model("Questions", QuestionSchema);