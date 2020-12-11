export class Validations {

    public validateNumber(val: string): boolean {
        const regex = new RegExp(/^[\d](\d)*$/g);

        return regex.test(val);
    }

}
