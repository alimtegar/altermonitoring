import React from 'react';
import SiteStatus from './components/SiteStatus';

function App() {
	const sites = [
		// {
		// 	id: 1,
		// 	title: 'AlterWeb',
		// 	url: 'alter.web.id',
		// },
		{
			id: 2,
			title: 'Baleroom',
			url: 'baleroom.com',
		},
		// {
		// 	id: 3,
		// 	title: 'Optik Atan Raya Jogja',
		// 	url: 'baleroom.com',
		// },
		// {
		// 	id: 4,
		// 	title: 'Djanoer Kuning',
		// 	url: 'djanoerkuning.com',
		// },
	];

	return (
		<div className="flex bg-gray-800 text-white h-screen">
			<div className="w-1/5">
				<div className="bg-gray-900 h-screen py-8 px-6">
					<div className="text-center mb-16">
						<h1 className="text-lg leading-tight font-bold">AlterMonitoring</h1>
						<p className="text-gray-500 text-xs">by AlterWeb</p>
					</div>

					<div className="w-full text-sm py-2 px-1 mb-4 border-t-2 border-green-400 rounded-none">
						<span className="font-bold">4</span> of 5 Sites are loaded
					</div>

					<div className="w-full text-sm py-2 px-1 mb-4 border-t-2 border-gray-700 rounded-none">
						<span className="font-bold">0</span> of 5 Sites are down
					</div>
				</div>
			</div>
			<div className="w-4/5 p-8">
				<div className="grid grid-cols-2 gap-4">
					{sites.map((site) => (
						<SiteStatus site={site} key={site.id} />
					))}
				</div>
			</div>
		</div>
	);
}

export default App;