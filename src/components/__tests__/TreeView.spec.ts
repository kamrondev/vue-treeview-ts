import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TreeView from '@/components/TreeView.vue'
import TreeItem from '@/components/TreeItem.vue'

describe('TreeView', () => {
	const items = [
		{
			id: 1,
			label: 'Item 1',
			children: [
				{ id: 2, label: 'Child 1' },
				{ id: 3, label: 'Child 2' },
			],
		},
	]

	const wrapper = mount(TreeView, {
		props: { items },
	})

	it('renders the correct number of TreeItem components', () => {
		const treeItems = wrapper.findAllComponents(TreeItem)
		expect(treeItems).toHaveLength(items.length)
	})

	it('passes the correct item to each TreeItem component', () => {
		const treeItems = wrapper.findAllComponents(TreeItem)
		treeItems.forEach((treeItemWrapper, index) => {
			const itemProp = treeItemWrapper.props('item')
			expect(itemProp).toEqual(items[index])
		})
	})
})
