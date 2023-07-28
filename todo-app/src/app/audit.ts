export class Audit {
    action!: string;
    updates!: string;
    created_at!: string;

    constructor(obj: any) {
        this.action = obj.action;
        this.updates = obj.updates;
        this.created_at = obj.created_at;
    }

    displayString(): string {
        let output = `${this.action} on ${new Date(this.created_at).toLocaleString()}`;
        if (this.action === 'Update') {
            output = `${output} changes : ${this.updates}`;
        }
        return output;
    }

    static mapAudit(obj: any): Audit {
        return new Audit(obj);
    }
}