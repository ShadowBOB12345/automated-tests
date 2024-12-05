// Initialize the headers object to store HTTP request headers
const myHeaders = new Headers();

// Adding "accept" header to specify the type of responses expected from the server
myHeaders.append("accept", "application/json, text/plain, */*");

// Adding "country-id" to identify the location of the user (specific country)
myHeaders.append("country-id", "12");

// Adding "device" header to indicate the type of client device making the request
myHeaders.append("device", "pc");

// Including a custom "experiment" header with a placeholder value
myHeaders.append("experiment", "novalue");

// Adding "language" header to specify the preferred language for the response
myHeaders.append("language", "ru_RU");

// Setting the "referer" header to indicate the originating page of the request
myHeaders.append("referer", "https://lalafo.kg/bishkek/mebel-2/mebel/q-%D0%9E%D1%84%D0%B8%D1%81%D0%BD%D1%8B%D0%B5%20%D1%81%D1%82%D0%BE%D0%BB%D1%8B?sort_by=default&price[from]=10000&price[to]=20000");

// Adding "request-id" header for tracking requests uniquely
myHeaders.append("request-id", "react-client_7c19e2dc-d514-4857-97d7-51def66d0829");

// Including browser-specific headers like "sec-ch-ua" for user-agent hints
myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"");

// Indicating whether the device is mobile
myHeaders.append("sec-ch-ua-mobile", "?0");

// Specifying the platform being used, in this case, Windows
myHeaders.append("sec-ch-ua-platform", "\"Windows\"");

// Adding "user-agent" to provide information about the browser and OS used
myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36");

// Including a custom "user-hash" for identifying the user session
myHeaders.append("user-hash", "52942bc2-60ed-4bd0-a9e0-2da1b5332443");

// Setting "x-cache-bypass" to bypass caching mechanisms
myHeaders.append("x-cache-bypass", "yes");

// Adding a "Cookie" header for authentication and session management
myHeaders.append("Cookie", "affinity=1733419689.884.141.727550|77d10e9a236642c6efd4b9ec0942933d");

// Configuring request options, including HTTP method and headers
const requestOptions = {
  method: "GET", // Using GET method to fetch data
  headers: myHeaders, // Attaching headers to the request
  redirect: "follow" // Allowing redirections to be followed automatically
};

// Defining the URL for the API endpoint with query parameters for search filters
const apiURL = "https://lalafo.kg/api/search/v3/feed/search?" +
  "expand=url&per-page=20&category_id=4327&q=Офисные столы" + 
  "&city_id=103184&sort_by=default&price[from]=10000&price[to]=20000&with_feed_banner=true";

// Using the Fetch API to send an HTTP GET request
fetch(apiURL, requestOptions)
  .then((response) => {
    // Checking if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text(); // Parsing the response body as text
  })
  .then((result) => {
    // Logging the result of the request to the console
    console.log("Fetch result:", result);
  })
  .catch((error) => {
    // Catching and logging any errors during the fetch operation
    console.error("Error occurred during fetch:", error);
  });
