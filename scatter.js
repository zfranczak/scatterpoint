document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
  )
    .then((response) => response.json())
    .then((data) => {
      // Set Variables
      console.log(data);

      const myTheme = {
        xAxisLabelFill: 'black',
        yAxisLabelFill: 'black',
        xAxisLabelOffset: 40,
        yAxisLabelOffset: 40,
        xAxisLabelFontSize: '24px',
        yAxisLabelFontSize: '24px',
        xAxisTickFontSize: '16px',
        yAxisTickFontSize: '16px',
        xAxisTickFontFill: 'black',
        yAxisTickFontFill: 'black',
        innerHeight: 500,
        innerWidth: 1000,
      };

      function render() {
        const chart = d3.select('.chart');
        chartComponent('.chart', Object.assign({}, myTheme, {}));
      }

      render();

      // Function to label x-axis
      function labeledXAxis(selection, props) {
        const {
          xScale,
          xAxisLabel,
          xAxisLabelFill,
          xAxisLabelOffset,
          xAxisLabelFontSize,
          xAxisTickFontSize,
          xAxisTickFontFill,
          xAxisTickLineStroke,
          xAxisTickDensity,
          xAxisDomainLineStroke,
          innerWidth,
          innerHeight,
        } = props;

        const xAxis = d3
          .axisBottom(xScale)
          .ticks(innerWidth / xAxisTickDensity);
        let xAxisG = selection.selectAll('.x-axis').data([null]);
        xAxisG = xAxisG
          .enter()
          .append('g')
          .attr('class', 'x-axis')
          .merge(xAxisG)
          .attr('transform', `translate(0,${innerHeight})`);
        xAxisG.call(xAxis);
        xAxisG
          .selectAll('.tick text')
          .style('font-size', xAxisTickFontSize)
          .attr('fill', xAxisTickFontFill);
        xAxisG.selectAll('.tick line').attr('stroke', xAxisTickLineStroke);
        xAxisG.select('.domain').attr('stroke', xAxisDomainLineStroke);

        const xAxisLabelText = xAxisG.selectAll('.axis-label').data([null]);
        xAxisLabelText
          .enter()
          .append('text')
          .attr('class', 'axis-label')
          .merge(xAxisLabelText)
          .attr('fill', xAxisLabelFill)
          .text(xAxisLabel)
          .attr('x', innerWidth / 2)
          .attr('y', xAxisLabelOffset)
          .style('font-size', xAxisLabelFontSize);
      }

      // Function to label y-axis
      function labeledYAxis(selection, props) {
        const {
          yScale,
          yAxisLabel,
          yAxisLabelFill,
          yAxisLabelOffset,
          yAxisLabelFontSize,
          yAxisTickFontSize,
          yAxisTickFontFill,
          yAxisTickLineStroke,
          yAxisTickDensity,
          yAxisDomainLineStroke,
          innerHeight,
        } = props;

        const yAxis = d3.axisLeft(yScale).ticks(innerHeight / yAxisTickDensity);
        let yAxisG = selection.selectAll('.y-axis').data([null]);
        yAxisG = yAxisG
          .enter()
          .append('g')
          .attr('class', 'y-axis')
          .merge(yAxisG);
        yAxisG.call(yAxis);
        yAxisG
          .selectAll('.tick text')
          .style('font-size', yAxisTickFontSize)
          .attr('fill', yAxisTickFontFill);
        yAxisG.selectAll('.tick line').attr('stroke', yAxisTickLineStroke);
        yAxisG.select('.domain').attr('stroke', yAxisDomainLineStroke);

        const yAxisLabelText = yAxisG.selectAll('.axis-label').data([null]);
        yAxisLabelText
          .enter()
          .append('text')
          .attr('class', 'axis-label')
          .merge(yAxisLabelText)
          .attr('fill', yAxisLabelFill)
          .text(yAxisLabel)
          .attr('transform', 'rotate(-90)')
          .attr('x', -innerHeight / 2)
          .attr('y', -yAxisLabelOffset)
          .style('font-size', yAxisLabelFontSize);
      }

      function chartComponent(selection, props) {
        const {
          xAxisLabelFill,
          yAxisLabelFill,
          xAxisLabelOffset,
          yAxisLabelOffset,
          xAxisLabelFontSize,
          yAxisLabelFontSize,
          xAxisTickFontSize,
          yAxisTickFontSize,
          xAxisTickFontFill,
          yAxisTickFontFill,
        } = props;

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
          .range([padding + 50, h - padding]);
        console.log(years);
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
          .attr('data-xvalue', (d) => d.Year)
          .attr('data-yvalue', (d, i) => times[i]);

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
        const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

        // Append x-axis label within the container
        chartContainer
          .append('text')
          .attr('class', 'axis-label')
          .attr('x', w / 2)
          .attr('y', h - padding / 2 + 25)
          .style('text-anchor', 'middle')
          // .style(xAxisLabelFill)
          // .style(xAxisLabelFontSize)
          .text('Year');

        // Append y-axis label within the container
        chartContainer
          .append('text')
          .attr('class', 'axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('x', -h / 2)
          .attr('y', padding / 2)
          .style('text-anchor', 'middle')
          // .style(yAxisLabelFill)
          // .style(yAxisLabelFontSize)
          .text('Time in Minutes');

        //Title
        svg
          .append('text')
          .attr('class', 'chart-title')
          .attr('x', w / 2)
          .attr('y', 30)
          .style('text-anchor', 'middle')
          .style('font-size', '30px')
          .text('Doping in Professional Bicycle Racing');

        //Subtitle
        svg
          .append('text')
          .attr('class', 'chart-subtitle')
          .attr('x', w / 2)
          .attr('y', 60)
          .attr('text-anchor', 'middle')
          .style('font-size', '20px')
          .text("35 Fastest times up Alpe d'Huez");

        svg
          .append('g')
          .attr('transform', `translate(0, ${h - padding + 10})`)
          .call(xAxis)
          .attr('id', 'x-axis');

        svg
          .append('g')
          .attr('transform', `translate(${padding * 1.5},10)`)
          .call(yAxis)
          .attr('id', 'y-axis');
      }
    });
});
