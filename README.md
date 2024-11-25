# Motion for Svelte 5

This project is an experimental attempt to wrap Framer Motion (now known as [motion.dev](https://motion.dev)) with Svelte. The current implementation supports Server-Side Rendering (SSR) and utilizes runes for enhanced functionality.

## Installation

To install the package, run the following command:

```bash
npm i motion-svelte
```

## Usage Examples

### Basic Animation with Enter/Exit

```svelte
<Motion
	initial={{ opacity: 0, rotate: -30 }}
	animate={{ opacity: 1, rotate: 0 }}
	exit={{ opacity: 0, rotate: 30 }}
	transition={{ duration: 0.5 }}
>
	This is a notification!
</Motion>
```

### Infinite Animation

```svelte
<Motion animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
	Pulse
</Motion>
```

### Animation on State Change

```svelte
<Motion
	animate={{ rotate: spin ? 360 : 0 }}
	transition={{ duration: 1 }}
	onclick={() => (spin = !spin)}
>
	Click to Spin
</Motion>
```

### Hover Animation

```svelte
<Motion initial={{ y: 0 }} whileHover={{ y: -10 }}>Hover Card</Motion>
```

### Using Animate Directive

```svelte
<div
	use:animate={{
		scale: hover ? 1.2 : 1,
		rotate: hover ? 45 : 0,
		transition: { type: 'spring' }
	}}
>
	Hover Transform
</div>
```

### Keyframe Animation

```svelte
<Motion
	animate={{
		rotate: [0, 45, 0],
		scale: [1, 0.8, 1]
	}}
	transition={{
		duration: 2,
		repeat: Infinity,
		ease: 'easeInOut'
	}}
>
	Keyframes
</Motion>
```
