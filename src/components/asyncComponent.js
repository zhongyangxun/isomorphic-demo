import React from 'react'

const asyncComponent = (loadComponent, callback) => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        Component: null
      }
    }

    componentDidMount() {
      if (this.isModuleLoaded()) {
        return
      }

      loadComponent()
        .then((module) => {
          if (typeof callback === 'function') {
            return callback(module)
          }
          return module.default ? module.default : module
        })
        .then((Component) => {
          this.setState({
            Component
          })
        })
        .catch((err) => {
          window.console.error('cannot load component in <AsyncComponent>')

          throw err
        })
    }

    isModuleLoaded() {
      return this.state.Component !== null
    }

    render() {
      const { Component } = this.state

      return (
        Component ? (
          <Component {...this.props} />
        ) : null
      )
    }
  }
)

export default asyncComponent
