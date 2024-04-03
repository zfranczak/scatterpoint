//Deleted Code - Saving in case I want to reimplement but I am choosing to integrate instead.

// // Function to label x-axis
// function labeledXAxis(selection, props) {
//   const {
//     xScale,
//     xAxisLabel,
//     xAxisLabelFill,
//     xAxisLabelOffset,
//     xAxisLabelFontSize,
//     xAxisTickFontSize,
//     xAxisTickFontFill,
//     xAxisTickLineStroke,
//     xAxisTickDensity,
//     xAxisDomainLineStroke,
//     innerWidth,
//     innerHeight,
//   } = props;

//   const xAxis = d3
//     .axisBottom(xScale)
//     .ticks(innerWidth / xAxisTickDensity);
//   let xAxisG = selection.selectAll('.x-axis').data([null]);
//   xAxisG = xAxisG
//     .enter()
//     .append('g')
//     .attr('class', 'x-axis')
//     .merge(xAxisG)
//     .attr('transform', `translate(0,${innerHeight})`);
//   xAxisG.call(xAxis);
//   xAxisG
//     .selectAll('.tick text')
//     .style('font-size', xAxisTickFontSize)
//     .attr('fill', xAxisTickFontFill);
//   xAxisG.selectAll('.tick line').attr('stroke', xAxisTickLineStroke);
//   xAxisG.select('.domain').attr('stroke', xAxisDomainLineStroke);

//   const xAxisLabelText = xAxisG.selectAll('.axis-label').data([null]);
//   xAxisLabelText
//     .enter()
//     .append('text')
//     .attr('class', 'axis-label')
//     .merge(xAxisLabelText)
//     .attr('fill', xAxisLabelFill)
//     .text(xAxisLabel)
//     .attr('x', innerWidth / 2)
//     .attr('y', xAxisLabelOffset)
//     .style('font-size', xAxisLabelFontSize);
// }

// // Function to label y-axis
// function labeledYAxis(selection, props) {
//   const {
//     yScale,
//     yAxisLabel,
//     yAxisLabelFill,
//     yAxisLabelOffset,
//     yAxisLabelFontSize,
//     yAxisTickFontSize,
//     yAxisTickFontFill,
//     yAxisTickLineStroke,
//     yAxisTickDensity,
//     yAxisDomainLineStroke,
//     innerHeight,
//   } = props;

//   const yAxis = d3.axisLeft(yScale).ticks(innerHeight / yAxisTickDensity);
//   let yAxisG = selection.selectAll('.y-axis').data([null]);
//   yAxisG = yAxisG
//     .enter()
//     .append('g')
//     .attr('class', 'y-axis')
//     .merge(yAxisG);
//   yAxisG.call(yAxis);
//   yAxisG
//     .selectAll('.tick text')
//     .style('font-size', yAxisTickFontSize)
//     .attr('fill', yAxisTickFontFill);
//   yAxisG.selectAll('.tick line').attr('stroke', yAxisTickLineStroke);
//   yAxisG.select('.domain').attr('stroke', yAxisDomainLineStroke);

//   const yAxisLabelText = yAxisG.selectAll('.axis-label').data([null]);
//   yAxisLabelText
//     .enter()
//     .append('text')
//     .attr('class', 'axis-label')
//     .merge(yAxisLabelText)
//     .attr('fill', yAxisLabelFill)
//     .text(yAxisLabel)
//     .attr('transform', 'rotate(-90)')
//     .attr('x', -innerHeight / 2)
//     .attr('y', -yAxisLabelOffset)
//     .style('font-size', yAxisLabelFontSize);
// }
