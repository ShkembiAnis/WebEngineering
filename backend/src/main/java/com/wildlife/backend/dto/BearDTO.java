package com.wildlife.backend.dto;

public class BearDTO {
    private String name;
    private String binomial;
    private String image;
    private String range;

    public BearDTO() {
    }

    public BearDTO(String name, String binomial, String image, String range) {
        this.name = name;
        this.binomial = binomial;
        this.image = image;
        this.range = range;
    }

    public static BearDTOBuilder builder() {
        return new BearDTOBuilder();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBinomial() {
        return binomial;
    }

    public void setBinomial(String binomial) {
        this.binomial = binomial;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getRange() {
        return range;
    }

    public void setRange(String range) {
        this.range = range;
    }

    public static class BearDTOBuilder {
        private String name;
        private String binomial;
        private String image;
        private String range;

        public BearDTOBuilder name(String name) {
            this.name = name;
            return this;
        }

        public BearDTOBuilder binomial(String binomial) {
            this.binomial = binomial;
            return this;
        }

        public BearDTOBuilder image(String image) {
            this.image = image;
            return this;
        }

        public BearDTOBuilder range(String range) {
            this.range = range;
            return this;
        }

        public BearDTO build() {
            return new BearDTO(name, binomial, image, range);
        }
    }
}

