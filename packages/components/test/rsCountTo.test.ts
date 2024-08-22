import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import rsCountTo from '../rsCountTo/index'

describe('测试动态数字组件', () => {
  it('should have class', async () => {
    expect(rsCountTo).toBeTruthy()
    const wrapper = mount(rsCountTo, {
      props: {
        endVal: 7777777
      }
    })
    expect(wrapper.getCurrentComponent().props.endVal).toBe(7777777)
  })

})
