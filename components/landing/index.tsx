import * as React from 'react'
import { compose } from 'recompose'
import withSession from '../../utils/withSession'
import Welcome from './components/Welcome'
import AboutShow from './components/AboutShow'
import Menubar from '../Menubar'
import AuditionType from './components/AuditionType';
import Process from './components/Process'

const LandingPage = () => (
  <div>
    <Menubar /> 
    <Welcome />
    <AboutShow />
    <AuditionType />
    <Process />
  </div>
)

export default compose(withSession)(LandingPage)
