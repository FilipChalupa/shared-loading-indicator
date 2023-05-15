# [Material UI](https://mui.com/material-ui/react-progress/#linear)

Do you want to use something else than `<SharedProgressLoadingIndicator>` as a global indicator? You can built your own. Get inspired by `<CustomSharedProgressLoadingIndicator>`.

## `CustomSharedProgressLoadingIndicator.jsx`

```jsx
import { LinearProgress } from '@mui/material'
import clsx from 'clsx'
import { useSharedLoading } from 'shared-loading-indicator'
import styles from './CustomSharedProgressLoadingIndicator.module.css'

export const CustomSharedProgressLoadingIndicator = () => {
	const isLoading = useSharedLoading()

	return (
		<div className={clsx(styles.wrapper, isLoading && styles.is_loading)}>
			<LinearProgress />
		</div>
	)
}
```

## `CustomSharedProgressLoadingIndicator.module.css`

```css
.wrapper {
	position: fixed;
	z-index: 10;
	inset: 0 0 auto;
	pointer-events: none;
	transform: translateY(-100%);
}

.wrapper.is_loading {
	transform: none;
}

@media (prefers-reduced-motion: no-preference) {
	.wrapper {
		transition-property: opacity, visibility, transform;
		transition-duration: 0.3s;
	}
}
```
