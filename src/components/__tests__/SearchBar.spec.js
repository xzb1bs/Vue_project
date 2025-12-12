import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'

describe('SearchBar', () => {
  const mockProps = {
    types: ['Все типы', 'Кот', 'Собака'],
    cities: ['Все города', 'Almaty', 'Astana'],
    genders: ['Любой', 'Мальчик', 'Девочка']
  }

  it('renders search inputs correctly', () => {
    const wrapper = mount(SearchBar, {
      props: mockProps
    })

    expect(wrapper.find('input[placeholder="Поиск по имени или описанию"]').exists()).toBe(true)
    expect(wrapper.findAll('select').length).toBe(3)
  })

  it('emits search event with correct data when apply is called', async () => {
    const wrapper = mount(SearchBar, {
      props: mockProps
    })

    await wrapper.vm.apply()

    expect(wrapper.emitted('search')).toBeTruthy()
    const searchData = wrapper.emitted('search')[0][0]
    expect(searchData).toHaveProperty('q')
    expect(searchData).toHaveProperty('city')
    expect(searchData).toHaveProperty('type')
    expect(searchData).toHaveProperty('gender')
  })

  it('resets all filters when reset is called', async () => {
    const wrapper = mount(SearchBar, {
      props: mockProps
    })

    // Set some values
    await wrapper.find('input').setValue('test search')
    await wrapper.findAll('select')[0].setValue('Almaty')

    // Reset
    await wrapper.vm.reset()

    expect(wrapper.find('input').element.value).toBe('')
  })
})

