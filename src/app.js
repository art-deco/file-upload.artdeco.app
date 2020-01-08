import { c } from 'erte'
import Server from './server'

;(async () => {
  try {
    const { url } = await Server({
      port: process.env.PORT,
      appName: 'file-upload.artdeco.app',
      GITHUB_ID: process.env.GITHUB_ID,
      GITHUB_SECRET: process.env.GITHUB_SECRET,
    })
    console.log('Started on %s', c(url, 'green'))
  } catch ({ stack }) {
    console.log(stack)
    process.exit(1)
  }
})()