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
    PERSONAL_BLOG : new SocialMedia('uil uil-document-layout-left', 'https://www.jhonsebastianas.com/blog'),
    INSTAGRAM : new SocialMedia('uil uil-instagram', 'https://www.instagram.com/jhonsebastianas/'),
});