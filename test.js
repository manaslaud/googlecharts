// read local JSON file in javascript took it from kagggle
function sort_datearr(datearr){
  return datearr.sort((a,b)=>new Date(a).getTime()-new Date(b).getTime());
}

fetch("data1.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    // Load the Visualization API and the corechart package
    google.charts.load('current', {'packages':['corechart']});

    
    google.charts.setOnLoadCallback(drawChart);

    // Defined the function to draw the chart
    function drawChart() {
      let date_array=[];
      // Create a new DataTable
      var data = new google.visualization.DataTable();
      
      // Add columns to the DataTable
      data.addColumn('date', 'Date');
      data.addColumn('number', 'Cases');
      
      // Add rows to the DataTable
      for (var i = 0; i < jsonData.length; i++) {
        date_array[i]=jsonData[i].data;
      }
      let sortedDateArray=sort_datearr(date_array);
      console.log(sortedDateArray);

      for (var i = 0; i < jsonData.length; i++) {
        var date = new Date(sortedDateArray[i]);
        var cases = jsonData[i].cases_new;
        data.addRow([date, cases]);
      }

      // Set chart options
      var options = {
        title: 'Daily New Cases',
        curveType: 'LINEAR',
        color:['#e2431e'],
        legend: { position: 'bottom' },
        axes: {
          y: {
            0: {side: 'bottom'}
          }
        }
      };

      
      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  });
