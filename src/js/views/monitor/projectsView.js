const React = require('react')
const ReactDOM = require('react-dom')
const styler = require('../../controllers/styler')
const InterestingProject = require('./InterestingProject')
const DisplayStore = require('../../stores/DisplayStore')

module.exports = React.createClass({
  displayName: 'Projects',

  propTypes: {
    projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  render() {
    return (
      <ul id='interesting-projects' className='monitor-projects'>
        {
          this.props.projects.map(project => {
            return <InterestingProject key={project.projectId}
                                       prognosis={project.prognosis}
                                       name={project.name}
                                       lastBuildTime={project.lastBuildTime}
                                       showBrokenBuildTimers={DisplayStore.areBrokenBuildTimersEnabled()}/>
          })
        }
      </ul>
    )
  },

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    styler.styleProjects(this.props.projects, node.querySelectorAll('.monitor-outer-container'), node)
  },

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this)
    styler.styleProjects(this.props.projects, node.querySelectorAll('.monitor-outer-container'), node)
  }
})
