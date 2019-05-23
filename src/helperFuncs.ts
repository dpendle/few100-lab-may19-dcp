
export function InputMustBePosNumOnly(verifyInput: HTMLInputElement): boolean {
    return /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(verifyInput.value);
}