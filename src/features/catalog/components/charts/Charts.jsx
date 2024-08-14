import React, { useEffect, useState } from "react";
import { useAllViewsCollections } from '@hooks/useCollectionTop';
import * as d3 from "d3";
import { saveAs } from 'file-saver';
import './Charts.css';

const Charts = () => {

    const [chartType, setChartType] = useState('bar'); // Estado para seleccionar tipo de gráfico
    const allViewsCollections = useAllViewsCollections();

    const drawChart = () => {
        // Eliminar cualquier gráfico previo
        d3.select("#chart").select("svg").remove();

        if (chartType === 'bar') {
            drawBarChart();
        } else if (chartType === 'pie') {
            drawPieChart();
        }
    };

    const drawBarChart = () => {
        const data = allViewsCollections;

        // Configuración del SVG
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Crear SVG
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Escala X
        const x = d3.scaleBand()
            .domain(data.map(d => d.title))
            .range([0, width])
            .padding(0.1);

        // Escala Y
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.TotalViews)])
            .nice()
            .range([height, 0]);

        // Eje X
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        // Eje Y
        svg.append("g")
            .call(d3.axisLeft(y));

        // Barras
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.title))
            .attr("y", d => y(d.TotalViews))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.TotalViews))
            .attr("fill", "steelblue");
    };

    const drawPieChart = () => {
        const data = allViewsCollections;

        // Configuración del SVG
        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        // Crear SVG
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        // Crear el generador de arco
        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        // Crear el generador de pastel
        const pie = d3.pie()
            .sort(null)
            .value(d => d.TotalViews);

        const arcs = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        // Dibujar el gráfico de pastel
        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => d3.schemeCategory10[i]);

        // Añadir las etiquetas
        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(d => d.data.title);
    };

    const downloadChart = () => {
        const svg = d3.select("#chart svg").node();
        const svgString = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        saveAs(blob, `chart-${chartType}.svg`);
    };

    useEffect(() => {
        if (allViewsCollections.length > 0) {
            drawChart();
        }
    }, [allViewsCollections, chartType]);

    return (
        <div className="charts-container">
            <div>
                <label className="charts-label">Tipo de gráfico: </label>
                <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                    <option value="bar">Gráfico de Barras</option>
                    <option value="pie">Gráfico de Pastel</option>
                </select>
            </div>
            <div id="chart"></div>
            <button className="download-image" onClick={downloadChart}>Descargar Imagen</button>
        </div>
    );
}

export default Charts;