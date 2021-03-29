import React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';
import 'flexmonster/lib/flexmonster.highcharts.js';
import Highcharts from 'highcharts';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

// Importing themes
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

// Importing translations
import am4lang_lt_LT from "@amcharts/amcharts4/lang/lt_LT";

// Importing geodata (map data)
//import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
chart.data = [ {
  "country": "Lithuania",
  "litres": 501.9
}, {
  "country": "Czechia",
  "litres": 301.9
}, {
  "country": "Ireland",
  "litres": 201.1
}, {
  "country": "Germany",
  "litres": 165.8
}, {
  "country": "Australia",
  "litres": 139.9
}, {
  "country": "Austria",
  "litres": 128.3
}, {
  "country": "UK",
  "litres": 99
}, {
  "country": "Belgium",
  "litres": 60
}, {
  "country": "The Netherlands",
  "litres": 50
} ];

// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;

class Amcharts extends React.Component<any> {

  private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
  private flexmonster!: Flexmonster.Pivot;

  private chart?: am4core.Sprite;

  private chartConfiguration: object = {
    "type": "XYChart",
    "data": [{
        "category": "Category #1",
        "value": 4032
    }, {
        "category": "Category #2",
        "value": 724
    }, {
        "category": "Category #3",
        "value": 4015
    }, {
        "category": "Category #4",
        "value": 4232
    }],
    "xAxes": [{
        "type": "ValueAxis",
        "renderer": {
            "maxLabelPosition": 0.98
        }
    }],
    "yAxes": [{
        "type": "CategoryAxis",
        "dataFields": {
            "category": "category"
        },
        "renderer": {
            "grid": {
                "template": {
                    "type": "Grid",
                    "location": 0
                }
            },
        }
    }],
    "series": [{
        "type": "ColumnSeries",
        "columns": {
            "template": {
                "type": "Column",
                "strokeOpacity": 0,
                "tooltipText": "{categoryY}\n{valueX}",
                "tooltipPosition": "pointer"
            }
        },
        "dataFields": {
            "valueX": "value",
            "categoryY": "category"
        },
    }]
  };

  componentDidMount() {
      this.flexmonster = this.pivotRef.current!.flexmonster;
      this.chart = am4core.createFromConfig(
        // IMPORTANT: for performance considerations amCharts performs some 
        // operations directly on the passed configuration object. For this
        // reason, in cases when you need the configuration to remain intact
        // after rendering a chart, you should never pass a chart configuration
        // object directly to am4core.createFromConfig and pass a copy instead.
        JSON.parse(JSON.stringify(this.chartConfiguration)), 
        'chartdiv'
      );
  }

  reportComplete = () => {
      this.flexmonster.off("reportComplete", this.reportComplete);
      //creating charts after Flexmonster instance is launched
      this.createChart();
  }

  createChart = () => {
      //Running Flexmonster's getData method for Highcharts
      if (this.flexmonster && this.flexmonster.highcharts) {
          this.flexmonster.highcharts.getData(
              {
                  type: "area"
              },
              (data: any) => {
                  Highcharts.chart('highcharts-container', data);
              },
              (data: any) => {
                  Highcharts.chart('highcharts-container', data);
              }
          );
      }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }


  render() {
    return (
      <div className="App">
          <h3 className="page-title">
              Integrating <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/doc/integration-with-highcharts/">with
                  Highcharts</a>
          </h3>
          <FlexmonsterReact.Pivot 
              ref={this.pivotRef} 
              toolbar={true} 
              width="100%" 
              report="https://cdn.flexmonster.com/reports/report.json"
              licenseKey="Z70F-XF9236-0F084L-0C5K41-0X091C-4V1F4G-4D1864-5D715B-3O2100-533501-6T"
              reportcomplete={this.reportComplete}
              //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
          />
          <div className="chart-container">
              <div id="highcharts-container"></div>
          </div>
          <h1>amCharts Editor 4 Demo.</h1>
          <div id="chartdiv" style={{ width: '800px', height: '460px', margin: '20px auto'}}></div>
      </div>
  );
}
}

export default Amcharts;