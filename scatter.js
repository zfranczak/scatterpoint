document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
  )
    .then((response) => response.json())
    .then((data) => {
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
        xAxisTickFontFill: 'black',
        yAxisTickFontFill: 'black',
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
      }
      render();

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
          xAxisTickDensity,
          yAxisTickDensity,
          innerHeight,
          innerWidth,
        } = props;

        // Set Variables
        var color = d3.scaleOrdinal(d3.schemeDark2);
        const w = 1000;
        const h = 500;
        const padding = 100;

        var timeFormat = d3.timeFormat('%M:%S');
        const parseTime = (timeString) => {
          const [minutes, seconds] = timeString.split(':');
          return new Date(1970, 0, 1, 0, parseInt(minutes), parseInt(seconds));
        };

        // Mapping Data
        const times = data.map((datapoint) => parseTime(datapoint.Time));
        const years = data.map((datapoint) => datapoint.Year);

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
          .domain([d3.min(years) - 1, d3.max(years) + 1])
          .range([padding * 1.5, w - padding]);

        const yScale = d3
          .scaleTime()
          .domain([d3.min(times), d3.max(times)])
          .range([padding, h - padding + 10]);

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
          .attr('transform', `translate(${padding * 1.5},0)`)
          .call(yAxis)
          .attr('id', 'y-axis');

        yAxisG
          .selectAll('.tick text')
          .style('font-size', yAxisTickFontSize)
          .style('fill', yAxisTickFontFill);

        // Create Dots
        svg
          .selectAll('circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('cx', (d) => xScale(d.Year))
          .attr('cy', (d) => yScale(parseTime(d.Time)))
          .attr('r', 5)
          .attr('class', 'dot')
          .attr('data-xvalue', (d) => d.Year)
          .attr('data-yvalue', function (d) {
            return parseTime(d.Time).toISOString();
          })
          .style('fill', function (d) {
            return color(d.Doping !== '');
          })
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
              .style('left', event.pageX + 20 + 'px')
              .style('top', event.pageY - 28 + 'px');
          })
          .on('mouseout', function () {
            tooltip.style('opacity', 0);
          });

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
        //Legend
        let legend = svg.append('g').attr('id', 'legend');

        // Bind data to legend groups properly
        let legendGroup = legend
          .selectAll('.legend-label')
          .data(color.domain())
          .enter()
          .append('g')
          .attr('class', 'legend-label')
          .attr('transform', function (d, i) {
            return 'translate(0,' + (h / 2 - i * 30) + ')';
          });

        // Append rectangle and text within each legend group
        legendGroup
          .append('rect')
          .attr('x', w - padding)
          .attr('width', 20)
          .attr('height', 20)
          .style('fill', color);

        legendGroup
          .append('text')
          .attr('x', w - padding - 5)
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
      }
    });
});
