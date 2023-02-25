export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

export interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string;
    kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;