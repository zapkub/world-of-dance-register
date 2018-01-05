import * as React from 'react'
import { compose } from 'recompose'
import withSession from '../../utils/withSession'
import Welcome from './components/Welcome'
import AboutShow from './components/AboutShow'
import Menubar from '../Menubar'
import AuditionType from './components/AuditionType';

const LandingPage = () => (
  <div>
    <Menubar /> 
    <Welcome />
    <AboutShow />
    <AuditionType />
  </div>
)

export default compose(withSession)(LandingPage)
