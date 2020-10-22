import * as React from 'react'
import { shallow } from 'enzyme'

import { App } from './app'

describe('App', () => {
  describe('when it renders', () => {
    let wrapper

    beforeAll(() => {
      wrapper = shallow(<App/>)
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })
})
