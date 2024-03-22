document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
  )
    .then((response) => response.json())
    .then((data) => {
      // Set Variables
      console.log(data);

      const w = 1000;
      const h = 500;
      const padding = 50;

      var timeFormat = d3.timeFormat('%M:%S');

      // Mapping Data
      const parseTime = d3.timeParse('%M:%S'); // Parse the time format
      const times = data.map((datapoint) => parseTime(datapoint.Time));
      const years = data.map((datapoint) => datapoint.Year);
      console.log(times);
      //   const athlete = data.map((datapoint) => datapoint.Name);

      // Append the SVG to the chart container
      const svg = d3
        .select('.chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      // Append the tooltip to the chart container
      const tooltip = d3
        .select('.chart')
        .append('div')
        .attr('id', 'tooltip')
        .style('opacity', 0);

      // Append a container for the chart elements
      const chartContainer = svg.append('g').attr('class', 'chart-container');

      // Create a time scale for x-coordinate
      const xScale = d3
        .scaleLinear()
        .domain([d3.min(years) - 1, d3.max(years)])
        .range([padding * 1.5, w - padding]);

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

      const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
      const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

      // Append x-axis label within the container
      chartContainer
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', w / 2)
        .attr('y', h - padding / 2 + 20)
        .style('text-anchor', 'middle')
        .text('Year');

      // Append y-axis label within the container
      chartContainer
        .append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -h / 2)
        .attr('y', padding / 2 - 10)
        .style('text-anchor', 'middle')
        .text('Time in Minutes');

      svg
        .append('g')
        .attr('transform', `translate(0, ${h - padding})`)
        .call(xAxis);

      svg
        .append('g')
        .attr('transform', `translate(${padding * 1.5},0)`)
        .call(yAxis);
    });
});
