/* start example */
import Form, { FormGroup, SubmitButton, SubmitForm } from '@depack/form'
import PhotoUploader from 'photo-uploader'
import { render } from 'preact'
import Auth from './Auth'
import AppUser from './Auth/AppUser'

const _host = window['HOST'] || 'http://localhost:5000'

/**
 * This is the form to upload pictures.
 */
class GalleryForm extends SubmitForm {
  constructor() {
    super()
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      ...super.state,
    }
  }
  render({ galleryId, confirmText, uploadedResults, csrf }) {
    const { formLoading, error, success } = this.state
    const uri = `${this.context.host}/upload?csrf=${csrf}`
    return (
      <Form onSubmit={this.submit}>
        <input name="galleryId" value={galleryId} type="hidden" />
        <FormGroup label="File Upload" help="Please select some images and upload them.">
          <PhotoUploader uploadUri={uri} onPhotoUploaded={this.reset} onAdded={this.reset} onRemove={this.reset}
            uploadedResults={uploadedResults}
          />
        </FormGroup>
        <SubmitButton loading={formLoading} loadingText="Uploading..." confirmText={confirmText} />
      </Form>)
  }
}

class App extends Auth {
  constructor() {
    super()
    this.state = {
      ...this.state,
      uploadedResults: [],
    }
  }
  getChildContext() {
    return {
      host: this.props.host,
    }
  }
  addUploadedResults(results) {
    this.setState({ uploadedResults:
      [...this.state.uploadedResults, ...results],
    })
  }
  render() {
    const au = (<AppUser error={this.state.error} loading={this.state.loading} auth={this.state.auth} host={this.props.host} onSignOut={() => {
      this.setState({ auth: {} })
    }} />)
    if (!this.state.auth.github_user) return au

    return (<div>
      {au}
      <GalleryForm uploadedResults={this.state.uploadedResults} path="/save" confirmText="Save Uploads" submitFinish={async (result) => {
        // the form responds with ids of added uploads
        const { 'data': res } = await result.json()
        if (res) {
          this.addUploadedResults(res)
        }
      }} csrf={this.state.auth.csrf} />
    </div>)
  }
}
render(<App host={_host} />, window['preact-container'])

/* end example */
{/* <ErrorAlert error={error} />
<Success success={success} message="Images saved!" /> */}