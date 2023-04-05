<script lang="ts" setup>
import TreeItem from '@/components/TreeItem.vue'
import type { PropType } from 'vue'

export interface TreeViewItem {
	id: number
	label: string
	children?: TreeViewItem[]
	checked?: boolean | string
}

const props = defineProps({
	items: {
		type: Array as PropType<TreeViewItem[]>,
		required: true,
	},
})

const { items } = props

const handleCheckboxChange = (updatedItem: TreeViewItem) => {
	if (updatedItem && updatedItem.children) {
		updatedItem.checked = updatedItem.children.every(child => child.checked)
	}
	if (items) {
		items.forEach(item => {
			if (item.children) {
				item.checked = item.children.every(child => child.checked)
			}
		})
	}
}
</script>

<template>
	<div v-for="(item, index) in items" :key="index" class="px-4 py-2">
		<TreeItem :item="item" @child-checked="handleCheckboxChange($event)" />
	</div>
</template>
