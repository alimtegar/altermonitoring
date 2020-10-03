import React, { useState } from 'react';
import SiteStatus from './components/SiteStatus';

function App() {
	const sites = [
		{
			id: 1,
			title: 'AlterWeb',
			url: 'alter.web.id',
		},
		{
			id: 2,
			title: 'Baleroom',
			url: 'baleroom.com',
		},
		{
			id: 3,
			title: 'Optik Atan Raya Jogja',
			url: 'baleroom.com',
		},
		{
			id: 4,
			title: 'Djanoer Kuning',
			url: 'djanoerkuning.com',
		},
	];
	const [totalSitesLoading, setTotalSitesLoading] = useState(0);
	const [totalSitesUp, setTotalSitesUp] = useState(0);
	const [totalSitesDown, setTotalSitesDown] = useState(0);

	// const addTotalSitesLoading = (number) => { 
	// 	setTotalSitesLoading(totalSitesLoading + number); 
	// };
	// const addTotalSitesUp = (number) => { setTotalSitesUp(totalSitesUp + number); };
	// const addTotalSitesDown = (number) => { setTotalSitesDown(totalSitesDown + number); };

	return (
		<div className="flex bg-gray-800 text-white h-screen">
			<div className="w-1/5">
				<div className="bg-gray-900 h-screen py-8 px-6">
					<div className="text-center mb-16">
						<h1 className="text-lg leading-tight font-bold">AlterMonitoring</h1>
						<p className="text-gray-500 text-xs">by AlterWeb</p>
					</div>

					<div className="relative w-full text-sm py-2 px-1 mb-4 border-gray-700 rounded-none">
						<div className="absolute inset-0 w-full bg-gray-700" style={{ height: 2, }} />	
						<div className="absolute inset-0 bg-yellow-400" style={{ width: `${totalSitesLoading / sites.length * 100}%`, height: 2, }} />
						<span className="font-bold">{totalSitesLoading}</span> of {sites.length} Sites are loading
					</div>

					<div className="relative w-full text-sm py-2 px-1 mb-4 border-gray-700 rounded-none">
						<div className="absolute inset-0 w-full bg-gray-700" style={{ height: 2, }} />
						<div className="absolute inset-0 bg-green-400" style={{ width: `${totalSitesUp / sites.length * 100}%`, height: 2, }} />
						<span className="font-bold">{totalSitesUp}</span> of {sites.length} Sites are up
					</div>

					{/* <div className="w-full text-sm py-2 px-1 mb-4 border-t-2 border-gray-700 rounded-none">
						<span className="font-bold">{totalSitesDown}</span> of {sites.length} Sites are down
					</div> */}
				</div>
			</div>
			<div className="w-4/5 p-8">
				<div className="grid grid-cols-2 gap-4">
					{sites.map((site) => (
						<SiteStatus
							site={site}
							setTotalSitesLoading={setTotalSitesLoading}
							setTotalSitesUp={setTotalSitesUp}
							key={site.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;