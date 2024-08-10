document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    const map = L.map('map').setView([14.6197, 120.9822], 14); // Centered on Barangay 842

    // Add the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define AQI color scale and corresponding category labels
    const aqiCategories = {
        'Good': { range: [0, 50], color: 'Green' },
        'Moderate': { range: [51, 100], color: 'Yellow' },
        'Unhealthy for Sensitive Groups': { range: [101, 150], color: 'Orange' },
        'Unhealthy': { range: [151, 200], color: 'Red' },
        'Very Unhealthy': { range: [201, 300], color: 'Purple' },
        'Hazardous': { range: [301, Infinity], color: 'Maroon' }
    };

    // Function to determine the AQI category and color based on AQI value
    function getAqiCategory(aqi) {
        for (const [category, info] of Object.entries(aqiCategories)) {
            if (aqi >= info.range[0] && aqi <= info.range[1]) {
                return { category, color: info.color };
            }
        }
        return { category: 'Unknown', color: 'Grey' }; // Default if no match found
    }

    // Define street data with example coordinates and AQI values
    const streets = [
        { name: 'Pedro Gil Street', bounds: [[14.6190, 120.9820], [14.6192, 120.9830]], aqi: 285 },
        { name: 'Quirino Avenue', bounds: [[14.6193, 120.9825], [14.6195, 120.9835]], aqi: 405 },
        { name: 'A. Linao Street', bounds: [[14.6188, 120.9815], [14.6190, 120.9825]], aqi: 170 },
        { name: 'Penafrancia Street', bounds: [[14.6194, 120.9820], [14.6196, 120.9830]], aqi: 40 },
        { name: 'Perdigon Street', bounds: [[14.6189, 120.9822], [14.6191, 120.9832]], aqi: 100 },
        { name: 'J. Zamora Street', bounds: [[14.6192, 120.9827], [14.6194, 120.9837]], aqi: 142 },
        { name: 'J. Bocobo Street', bounds: [[14.6190, 120.9823], [14.6192, 120.9833]], aqi: 150 }
    ];

    // Sort streets by AQI value from highest to lowest
    streets.sort((a, b) => b.aqi - a.aqi);

    // Add rectangles to the map
    streets.forEach(street => {
        const { name, bounds, aqi } = street;
        const { category, color } = getAqiCategory(aqi);

        // Define rectangle options
        const rectangleOptions = {
            color: color.toLowerCase(),
            weight: 2,
            fillOpacity: 0.5,
            fillColor: color.toLowerCase()
        };

        // Create the rectangle and add to map
        L.rectangle(bounds, rectangleOptions)
            .bindTooltip(`${name} (${color})`, { direction: 'top', sticky: true })
            .on('mouseover', function () {
                document.getElementById('aqi-details').innerHTML = `
                    <strong>Street:</strong> ${name}<br>
                    <strong>Code (Color):</strong> ${color}<br>
                    <strong>AQI:</strong> ${aqi}<br>
                    <strong>Description:</strong> ${category}<br>
                    <strong>What to do:</strong> ${getActionAdvice(category)}
                `;
            })
            .on('mouseout', function () {
                document.getElementById('aqi-details').innerHTML = 'Hover over the map to see details.';
            })
            .addTo(map);
    });

    // Function to get action advice based on AQI category
    function getActionAdvice(category) {
        switch (category) {
            case 'Good':
                return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
            case 'Moderate':
                return 'Air quality is acceptable; however, there may be a risk for some people who are unusually sensitive to air pollution.';
            case 'Unhealthy for Sensitive Groups':
                return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
            case 'Unhealthy':
                return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
            case 'Very Unhealthy':
                return 'Health alert: everyone may experience more serious health effects.';
            case 'Hazardous':
                return 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
            default:
                return 'No specific advice available.';
        }
    }

    // Populate AQI Summary
    const aqiSummary = document.getElementById('aqi-summary');
    aqiSummary.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Street</th>
                </tr>
            </thead>
            <tbody>
                ${streets
                    .map(street => {
                        const { category, color } = getAqiCategory(street.aqi);
                        if (category === 'Hazardous' || category === 'Very Unhealthy' || category === 'Unhealthy') {
                            return `
                                <tr>
                                    <td style="background-color: ${color.toLowerCase()}; color: white;">${color}</td>
                                    <td>${street.name}</td>
                                </tr>
                            `;
                        }
                        return '';
                    })
                    .join('')}
            </tbody>
        </table>
    `;

    // Populate AQI Legend
    const aqiLegend = document.getElementById('aqi-legend');
    aqiLegend.innerHTML = `
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Range</th>
                    <th>Alert</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(aqiCategories).map(([category, { color, range }]) => `
                    <tr>
                        <td style="background-color: ${color.toLowerCase()}; color: white;">${color}</td>
                        <td>${range[0]}-${range[1]}</td>
                        <td>${category}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
});

// Toggle chatbox visibility
document.addEventListener('DOMContentLoaded', function () {
    const chatbox = document.getElementById('chatbox');
    const chatIcon = document.getElementById('chat-icon');
    const chatboxHeader = document.getElementById('chatbox-header');

    chatIcon.addEventListener('click', function () {
        if (chatbox.style.display === 'none' || chatbox.style.display === '') {
            chatbox.style.display = 'block';
            chatIcon.style.display = 'none';
        } else {
            chatbox.style.display = 'none';
            chatIcon.style.display = 'block';
        }
    });

    chatboxHeader.addEventListener('click', function () {
        chatbox.style.display = 'none';
        chatIcon.style.display = 'block';
    });

    // Handle sending message
    document.getElementById('chatbox-send').addEventListener('click', function () {
        const input = document.getElementById('chatbox-input');
        if (input.value.trim() !== '') {
            const message = document.createElement('div');
            message.textContent = input.value;
            chatboxContent.appendChild(message);
            input.value = '';
            chatboxContent.scrollTop = chatboxContent.scrollHeight;
        }
    });
});

