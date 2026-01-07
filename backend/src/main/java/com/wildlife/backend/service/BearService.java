package com.wildlife.backend.service;

import com.wildlife.backend.dto.BearDTO;
import com.wildlife.backend.model.WikipediaResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class BearService {

    private static final Logger log = LoggerFactory.getLogger(BearService.class);

    private static final String EN_WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";
    private static final String COMMONS_API_URL = "https://commons.wikimedia.org/w/api.php";
    private static final String PLACEHOLDER_IMAGE = "https://placehold.co/600x400";
    private static final String URSIDS_PAGE = "List_of_ursids";
    private static final int IMAGE_TIMEOUT_MS = 5000;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public BearService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * Fetches bear data from Wikipedia API
     */
    public List<BearDTO> fetchBearsFromWikipedia() {
        log.info("Fetching bear data from Wikipedia...");
        
        try {
            String wikitext = fetchWikitext();
            
            List<BearDTO> bears = extractBearsFromWikitext(wikitext);
            
            log.info("Successfully fetched {} bears from Wikipedia", bears.size());
            return bears;
            
        } catch (Exception e) {
            log.error("Error fetching bears from Wikipedia", e);
            return Collections.emptyList();
        }
    }

    /**
     * Fetches wikitext content from Wikipedia
     */
    private String fetchWikitext() {
        URI uri = UriComponentsBuilder.fromHttpUrl(EN_WIKIPEDIA_API_URL)
                .queryParam("action", "parse")
                .queryParam("page", URSIDS_PAGE)
                .queryParam("prop", "wikitext")
                .queryParam("section", "3")
                .queryParam("format", "json")
                .queryParam("origin", "*")
                .build()
                .encode()
                .toUri();

        WikipediaResponse response = restTemplate.getForObject(uri, WikipediaResponse.class);
        
        if (response != null && response.getParse() != null && response.getParse().getWikitext() != null) {
            return response.getParse().getWikitext().getContent();
        }
        
        throw new RuntimeException("Failed to fetch wikitext from Wikipedia");
    }

    /**
     * Extracts bear information from Wikipedia wikitext
     */
    private List<BearDTO> extractBearsFromWikitext(String wikitext) {
        List<BearDTO> bears = new ArrayList<>();
        Set<String> processedNames = new HashSet<>();

        String[] speciesTables = wikitext.split("\\{\\{Species table/end\\}\\}");

        for (String table : speciesTables) {
            String[] rows = table.split("\\{\\{Species table/row");

            for (String row : rows) {
                try {
                    Pattern namePattern = Pattern.compile("\\|name=\\[\\[(.*?)\\]\\]");
                    Pattern binomialPattern = Pattern.compile("\\|binomial=(.*?)\\n");
                    Pattern imagePattern = Pattern.compile("\\|image=(.*?)\\n");
                    Pattern rangePattern = Pattern.compile("\\|range=(.*?)\\n");

                    Matcher nameMatcher = namePattern.matcher(row);
                    Matcher binomialMatcher = binomialPattern.matcher(row);
                    Matcher imageMatcher = imagePattern.matcher(row);
                    Matcher rangeMatcher = rangePattern.matcher(row);

                    if (nameMatcher.find() && binomialMatcher.find()) {
                        String bearName = nameMatcher.group(1);

                        if (processedNames.contains(bearName)) {
                            continue;
                        }
                        processedNames.add(bearName);

                        String binomial = binomialMatcher.group(1).trim();
                        String imageFile = "";
                        if (imageMatcher.find()) {
                            String rawImage = imageMatcher.group(1).trim().replace("File:", "");
                            int pipeIndex = rawImage.indexOf('|');
                            imageFile = pipeIndex > 0 ? rawImage.substring(0, pipeIndex).trim() : rawImage;
                        }
                        String range = rangeMatcher.find() ? 
                                rangeMatcher.group(1).trim() : "Range information not available";

                        String imageUrl = fetchImageUrl(imageFile);

                        BearDTO bear = BearDTO.builder()
                                .name(bearName)
                                .binomial(binomial)
                                .image(imageUrl)
                                .range(range)
                                .build();

                        bears.add(bear);
                        log.debug("Extracted bear: {}", bearName);
                    }
                } catch (Exception e) {
                    log.warn("Error parsing bear row", e);
                }
            }
        }

        return bears;
    }

    /**
     * Fetches image URL from Wikipedia
     */
    private String fetchImageUrl(String fileName) {
        if (fileName == null || fileName.trim().isEmpty()) {
            log.debug("No image filename provided, using placeholder");
            return PLACEHOLDER_IMAGE;
        }

        String url = fetchImageUrlFromApi(COMMONS_API_URL, fileName);
        if (url != null) {
            return url;
        }

        url = fetchImageUrlFromApi(EN_WIKIPEDIA_API_URL, fileName);
        if (url != null) {
            return url;
        }

        log.warn("No image URL found for file: {}", fileName);
        return PLACEHOLDER_IMAGE;
    }

    private String fetchImageUrlFromApi(String apiBaseUrl, String fileName) {
        try {
            URI uri = UriComponentsBuilder.fromHttpUrl(apiBaseUrl)
                    .queryParam("action", "query")
                    .queryParam("titles", "File:" + fileName)
                    .queryParam("prop", "imageinfo")
                    .queryParam("iiprop", "url")
                    .queryParam("redirects", "1")
                    .queryParam("format", "json")
                    .queryParam("origin", "*")
                    .build()
                    .encode()
                    .toUri();

            log.debug("Fetching image URL for file: {} from URL: {}", fileName, uri);

            String rawJson = restTemplate.getForObject(uri, String.class);
            if (rawJson == null || rawJson.isBlank()) {
                return null;
            }

            JsonNode root = objectMapper.readTree(rawJson);
            JsonNode pagesNode = root.path("query").path("pages");
            if (pagesNode.isMissingNode() || !pagesNode.isObject()) {
                return null;
            }

            for (var it = pagesNode.fields(); it.hasNext(); ) {
                var entry = it.next();
                String pageId = entry.getKey();
                JsonNode page = entry.getValue();

                JsonNode imageInfo = page.path("imageinfo");
                if (imageInfo.isArray() && !imageInfo.isEmpty()) {
                    String imageUrl = imageInfo.get(0).path("url").asText(null);
                    if (imageUrl != null && !imageUrl.isBlank()) {
                        log.info("Found image URL for {} (pageId={}): {}", fileName, pageId, imageUrl);
                        return imageUrl;
                    }
                }
            }

            return null;
        } catch (Exception e) {
            log.debug("Image lookup failed for {} via {}: {}", fileName, apiBaseUrl, e.getMessage());
            return null;
        }
    }
}

