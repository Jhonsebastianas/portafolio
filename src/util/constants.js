class SocialMedia {
    constructor(icon, url) {
        this.ICON = icon;
        this.URL = url;
    }
}

export const SOCIAL_MEDIA = Object.freeze({
    GITHUB: new SocialMedia('uil uil-github-alt', 'https://github.com/jhonsebastianas'),
    YOUTUBE: new SocialMedia('uil uil-youtube', 'https://www.youtube.com/@jhonsebastianas'),
    LINKEDIN: new SocialMedia('uil uil-linkedin-alt', 'https://www.linkedin.com/in/jhonsabastianas/'),
});