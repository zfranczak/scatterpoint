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
        yAxisLabelOffset: 0,
        xAxisLabelFontSize: '24px',
        yAxisLabelFontSize: '24px',
        xAxisTickFontSize: '16px',
        yAxisTickFontSize: '16px',
        // xAxisTickFontFamily: 'Monospace',
        // yAxisTickFontFamily: 'Monospace',
        xAxisTickFontFill: 'red',
        yAxisTickFontFill: 'red',
        xAxisTickLineStroke: 'black',
        xAxisTickDensity: 10,
        xAxisDomainLineStroke: 'black',
        yAxisTickLineStroke: 'black',
        yAxisTickDensity: 10,
        yAxisDomainLineStroke: 'black',
        innerHeight: 500,
        innerWidth: 1000,
      };

      function render() {
        const chart = d3.select('.chart');
        chartComponent(chart, Object.assign({}, myTheme, {}));
        // labeledXAxis(chart, myTheme);
        // labeledYAxis(chart, myTheme);
      }

      render();

      //LabeledAxes.js placeholder

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
          // xAxisTickLineStroke,
          xAxisTickDensity,
          // xAxisDomainLineStroke,
          // yAxisTickLineStroke,
          yAxisTickDensity,
          // yAxisDomainLineStroke,
          innerHeight,
          innerWidth,
        } = props;

        const w = 1000;
        const h = 500;
        const padding = 100;
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        const parseTime = (timeString) => {
          const [minutes, seconds] = timeString.split(':');
          return new Date(1970, 0, 1, 0, parseInt(minutes), parseInt(seconds));
        };
        var timeFormat = d3.timeFormat('%M:%S');

        // Mapping Data
        const times = data.map((datapoint) => parseTime(datapoint.Time));
        const years = data.map((datapoint) => datapoint.Year);

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
          .attr('class', 'tooltip')
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
          .domain([d3.min(times) - 1, d3.max(times)])
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
          .attr('data-xvalue', (d) => d.Year)
          .attr('data-yvalue', (d, i) => times[i])
          .on('mouseover', function (event, d) {
            tooltip.style('opacity', 0.9);
            tooltip.attr('data-year', d.Year);
            tooltip
              .html(
                d.Name +
                  ': ' +
                  d.Nationality +
                  '<br/>' +
                  'Year: ' +
                  d.Year +
                  ', Time: ' +
                  d.Time +
                  (d.Doping ? '<br/><br/>' + d.Doping : '')
              )
              .style('left', event.pageX + 'px')
              .style('top', event.pageY - 28 + 'px');
          })
          .on('mouseout', function () {
            tooltip.style('opacity', 0);
          });

        const xAxis = d3
          .axisBottom(xScale)
          .tickFormat(d3.format('d'))
          .tickSizeInner(-innerHeight)
          .tickSizeOuter(0)
          .tickPadding(10)
          .tickSize(xAxisTickDensity)
          .tickValues(xScale.ticks(xAxisTickDensity));

        const yAxis = d3
          .axisLeft(yScale)
          .tickFormat(timeFormat)
          .tickSizeInner(-innerWidth)
          .tickSizeOuter(0)
          .tickPadding(10)
          .tickSize(yAxisTickDensity)
          .tickValues(yScale.ticks(yAxisTickDensity));
        // Append x-axis ticks with modified font size
        const xAxisG = svg
          .append('g')
          .attr('transform', `translate(0, ${h - padding + 10})`)
          .call(xAxis)
          .attr('id', 'x-axis');

        xAxisG
          .selectAll('.tick text')
          .style('font-size', xAxisTickFontSize)
          .style('fill', xAxisTickFontFill);

        // Append y-axis ticks with modified font size
        const yAxisG = svg
          .append('g')
          .attr('transform', `translate(${padding * 1.5},10)`)
          .call(yAxis)
          .attr('id', 'y-axis');

        yAxisG
          .selectAll('.tick text')
          .style('font-size', yAxisTickFontSize)
          .style('fill', yAxisTickFontFill);

        // Append x-axis label within the container
        chartContainer
          .append('text')
          .attr('class', 'axis-label')
          .attr('x', w / 2)
          .attr('y', h - padding / 2 + xAxisLabelOffset)
          .style('text-anchor', 'middle')
          .style('fill', xAxisLabelFill)
          .style('font-size', xAxisLabelFontSize)
          .text('Year');

        // Append y-axis label within the container
        chartContainer
          .append('text')
          .attr('class', 'axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('x', -h / 2)
          .attr('y', padding / 1.5 - yAxisLabelOffset)
          .style('text-anchor', 'middle')
          .style('fill', yAxisLabelFill)
          .style('font-size', yAxisLabelFontSize)
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

        //Legend
        let legend = svg.append('g').attr('id', 'legend');

        legend
          .selectAll('#legend')
          // .data()
          .enter()
          .append('g')
          .attr('class', 'legend-label')
          .attr('transform', function (d, i) {
            return 'translate(0,' + (height / 2 - i * 20) + ')';
          });
      }
      legend
        .append('rect')
        .attr('x', width - 18)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', color);

      legend
        .append('text')
        .attr('x', width - 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .style('text-anchor', 'end')
        .text(function (d) {
          if (d) {
            return 'Riders with doping allegations';
          } else {
            return 'No doping allegations';
          }
        });
    });
});
