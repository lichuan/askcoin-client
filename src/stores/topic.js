import {action} from 'mobx';
import {extendObservable} from 'mobx'


class TopicState {
  constructor() {
    const that = this;
    extendObservable(this, {
      topics: [],
      questions: [],
      answers: [],
      selectTopic: {},
      replies: [],
      selectReply: {},
      allReplies: [],

      handleTopics: action((topics) => {
        that.topics = topics
      }),
      handleQuestions: action((questions) => {
        that.questions = questions
      }),
      handleAnswers: action((answers) => {
        that.answers = answers
      }),
      handleSelectTopic: action((selectTopic) => {
        that.selectTopic = selectTopic
      }),
      handleReplies: action((replies) => {
        that.replies = replies
      }),
      handleSelectReply: action((selectReply) => {
        that.selectReply = selectReply
      }),
      handleAllReplies: action((allReplies) => {
        that.allReplies = allReplies
      }),
      clear: action(()=>{
        that.replies = [];
        that.questions = [];
        that.topics = [];
        that.allReplies = [];
        that.answers = [];
        that.selectReply = [];
        that.selectTopic = [];
      })
    })
  }
}

export default new TopicState()