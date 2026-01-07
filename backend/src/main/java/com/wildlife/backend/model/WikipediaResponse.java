package com.wildlife.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WikipediaResponse {
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Parse {
        private Wikitext wikitext;
        
        public Wikitext getWikitext() {
            return wikitext;
        }
        
        public void setWikitext(Wikitext wikitext) {
            this.wikitext = wikitext;
        }
        
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Wikitext {
            @JsonProperty("*")
            private String content;
            
            public String getContent() {
                return content;
            }
            
            public void setContent(String content) {
                this.content = content;
            }
        }
    }
    
    private Parse parse;
    
    public Parse getParse() {
        return parse;
    }
    
    public void setParse(Parse parse) {
        this.parse = parse;
    }
}

