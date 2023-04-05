import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
	const wrapper = mount(App)

	it('renders the LogoIcon component', () => {
		const logoIcon = wrapper.get('svg')
		expect(logoIcon).toBeTruthy()
	})
})
