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
      console.log(times);
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

      const svgContainer = d3
        .select('chart')
        .append('svg')
        .attr('width', w + 100)
        .attr('height', h + 60);

      svgContainer
        .append(text)
        .attr('transform', 'rotate(-90)')
        .attr('x', -200)
        .attr('y', 80)
        .text('Time in Minutes');

      svgContainer
        .append('text')
        .attr('x', width / 2 + 120)
        .attr('y', height + 50)
        .text('More Information: ')
        .attr('class', 'info');

      // Create a time scale for x-coordinate
      const xScale = d3
        .scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([padding, w - padding]);

      const yScale = d3
        .scaleTime()
        .domain(d3.extent(times))
        .range([padding, h - padding]);

      svgContainer
        .append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(60, 400)');

      svgContainer
        .append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(60, 0)');

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
