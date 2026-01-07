package com.wildlife.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WikipediaImageResponse {
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Query {
        private Map<String, Page> pages;
        
        public Map<String, Page> getPages() {
            return pages;
        }
        
        public void setPages(Map<String, Page> pages) {
            this.pages = pages;
        }
    }
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Page {
        private List<ImageInfo> imageinfo;
        
        public List<ImageInfo> getImageinfo() {
            return imageinfo;
        }
        
        public void setImageinfo(List<ImageInfo> imageinfo) {
            this.imageinfo = imageinfo;
        }
    }
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ImageInfo {
        private String url;
        
        public String getUrl() {
            return url;
        }
        
        public void setUrl(String url) {
            this.url = url;
        }
    }
    
    private Query query;
    
    public Query getQuery() {
        return query;
    }
    
    public void setQuery(Query query) {
        this.query = query;
    }
}

