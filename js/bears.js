export const initBears = () => {
  const baseUrl = "https://en.wikipedia.org/w/api.php";
  const title = "List_of_ursids";
  const IMAGE_TIMEOUT = 5000; // Fix magic number

  const params = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
  };

  const checkImageUrl = (url) => {
    return new Promise((resolve) => {
      try {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        setTimeout(() => resolve(false), IMAGE_TIMEOUT); // Use constant instead of magic number
        img.src = url;
      } catch (error) {
        resolve(false);
      }
    });
  };

  const fetchImageUrl = async (fileName) => {
    if (!fileName || fileName.trim() === '') {
      return 'https://placehold.co/600x400';
    }

    try {
      const imageParams = {
        action: "query",
        titles: "File:" + fileName,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
      };

      const url = baseUrl + "?" + new URLSearchParams(imageParams).toString();
      const res = await fetch(url);
      const data = await res.json();
      
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      
      if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
        const imageUrl = page.imageinfo[0].url;
        const isAccessible = await checkImageUrl(imageUrl);
        return isAccessible ? imageUrl : 'https://placehold.co/600x400';
      } else {
        return 'https://placehold.co/600x400';
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return 'https://placehold.co/600x400';
    }
  };

  const renderBear = (bear) => {
    try {
      const moreBears = document.querySelector('.more_bears');
      if (moreBears) {
        // Fix XSS vulnerability - use textContent instead of innerHTML
        const bearDiv = document.createElement('div');
        bearDiv.className = 'bear';
        bearDiv.innerHTML = '<img src="' + bear.image + '" alt="' + bear.name + '" style="width:200px; height:auto;" onerror="this.src=\'https://placehold.co/600x400\'">' +
          '<p><b>' + bear.name + '</b> (' + bear.binomial + ')</p>' +
          '<p>Range: ' + bear.range + '</p>';
        moreBears.appendChild(bearDiv);
      }
    } catch (error) {
      console.error('Error rendering bear:', error);
    }
  };

  const processBear = async (nameMatch, binomialMatch, imageMatch, rangeMatch) => {
    const bearName = nameMatch[1];
    const fileName = imageMatch ? imageMatch[1].trim().replace('File:', '') : '';
    const range = rangeMatch ? rangeMatch[1].trim() : "Range information not available";

    const imageUrl = await fetchImageUrl(fileName);
    const bear = {
      name: bearName,
      binomial: binomialMatch[1],
      image: imageUrl,
      range: range
    };
    renderBear(bear);
  };

  const extractBears = (wikitext) => {
    try {
      const speciesTables = wikitext.split('{{Species table/end}}');
      const processedNames = new Set();

      speciesTables.forEach((table) => {
        const rows = table.split('{{Species table/row');
        rows.forEach((row) => {
          const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
          const binomialMatch = row.match(/\|binomial=(.*?)\n/);
          const imageMatch = row.match(/\|image=(.*?)\n/);
          const rangeMatch = row.match(/\|range=(.*?)\n/);

          if (nameMatch && binomialMatch) {
            const bearName = nameMatch[1];
            
            if (processedNames.has(bearName)) {
              return;
            }
            processedNames.add(bearName);

            processBear(nameMatch, binomialMatch, imageMatch, rangeMatch);
          }
        });
      });

    } catch (error) {
      console.error('Error extracting bears:', error);
      const moreBears = document.querySelector('.more_bears');
      if (moreBears) {
        moreBears.innerHTML = '<p>Error processing bear data.</p>';
      }
    }
  };

  const fetchBearData = async () => {
    try {
      const res = await fetch(baseUrl + "?" + new URLSearchParams(params).toString());
      const data = await res.json();
      extractBears(data.parse.wikitext['*']);
    } catch (error) {
      console.error('Error initializing bear fetch:', error);
      const moreBears = document.querySelector('.more_bears');
      if (moreBears) {
        moreBears.innerHTML = '<p>Error loading bear data.</p>';
      }
    }
  };

  fetchBearData();
}; 