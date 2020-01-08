import { render, Component } from 'preact'

class App extends Component {
  render() {
    return (<div>Hello Preact</div>)
  }
}
render(<App />, window['preact'])