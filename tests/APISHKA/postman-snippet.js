// Initialize the headers object to store HTTP request headers
const myHeaders = new Headers();

// Adding "accept" header to specify the type of responses expected from the server
myHeaders.append("accept", "application/json, text/plain, */*");

// Adding "country-id" to identify the location of the user (specific country)
myHeaders.append("country-id", "12");

// Adding "device" header to indicate the type of client device making the request
myHeaders.append("device", "pc");

// Adding "language" header to specify the preferred language for the response
myHeaders.append("language", "ru_RU");

// Setting the "referer" header to indicate the originating page of the request
myHeaders.append("referer", "https://www.ozon.ru/category/noutbuki-15603/?pricefrom=10000&priceto=20000&sorting=rating" );

// Adding "user-agent" to provide information about the browser and OS used
myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36");

// Configuring request options, including HTTP method and headers
const requestOptions = {
  method: "GET", // Using GET method to fetch data
  headers: myHeaders, // Attaching headers to the request
  redirect: "follow" // Allowing redirections to be followed automatically
};

// Defining the URL for the Ozon API endpoint with query parameters for search filters
const apiURL = "https://api.ozon.ru/composer-api.bx/page/json/v2?url=" +
  encodeURIComponent(
    "/search/?text=%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA&from_global=true&sorting=rating&pricefrom=10000&priceto=20000"
  );

// Using the Fetch API to send an HTTP GET request
fetch(apiURL, requestOptions)
  .then((response) => {
    // Checking if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parsing the response body as JSON
  })
  .then((result) => {
    // Logging the result of the request to the console
    console.log("Fetch result:", result);

    // Example: Checking the response structure and filtering products by price
    if (result && result.data && result.data.items) {
      result.data.items.forEach((item) => {
        console.log(`Product: ${item.title}, Price: ${item.price.value}`);
      });
    } else {
      console.error("Unexpected response structure:", result);
    }
  })
  .catch((error) => {
    // Catching and logging any errors during the fetch operation
    console.error("Error occurred during fetch:", error);
  });
