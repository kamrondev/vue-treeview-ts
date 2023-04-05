<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import ArrowIcon from './icons/ArrowIcon.vue'

export interface TreeViewItem {
	id: number
	label: string
	children?: TreeViewItem[]
	checked?: boolean | string
}

const props = defineProps({
	item: {
		type: Object as PropType<TreeViewItem>,
		required: true,
	},
})

const { item } = props

const emit = defineEmits(['child-checked'])
const showChildren = ref(false)

const toggleChildren = () => {
	showChildren.value = !showChildren.value
}

const handleCheckboxChange = () => {
	item.checked = !item.checked
	if (item.children) {
		item.children.forEach(child => {
			checkAllChildren(child, item.checked as boolean)
		})
	}
	emit('child-checked', item)
}

const checkAllChildren = (item: TreeViewItem, checked: boolean | string) => {
	item.checked = checked
	if (item.children) {
		item.children.forEach(child => checkAllChildren(child, checked))
	}
}

const handleChildChecked = (child: TreeViewItem) => {
	if (item.children?.every(c => c.checked)) {
		item.checked = true
	} else if (item.children?.some(c => c.checked)) {
		item.checked = 'indeterminate'
	} else {
		item.checked = false
	}
	emit('child-checked', child)
}
</script>

<template>
	<div class="tree-item__container flex items-center space-x-2">
		<div
			v-if="item.children"
			class="tree-item__toggle cursor-pointer"
			@click="toggleChildren"
		>
			<ArrowIcon
				:class="[
					'tree-item__icon w-5 h-5 text-white transform transition-transform duration-300',
					showChildren ? 'tree-item__icon--open rotate-90' : '',
				]"
			/>
		</div>
		<div v-else class="tree-item__spacer w-5 h-5"></div>
		<div
			class="tree-item__checkbox w-5 h-5 border border-gray-300 rounded-sm relative cursor-pointer"
			:class="[
				item.checked === true ? 'tree-item__checkbox--checked' : '',
				item.checked === 'indeterminate'
					? 'tree-item__checkbox--indeterminate'
					: '',
			]"
			@click="handleCheckboxChange"
		>
			<div class="tree-item__checkmark"></div>
			<div class="tree-item__minus"></div>
		</div>
		<label @click="handleCheckboxChange" class="tree-item__label text-white">{{
			item.label
		}}</label>
	</div>
	<div
		:class="[item.children ? 'pl-6 py-2 space-y-2' : '']"
		v-if="item.children && showChildren"
	>
		<tree-item
			v-for="child in item.children"
			:item="child"
			:key="child.id"
			@child-checked="handleChildChecked"
		/>
	</div>
</template>

<style scoped>
.tree-item__checkmark {
	@apply absolute w-1 h-2 border-white border-t-0 border-l-0 border-r-[3px] border-b-[3px] transform rotate-45 top-1 left-2 opacity-0 transition-opacity duration-200;
}
.tree-item__checkbox--checked .tree-item__checkmark {
	@apply opacity-100;
}
.tree-item__checkbox--indeterminate .tree-item__checkmark {
	@apply opacity-0;
}
.tree-item__minus {
	@apply absolute w-2 h-0.5 bg-white top-2 left-1.5 opacity-0 transition-opacity duration-200;
}
.tree-item__checkbox--indeterminate .tree-item__minus {
	@apply opacity-100;
}
.tree-item__checkbox--checked {
	@apply border-white;
}
</style>
