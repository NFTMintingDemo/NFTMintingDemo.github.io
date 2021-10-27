const PARTICLE_PARAMS = {
	particles: {
		number: {
			value: 100,
			limit: 150,
			density: {
				enable: true,
				value_area: 800,
			},
		},
		color: {
			value: '#ffffff',
		},
		shape: {
			type: 'line',
			stroke: {
				width: 0,
				color: '#ffffff',
			},
			polygon: {
				nb_sides: 5,
			},
			image: {
				src: 'images/github.svg',
				width: 100,
				height: 100,
			},
		},
		opacity: {
			value: 0.5,
			random: true,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0.5,
				sync: false,
			},
		},
		size: {
			value: 30,
			random: true,
			anim: {
				enable: true,
				speed: 10,
				size_min: 10,
				sync: false,
			},
		},
		line_linked: {
			enable: true,
			distance: 100,
			color: '#ffffff',
			opacity: 1,
			width: 1,
		},
		move: {
			enable: true,
			speed: 3,
			direction: 'none',
			random: false,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
	},
	backgroundMask: {
		enable: true,
		cover: {
			color: {
				value: {
					r: 26,
					g: 16,
					b: 28,
				},
			},
		},
	},
	retina_detect: true,
	fps_limit: 60,
}

export default PARTICLE_PARAMS
