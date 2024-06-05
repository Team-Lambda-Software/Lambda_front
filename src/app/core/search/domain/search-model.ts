export interface SearchModel {
    blogs:   Body[];
    courses: Body[];
}

export interface Body {
    id:       string;
    title:    string;
    image:    string;
    date:     Date;
    category: string;
    trainer:  string;
}
