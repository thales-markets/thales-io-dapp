export type Milestone = {
    year: string;
    month: string;
    descriptionKey: string;
    link: string;
};

export type Quarter = {
    quarter: string;
    milestones: Milestone[];
};
