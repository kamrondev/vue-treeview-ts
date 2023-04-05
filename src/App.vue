<script setup lang="ts">
import { ref } from 'vue'
import TreeView from './components/TreeView.vue'
import LogoIcon from './components/icons/LogoIcon.vue'

export interface TreeViewItem {
	id: number
	label: string
	children?: TreeViewItem[]
	checked?: boolean | string
}

const treeViewItems = ref<TreeViewItem[]>([
	{
		id: 1,
		label: 'Javascript',
		children: [
			{
				id: 2,
				label: 'Vue',
				children: [
					{ id: 5, label: 'Vue-Router' },
					{ id: 6, label: 'Pinia' },
				],
			},
			{
				id: 3,
				label: 'React',
				children: [
					{ id: 7, label: 'Redux' },
					{ id: 8, label: 'Remix' },
				],
			},
			{ id: 4, label: 'Angular' },
		],
	},
	{
		id: 9,
		label: 'Java',
		children: [
			{
				id: 10,
				label: 'Spring Boot',
			},
		],
	},
])
</script>

<template>
	<div class="w-full min-h-screen bg-back flex flex-col items-center pt-12">
		<LogoIcon class="w-48 h-48" />
		<div class="w-[480px] px-6 py-4">
			<TreeView :items="treeViewItems" />
		</div>
	</div>
</template>
