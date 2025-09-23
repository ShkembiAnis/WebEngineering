export function initBears() {
  var baseUrl = "https://en.wikipedia.org/w/api.php";
  var title = "List_of_ursids";

  var params = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
  };

  // Function to check if image URL is accessible
  function checkImageUrl(url) {
    return new Promise(function(resolve) {
      try {
        var img = new Image();
        img.onload = function() { resolve(true); };
        img.onerror = function() { resolve(false); };
        setTimeout(function() { resolve(false); }, 5000);
        img.src = url;
      } catch (error) {
        resolve(false);
      }
    });
  }

  function fetchImageUrl(fileName) {
    if (!fileName || fileName.trim() === '') {
      return Promise.resolve('https://placehold.co/600x400');
    }

    try {
      var imageParams = {
        action: "query",
        titles: "File:" + fileName,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
      };

      var url = baseUrl + "?" + new URLSearchParams(imageParams).toString();
      return fetch(url)
        .then(function(res) { return res.json(); })
        .then(function(data) {
          var pages = data.query.pages;
          var page = Object.values(pages)[0];
          if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
            var imageUrl = page.imageinfo[0].url;
            return checkImageUrl(imageUrl).then(function(isAccessible) {
              return isAccessible ? imageUrl : 'https://placehold.co/600x400';
            });
          } else {
            return 'https://placehold.co/600x400';
          }
        });
    } catch (error) {
      console.error('Error fetching image:', error);
      return Promise.resolve('https://placehold.co/600x400');
    }
  }

  function extractBears(wikitext) {
    try {
      var speciesTables = wikitext.split('{{Species table/end}}');
      var processedNames = new Set(); // Prevent duplicates
      var bearPromises = [];

      speciesTables.forEach(function(table) {
        var rows = table.split('{{Species table/row');
        rows.forEach(function(row) {
          var nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
          var binomialMatch = row.match(/\|binomial=(.*?)\n/);
          var imageMatch = row.match(/\|image=(.*?)\n/);
          var rangeMatch = row.match(/\|range=(.*?)\n/);

          if (nameMatch && binomialMatch) {
            var bearName = nameMatch[1];
            
            // Skip duplicates
            if (processedNames.has(bearName)) {
              return;
            }
            processedNames.add(bearName);

            var fileName = imageMatch ? imageMatch[1].trim().replace('File:', '') : '';
            var range = rangeMatch ? rangeMatch[1].trim() : "Range information not available";

            var bearPromise = fetchImageUrl(fileName).then(function(imageUrl) {
              return {
                name: bearName,
                binomial: binomialMatch[1],
                image: imageUrl,
                range: range
              };
            });

            bearPromises.push(bearPromise);
          }
        });
      });

      try {
        Promise.all(bearPromises).then(function(bearsData) {
          try {
            var moreBears = document.querySelector('.more_bears');
            if (moreBears && bearsData.length > 0) {
              bearsData.forEach(function(bear) {
                var html = '<div class="bear">' +
                  '<img src="' + bear.image + '" alt="Image of ' + bear.name + '" style="width:200px; height:auto;" onerror="this.src=\'https://placehold.co/600x400\'">' +
                  '<p><b>' + bear.name + '</b> (' + bear.binomial + ')</p>' +
                  '<p>Range: ' + bear.range + '</p>' +
                  '</div>';
                moreBears.innerHTML += html;
              });
            }
          } catch (error) {
            console.error('Error displaying bears:', error);
            var moreBears = document.querySelector('.more_bears');
            if (moreBears) {
              moreBears.innerHTML = '<p>Error displaying bear information.</p>';
            }
          }
        });
      } catch (error) {
        console.error('Error loading bears:', error);
        var moreBears = document.querySelector('.more_bears');
        if (moreBears) {
          moreBears.innerHTML = '<p>Could not load bear information. Please try again later.</p>';
        }
      }

    } catch (error) {
      console.error('Error extracting bears:', error);
      var moreBears = document.querySelector('.more_bears');
      if (moreBears) {
        moreBears.innerHTML = '<p>Error processing bear data.</p>';
      }
    }
  }

  // Main fetch with try/catch
  try {
    fetch(baseUrl + "?" + new URLSearchParams(params).toString())
      .then(function(res) { return res.json(); })
      .then(function(data) {
        extractBears(data.parse.wikitext['*']);
      });
  } catch (error) {
    console.error('Error initializing bear fetch:', error);
    var moreBears = document.querySelector('.more_bears');
    if (moreBears) {
      moreBears.innerHTML = '<p>Error loading bear data.</p>';
    }
  }
} 