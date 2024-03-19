type Milestone = {
    year?: string;
    month?: string;
    description?: string;
    descriptionKey?: string;
    link?: string;
};

export type Quarter = {
    selected?: boolean;
    quarter: string;
    milestones: Milestone[];
};
