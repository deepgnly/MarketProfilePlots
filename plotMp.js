			var w = 500;
			var h = 300;
			var padding = 40;
			
			//Dynamic, random dataset
			var dataset = [];											//Initialize empty array
			var numDataPoints = 50;										//Number of dummy data points to create
			var maxRange = Math.random() * 1000;						//Max range of new values
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
				var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
				var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
                var text = possible.charAt(Math.floor(Math.random() * possible.length));
				dataset.push([newNumber1, newNumber2,text]);					//Add new number to array
			}

			//Create scale functions
			var xScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
								 .range([padding, w - padding]);

			var yScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
								 .range([h - padding, padding]);

			//Define X axis
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .ticks(5);

			//Define Y axis
			var yAxis = d3.svg.axis()
							  .scale(yScale)
							  .orient("left")
							  .ticks(20);

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

            svg.append("g")
			   .attr("id", "t")
               .selectAll("t")
			   .data(dataset)
               .enter()
               .append("text")
			   .attr("x", function(d) {
					return xScale(d[0]);
			   })
			   .attr("y", function(d) {
					return yScale(d[1]);
			   })
               .text(function(d){debugger;return d[2]});

			//Create X axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (h - padding + 5) + ")")
				.call(xAxis);
			
			//Create Y axis
			svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + (padding - 5) + ",0)")
				.call(yAxis);






			//On click, update with new data			
			d3.select("input")
				.on("click", function() {

					//New values for dataset
					var numValues = dataset.length;						 		//Count original length of dataset
					var maxRange = Math.random() * 1000;						//Max range of new values
					dataset = [];  					
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";//Initialize empty array
					for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
						var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
						var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
                        var text = possible.charAt(Math.floor(Math.random() * possible.length));

						dataset.push([newNumber1, newNumber2,text]);					//Add new number to array
					}
					
					//Update scale domains
					xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
					yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

					//Update all circles
					svg.selectAll("text")
					   .data(dataset)
					   .transition()
					   .attr("x", function(d) {
							return xScale(d[0]);
					   })
					   .attr("y", function(d) {
							return yScale(d[1]);
					   })
                       .text(function(d){debugger;return d[2]});


					//Update X axis
					svg.select(".x.axis")
						.transition()
						.duration(1000)
						.call(xAxis);
					
					//Update Y axis
					svg.select(".y.axis")
						.transition()
						.duration(1000)
						.call(yAxis);

				});