import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SiteStatus = ({ site }) => {
    const [status, setStatus] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/monitor/' + site.url)
            .then((res) => {
                setStatus(res.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="inline-flex flex-row items-center bg-gray-900 text-gray-100 p-6 border border-gray-800 rounded-lg">
            <div className="mr-4">
                {!isLoading ? (
                    <div
                        className="inline-flex justify-center items-center text-green-400 text-sm font-bold border-2 border-green-400 rounded-full"
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    >
                        ↑
                    </div>
                ) : (
                        <div
                            className="inline-flex justify-center items-center text-gray-500 text-sm font-bold border-2 border-gray-700 rounded-full"
                            style={{
                                width: 50,
                                height: 50,
                            }}
                        >
                            ↑↓
                        </div>
                    )}
            </div>
            <div>
                <h1 className="font-bold leading-tight">
                    {site.title}
                </h1>
                <p className="text-gray-500 text-xs">
                    {site.url}
                </p>
            </div>
            <div className="ml-auto mr-3">
                {!isLoading ? (
                    <div className="text-green-400 font-bold text-sm px-3 py-1 rounded-full">
                        {status.responseEnd}ms
                    </div>
                ) : (
                    <div className="text-gray-500 font-bold text-sm px-3 py-1 rounded-full">
                        0ms
                    </div>
                )}
            </div>
        </div>
    );
};

export default SiteStatus;