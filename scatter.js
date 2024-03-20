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
      const time = data.map(function (datapoint) {
        return datapoint.Time;
      });

      const year = data.map(function (datapoint) {
        return datapoint.Year;
      });

      const athlete = data.map(function (datapoint) {
        return datapoint.Name;
      });

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
    });
});
