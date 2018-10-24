const _ = require('lodash')

module.exports = function ({ columns = _.range(1, 12), gutter, variants = ['responsive']}) {
	return function ({ e, addUtilities }) {
		addUtilities([
			
			{'.row': {
				display: 'flex',
				flexWrap: 'wrap',
				marginLeft: `${gutter / -2}px`, 
				marginRight: `${gutter / -2}px`,
			}},
			
			{'.col': {
				flexBasis: 0,
				flexGrow: 1,
				maxWidth: '100%',
				paddingRight: `${gutter / 2}px`,
				paddingLeft: `${gutter / 2}px`,
			}},	

			...columns.map(size => ({
				[`.col-${size}`]: {
					position: 'relative',
					width: '100%',
					minHeight: '1px',
					paddingRight: `${gutter / 2}px`,
					paddingLeft: `${gutter / 2}px`,
					flex: `0 0 ${size / _.max(columns) * 100}%`,
					maxWidth: `${size / _.max(columns) * 100}%`,
				}
			})),

			{'.order-first': {
				order: '-1'
			}},

			{'.order-last': {
				order: `${_.max(columns) + 1}`,
			}},	

			...columns.map(size => ({
				[`.order-${size}`]: {
					order: `${size}`,
				}
			})),

			...columns.map(size => ({
				[`.offset-${size}`]: {
					marginLeft: getOffset(size, columns),
				}
			})),
		], variants)
	}
}

function getOffset(size, columns) {
	const num = size / _.max(columns);

	if(num === 1) {
		return '0';
	}

	return `${size / _.max(columns) * 100}%`;
}
