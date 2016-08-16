import React, {Component} from 'react'
import Sidebar from 'lib/site/sidebar/component'
import TopicArticle from 'lib/site/topic-article/component'
import forumStore from 'lib/stores/forum-store/forum-store'
import topicStore from 'lib/stores/topic-store/topic-store'

export default class TopicLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topics: null,
      topic: null
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount () {
    this.getData(this.props.params.forumName, this.props.params.topicId)
  }

  componentWillReceiveProps (props) {
    this.getData(props.params.forumName, props.params.topicId)
  }

  getData (forumName, topicId) {
    Promise.all(
      [
        forumStore
          .findOneByName(forumName)
          .then(function (forum) {
            return topicStore
              .findAll({forum: forum.id})
          }),
        topicStore
          .findOne(topicId)
      ]
    )
    .then((results) => {
      this.setState({topics: results[0], topic: results[1]})
    })
  }

  render () {
    return (
      <div id='topic-wrapper'>
        <Sidebar className='nav-proposal' topics={this.state.topics} />
        <TopicArticle topic={this.state.topic} />
      </div>
    )
  }
}