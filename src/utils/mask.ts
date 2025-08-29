/**
     * Applies a mask pattern to the given value.
     * Replaces each asterisk (*) in the pattern with the corresponding character from the value.
     * If the value is shorter than the pattern, remaining asterisks are replaced with an empty string.
     *
     * @param value - The string to be masked.
     * @param pattern - The mask pattern using asterisks (*) as placeholders.
     * @returns The masked string.
 */

export const mask = ( value : string , pattern : string ) : string => {
    let count = 0;
    return pattern.replace( /\*/g , () => value[ count++ ] || '' )
}
