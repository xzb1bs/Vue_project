import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AddPetForm from '../AddPetForm.vue'

describe('AddPetForm', () => {
  it('renders form inputs correctly', () => {
    const wrapper = mount(AddPetForm)

    expect(wrapper.find('input[placeholder="Имя питомца"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Тип (Кот, Собака...)"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('shows error message when name is too short', async () => {
    const wrapper = mount(AddPetForm)

    const nameInput = wrapper.find('input[placeholder="Имя питомца"]')
    await nameInput.setValue('A')
    await nameInput.trigger('blur')

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Имя должно содержать минимум 2 символа')
  })

  it('shows error message when URL is invalid', async () => {
    const wrapper = mount(AddPetForm)

    const imgInput = wrapper.find('input[type="url"]')
    await imgInput.setValue('not-a-url')
    await imgInput.trigger('blur')

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Введите корректную URL ссылку')
  })

  it('disables submit button when form is invalid', async () => {
    const wrapper = mount(AddPetForm)

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('emits add event with correct data when form is valid and submitted', async () => {
    const wrapper = mount(AddPetForm)

    await wrapper.find('input[placeholder="Имя питомца"]').setValue('Fluffy')
    await wrapper.find('input[placeholder="Тип (Кот, Собака...)"]').setValue('Кот')
    await wrapper.find('input[placeholder="Порода"]').setValue('Persian')
    await wrapper.find('input[type="number"]').setValue('24')
    await wrapper.find('input[placeholder="Город"]').setValue('Almaty')
    await wrapper.find('input[type="url"]').setValue('https://example.com/cat.jpg')
    await wrapper.find('textarea').setValue('A lovely cat looking for a home')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add')).toBeTruthy()
    const pet = wrapper.emitted('add')[0][0]
    expect(pet.name).toBe('Fluffy')
    expect(pet.type).toBe('Кот')
  })
})

