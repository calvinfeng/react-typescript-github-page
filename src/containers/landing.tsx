import * as React from 'react'
import ReactPlayer from 'react-player'
import ProjectCard from '../components/project_card'
import {
  Menu, MenuItem, IconButton, Paper, Grid, Snackbar
} from '@material-ui/core'
import './landing.scss'

interface LandingProps {}

interface LandingState {
    snackBarOpen: boolean
    snackBarMessage: string
}

class Landing extends React.Component<LandingProps, LandingState> {
  constructor(props) {
    super(props)

    this.state = {
      snackBarOpen: false,
      snackBarMessage: ""
    }
  }

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false, snackBarMessage: "" })
  }

  newSnackBarOpenHandler = (msg) => () => {
    this.setState(({ snackBarOpen: true, snackBarMessage: msg }))
  }

  get introduction() {
    return (
      <Paper className="introduction" elevation={1}>
        <div className="background-video">
        <ReactPlayer
            url={"https://www.youtube.com/watch?v=9d8wWcJLnFI"}
            width={"1024px"}
            height={"576px"}
            loop={true}
            muted={true}
            playing={true} />
        </div>
        <div className="foreground-text">
          <h1>Hi, I'm Calvin</h1>
          <h2>I learn & build things, including what you're looking at</h2>
        </div>
      </Paper>
    )
  }

  get gallery() {
    const config = require('../configs/projects.json')
    const cards = config.projects.map((project) => {
      return (
        <Grid key={project.id} item>
          <ProjectCard title={project.title} description={project.description} image={project.image} />
        </Grid>
      )
    })

    return (
      <Paper className="gallery" elevation={1}>
        <Grid container 
          className="project-grid" 
          direction="column" 
          onMouseEnter={this.newSnackBarOpenHandler("Things I built")}
          onMouseLeave={this.handleSnackBarClose}>
          <Grid container className="grid-row" direction="row" spacing={16} justify="center" >{cards}</Grid>
        </Grid>
        <section className="logos"
          onMouseEnter={this.newSnackBarOpenHandler("Tools I use")}
          onMouseLeave={this.handleSnackBarClose}>
          <img alt="Golang" src="/static/logos/golang.png" />
          <img alt="Python" src="/static/logos/python.png" />
          <img alt="React" src="/static/logos/react.png" />
          <img alt="JavaScript" src="/static/logos/javascript.png" />
          <img alt="Rails" src="/static/logos/rails.png" />
          <img alt="Ruby" src="/static/logos/ruby.png" />
          <img alt="Node" src="/static/logos/node.png" />
          <img alt="TypeScript" src="/static/logos/typescript.png" />
          <img alt="Apache Kafka" src="/static/logos/kafka.png" />
          <img alt="PostgreSQL" src="/static/logos/postgresql.png" />
          <img alt="Cassandra" src="/static/logos/cassandra.png" />
          <img alt="Docker" src="/static/logos/docker.png" />
          <img alt="Tensorflow" src="/static/logos/tensorflow.svg" />
          <img alt="ROS" src="/static/logos/ros.png" />
        </section>
      </Paper>
    )
  }

  render() {
    return (
      <section className="landing">
        {this.introduction}
        {this.gallery}
        <Snackbar
          onClose={this.handleSnackBarClose}
          open={this.state.snackBarOpen} 
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} 
          message={<span>{this.state.snackBarMessage}</span>} />
      </section>
    )
  }
}

export default Landing