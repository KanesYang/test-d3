import { Component, OnInit, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as _d3 from 'd3';
import { D3Service, D3, Selection, ScaleLinear } from 'd3-ng2-service';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component implements OnInit {

  private d3: D3;
  private parentNativeElement: any;
  private topicData: any[];

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
    this.topicData = [
      {
        speaker: 'Obama',
        topic: 'a',
        audience: 120
      },
      {
        speaker: 'Obama',
        topic: 'a',
        audience: 30
      },
      {
        speaker: 'Obama',
        topic: 'a',
        audience: 120
      },
      {
        speaker: 'Romeny',
        topic: 'a',
        audience: 50
      },
      {
        speaker: 'Moderato',
        topic: 'a',
        audience: 100
      },
      {
        speaker: 'Romeny',
        topic: 'b',
        audience: 20
      },
      {
        speaker: 'Obama',
        topic: 'b',
        audience: 40
      },
      {
        speaker: 'Obama',
        topic: 'b',
        audience: 80
      },
      {
        speaker: 'Romeny',
        topic: 'b',
        audience: 130
      },
      {
        speaker: 'Moderato',
        topic: 'b',
        audience: 50
      },
      {
        speaker: 'Obama',
        topic: 'c',
        audience: 80
      },
      {
        speaker: 'Romeny',
        topic: 'c',
        audience: 30
      },
      {
        speaker: 'Moderato',
        topic: 'c',
        audience: 50
      },
      {
        speaker: 'Romeny',
        topic: 'd',
        audience: 60
      },
      {
        speaker: 'Obama',
        topic: 'd',
        audience: 70
      },
      {
        speaker: 'Obama',
        topic: 'd',
        audience: 80
      },
      {
        speaker: 'Romeny',
        topic: 'd',
        audience: 30
      },
      {
        speaker: 'Moderato',
        topic: 'd',
        audience: 50
      },
      {
        speaker: 'Obama',
        topic: 'd',
        audience: 80
      },
      {
        speaker: 'Romeny',
        topic: 'd',
        audience: 30
      },
      {
        speaker: 'Moderato',
        topic: 'd',
        audience: 50
      },
      {
        speaker: 'Romeny',
        topic: 'd',
        audience: 30
      },
      {
        speaker: 'Obama',
        topic: 'd',
        audience: 50
      },
      {
        speaker: 'Obama',
        topic: 'e',
        audience: 90
      },
      {
        speaker: 'Romeny',
        topic: 'e',
        audience: 40
      },
      {
        speaker: 'Moderato',
        topic: 'e',
        audience: 60
      },
      {
        speaker: 'Romeny',
        topic: 'f',
        audience: 30
      },
      {
        speaker: 'Romeny',
        topic: 'f',
        audience: 50
      },
      {
        speaker: 'Obama',
        topic: 'f',
        audience: 90
      },
      {
        speaker: 'Romeny',
        topic: 'f',
        audience: 40
      },
      {
        speaker: 'Moderato',
        topic: 'f',
        audience: 60
      }
    ];
  }

  ngOnInit() {
    let d3 = this.d3;
    let d3ParentElement: Selection<any, any, any, any>;

    //variables

    if (this.parentNativeElement !== null) {

      d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method 

      // Do more D3 things 
      var arcGenerator = _d3.arc()
        .innerRadius(190)
        .outerRadius(200)
        .padAngle(.02)
        .padRadius(100)
        .cornerRadius(4);


      /*
      arc part
      */


      var topicList = this.topicData.map((d) => {
        return d.topic;
      })

      var arcData = _.uniq(topicList);

      arcData = arcData.map((d) => {
        return {
          topic: d,
          number: 0
        };
      });

      // console.log(arcData);

      var temp = arcData[0];
      var index = 0;

      for (var i = 0; i < topicList.length; i++) {
        if (topicList[i] == temp.topic) {
          arcData[index].number++;
        } else {
          index++;
          temp = arcData[index];
          arcData[index].number++;
        }
      }

      //create the arcData
      var startAngle = 0;
      var tempAngle;

      var endAngleArray = [];
      var startAngleArray = [];
      for (var data of arcData) {
        //			console.log(data);
        startAngle = startAngle + (data.number / topicList.length) * 2 * Math.PI;
        endAngleArray.push(startAngle);
      }

      //copy a new array
      startAngleArray = _.map(endAngleArray, _.clone);

      startAngleArray.pop();
      startAngleArray.splice(0, 0, 0);

      // console.log(endAngleArray);
      // console.log(startAngleArray);

      arcData = arcData.map((d, i) => {
        return {
          ...d,
          startAngle: startAngleArray[i],
          endAngle: endAngleArray[i]
        }
      })

      // console.log(arcData);

      //create the color scale
      var arcColorScale = _d3.scaleLinear()
        .domain([0, arcData.length])
        .range(['#777', '#eee']);

      // Create a path element and set its d  attribute
      d3.select('g')
        .selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (d, i) => {
          return arcColorScale(i);
        })

      var centerGroup = [];

      _d3.select('g')
        .selectAll('text')
        .data(arcData)
        .enter()
        .append('text')
        .each(function (d) {
          var centroid = arcGenerator.centroid(d);
          _d3.select(this)
            .attr('x', centroid[0] * 1.5)
            .attr('y', centroid[1])
            .attr('dy', '0.33em')
            .text(d.topic);

          centerGroup.push(centroid);
          console.log(d);
        })

      d3.select('g')
        .selectAll('line')
        .data(arcData)
        .enter()
        .append('line')
        .attr("stroke", "black")
        .attr('x1', (d, i) => {
          return centerGroup[i][0];
        })
        .attr('x2', (d, i) => {
          return centerGroup[i][0] * 1.4;
        })
        .attr('y1', (d, i) => {
          return centerGroup[i][1];
        })
        .attr('y2', (d, i) => {
          return centerGroup[i][1];
        });

      /*
      Force diagram part
      */

      var nodeColorScale = ['lightcoral', 'lightblue', 'lightgreen'];
      var speakerList = ['Obama', 'Romeny', 'Moderato'];

      var topicArrayList = arcData.map((d) => {
        return d.topic
      })

      var nodes = d3.range(topicList.length).map((d, i) => {
        return {
          radius: this.topicData[i].audience / 6,
          topic: this.topicData[i].topic,
          speaker: this.topicData[i].speaker
        }
      });

      var ticked = function () {
        console.log('?');
        var u = _d3.select('svg g')
          .selectAll('circle')
          .data(nodes);

        u.enter()
          .append('circle')
          .attr('r', function (d) {
            return d.radius;
          })
          .merge(u)
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) {
            return d.y;
          })
          .attr('fill', (d) => {
            return nodeColorScale[speakerList.indexOf(d.speaker)];
          })
          .on("mouseover", function (d, i) {
            d3.select(this)
              .attr("opacity", 0.8)

            d3.select('#detail')
              .text(`${d.speaker} topic: ${d.topic} audience:${d.radius * 6}`);
          })
          .on("mouseout", function (d, i) {
            d3.select(this)
              .transition()
              .duration(500)
              .attr("opacity", 1);

            d3.select('#detail')
              .text('');
          });

        u.exit().remove();
      }

      var simulation = _d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', _d3.forceX().x((d) => {
          return centerGroup[topicArrayList.indexOf(d.topic)][0] * 0.9
        }))
        .force('y', _d3.forceY().y((d) => {
          return centerGroup[topicArrayList.indexOf(d.topic)][1] * 0.9
        }))
        .force('collision', _d3.forceCollide().radius((d) => {
          return d.radius;
        }))
        .on('tick', ticked);
    }
    //end of if 
  }
  //end of ngOninit
}
