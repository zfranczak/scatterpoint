document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
  )
    .then((response) => response.json())
    .then((data) => {
      //Set Variables
      console.log(data);

      const w = 1000;
      const h = 500;
      const padding = 50;

      // Mapping Data
      const parseTime = d3.timeParse('%M:%S'); // Parse the time format
      const times = data.map((datapoint) => parseTime(datapoint.Time));
      const years = data.map((datapoint) => datapoint.Year);

      //   const athlete = data.map((datapoint) => datapoint.Name);

      const svg = d3
        .select('.chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      const tooltip = d3
        .select('.chart')
        .append('div')
        .attr('id', 'tooltip')
        .style('opacity', 0);

      // Create a time scale for x-coordinate
      const xScale = d3
        .scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([padding, w - padding]);

      const yScale = d3
        .scaleTime()
        .domain(d3.extent(times))
        .range([padding, h - padding]);

      // Create Dots

      svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.Year))
        .attr('cy', (d, i) => yScale(times[i]))
        .attr('r', 5)
        .attr('class', 'dot')
        .attr('data-xvalue', years)
        .attr('data-yvalue', times);
    });
});
