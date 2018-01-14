import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import * as StyledComponent from 'styled-components'
import injectGlobalStyles from '../components/GlobalStyles'

injectGlobalStyles()

export default class PageDocument extends Document {
  public props: {
    styleTags: any
  }
  public static getInitialProps({ renderPage }) {
    const sheet = new (StyledComponent as any).ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  public render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" className="next-head" />
          <link href="https://fonts.googleapis.com/css?family=Kanit:400,400i,500,700,700i&amp;subset=thai" rel="stylesheet" />
          <link href="/static/fonts/wod/stylesheet.css" rel="stylesheet" />
          <link href='/static/fonts/awesome/regular.min.css' rel='stylesheet' />
          <link href='/static/fonts/awesome/stylesheet.min.css' rel='stylesheet' />
          <link href='/static/cropper.min.css' rel='stylesheet' />
          <link href='/static/react-datepicker.min.css' rel='stylesheet' />
          <meta
            id="vp"
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          {/* tslint:disable-line */}
          {this.props.styleTags}
        </Head>
        <body>
          <div className="root">
            <Main />
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}
