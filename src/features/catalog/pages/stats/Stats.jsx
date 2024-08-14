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
            <div className='stats-flex'>
                <h1>
                    Estadísticas de libros
                </h1>
                <div>
                    <ul>
                        <li>
                            <span>Libros mas vistos:</span> 100
                        </li>
                        <li>
                            <span>Libros totales en x:</span> 50
                        </li>
                        <li>
                            <span>Libros sin categorias:</span> 50
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Stats;
