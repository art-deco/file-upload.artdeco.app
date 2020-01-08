import { Component } from 'preact'
import unfetch from 'unfetch'

/**
 * Fetches authorisation data from the server.
 */
export default class Auth extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      error: null,
      /** @type {!Auth} */
      auth: {},
    }
    this.pml = /** @type {function(!Event)} */(this.postMessageListener.bind(this))

    window.addEventListener('message', this.pml, false)
  }
  componentDidMount() {
    this.auth()
  }
  async auth() {
    this.setState({ loading: true })
    try {
      const res = await unfetch(`${this.props.host}/auth`, {
        credentials: 'include',
      })
      const auth = await res.json()
      this.setState({ auth })
    } catch (err) {
      this.setState({ error: err.message })
    } finally {
      this.setState({ loading: false })
    }
  }
  /**
   * @param {!MessageEvent} event
   */
  postMessageListener(event) {
    const { data, origin } = event
    if (origin != this.props.host) return
    if (data == 'signedin') this.auth()
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.pml)
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Auth} Auth
 */
