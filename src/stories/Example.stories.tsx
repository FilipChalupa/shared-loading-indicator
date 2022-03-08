import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Button } from './Button'
import { Example } from './Example'

export default {
	title: 'Example',
	component: Example,
} as ComponentMeta<typeof Example>

const Template: ComponentStory<typeof Button> = (args) => <Example {...args} />

export const Demo = Template.bind({})
