import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TreeItem from '@/components/TreeItem.vue'

describe('TreeItem', () => {
	const item = {
		id: 1,
		label: 'Item 1',
		children: [
			{ id: 2, label: 'Child 1' },
			{ id: 3, label: 'Child 2' },
		],
	}

	const wrapper = mount(TreeItem, {
		props: { item },
	})

	it('renders the label correctly', () => {
		const label = wrapper.get('.tree-item__label')
		expect(label.text()).toBe(item.label)
	})

	it('renders the checkbox', () => {
		const checkbox = wrapper.get('.tree-item__checkbox')
		expect(checkbox).toBeTruthy()
	})

	it('toggles the checkbox state when clicked', async () => {
		const checkbox = wrapper.get('.tree-item__checkbox')
		await checkbox.trigger('click')
		expect(wrapper.props().item.checked).toBe(true)
		expect(wrapper.props().item.children?.[0].checked).toBe(true)
		expect(wrapper.props().item.children?.[1].checked).toBe(true)
		await checkbox.trigger('click')
		expect(wrapper.props().item.checked).toBe(false)
		expect(wrapper.props().item.children?.[0].checked).toBe(false)
		expect(wrapper.props().item.children?.[1].checked).toBe(false)
	})
})
