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
          <link href="/static/fonts/some-unfriendly-to-read/stylesheet.css" rel="stylesheet" />
          <link href='/static/fonts/awesome/regular.min.css' rel='stylesheet' />
          <link href='/static/fonts/awesome/stylesheet.min.css' rel='stylesheet' />
          <link href='/static/cropper.min.css' rel='stylesheet' />
          <link href='/static/animate.css' rel='stylesheet' />
          <link href='/static/react-datepicker.min.css' rel='stylesheet' />
          <meta
            id="vp"
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <script dangerouslySetInnerHTML={{__html:`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2085850911651030'); 
            fbq('track', 'PageView');
          `}}>

          </script>
          <noscript>
          <img height="1" width="1" 
          src="https://www.facebook.com/tr?id=2085850911651030&ev=PageView&noscript=1"/>
          </noscript>
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
