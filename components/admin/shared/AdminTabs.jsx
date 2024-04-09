import { useEffect, useState } from 'react'

export default function AdminTabs({ options = [], currentTab, onTabClick }) {
	const [currentTabIndex, setCurrentTabIndex] = useState(currentTab || 0)

	useEffect(() => {
		if (currentTab && currentTab !== currentTabIndex) {
			setCurrentTabIndex(currentTab)
		}
	}, [currentTab])

	return (
		<div className='adminTabs' key={`AdminTabs_${currentTabIndex}`}>
			<div className='adminTabs__options'>
				{options.map((item, ind) => (
					<button
						key={ind}
						onClick={() => {
							setCurrentTabIndex(ind)
							onTabClick?.(ind)
						}}
						className={currentTabIndex === ind ? 'active' : ''}
					>
						{item.name}
					</button>
				))}
			</div>
			<div className='adminTabs__content'>
				{options[currentTabIndex].element}
			</div>
		</div>
	)
}
