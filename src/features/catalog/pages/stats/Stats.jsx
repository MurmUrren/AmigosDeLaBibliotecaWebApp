import React from 'react';
import "./Stats.css";
import TopCollection from '@components/topCollection/TopCollection';
import ViewsCollections from '@components/viewsCollections/ViewsCollections';
import Charts from '@components/charts/Charts';

const Stats = () => {
    
    return (
        <div className='stats-container'>
            <TopCollection/>
            <div className='stats-flex'>
                <ViewsCollections />
                <Charts/>
            </div>
        </div>
    );
};

export default Stats;
