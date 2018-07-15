$(document).ready(function (){
var skillsToDraw = [
    { text: 'JavaScript', size: 40 },
    { text: 'D3.js', size: 15 },
    { text: 'HTML', size: 38 },
    { text: 'MySQL', size: 30 },
    { text: 'MongoDB', size: 30 },
    { text: 'CSS', size: 40 },
    { text: 'jQuery', size: 38 },
    { text: 'Bootstrap', size: 40 },
    { text: 'Express.js', size: 30 },
    { text: 'Node.js', size: 30 },
    { text: 'Firebase', size: 25 },
    { text: 'Heroku', size: 38 },
    { text: 'Sequelize', size: 35 },
    { text: 'Cheerio', size: 28 },
    { text: 'Mongoose', size: 28 },
    { text: 'Handlebars', size: 28 },
  // just copy twice for extra data, else the cloud is a little boring
    
];

// Next you need to use the layout script to calculate the placement, rotation and size of each word:

var width = 500;
var width = 1000;
var height = 500;
var fill = d3.scale.category20();

    d3.layout.cloud()
    	.size([width, height])
    	.words(skillsToDraw)
    	.rotate(function() {
    		return ~~(Math.random() * 2) * 90;
    	})
    	.font("Impact")
    	.fontSize(function(d) {
    		return d.size;
    	})
    	.on("end", drawSkillCloud)
    	.start();

// Finally implement `drawSkillCloud`, which performs the D3 drawing:

    // apply D3.js drawing API
    function drawSkillCloud(words) {
    	d3.select("#cloud").append("svg")
    		.attr("width", width)
            .attr("height", height)
            .append("g")
    		.attr("transform", "translate(" + ~~(width / 2) + "," + ~~(height / 2) + ")")
    		.selectAll("text")
    		.data(words)
    		.enter().append("text")
    		.style("font-size", function(d) {
    			return d.size + "px";
    		})
    		.style("-webkit-touch-callout", "none")
    		.style("-webkit-user-select", "none")
    		.style("-khtml-user-select", "none")
    		.style("-moz-user-select", "none")
    		.style("-ms-user-select", "none")
    		.style("user-select", "none")
    		.style("cursor", "default")
    		.style("font-family", "Impact")
    		.style("fill", function(d, i) {
    			return fill(i);
    		})
    		.attr("text-anchor", "middle")
    		.attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
    		.text(function(d) {
    			return d.text;
    		});
    }
    
// set the viewbox to content bounding box (zooming in on the content, effectively trimming whitespace)

    var svg = document.getElementsByTagName("svg")[0];
    var bbox = svg.getBBox();
    var viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ");
    svg.setAttribute("viewBox", viewBox);
})