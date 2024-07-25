export function getGraphData(data) {
    const xpData = data.xp_view.map(item => ({
        amount: item.amount,
        path: item.path
    }));
    const audits = data.transaction_audits
    const didCount = audits.filter(audit => audit.type === 'up').length;
    const RecievedCount = audits.filter(audit => audit.type === 'down').length;

    createBarChart(xpData)
    createAuditPieChart({did : didCount, recieved : RecievedCount})
}

function createBarChart(xpData) {
    const svgWidth = 500;
    const svgHeight = 300;
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#xpBarChart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(xpData.map(d => (d.path)))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(xpData, d => d.amount)])
        .nice()
        .range([height, 0]);

    svg.append("g")
        .selectAll(".bar")
        .data(xpData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.path))
        .attr("y", d => y(d.amount))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.amount))
        .attr("fill", "#e74c3c");

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));
}

function createAuditPieChart(auditData) {

    // Prepare data for D3
    const data = [
      { label: 'Done', count: auditData.did },
      { label: 'Recieved', count: auditData.recieved }
    ];

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#auditPieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(["#c0392b", "#333"]);

    const pie = d3.pie()
      .value(d => d.count);

    const path = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

    const arc = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    arc.append("path")
      .attr("d", path)
      .attr("fill", d => color(d.data.label));

    arc.append("text")
      .attr("transform", d => `translate(${path.centroid(d)})`)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text(d => d.data.label+'\n'+d.data.count);
  }

