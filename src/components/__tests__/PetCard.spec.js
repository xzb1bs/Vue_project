import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PetCard from '../PetCard.vue'

describe('PetCard', () => {
  const mockPet = {
    id: 1,
    name: 'Fluffy',
    type: 'Кот',
    ageText: '2 года',
    location: 'Almaty',
    desc: 'A very fluffy cat looking for a home',
    img: 'https://example.com/cat.jpg',
    liked: false
  }

  it('renders pet information correctly', () => {
    const wrapper = mount(PetCard, {
      props: {
        pet: mockPet
      }
    })

    expect(wrapper.text()).toContain('Fluffy')
    expect(wrapper.text()).toContain('Кот')
    expect(wrapper.text()).toContain('Almaty')
  })

  it('emits like event when like button is clicked', async () => {
    const wrapper = mount(PetCard, {
      props: {
        pet: mockPet
      }
    })

    const likeButton = wrapper.find('.btn-like')
    await likeButton.trigger('click')

    expect(wrapper.emitted('like')).toBeTruthy()
    expect(wrapper.emitted('like')[0]).toEqual([mockPet.id])
  })

  it('emits open event when more button is clicked', async () => {
    const wrapper = mount(PetCard, {
      props: {
        pet: mockPet
      }
    })

    const moreButton = wrapper.find('.btn-more')
    await moreButton.trigger('click')

    expect(wrapper.emitted('open')).toBeTruthy()
    expect(wrapper.emitted('open')[0]).toEqual([mockPet])
  })

  it('shows delete button when showDelete prop is true', () => {
    const wrapper = mount(PetCard, {
      props: {
        pet: mockPet,
        showDelete: true
      }
    })

    const deleteButton = wrapper.find('.btn-delete')
    expect(deleteButton.exists()).toBe(true)
  })

  it('hides delete button when showDelete prop is false', () => {
    const wrapper = mount(PetCard, {
      props: {
        pet: mockPet,
        showDelete: false
      }
    })

    const deleteButton = wrapper.find('.btn-delete')
    expect(deleteButton.exists()).toBe(false)
  })

  it('applies liked class when pet is liked', () => {
    const likedPet = { ...mockPet, liked: true }
    const wrapper = mount(PetCard, {
      props: {
        pet: likedPet
      }
    })

    const card = wrapper.find('.card')
    expect(card.classes()).toContain('liked')
  })
})

