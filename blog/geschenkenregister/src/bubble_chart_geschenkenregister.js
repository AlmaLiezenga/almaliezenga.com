/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {
  // Constants for sizing
  var width = 940;
  var height = 840;

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('gates_tooltip', 240);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  var center = { x: width / 2, y: height / 2 };

  var categoryCenters = {
    'bloemen': { x: ((width / 6) * 1.5 ), y: ((height / 3) * 1)},
    'boeken': { x: ((width / 6) * 3 ), y: ((height / 3) * 1)},
    'etenswaren en dranken': { x: ((width / 6) * 4.5), y: ((height / 3) * 1)},
    'uitnodigingen en tickets': { x: ((width / 6) * 1.5 +30), y: ((height / 3) * 2)},
    'cadeaubonnen en geldbedragen': { x: ((width / 6) * 3), y: ((height / 3) * 2)},
    'overig': { x: ((width / 6) * 4.5 -30), y: ((height / 3) * 2)},
  };

  var categoryTitleX = {
    'bloemen': (width / 6) * 1.5 -130,
    'boeken': (width / 6) * 3, 
    'etenswaren en dranken': (width / 6) * 4.5 +130,
    'uitnodigingen en tickets': (width / 6) * 1.5,
    'cadeaubonnen en geldbedragen': (width / 6) * 3, 
    'overig': (width / 6) * 4.5 
  }

  var categoryTitleY = {
    'bloemen': (height /3) * 1,
    'boeken': (height / 3) * 1 +130, 
    'etenswaren en dranken': (height / 3) * 1 +50,
    'uitnodigingen en tickets': (height / 3) * 1.7,
    'cadeaubonnen en geldbedragen': (height / 3) * 1.7 +20, 
    'overig': (height / 3) * 1.7 +10
  }

  var partyCenters = {
    'VVD': { x: ((width / 6) * 1.5), y: ((height / 6) * 1.5)},
    'PVV': { x: ((width / 6) * 2.5), y: ((height / 6) * 1.5)},
    'SP': { x: ((width / 6) * 3.5), y: ((height / 6) * 1.5)},
    'CDA': { x: ((width / 6) * 4.5), y: ((height / 6) * 1.5)}, 
    'DENK': { x: ((width / 6) * 1.5), y: ((height / 6) * 2.5)},
    'D66': { x: ((width / 6) * 2.5), y: ((height / 6) * 2.5)},
    'CU': { x: ((width / 6) * 3.5), y: ((height / 6) * 2.5)},
    'SGP': { x: ((width / 6) * 4.5), y: ((height / 6) * 2.5)},
    'GL-PvdA': { x: ((width / 6) * 1.5), y: ((height / 6) * 3.5)},
    'Volt': { x: ((width / 6) * 2.5), y: ((height / 6) * 3.5)},
    'JA21': { x: ((width / 6) * 3.5), y: ((height / 6) * 3.5)},
    'Gündoğan': { x: ((width / 6) * 4.5), y: ((height / 6) * 3.5)},
    'BBB': { x: ((width / 6) * 1.5), y: ((height / 6) * 4.5)},
    'FVD': { x: ((width / 6) * 2.5), y: ((height / 6) * 4.5)},
    'Omtzigt': { x: ((width / 6) * 3.5), y: ((height / 6) * 4.5)},
    'PvdD': { x: ((width / 6) * 4.5), y: ((height / 6) * 4.5)}
  }; 

  var partyTitleX = {
    'VVD': (width / 6) * 1.5 +80,
    'PVV': (width / 6) * 2.5,
    'SP': (width / 6) * 3.5 +40,
    'CDA': (width / 6) * 4.5 +40, 
    'DENK': (width / 6) * 1.5 +20,
    'D66': (width / 6) * 2.5 -85,
    'CU': (width / 6) * 3.5 +50,
    'SGP': (width / 6) * 4.5 +20,
    'GL-PvdA': (width / 6) * 1.5 +90,
    'Volt': (width / 6) * 2.5 +30,
    'JA21': (width / 6) * 3.5 +35,
    'Gündoğan': (width / 6) * 4.5 +20,
    'BBB': (width / 6) * 1.5 -20,
    'FVD': (width / 6) * 2.5 -10,
    'Omtzigt': (width / 6) * 3.5,
    'PvdD': (width / 6) * 4.5 +10,
  };

  var partyTitleY = {
    'VVD': (height / 6) * 1.5,
    'PVV': (height / 6) * 1.5,
    'SP': (height / 6) * 1.5,
    'CDA': (height / 6) * 1.5, 
    'DENK': (height / 6) * 2.5,
    'D66': (height / 6) * 2.5,
    'CU': (height / 6) * 2.5,
    'SGP': (height / 6) * 2.5,
    'GL-PvdA': (height / 6) * 3.5 +70,
    'Volt': (height / 6) * 3.5 +70,
    'JA21': (height / 6) * 3.5 +70,
    'Gündoğan': (height / 6) * 3.5 +70,
    'BBB': (height / 6) * 4.5 +100,
    'FVD': (height / 6) * 4.5 +100,
    'Omtzigt': (height / 6) * 4.5 +100,
    'PvdD': (height / 6) * 4.5 +100
  };

  // @v4 strength to apply to the position forces
  var forceStrength = 0.02;
  var forceStrength_party= 0.05; 

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  // Charge function that is called for each node.
  // As part of the ManyBody force.
  // This is what creates the repulsion between nodes.
  //
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  //
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  //
  // Charge is negative because we want nodes to repel.
  // @v4 Before the charge was a stand-alone attribute
  //  of the force layout. Now we can use it as a separate force!
  function charge(d) {
    return -Math.pow(d.radius, 2) * forceStrength;
  }

  function charge_party(d) {
    return -Math.pow(d.radius, 1.8) * forceStrength_party;
  }

  // Here we create a force layout and
  // @v4 We create a force simulation now and
  //  add forces to it.
  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);

  // @v4 Force starts up automatically,
  //  which we don't want as there aren't any nodes yet.
  simulation.stop();

  // Nice looking colors - no reason to buck the trend
  // @v4 scales now have a flattened naming scheme
  var fillColor = d3.scaleOrdinal()    
  .domain(['VVD','PVV','SP','CDA','DENK','D66','CU','SGP','GL-PvdA','Volt','JA21','Gündoğan','BBB','FVD','Omtzigt','PvdD'])
  .range(['#083583', '#031f4e', '#ba0912', '#0f7b5e', '#1db7b2', '#19ac48', '#1ca8e8', '#fc6621', '#d92e22', '#502877', '#2d314a', '#502877', '#c0e231', '#821a1c', '#0f7b5e', '#0b6a2b']);

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
    var maxAmount = d3.max(rawData, function (d) { return +d.price; });

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
    var radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([2, 50])
      .domain([0, maxAmount]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    var myNodes = rawData.map(function (d) {
      return {
        id: d.id,
        radius: radiusScale(+d.price),
        price: +d.price,
        description: d.description,
        party: d.party,
        gifter: d.gifter,
        date: d.date,
        gift: d.gift,
        category: d.category,
        receiver: d.receiver, 
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.price - a.price; });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.index; });

    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    // @v4 Selections are immutable, so lets capture the
    //  enter selection to apply our transtition to below.
    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.party); })
      .attr('stroke', function (d) { return d3.rgb(fillColor(d.party)).darker(); })
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    // @v4 Merge the original empty selection and the enter selection
    bubbles = bubbles.merge(bubblesE);

    // Fancy transition to make bubbles appear, ending with the
    // correct radius
    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.radius; });

    // Set the simulation's nodes to our newly created nodes array.
    // @v4 Once we set the nodes, the simulation will start running automatically!
    simulation.nodes(nodes);

    // Set initial layout to single group.
    groupBubbles();
  };

  /*
   * Callback function that is called after every tick of the
   * force simulation.
   * Here we do the acutal repositioning of the SVG circles
   * based on the current x and y values of their bound node data.
   * These x and y values are modified by the force simulation.
   */
  function ticked() {
    bubbles
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; });
  }

  /*
   * Provides a x value for each node to be used with the split by year
   * x force.
   */

  function nodePartyPosX(d) {
    return partyCenters[d.party].x;
  }

  function nodePartyPosY(d) {
    return partyCenters[d.party].y;
  }

  function nodeCategoryPosX(d) {
    return categoryCenters[d.category].x;
  }

  function nodeCategoryPosY(d) {
    return categoryCenters[d.category].y;
  }

  /*
   * Sets visualization in "single group mode".
   * The year labels are hidden and the force layout
   * tick function is set to move all nodes to the
   * center of the visualization.
   */
  function groupBubbles() {
    hidePartyTitles();
    hideCategoryTitles();

    // @v4 Reset the 'x' force to draw the bubbles to the center.
    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
    simulation.force('y', d3.forceY().strength(forceStrength).y(center.x));
    simulation.force('charge', d3.forceManyBody().strength(charge)); 
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }


  /*
   * Sets visualization in "split by year mode".
   * The year labels are shown and the force layout
   * tick function is set to move nodes to the
   * yearCenter of their data's year.
   */
  function splitBubbles() {
    showPartyTitles();
    hideCategoryTitles();
    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength_party).x(nodePartyPosX));
    simulation.force('y', d3.forceY().strength(forceStrength_party).y(nodePartyPosY));
    simulation.force('charge', d3.forceManyBody().strength(charge_party)); 
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function splitBubblesCategory() {
    hidePartyTitles()
    showCategoryTitles();

    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeCategoryPosX));
    simulation.force('y', d3.forceY().strength(forceStrength).y(nodeCategoryPosY));
    simulation.force('charge', d3.forceManyBody().strength(charge)); 
    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  /*
   * Hides Year title displays.
   */
  function hidePartyTitles() {
    svg.selectAll('.party').remove();
  }

  function showPartyTitles() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var partyData = d3.keys(partyTitleX);
    var party = svg.selectAll('.party')
      .data(partyData);

    party.enter().append('text')
      .attr('class', 'party')
      .attr('x', function (d) { return partyTitleX[d]; })
      .attr('y', function (d) { return partyTitleY[d]; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCategoryTitles() {
    svg.selectAll('.category').remove();
  }

  function showCategoryTitles() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var categoryData = d3.keys(categoryTitleX);
    var category = svg.selectAll('.category')
      .data(categoryData);

      category.enter().append('text')
      .attr('class', 'category')
      .attr('x', function (d) { return categoryTitleX[d]; })
      .attr('y', function (d) { return categoryTitleY[d]; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Tweede Kamerlid: </span><span class="value">' +
                  d.receiver + ' (' + d.party + ')' +
                  '</span><br/>' +
                  '<span class="name">Waarde: </span><span class="value">€' +
                  d.price +
                  '</span><br/>' +
                  '<span class="name">Datum: </span><span class="value">' +
                  d.date +
                  '</span></br></br>' + 
                  '<span class="name">Omschrijving uit het register: </span></br><span class="value">' +
                  d.description +
                  '</span><br/>';

    tooltip.showTooltip(content, d3.event);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.party)).darker());

    tooltip.hideTooltip();
  }

  /*
   * Externally accessible function (this is attached to the
   * returned chart function). Allows the visualization to toggle
   * between "single group" and "split by year" modes.
   *
   * displayName is expected to be a string and either 'year' or 'all'.
   */
  chart.toggleDisplay = function (displayName) {
    if (displayName === 'party') {
      splitBubbles();
    } else if (displayName === 'category') {
      splitBubblesCategory(); 
    } else {
      groupBubbles();
    }
  };


  // return the chart function from closure.
  return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display(error, data) {
  if (error) {
    console.log(error);
  }

  myBubbleChart('#vis', data);
}

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }

  return x1 + x2;
}

// Load the data.
d3.csv('data/cleaned_geschenkregister.csv', display);

// setup the buttons.
setupButtons();
