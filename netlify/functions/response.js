const fs = require('fs');
const path = require('path');

// The path to the JSON file where data is stored.
// NOTE: In a Netlify serverless function, the file system is read-only,
// except for the /tmp directory. We will try to write to the project root,
// but for persistent data, an external database is recommended.
const DATA_FILE = path.join(process.cwd(), 'responses.json');

exports.handler = async (event, context) => {
  // We only want to handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, selectedCat, noAttempts, noReason, finalResponse, qualifyingAnswers } = data;

    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name is required' }),
      };
    }

    const newResponse = {
      id: Date.now(),
      name,
      selectedCat: selectedCat || 'Unknown Cat',
      noAttempts,
      noReason,
      finalResponse,
      qualifyingAnswers,
      timestamp: new Date().toISOString(),
    };

    // Read existing responses
    let responses = [];
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
      if (fileContent) {
        responses = JSON.parse(fileContent);
      }
    }

    // Add new response and save
    responses.unshift(newResponse);
    fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2));

    return {
      statusCode: 201,
      body: JSON.stringify(newResponse),
    };
  } catch (error) {
    console.error('Error saving response:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
